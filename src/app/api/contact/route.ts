import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createHash } from "node:crypto";

export const runtime = "nodejs";

const DESTINATAIRE = "krodi2001@gmail.com";
// Limite complementaire par instance, non distribuee : configurer aussi
// une regle WAF sur Vercel. Aucun email ni contenu de projet conserve ici.
const tentatives = new Map<string, { nombre: number; expiration: number }>();
function limiter(email: string): boolean {
  const maintenant = Date.now();
  for (const [cle, valeur] of tentatives) {
    if (valeur.expiration <= maintenant) tentatives.delete(cle);
  }
  const cle = createHash("sha256").update(email.toLowerCase()).digest("hex");
  const actuelle = tentatives.get(cle);
  if ((actuelle?.nombre ?? 0) >= 3 || (!actuelle && tentatives.size >= 1000)) return false;
  tentatives.set(cle, {
    nombre: (actuelle?.nombre ?? 0) + 1,
    expiration: actuelle?.expiration ?? maintenant + 600_000,
  });
  return true;
}

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
  description: 5000,
} as const;

type Corps = {
  nom?: unknown;
  email?: unknown;
  telephone?: unknown;
  entreprise?: unknown;
  service?: unknown;
  typeProjet?: unknown;
  description?: unknown;
  site?: unknown; // honeypot
  chargeA?: unknown; // timestamp de montage du formulaire, cote client
};

function texte(valeur: unknown, max: number): string {
  if (typeof valeur !== "string") return "";
  return valeur.trim().slice(0, max);
}

export async function POST(requete: Request) {
  const origine = requete.headers.get("origin");
  const origines = process.env.CONTACT_ALLOWED_ORIGINS?.split(",").map((o) => o.trim()).filter(Boolean)
    ?? (process.env.NODE_ENV === "development" ? ["http://localhost:3100", "http://127.0.0.1:3100"] : []);
  if (!origine || !origines.includes(origine)) {
    return NextResponse.json({ erreurGenerique: true }, { status: 403 });
  }
  if (!requete.headers.get("content-type")?.startsWith("application/json")) {
    return NextResponse.json({ erreurGenerique: true }, { status: 415 });
  }
  let corps: Corps;
  try {
    const contenu = await requete.text();
    if (contenu.length > 32_000) {
      return NextResponse.json({ erreurGenerique: true }, { status: 413 });
    }
    const valeur: unknown = JSON.parse(contenu);
    if (!valeur || typeof valeur !== "object" || Array.isArray(valeur)) {
      return NextResponse.json({ erreurGenerique: true }, { status: 400 });
    }
    corps = valeur as Corps;
  } catch {
    return NextResponse.json({ erreurGenerique: true }, { status: 400 });
  }

  // HONEYPOT — rejet generique, sans traiter ni transmettre de donnees.
  if (texte(corps.site, 200)) {
    return NextResponse.json({ erreurGenerique: true }, { status: 400 });
  }

  // ANTI-SPAM PAR DELAI — un formulaire rempli et soumis en moins de
  // 1.5s apres son propre montage n'a pas ete lu par un humain. Verifie
  // seulement si le client l'a fourni (fail-open : un client legitime
  // qui omettrait ce champ n'est jamais bloque pour autant).
  const chargeA = typeof corps.chargeA === "number" ? corps.chargeA : null;
  if (chargeA !== null && Date.now() - chargeA < 1500) {
    return NextResponse.json({ erreurGenerique: true }, { status: 429 });
  }

  const donnees = {
    nom: texte(corps.nom, LIMITES.nom),
    email: texte(corps.email, LIMITES.email),
    telephone: texte(corps.telephone, LIMITES.telephone),
    entreprise: texte(corps.entreprise, LIMITES.entreprise),
    service: texte(corps.service, LIMITES.service),
    typeProjet: texte(corps.typeProjet, LIMITES.typeProjet),
    description: texte(corps.description, LIMITES.description),
  };

  // VALIDATION SERVEUR — la seule qui compte reellement. Memes regles
  // que le client (voir Contact.tsx), mais RE-VERIFIEES ici : le client
  // peut toujours etre contourne (devtools, requete directe, script).
  const erreurs: Record<string, boolean> = {};
  for (const [champ, max] of Object.entries(LIMITES)) {
    const valeur = corps[champ as keyof typeof LIMITES];
    if (typeof valeur === "string" && valeur.trim().length > max) erreurs[champ] = true;
  }
  if (!donnees.nom) erreurs.nom = true;
  if (!donnees.email || !EMAIL_RE.test(donnees.email) || /[\r\n]/.test(donnees.email)) erreurs.email = true;
  if (!donnees.service || !SERVICES_AUTORISES.has(donnees.service)) erreurs.service = true;
  if (!donnees.description) erreurs.description = true;

  if (Object.keys(erreurs).length > 0) {
    return NextResponse.json({ erreurs }, { status: 400 });
  }

  const motDePasse = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  if (!motDePasse) {
    return NextResponse.json({ erreurGenerique: true }, { status: 503 });
  }
  if (!limiter(donnees.email)) {
    return NextResponse.json({ erreurGenerique: true }, { status: 429 });
  }
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com", port: 465, secure: true,
    auth: { user: DESTINATAIRE, pass: motDePasse },
    connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 20_000,
    disableFileAccess: true, disableUrlAccess: true,
  });
  try {
    const resultat = await transport.sendMail({
      from: { name: "Alfred Winner Services", address: DESTINATAIRE },
      to: DESTINATAIRE,
      replyTo: donnees.email,
      subject: `Nouveau projet AWS — ${donnees.service}`,
      text: [
        `Nom & prénom : ${donnees.nom}`, `Email : ${donnees.email}`,
        `Téléphone / WhatsApp : ${donnees.telephone || "—"}`,
        `Entreprise : ${donnees.entreprise || "—"}`,
        `Service recherché : ${donnees.service}`,
        `Type de projet : ${donnees.typeProjet || "—"}`,
        "", "Description du projet :", donnees.description,
      ].join("\n"),
    });
    if (!resultat.accepted.some((adresse) => String(adresse).toLowerCase() === DESTINATAIRE)) {
      return NextResponse.json({ erreurGenerique: true }, { status: 502 });
    }
    // Acceptation SMTP uniquement : la reception en boite doit etre verifiee.
    return NextResponse.json({ livraison: "envoye" }, { status: 200 });
  } catch {
    // Ne jamais exposer identifiants, reponse SMTP ou donnees personnelles.
    return NextResponse.json({ erreurGenerique: true }, { status: 502 });
  } finally {
    transport.close();
  }
}
