"use client";

/* PROJECT INTAKE — remplace l'ancien formulaire court (nom/entreprise/
   contact/service/message) qui n'etait de toute facon plus rendu sur la
   page. Celui-ci l'est : c'est desormais la derniere etape du parcours
   avant le Footer (Vision -> Fondateur -> CTA -> ce formulaire ->
   coordonnees dans le Footer).

   HONNETETE DU BACKEND — pas de fausse confirmation d'envoi. Ce site
   n'a aucun prestataire d'envoi d'email configure (pas de cle API
   Resend/Sendgrid, aucun secret cote serveur). Le formulaire :
     1. Valide cote CLIENT (retour immediat) ET cote SERVEUR
        (/api/contact — jamais confiance dans le client seul).
     2. Porte un champ piege ("site") invisible aux humains : un robot
        qui remplit tous les champs le remplit aussi, l'API le rejette
        silencieusement.
     3. Une fois valide, l'API repond QUEL canal de livraison est
        reellement disponible :
          - si une cle de prestataire est configuree un jour
            (CONTACT_PROVIDER_API_KEY, jamais commitee), le message
            est reellement envoye -> etat "succesEnvoye" ;
          - sinon (le cas aujourd'hui), l'API renvoie les donnees
            validees et le CLIENT ouvre un mailto: pre-rempli vers
            krodi2001@gmail.com -> etat "succesMailto", qui dit
            explicitement que c'est au visiteur d'appuyer sur "Envoyer"
            dans SA messagerie. Jamais "message envoye" quand ce n'est
            pas vrai. */
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import type { ContactDictionary } from "@/i18n/dictionaries";
import { boutonPrimaireClair } from "@/components/ui/boutons";

type Champs = {
  nom: string;
  email: string;
  telephone: string;
  entreprise: string;
  service: string;
  typeProjet: string;
  budget: string;
  echeance: string;
  description: string;
};

type Erreurs = Partial<Record<keyof Champs, string>>;

const CHAMPS_VIDES: Champs = {
  nom: "",
  email: "",
  telephone: "",
  entreprise: "",
  service: "",
  typeProjet: "",
  budget: "",
  echeance: "",
  description: "",
};

type Etat = "repos" | "envoi" | "succes-envoye" | "succes-mailto" | "erreur";

export default function Contact({ dict }: { dict: ContactDictionary }) {
  const f = dict.formulaire;
  const [champs, setChamps] = useState<Champs>({ ...CHAMPS_VIDES, service: f.serviceOptions[0] });
  const [piege, setPiege] = useState(""); // honeypot — reste vide pour un humain
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [etat, setEtat] = useState<Etat>("repos");
  const idBase = useId();
  // Deuxieme signal anti-spam, sans librairie : l'instant ou le
  // formulaire a fini de se monter. Un robot qui remplit et soumet un
  // formulaire en quelques centaines de millisecondes est un signal
  // fort — un humain ne lit/remplit jamais ce formulaire aussi vite.
  // Date.now() DANS un effet, jamais dans le corps du composant : un
  // rendu doit rester pur (regle react-hooks/purity), l'horodatage est
  // un effet de bord et n'a de sens qu'UNE fois le formulaire monte.
  const chargeA = useRef(0);
  useEffect(() => {
    chargeA.current = Date.now();
  }, []);

  const majChamp = (champ: keyof Champs) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setChamps((c) => ({ ...c, [champ]: e.target.value }));

  const validerLocalement = (): Erreurs => {
    const e: Erreurs = {};
    if (!champs.nom.trim()) e.nom = f.champObligatoire;
    if (!champs.email.trim()) e.email = f.champObligatoire;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(champs.email)) e.email = f.champEmailInvalide;
    if (!champs.service.trim()) e.service = f.champObligatoire;
    if (!champs.description.trim()) e.description = f.champObligatoire;
    return e;
  };

  const soumettre = async (e: FormEvent) => {
    e.preventDefault();
    const erreursLocales = validerLocalement();
    setErreurs(erreursLocales);
    if (Object.keys(erreursLocales).length > 0) {
      setEtat("erreur");
      return;
    }

    setEtat("envoi");
    try {
      const reponse = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...champs, site: piege, chargeA: chargeA.current }),
      });
      const donnees = await reponse.json();

      if (!reponse.ok) {
        if (donnees?.erreurs) setErreurs(donnees.erreurs);
        setEtat("erreur");
        return;
      }

      if (donnees.livraison === "envoye") {
        setEtat("succes-envoye");
        return;
      }

      // Pas de prestataire configure : le SERVEUR a valide/nettoye les
      // donnees et les renvoie telles quelles — c'est sur CE texte
      // valide que le mailto: est construit, jamais sur l'etat local
      // brut du formulaire.
      const d = donnees.donnees as Champs;
      const sujet = `Nouveau projet — ${d.service}`;
      const corps = [
        `Nom : ${d.nom}`,
        `Email : ${d.email}`,
        d.telephone ? `Téléphone / WhatsApp : ${d.telephone}` : null,
        d.entreprise ? `Entreprise : ${d.entreprise}` : null,
        `Service recherché : ${d.service}`,
        d.typeProjet ? `Type de projet : ${d.typeProjet}` : null,
        d.budget ? `Budget estimatif : ${d.budget}` : null,
        d.echeance ? `Échéance souhaitée : ${d.echeance}` : null,
        "",
        d.description,
      ]
        .filter((ligne) => ligne !== null)
        .join("\n");
      const mailto = `mailto:krodi2001@gmail.com?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
      // <a> detache + .click(), pas window.location.href : ESLint
      // (no-location-assign-relative-destination) presume sinon une
      // navigation interne Next.js pour un protocole mailto:.
      const lien = document.createElement("a");
      lien.href = mailto;
      lien.click();
      setEtat("succes-mailto");
    } catch {
      setEtat("erreur");
    }
  };

  const champBase =
    "w-full rounded-xl border border-aws-line bg-aws-surface px-4 py-3 text-[0.9375rem] text-aws-ink placeholder:text-aws-ink/40 focus-visible:border-aws-blue-text focus-visible:bg-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-aws-blue-text";
  const champErreur = "border-red-400 focus-visible:border-red-500 focus-visible:outline-red-500";
  const labelBase = "text-[0.8125rem] font-semibold text-aws-ink/80";

  const idPour = (champ: string) => `${idBase}-${champ}`;
  const idErreurPour = (champ: string) => `${idBase}-${champ}-erreur`;

  const champProps = (champ: keyof Champs) => ({
    id: idPour(champ),
    value: champs[champ],
    onChange: majChamp(champ),
    "aria-invalid": erreurs[champ] ? ("true" as const) : undefined,
    "aria-describedby": erreurs[champ] ? idErreurPour(champ) : undefined,
    className: `mt-1.5 ${champBase} ${erreurs[champ] ? champErreur : ""}`,
  });

  const envoiEnCours = etat === "envoi";
  const succes = etat === "succes-envoye" || etat === "succes-mailto";

  return (
    <section id="contact" aria-labelledby="contact-titre" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        <div className="border-t border-aws-line py-12 sm:py-14 desk:py-16">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-aws-blue-text">
            {dict.eyebrow}
          </p>
          <h2
            id="contact-titre"
            className="mt-4 max-w-[28ch] text-balance text-[1.6875rem] font-bold leading-[1.15] tracking-[-0.02em] text-aws-hero sm:text-[1.9375rem] desk:text-[2.25rem]"
          >
            {dict.titre}
          </h2>
          <p className="mt-3 max-w-[58ch] text-[0.9375rem] leading-[1.65] text-aws-ink/80 desk:text-[1rem]">
            {dict.sousTitre}
          </p>

          {succes ? (
            // ETAT DE SUCCES — un seul, mais deux textes possibles selon
            // le canal REEL (voir commentaire d'entete). role="status" :
            // annonce aux lecteurs d'ecran sans voler le focus.
            <div
              role="status"
              className="mt-10 max-w-[46rem] rounded-2xl border border-aws-line bg-aws-surface p-6 sm:p-8"
            >
              <p className="text-[1.0625rem] font-semibold text-aws-hero">
                {etat === "succes-envoye" ? f.succesEnvoye : f.succesMailto}
              </p>
            </div>
          ) : (
            <form onSubmit={soumettre} noValidate className="mt-10 max-w-[46rem] space-y-5 desk:mt-12">
              {/* Champ piege — hors ecran, jamais display:none (que les
                  lecteurs d'ecran et certains robots respectent), et
                  jamais atteint au clavier. */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={piege}
                onChange={(e) => setPiege(e.target.value)}
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
              />

              {etat === "erreur" && (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[0.875rem] font-medium text-red-700">
                  {Object.keys(erreurs).length > 0 ? f.erreurValidation : f.erreurGenerique}
                </p>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className={labelBase}>
                    {f.nom} <span aria-hidden="true">*</span>
                  </span>
                  <input type="text" required {...champProps("nom")} />
                  {erreurs.nom && (
                    <p id={idErreurPour("nom")} className="mt-1 text-[0.8125rem] text-red-600">
                      {erreurs.nom}
                    </p>
                  )}
                </label>
                <label className="block">
                  <span className={labelBase}>
                    {f.email} <span aria-hidden="true">*</span>
                  </span>
                  <input type="email" required {...champProps("email")} />
                  {erreurs.email && (
                    <p id={idErreurPour("email")} className="mt-1 text-[0.8125rem] text-red-600">
                      {erreurs.email}
                    </p>
                  )}
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className={labelBase}>{f.telephone}</span>
                  <input type="tel" {...champProps("telephone")} />
                </label>
                <label className="block">
                  <span className={labelBase}>{f.entreprise}</span>
                  <input type="text" {...champProps("entreprise")} />
                </label>
              </div>

              <label className="block">
                <span className={labelBase}>
                  {f.service} <span aria-hidden="true">*</span>
                </span>
                <select required {...champProps("service")}>
                  {f.serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {erreurs.service && (
                  <p id={idErreurPour("service")} className="mt-1 text-[0.8125rem] text-red-600">
                    {erreurs.service}
                  </p>
                )}
              </label>

              <label className="block">
                <span className={labelBase}>{f.typeProjet}</span>
                <input type="text" {...champProps("typeProjet")} />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className={labelBase}>
                    {f.budget} <span className="font-normal text-aws-ink/50">{f.optionnel}</span>
                  </span>
                  <input type="text" {...champProps("budget")} />
                </label>
                <label className="block">
                  <span className={labelBase}>{f.echeance}</span>
                  <select {...champProps("echeance")}>
                    <option value="" />
                    {f.echeanceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className={labelBase}>
                  {f.description} <span aria-hidden="true">*</span>
                </span>
                <textarea required rows={5} {...champProps("description")} className={`${champProps("description").className} resize-y`} />
                {erreurs.description && (
                  <p id={idErreurPour("description")} className="mt-1 text-[0.8125rem] text-red-600">
                    {erreurs.description}
                  </p>
                )}
              </label>

              <button type="submit" disabled={envoiEnCours} className={`${boutonPrimaireClair} disabled:opacity-60`}>
                {envoiEnCours ? f.envoiEnCours : f.cta}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
