/* SOURCE UNIQUE du numero de telephone AWS.
   Il vivait jusqu'ici en quatre exemplaires (lib/seo.ts, telephoneHref FR
   et EN, href WhatsApp FR et EN) et AVAIT DEJA DIVERGE : le lien WhatsApp
   pointait sur 225748191100, soit le numero ampute de son 0.

   POURQUOI LE 0 RESTE. Depuis la reforme de la numerotation ivoirienne,
   les numeros comptent 10 chiffres et ce 0 initial fait partie du numero
   significatif — ce n'est pas un prefixe interurbain a retirer comme en
   France ou au Royaume-Uni. Le format international est donc
   225 + 0748191100, et non 225 + 748191100.

   Tout ce qui a besoin du numero le derive d'ici : aucune chaine de
   chiffres n'est reecrite a la main ailleurs dans le projet. */

/** Indicatif pays, sans le "+". */
const INDICATIF = "225";

/** Numero national significatif, 0 initial inclus, sans espaces. */
const NUMERO_NATIONAL = "0748191100";

/** Affichage humain, tel qu'Alfred le communique. */
export const telephoneAffiche = "(+225) 07 48 19 11 00";

/** Format E.164, pour les liens tel: et les donnees structurees. */
export const telephoneE164 = `+${INDICATIF}${NUMERO_NATIONAL}`;

/** Lien d'appel. */
export const telephoneHref = `tel:${telephoneE164}`;

/** Base du lien click-to-chat WhatsApp : chiffres uniquement, sans "+".
    Le message pre-rempli, lui, depend de la langue et vit dans le
    dictionnaire. */
export const whatsappBase = `https://wa.me/${INDICATIF}${NUMERO_NATIONAL}`;
