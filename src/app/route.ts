// La racine ne rend aucune page : les pages localisées possèdent leur propre layout racine.
export function GET(request: Request) {
  return Response.redirect(new URL("/fr", request.url), 307);
}
