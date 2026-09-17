import { NextResponse } from "next/server";

/* ARCHITECTURE "PROVIDER-READY", PAS UN FORMULAIRE SIMULE.

   Ce projet n'a AUCUN prestataire d'envoi d'email configure (pas de cle
   Resend/Sendgrid/Postmark, aucun secret dans l'environnement). Cette
   route valide donc reellement les donnees cote serveur — jamais
   confiance dans la seule validation client, contournable par
   n'importe qui — puis repond honnetement selon ce qui est disponible :

     - CONTACT_PROVIDER_API_KEY absente (le cas aujourd'hui) : renvoie
       les donnees validees/nettoyees au client, qui ouvre lui-meme un
       mailto: — c'est SON client mail qui envoie, pas ce serveur.
     - CONTACT_PROVIDER_API_KEY presente (si Alfred fournit un jour une
       cle, jamais commitee) : brancher ICI l'appel reel au prestataire
       choisi et renvoyer { livraison: "envoye" }. Personne ne doit
       modifier le comportement du formulaire lui-meme pour ce faire —
       seul ce fichier change.

   Aucun secret cote client : cette route est le SEUL endroit ou une
   cle de prestataire serait lue (process.env, jamais expose au bundle
   client puisque ce fichier ne tourne que sur le serveur). */

const SERVICES_AUTORISES = new Set([
  // FR
  "Finance & Technologie",
  "Immobilier",
  "Software & IA",
  "Projet digital",
  "Projet transversal",
  "Autre",
  // EN
  "Finance & Technology",
  "Real Estate",
  "Software & AI",
  "Digital project",
  "Cross-business project",
  "Other",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Longueurs raisonnables : empechent un payload abusif sans jamais
// gener une description de projet longue et legitime.
const LIMITES = {
  nom: 200,
  email: 200,
  telephone: 40,
  entreprise: 200,
  service: 60,
  typeProjet: 200,
  budget: 100,
  echeance: 60,
  description: 5000,
} as const;

type Corps = {
  nom?: unknown;
  email?: unknown;
  telephone?: unknown;
  entreprise?: unknown;
  service?: unknown;
  typeProjet?: unknown;
  budget?: unknown;
  echeance?: unknown;
  description?: unknown;
  site?: unknown; // honeypot
  chargeA?: unknown; // timestamp de montage du formulaire, cote client
};

function texte(valeur: unknown, max: number): string {
  if (typeof valeur !== "string") return "";
  return valeur.trim().slice(0, max);
}

export async function POST(requete: Request) {
  let corps: Corps;
  try {
    corps = await requete.json();
  } catch {
    return NextResponse.json({ erreurGenerique: true }, { status: 400 });
  }

  // HONEYPOT — un champ que seul un robot remplit. On repond un succes
  // de façade (le robot ne doit rien apprendre de son echec) sans rien
  // traiter ni transmettre.
  if (texte(corps.site, 200)) {
    return NextResponse.json({ livraison: "mailto", donnees: {} }, { status: 200 });
  }

  // ANTI-SPAM PAR DELAI — un formulaire rempli et soumis en moins de
  // 1.5s apres son propre montage n'a pas ete lu par un humain. Verifie
  // seulement si le client l'a fourni (fail-open : un client legitime
  // qui omettrait ce champ n'est jamais bloque pour autant).
  const chargeA = typeof corps.chargeA === "number" ? corps.chargeA : null;
  if (chargeA !== null && Date.now() - chargeA < 1500) {
    return NextResponse.json({ livraison: "mailto", donnees: {} }, { status: 200 });
  }

  const donnees = {
    nom: texte(corps.nom, LIMITES.nom),
    email: texte(corps.email, LIMITES.email),
    telephone: texte(corps.telephone, LIMITES.telephone),
    entreprise: texte(corps.entreprise, LIMITES.entreprise),
    service: texte(corps.service, LIMITES.service),
    typeProjet: texte(corps.typeProjet, LIMITES.typeProjet),
    budget: texte(corps.budget, LIMITES.budget),
    echeance: texte(corps.echeance, LIMITES.echeance),
    description: texte(corps.description, LIMITES.description),
  };

  // VALIDATION SERVEUR — la seule qui compte reellement. Memes regles
  // que le client (voir Contact.tsx), mais RE-VERIFIEES ici : le client
  // peut toujours etre contourne (devtools, requete directe, script).
  const erreurs: Record<string, boolean> = {};
  if (!donnees.nom) erreurs.nom = true;
  if (!donnees.email || !EMAIL_RE.test(donnees.email)) erreurs.email = true;
  if (!donnees.service || !SERVICES_AUTORISES.has(donnees.service)) erreurs.service = true;
  if (!donnees.description) erreurs.description = true;

  if (Object.keys(erreurs).length > 0) {
    return NextResponse.json({ erreurs }, { status: 400 });
  }

  // PRESTATAIRE REEL — brancher ici le jour ou une cle existe. Tant que
  // process.env.CONTACT_PROVIDER_API_KEY est absente, cette branche ne
  // s'execute jamais : le formulaire ne PRETEND a aucun moment l'avoir
  // fait.
  if (process.env.CONTACT_PROVIDER_API_KEY) {
    // Exemple d'integration (non appele tant que la cle n'existe pas) :
    // await fetch("https://api.resend.com/emails", { ... });
    return NextResponse.json({ livraison: "envoye" }, { status: 200 });
  }

  return NextResponse.json({ livraison: "mailto", donnees }, { status: 200 });
}
