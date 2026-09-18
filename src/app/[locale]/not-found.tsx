"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { boutonPrimaireClair } from "@/components/ui/boutons";

export default function NotFound() {
  const english = usePathname()?.startsWith("/en/");
  return (
    <section className="mx-auto max-w-[860px] px-4 py-20 sm:px-6">
      <p className="text-sm font-semibold text-aws-blue-text">404</p>
      <h1 className="mt-4 text-3xl font-bold text-aws-hero">
        {english ? "Page not found" : "Page introuvable"}
      </h1>
      <p className="mt-5 text-aws-ink">
        {english ? "This page does not exist or has moved." : "Cette page n'existe pas ou a été déplacée."}
      </p>
      <Link href={english ? "/en" : "/fr"} className={`mt-8 ${boutonPrimaireClair}`}>
        {english ? "Return to home" : "Revenir à l'accueil"}
      </Link>
    </section>
  );
}
