"use client";
import { CollageCard } from "@/components/collage-scenes";

export function ExperimentVisual({ slug, compact = false }: { slug: string; compact?: boolean }) {
  return <CollageCard scene={slug} className={compact?"compact":""}/>;
}
