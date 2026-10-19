"use client";

import type { ImageLoaderProps } from "next/image";
import manifest from "./image-variants.json";

// Generated static WebP assets let Workers serve the correct size without
// a paid image binding or a server-side conversion on every request.
export default function imageLoader({ src, width }: ImageLoaderProps): string {
  const variants = (manifest as Record<string, { width: number; src: string }[]>)[src];
  if (!variants) return src;
  return (variants.find((variant) => variant.width >= width) ?? variants[variants.length - 1]).src;
}
