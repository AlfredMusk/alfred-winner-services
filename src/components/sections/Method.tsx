/* Aucun "use client" : section entierement statique, 0 JavaScript envoye.

   Pas d'animation non plus. Une apparition au scroll couterait un
   Client Component (donc du JS, donc de l'hydratation) pour un gain nul :
   la section se lit deja d'un coup. Le cahier des charges autorise a ne
   rien animer si l'animation n'apporte rien — c'est le cas. */
import { Fragment } from "react";
import type { MethodeDictionary } from "@/i18n/dictionaries";

export default function Method({ dict }: { dict: MethodeDictionary }) {
  const dernierIndex = dict.etapes.length - 1;

  return (
    <section aria-labelledby="methode-titre" className="bg-aws-surface">
      {/* Meme container que la navbar, le Hero et Notre approche. */}
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        {/* TRANSITION avec Notre approche (fond blanc juste au-dessus).
            Deux signaux, tous deux tres discrets, qui se renforcent :
            1. le fond passe de blanc a aws-surface (5 unites RVB — sous
               le seuil de perception directe, mais suffisant en peripherie) ;
            2. un filet aws-ink/18, le meme langage que les separateurs
               entre etapes plus bas.
            Aucun bloc, aucune couleur vive : la rupture se sent, elle ne
            se remarque pas. */}
        <div className="border-t border-aws-ink/18 py-12 sm:py-14 desk:py-16">

          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-aws-blue-text">
            {dict.eyebrow}
          </p>

          {/* LE GRAND TITRE — il n'est pas stocke comme une chaine : il est
              reconstruit a partir des quatre etapes. Le titre EST la
              sequence de la methode.

              Presence renforcee par rapport a la premiere version :
              extrabold (800, la meme graisse que le repere ACIM etudie),
              interligne resserre a 1.08 (proche du H1 du Hero), tracking
              plus negatif. Verifie a chaque largeur : le titre tient sur
              UNE ligne des 1100px, avant de se replier naturellement sur
              mobile — aucune limite de largeur ne le compresse.

              Coupure de ligne. Chaque groupe "mot + fleche" est en
              whitespace-nowrap : une fleche ne peut jamais se retrouver
              orpheline en debut de ligne. Mais deux spans colles n'offrent
              AUCUNE occasion de couper — le titre deviendrait une seule
              ligne insecable et deborderait sur mobile. D'ou l'espace
              explicite rendu entre les groupes : c'est la, et uniquement
              la, que la ligne peut se casser.

              Les fleches sont decoratives, plus legeres que les mots
              (font-light) pour rester un rythme et non un signal
              concurrent : l'ordre est deja porte par la liste numerotee
              juste en dessous. */}
          <h2
            id="methode-titre"
            className="mt-5 text-[1.875rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-aws-hero sm:text-[2.375rem] desk:text-[2.75rem]"
          >
            {dict.etapes.map((e, i) => (
              <Fragment key={e.num}>
                <span className="whitespace-nowrap">
                  {e.cle}
                  {i < dernierIndex && (
                    <span
                      aria-hidden="true"
                      className="pl-[0.22em] align-[0.02em] text-[0.72em] font-light text-aws-blue-text"
                    >
                      →
                    </span>
                  )}
                </span>
                {i < dernierIndex ? " " : null}
              </Fragment>
            ))}
          </h2>

          {/* L'intro est volontairement plus etroite que la section : elle
              introduit, elle ne developpe pas. Contraste renforce (ink/85
              contre /80) : la premiere version manquait de presence face
              au titre desormais plus fort. Reste sous aws-hero (le
              complement de chaque etape) pour ne pas inverser la
              hierarchie : intro < titre d'etape < mot-cle. */}
          <p className="mt-4 max-w-[58ch] text-[0.9375rem] leading-[1.65] text-aws-ink/85 desk:text-[1rem]">
            {dict.paragraphe}
          </p>

          {/* LES QUATRE ETAPES — une seule composition verticale.

              <ol> et non <ul> : l'ordre porte du sens ici, contrairement
              aux trois univers de Notre approche qui sont simultanes.

              Chaque etape est une ligne flex :
                repere numerote   shrink-0  -> largeur fixe, jamais ecrase
                contenu           flex-1    -> occupe le reste de la ligne

              flex-1 sur le contenu (et non flex-grow:0 comme avant) : la
              LIGNE utilise desormais tout le container, meme si le texte
              qu'elle porte reste borne en lecture. Le filet de separation
              en bas de chaque <li> couvrait deja toute la largeur — c'est
              la boite du contenu qui, elle, s'arretait a la largeur de son
              texte. Container large et paragraphe large sont deux choses
              differentes : on corrige la premiere sans toucher la seconde.

              min-w-0 n'est pas decoratif : par defaut un enfant flex a
              min-width:auto, ce qui l'empeche de devenir plus petit que
              son mot le plus long. Sans lui, un mot long pousserait la
              ligne au-dela du container.

              Separateurs : border-b sur toutes les etapes SAUF la
              derniere, en aws-ink/18 — le meme filet que la transition
              au-dessus. Trois filets pour quatre etapes : une ligne apres
              la derniere fermerait la section comme une boite. */}
          <ol className="mt-10 desk:mt-12">
            {dict.etapes.map((e, i) => (
              <li
                key={e.num}
                className={
                  "flex items-start gap-5 py-6 sm:gap-6 desk:gap-7 desk:py-7 " +
                  (i < dernierIndex ? "border-b border-aws-ink/18" : "")
                }
              >
                {/* Le repere : disque bleu tres legerement teinte, chiffre
                    dans le bleu profond du Hero. Le bleu clair aurait
                    chute a 8.23-8.48 de contraste ici — encore largement
                    suffisant en verite, mais le bleu profond (9.95) est
                    reserve pour rester coherent avec le titre et le
                    complement de chaque etape, qui partagent tous la
                    meme couleur "forte" du systeme.

                    Taille 36px (montee depuis 32) et teinte de fond
                    portee a 12% (depuis 10%) : plus de presence, sans
                    devenir un badge — la consigne explicite du cahier
                    des charges.

                    Correction optique verticale. Avec items-start, un
                    disque se centre sur LUI-MEME, pas sur la ligne de
                    titre d'a cote. L'ecart theorique (disque - interligne
                    du h3) / 2 vaut 6.31px en mobile, 4.94px en tablette,
                    4.25px en desktop — l'interligne du h3 grandit a
                    chaque breakpoint. Une seule marge negative ne peut
                    pas annuler les trois a la fois : on choisit la valeur
                    qui minimise l'ecart maximal residuel (5px, soit la
                    moyenne ponderee des trois), verifiee ensuite en
                    mesurant le rendu reel a chaque largeur plutot qu'en
                    se fiant au calcul seul.

                    Le chiffre n'est pas masque aux lecteurs d'ecran :
                    Tailwind retire les puces natives de <ol>, et certains
                    navigateurs cessent alors d'annoncer la liste comme une
                    liste. Le numero reste la garantie que l'ordre passe. */}
                <span className="-mt-[0.3125rem] flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-aws-blue-text/12 text-[0.8125rem] font-bold tabular-nums text-aws-hero">
                  {e.num}
                </span>

                <div className="min-w-0 flex-1">
                  {/* Aucune couleur sur le h3 lui-meme : chaque fragment
                      porte la sienne. Deux classes de couleur sur un meme
                      element ont la meme specificite, et c'est alors
                      l'ordre de la feuille generee qui tranche.

                      Les espaces entre les fragments sont EXPLICITES et
                      places hors du tiret decoratif. L'algorithme accname
                      retire les noeuds aria-hidden, et n'ajoute d'espace
                      qu'autour des elements non-inline. Ici les trois
                      fragments sont inline : sans ces espaces, un lecteur
                      d'ecran annoncait "COMPRENDREClarifier avant d'agir".
                      Le padding du tiret passe de 8 a 4px pour compenser
                      la chasse des espaces ajoutes. */}
                  <h3 className="max-w-[39.75rem] text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em] sm:text-[1.1875rem] desk:text-[1.25rem]">
                    <span className="uppercase tracking-[0.04em] text-aws-blue-text">
                      {e.cle}
                    </span>{" "}
                    <span aria-hidden="true" className="px-1 text-aws-ink/25">
                      —
                    </span>{" "}
                    <span className="text-aws-hero">{e.titre}</span>
                  </h3>

                  {/* Mesure elargie depuis la premiere version (58ch/576px)
                      a 39.75rem = 636px : une largeur visiblement plus
                      genereuse, qui utilise mieux la ligne desormais large
                      (flex-1 ci-dessus).

                      PIEGE evite : "ch" depend de la taille de police de
                      l'element qui le porte. Le h3 (17-20px selon le point de
                      rupture) et cette description (15px fixe) n'ont pas la
                      meme taille — un meme "64ch" sur les deux donnait 861px
                      pour le h3 contre 636px ici : le titre s'etirait 226px
                      au-dela de sa propre description. Mesure, pas suppose.
                      Corrige avec une largeur ABSOLUE (rem) partagee par les
                      deux : le bord droit du titre et celui de la description
                      coincident desormais a chaque point de rupture, quelle
                      que soit la taille de police du h3.

                      Chiffre honnete sur la lecture, pas suppose : simule par
                      decoupe de mots (canvas + retour a la ligne greedy, meme
                      police/graisse que le rendu reel), pas par une moyenne
                      caracteres/lignes qui masque la PIRE ligne. Resultat
                      mesure sur les 4 descriptions FR a cette largeur : pire
                      cas 85 caracteres sur une seule ligne (l'etape la plus
                      longue), les trois autres entre 62 et 80 — au-dela des
                      45-75 "confortables" du classique de la lecture web.
                      Compromis assume : la demande explicite est d'elargir la
                      ligne, et ACIM (la reference) va lui-meme bien au-dela
                      (~120-140 caracteres mesures sur sa propre section
                      methode), pour un texte court (2-3 lignes) lu une fois,
                      pas parcouru en continu. */}
                  <p className="mt-2 max-w-[39.75rem] text-[0.9375rem] leading-[1.65] text-aws-ink/80">
                    {e.texte}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
