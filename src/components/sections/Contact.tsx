"use client";

/* Seul "use client" de cette vague de sections : le formulaire a besoin
   d'etat (les champs) et d'un gestionnaire d'evenement (la soumission).
   Tout le reste du contenu (adresse, telephone, email) pourrait rester
   serveur, mais scinder le composant pour si peu de texte statique
   aurait complique l'architecture sans reel benefice de performance. */
import { useState, type FormEvent } from "react";
import type { ContactDictionary } from "@/i18n/dictionaries";
import { boutonPrimaireClair, fleche } from "@/components/ui/boutons";
import { IconeLieu, IconeTelephone, IconeEmail } from "@/components/ui/icones";

/* NON RENDU sur la homepage depuis la passe "structure editoriale" —
   les informations de contact vivent desormais dans le Footer, dans
   l'esprit ACIM. Ce composant reste fonctionnel et intact pour un usage
   futur (page /contact dediee, par exemple) — voir travaux realises.md. */
export default function Contact({ dict }: { dict: ContactDictionary }) {
  const [nom, setNom] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [contactPref, setContactPref] = useState("");
  const [service, setService] = useState(dict.formulaire.serviceOptions[0]);
  const [message, setMessage] = useState("");

  /* Pas de backend, pas de cle API, pas de fausse confirmation d'envoi :
     le formulaire construit un mailto: avec les champs deja remplis et
     ouvre le client mail du visiteur. C'est LUI qui envoie, depuis sa
     propre adresse — rien ne transite par un serveur AWS.
     Si un jour un envoi cote serveur est prefere (Resend, Formspree...),
     ce choix de prestataire revient a Alfred : voir travaux realises.md. */
  const envoyer = (e: FormEvent) => {
    e.preventDefault();
    const sujet = `Nouvelle demande — ${service}`;
    const corps = [
      `Nom : ${nom}`,
      entreprise ? `Entreprise : ${entreprise}` : null,
      `Contact : ${contactPref}`,
      `Service : ${service}`,
      "",
      message,
    ]
      .filter((ligne) => ligne !== null)
      .join("\n");
    const mailto = `${dict.emailMailtoHref}?subject=${encodeURIComponent(
      sujet,
    )}&body=${encodeURIComponent(corps)}`;
    // Un lien <a> declenche, pas une affectation a window.location.href :
    // ESLint (regle no-location-assign-relative-destination) suppose sinon
    // une navigation interne Next.js, alors qu'il s'agit d'un protocole
    // mailto: construit au moment de l'envoi.
    const lien = document.createElement("a");
    lien.href = mailto;
    lien.click();
  };

  /* V2 — fond aws-surface (au lieu de blanc sur blanc) : les champs se
     distinguent desormais de la section sans avoir besoin d'une bordure
     plus lourde. Rayon porte a rounded-xl, coherent avec les cartes
     Expertises/Projets. */
  const champBase =
    "w-full rounded-xl border border-aws-line bg-aws-surface px-4 py-3 text-[0.9375rem] text-aws-ink placeholder:text-aws-ink/40 focus-visible:border-aws-blue-text focus-visible:bg-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-aws-blue-text";
  const labelBase = "text-[0.8125rem] font-semibold text-aws-ink/80";

  return (
    <section id="contact" aria-labelledby="contact-titre" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        <div className="border-t border-aws-line py-12 sm:py-14 desk:py-16">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-aws-blue-text">
            {dict.eyebrow}
          </p>
          <h2
            id="contact-titre"
            className="mt-4 max-w-[20ch] text-balance text-[1.6875rem] font-bold leading-[1.15] tracking-[-0.02em] text-aws-hero sm:text-[1.9375rem] desk:text-[2.25rem]"
          >
            {dict.titre}
          </h2>

          <div className="mt-10 flex flex-col gap-8 desk:mt-12 desk:flex-row desk:gap-12">
            {/* COLONNE INFOS — carte off-white, largeur fixe, ne s'ecrase
                jamais. Chaque ligne porte un pictogramme identifiant le
                type de contact, meme famille que le reste du site. */}
            <div className="rounded-2xl border border-aws-line bg-aws-surface p-6 desk:w-[22rem] desk:shrink-0 desk:p-8">
              <dl className="space-y-6">
                <div className="flex gap-3.5">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-aws-hero">
                    {IconeLieu}
                  </span>
                  <div>
                    <dt className={labelBase}>{dict.adresseLabel}</dt>
                    <dd className="mt-1 text-[0.9375rem] leading-[1.6] text-aws-ink/85">
                      {dict.adresse}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3.5">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-aws-hero">
                    {IconeTelephone}
                  </span>
                  <div>
                    <dt className={labelBase}>{dict.telephoneLabel}</dt>
                    <dd className="mt-1">
                      <a
                        href={dict.telephoneHref}
                        className="text-[0.9375rem] font-semibold text-aws-hero hover:text-aws-blue-text"
                      >
                        {dict.telephone}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3.5">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-aws-hero">
                    {IconeEmail}
                  </span>
                  <div>
                    <dt className={labelBase}>{dict.emailLabel}</dt>
                    <dd className="mt-1">
                      <a
                        href={dict.emailMailtoHref}
                        className="text-[0.9375rem] font-semibold text-aws-hero hover:text-aws-blue-text"
                      >
                        {dict.email}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            {/* COLONNE FORMULAIRE */}
            <form onSubmit={envoyer} className="flex-1 space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className={labelBase}>{dict.formulaire.nom}</span>
                  <input
                    type="text"
                    required
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className={`mt-1.5 ${champBase}`}
                  />
                </label>
                <label className="block">
                  <span className={labelBase}>{dict.formulaire.entreprise}</span>
                  <input
                    type="text"
                    value={entreprise}
                    onChange={(e) => setEntreprise(e.target.value)}
                    className={`mt-1.5 ${champBase}`}
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className={labelBase}>{dict.formulaire.contactPref}</span>
                  <input
                    type="text"
                    required
                    value={contactPref}
                    onChange={(e) => setContactPref(e.target.value)}
                    className={`mt-1.5 ${champBase}`}
                  />
                </label>
                <label className="block">
                  <span className={labelBase}>{dict.formulaire.service}</span>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={`mt-1.5 ${champBase}`}
                  >
                    {dict.formulaire.serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className={labelBase}>{dict.formulaire.message}</span>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`mt-1.5 resize-y ${champBase}`}
                />
              </label>

              <div>
                <button type="submit" className={boutonPrimaireClair}>
                  {dict.formulaire.cta}
                  {fleche}
                </button>
                <p className="mt-3 max-w-[46ch] text-[0.8125rem] leading-[1.5] text-aws-ink/70">
                  {dict.formulaire.note}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
