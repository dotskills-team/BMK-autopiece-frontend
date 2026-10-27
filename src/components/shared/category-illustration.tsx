import type { CategoryIconKey } from "@/types";
import { cn } from "@/lib/utils";

// Original line illustrations for each product family.
// Used as category icons and as product placeholders ("Image d'illustration")
// until real, licensed photos are available.

const paths: Record<CategoryIconKey, React.ReactNode> = {
  eclairage: (
    <>
      <path d="M6 30c0-9 9-16 22-16h18c7 0 12 6 12 14v4c0 8-5 14-12 14H28C15 46 6 39 6 30Z" />
      <circle cx="42" cy="30" r="8" />
      <circle cx="42" cy="30" r="3" />
      <path d="M14 24h12M12 30h12M14 36h12" />
    </>
  ),
  retroviseur: (
    <>
      <path d="M10 18c0-4 3-6 7-6h26c6 0 11 5 11 11v8c0 6-5 11-11 11H22c-7 0-12-5-12-12V18Z" />
      <path d="M18 42l-6 10h14" />
      <path d="M18 22h24" />
    </>
  ),
  "pare-choc": (
    <>
      <path d="M4 26c8-6 20-8 28-8s20 2 28 8v10c0 4-3 6-6 6H10c-3 0-6-2-6-6V26Z" />
      <path d="M18 34h28M14 40h6M44 40h6" />
      <rect x="22" y="24" width="20" height="5" rx="2" />
    </>
  ),
  grille: (
    <>
      <rect x="8" y="18" width="48" height="28" rx="8" />
      <path d="M8 25h48M8 32h48M8 39h48M20 18v28M32 18v28M44 18v28" />
    </>
  ),
  capot: (
    <>
      <path d="M8 44 16 18h32l8 26c-8 3-16 4-24 4s-16-1-24-4Z" />
      <path d="M24 22 20 42M40 22l4 20" />
    </>
  ),
  aile: (
    <>
      <path d="M6 46V30c0-10 8-16 18-16h20l14 12v20H44a12 12 0 0 0-24 0H6Z" />
      <path d="M44 46a12 12 0 0 0-24 0" />
    </>
  ),
  vitrage: (
    <>
      <path d="M10 44 18 18h28l8 26H10Z" />
      <path d="M24 24 20 36M32 24l-3 10" />
    </>
  ),
  "cache-moteur": (
    <>
      <path d="M6 22h52l-6 22H12L6 22Z" />
      <path d="M14 30h36M18 36h28" />
      <circle cx="16" cy="26" r="1.5" />
      <circle cx="48" cy="26" r="1.5" />
    </>
  ),
  armature: (
    <>
      <rect x="6" y="16" width="52" height="32" rx="3" />
      <rect x="16" y="24" width="32" height="16" rx="2" />
      <path d="M6 32h10M48 32h10M32 16v8M32 40v8" />
    </>
  ),
  porte: (
    <>
      <path d="M12 12h26l14 16v24H12V12Z" />
      <path d="M16 16h20l10 12H16V16Z" />
      <path d="M38 36h8" />
    </>
  ),
  mecanique: (
    <>
      <rect x="10" y="12" width="44" height="40" rx="4" />
      <circle cx="32" cy="32" r="12" />
      <path d="M32 20v24M20 32h24M24 24l16 16M40 24 24 40" />
    </>
  ),
  accessoire: (
    <>
      <circle cx="32" cy="34" r="12" />
      <circle cx="32" cy="34" r="4" />
      <path d="M18 16a20 20 0 0 1 28 0M12 10a28 28 0 0 1 40 0" />
    </>
  ),
};

export function CategoryIllustration({
  icon,
  className,
  strokeWidth = 2.2,
  style,
}: {
  icon: CategoryIconKey;
  className?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      style={style}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-12 w-12", className)}
      aria-hidden
    >
      {paths[icon]}
    </svg>
  );
}
