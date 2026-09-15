/* proxy.ts — ATTENTION : en Next.js 16 ce fichier s'appelle "proxy",
   PAS "middleware". Verifie dans la doc embarquee :
   node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md
   « Starting with Next.js 16, Middleware is now called Proxy ».
   Un fichier nomme middleware.ts ne serait tout simplement pas execute.

   Role : toute URL sans prefixe de langue est redirigee vers la langue
   par defaut. /projets -> /fr/projets, / -> /fr */

import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/dictionaries";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const aDejaUneLangue = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (aDejaUneLangue) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  /* On ignore les routes internes de Next, l'API, et tout chemin
     contenant un point (donc les fichiers : .png, .svg, .ico...). */
  matcher: ["/((?!_next|api|.*\\.).*)"],
};
