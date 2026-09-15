/* ECHAFAUDAGE TEMPORAIRE — CE N'EST PAS LE HERO.
   Sert uniquement a donner de la hauteur pour tester la navbar collante.
   Sera entierement remplace a la phase Hero. */
export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex min-h-[70vh] items-center">
        <p className="max-w-md text-sm leading-relaxed text-aws-ink/45">
          Zone de contenu — les sections du site seront construites ici,
          une par une, apres validation de la navbar.
        </p>
      </div>
      <div className="h-[80vh]" aria-hidden="true" />
    </div>
  );
}
