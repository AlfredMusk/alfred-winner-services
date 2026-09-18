"use client";

// Envoi serveur uniquement. Aucun succes avant acceptation SMTP.
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
  description: "",
};

// Preselection du service depuis Expertises ("Discuter de ce service" ->
// ?service=<hash>#contact) : le hash de chaque pole (deja utilise comme
// ancre de section) sert de cle, dans le meme ordre que
// formulaire.serviceOptions — evite d'ajouter un champ de dictionnaire
// rien que pour ce mapping.
const INDEX_SERVICE_PAR_HASH: Record<string, number> = {
  "bourse-finance": 0,
  immobilier: 1,
  "software-ia": 2,
};

type Etat = "repos" | "envoi" | "succes-envoye" | "erreur";

export default function Contact({ dict }: { dict: ContactDictionary }) {
  const f = dict.formulaire;
  const [champs, setChamps] = useState<Champs>({ ...CHAMPS_VIDES, service: f.serviceOptions[0] });
  const [piege, setPiege] = useState(""); // honeypot — reste vide pour un humain
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [etat, setEtat] = useState<Etat>("repos");
  const soumissionEnCours = useRef(false);
  const resultatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (etat === "succes-envoye") {
      resultatRef.current?.focus();
      resultatRef.current?.scrollIntoView({ block: "center" });
    }
  }, [etat]);
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

  // Preselection venue d'Expertises ("Discuter de ce service" ->
  // ?service=<hash>#contact). Un premier essai calculait ceci dans
  // l'initialiseur paresseux de useState (evite normalement un setState
  // en effet) : VERIFIE CASSE A L'ECRAN — la page est generee
  // statiquement (SSG), donc le HTML servi selectionne toujours la
  // premiere option ; au montage React hydrate le <select> existant et
  // n'a pas force sa valeur vers l'etat client different, meme correct
  // en interne (confirme par log : l'etat calculait bien "Immobilier",
  // mais le DOM restait sur la premiere option). Le setState en effet,
  // ci-dessous, s'execute APRES l'hydratation et corrige reellement le
  // DOM — c'est le seul des deux qui fonctionne, verifie par re-test.
  useEffect(() => {
    const hash = new URLSearchParams(window.location.search).get("service");
    const index = hash ? INDEX_SERVICE_PAR_HASH[hash] : undefined;
    const service = index !== undefined ? f.serviceOptions[index] : undefined;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- necessaire : voir commentaire ci-dessus (contournement d'un vrai probleme d'hydratation de <select>, pas une simplification evitable)
    if (service) setChamps((c) => ({ ...c, service }));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- lecture unique au montage, f.serviceOptions vient des props initiales
  }, []);


  const majChamp = (champ: keyof Champs) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setChamps((c) => ({ ...c, [champ]: e.target.value }));

  const validerLocalement = (): Erreurs => {
    const e: Erreurs = {};
    if (!champs.nom.trim()) e.nom = f.champObligatoire;
    if (!champs.email.trim()) e.email = f.champObligatoire;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(champs.email.trim())) e.email = f.champEmailInvalide;
    if (!champs.service.trim()) e.service = f.champObligatoire;
    if (!champs.description.trim()) e.description = f.champObligatoire;
    return e;
  };

  const focaliserErreur = (erreursChamps: Erreurs) => {
    const premier = Object.keys(erreursChamps)[0];
    const champ = premier ? document.getElementById(`${idBase}-${premier}`) : null;
    champ?.focus();
    champ?.scrollIntoView({ block: "center" });
  };

  const soumettre = async (e: FormEvent) => {
    e.preventDefault();
    if (soumissionEnCours.current) return;
    const erreursLocales = validerLocalement();
    setErreurs(erreursLocales);
    if (Object.keys(erreursLocales).length > 0) {
      setEtat("erreur");
      focaliserErreur(erreursLocales);
      return;
    }

    soumissionEnCours.current = true;
    setEtat("envoi");
    try {
      const reponse = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...champs, site: piege, chargeA: chargeA.current }),
      });
      const donnees = await reponse.json();

      if (!reponse.ok) {
        if (donnees?.erreurs) {
          const erreursServeur: Erreurs = {};
          for (const champ of Object.keys(CHAMPS_VIDES) as (keyof Champs)[]) {
            if (donnees.erreurs[champ]) erreursServeur[champ] = f.erreurValidation;
          }
          setErreurs(erreursServeur);
          focaliserErreur(erreursServeur);
        }
        setEtat("erreur");
        return;
      }

      if (donnees.livraison === "envoye") {
        setEtat("succes-envoye");
        return;
      }

      setEtat("erreur");
    } catch {
      setEtat("erreur");
    } finally {
      soumissionEnCours.current = false;
    }
  };

  const champBase =
    "w-full rounded-xl border border-[#8592a5] bg-aws-surface px-4 py-3 text-[1rem] text-aws-ink placeholder:text-aws-ink/40 focus-visible:border-aws-blue-text focus-visible:bg-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-aws-blue-text";
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
  const succes = etat === "succes-envoye";

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
            // Le focus suit le resultat lorsque le formulaire disparait.
            <div
              ref={resultatRef}
              tabIndex={-1}
              role="status"
              className="mt-10 max-w-[46rem] rounded-2xl border border-aws-line bg-aws-surface p-6 sm:p-8"
            >
              <p className="text-[1.0625rem] font-semibold text-aws-hero">
                {f.succesEnvoye}
              </p>
            </div>
          ) : (
            <form onSubmit={soumettre} noValidate aria-busy={envoiEnCours} className="mt-10 max-w-[46rem] space-y-5 desk:mt-12">
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
                <div>
                  <label htmlFor={idPour("nom")} className={labelBase}>
                    {f.nom}
                  </label>
                  <input type="text" name="name" autoComplete="name" maxLength={200} required {...champProps("nom")} />
                  {erreurs.nom && (
                    <p id={idErreurPour("nom")} className="mt-1 text-[0.8125rem] text-red-600">
                      {erreurs.nom}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor={idPour("email")} className={labelBase}>
                    {f.email}
                  </label>
                  <input type="email" name="email" autoComplete="email" maxLength={200} required {...champProps("email")} />
                  {erreurs.email && (
                    <p id={idErreurPour("email")} className="mt-1 text-[0.8125rem] text-red-600">
                      {erreurs.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={idPour("telephone")} className={labelBase}>{f.telephone}</label>
                  <input type="tel" name="tel" autoComplete="tel" maxLength={40} {...champProps("telephone")} />
                </div>
                <div>
                  <label htmlFor={idPour("entreprise")} className={labelBase}>{f.entreprise}</label>
                  <input type="text" name="organization" autoComplete="organization" maxLength={200} {...champProps("entreprise")} />
                </div>
              </div>

              <div>
                <label htmlFor={idPour("service")} className={labelBase}>
                  {f.service}
                </label>
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
              </div>

              <div>
                <label htmlFor={idPour("typeProjet")} className={labelBase}>{f.typeProjet}</label>
                <input type="text" maxLength={200} {...champProps("typeProjet")} />
              </div>

              <div>
                <label htmlFor={idPour("description")} className={labelBase}>
                  {f.description}
                </label>
                <textarea required maxLength={5000} rows={5} {...champProps("description")} className={`${champProps("description").className} resize-y`} />
                {erreurs.description && (
                  <p id={idErreurPour("description")} className="mt-1 text-[0.8125rem] text-red-600">
                    {erreurs.description}
                  </p>
                )}
              </div>

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
