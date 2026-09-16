"use client";
import { ChalkCard } from "@/components/chalk-scenes";

export function ExperimentVisual({ slug, compact = false }: { slug: string; compact?: boolean }) {
  return <ChalkCard scene={slug} className={compact?"compact":""}/>;
}
