import { CollageCard } from "@/components/collage-card";

export function ExperimentVisual({
  slug,
  compact = false,
  priority = false,
}: {
  slug: string;
  compact?: boolean;
  priority?: boolean;
}) {
  return <CollageCard scene={slug} className={compact ? "compact" : ""} priority={priority} />;
}
