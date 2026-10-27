import type { CategoryIconKey, Side } from "@/types";

// Realistic product renders (SVG) used until real product photos are available.
// Each part type has its own drawing; sub-categories refine it (e.g. tail light vs headlight)
// and left/right parts are mirrored. Gradient ids are shared: identical defs, so duplicates are harmless.

export type ArtKind =
  | "headlight"
  | "taillight"
  | "foglight"
  | "indicator"
  | "platelight"
  | "drl"
  | "mirror"
  | "mirrorglass"
  | "bumper"
  | "grille"
  | "bonnet"
  | "wing"
  | "glass"
  | "undertray"
  | "reinforcement"
  | "door"
  | "radiator"
  | "sensor";

const byCategory: Record<CategoryIconKey, ArtKind> = {
  eclairage: "headlight",
  retroviseur: "mirror",
  "pare-choc": "bumper",
  grille: "grille",
  capot: "bonnet",
  aile: "wing",
  vitrage: "glass",
  "cache-moteur": "undertray",
  armature: "reinforcement",
  porte: "door",
  mecanique: "radiator",
  accessoire: "sensor",
};

const bySubCategory: Record<string, ArtKind> = {
  "phare-avant": "headlight",
  "feu-arriere": "taillight",
  "feu-antibrouillard": "foglight",
  "feu-clignotant": "indicator",
  "feu-eclaireur-de-plaque": "platelight",
  "feu-diurne": "drl",
  verre: "mirrorglass",
  "pare-brise": "glass",
  "lunette-arriere": "glass",
  "vitre-laterale": "glass",
  hayon: "door",
  porte: "door",
  radiateur: "radiator",
  condenseur: "radiator",
  intercooler: "radiator",
  "capteur-de-stationnement": "sensor",
};

export function artKindFor(icon: CategoryIconKey, subCategorySlug?: string): ArtKind {
  return (subCategorySlug && bySubCategory[subCategorySlug]) || byCategory[icon];
}

function Defs() {
  return (
    <defs>
      <linearGradient id="pa-black" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3b3b42" />
        <stop offset="0.5" stopColor="#1a1a1f" />
        <stop offset="1" stopColor="#0a0a0c" />
      </linearGradient>
      <linearGradient id="pa-chrome" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f4f5f7" />
        <stop offset="0.45" stopColor="#a9adb5" />
        <stop offset="0.55" stopColor="#d9dce1" />
        <stop offset="1" stopColor="#7d828b" />
      </linearGradient>
      <linearGradient id="pa-primer" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#d7d9dd" />
        <stop offset="0.5" stopColor="#b6b9bf" />
        <stop offset="1" stopColor="#8d9097" />
      </linearGradient>
      <linearGradient id="pa-lens" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.75" />
        <stop offset="0.35" stopColor="#ffffff" stopOpacity="0.05" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.25" />
      </linearGradient>
      <linearGradient id="pa-red" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ff4b4b" />
        <stop offset="0.5" stopColor="#c4080f" />
        <stop offset="1" stopColor="#6d0408" />
      </linearGradient>
      <linearGradient id="pa-amber" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffd08a" />
        <stop offset="0.5" stopColor="#f59316" />
        <stop offset="1" stopColor="#b35a00" />
      </linearGradient>
      <linearGradient id="pa-glass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#cfe9ec" />
        <stop offset="0.5" stopColor="#8fc1c7" />
        <stop offset="1" stopColor="#4f8a92" />
      </linearGradient>
      <linearGradient id="pa-mirror" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#eef4fb" />
        <stop offset="0.45" stopColor="#9fb3c8" />
        <stop offset="0.55" stopColor="#c9d6e3" />
        <stop offset="1" stopColor="#5d7186" />
      </linearGradient>
      <linearGradient id="pa-alu" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#9aa0a8" />
        <stop offset="0.5" stopColor="#dfe2e6" />
        <stop offset="1" stopColor="#8b9199" />
      </linearGradient>
      <radialGradient id="pa-projector" cx="0.4" cy="0.35" r="0.65">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.3" stopColor="#c8d3e0" />
        <stop offset="0.7" stopColor="#4a5260" />
        <stop offset="1" stopColor="#15171c" />
      </radialGradient>
      <radialGradient id="pa-shadow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#000" stopOpacity="0.28" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
      <pattern id="pa-mesh" width="14" height="12" patternUnits="userSpaceOnUse">
        <rect width="14" height="12" fill="#0d0d10" />
        <path d="M7 1l6 3.5v4L7 12 1 8.5v-4z" fill="#26262c" stroke="#3a3a42" strokeWidth="0.8" />
      </pattern>
      <pattern id="pa-fins" width="5" height="10" patternUnits="userSpaceOnUse">
        <rect width="5" height="10" fill="#c7cbd1" />
        <path d="M0 0l5 5-5 5" fill="none" stroke="#8d939b" strokeWidth="0.8" />
      </pattern>
    </defs>
  );
}

const Shadow = ({ cx = 200, cy = 262, rx = 150 }: { cx?: number; cy?: number; rx?: number }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry="14" fill="url(#pa-shadow)" />
);

const art: Record<ArtKind, React.ReactNode> = {
  headlight: (
    <>
      <Shadow />
      <path d="M38 168c0-46 70-82 190-88l120 4c26 2 34 26 22 54l-28 58c-8 16-22 24-42 24l-212-6c-30-1-50-20-50-46z" fill="url(#pa-black)" />
      <path d="M58 166c0-36 60-66 166-71l110 4c16 1 20 16 13 34l-24 50c-6 12-16 17-30 17l-188-5c-26-1-47-12-47-29z" fill="url(#pa-chrome)" opacity="0.9" />
      <circle cx="270" cy="150" r="36" fill="#1b1d22" />
      <circle cx="270" cy="150" r="27" fill="url(#pa-projector)" />
      <circle cx="160" cy="160" r="30" fill="#1b1d22" />
      <circle cx="160" cy="160" r="22" fill="url(#pa-projector)" />
      <path d="M80 200c60 6 150 10 230 0" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
      <path d="M80 200c60 6 150 10 230 0" stroke="#bfe0ff" strokeWidth="12" strokeLinecap="round" opacity="0.25" />
      <path d="M95 132l26-10" stroke="#f59316" strokeWidth="7" strokeLinecap="round" />
      <path d="M38 168c0-46 70-82 190-88l120 4c26 2 34 26 22 54l-28 58c-8 16-22 24-42 24l-212-6c-30-1-50-20-50-46z" fill="url(#pa-lens)" />
      <path d="M70 128c50-30 130-40 250-36" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
    </>
  ),
  taillight: (
    <>
      <Shadow />
      <path d="M48 110l250-28c34-4 54 16 52 44l-6 74c-2 22-18 34-40 34H70c-20 0-32-12-32-32z" fill="url(#pa-black)" />
      <path d="M60 116l236-26c26-3 40 12 38 34l-5 66c-2 16-12 24-28 24H76c-14 0-22-8-22-22z" fill="url(#pa-red)" />
      <path d="M70 140h240M74 168h232M80 196h214" stroke="#ff8a8a" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      <rect x="200" y="120" width="90" height="60" rx="10" fill="#2a0306" opacity="0.55" />
      <rect x="214" y="132" width="62" height="36" rx="6" fill="url(#pa-chrome)" opacity="0.8" />
      <path d="M60 116l236-26c26-3 40 12 38 34l-5 66c-2 16-12 24-28 24H76c-14 0-22-8-22-22z" fill="url(#pa-lens)" />
    </>
  ),
  foglight: (
    <>
      <Shadow rx={110} />
      <rect x="92" y="62" width="216" height="176" rx="40" fill="url(#pa-black)" />
      <circle cx="200" cy="150" r="70" fill="url(#pa-chrome)" />
      <circle cx="200" cy="150" r="58" fill="#20232a" />
      <circle cx="200" cy="150" r="48" fill="url(#pa-projector)" />
      <path d="M152 150h96M160 126h80M160 174h80" stroke="#ffffff" strokeWidth="2" opacity="0.4" />
      <circle cx="200" cy="150" r="70" fill="url(#pa-lens)" />
    </>
  ),
  indicator: (
    <>
      <Shadow rx={130} />
      <path d="M70 120c40-30 220-40 260-10 18 14 12 40-10 52-50 26-180 30-240 10-30-10-32-36-10-52z" fill="url(#pa-black)" />
      <path d="M86 126c40-24 196-32 232-8 12 9 8 26-8 34-44 22-164 26-216 9-22-7-24-24-8-35z" fill="url(#pa-amber)" />
      <path d="M110 140h180" stroke="#fff1d6" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      <path d="M86 126c40-24 196-32 232-8 12 9 8 26-8 34-44 22-164 26-216 9-22-7-24-24-8-35z" fill="url(#pa-lens)" />
    </>
  ),
  platelight: (
    <>
      <Shadow rx={110} />
      <rect x="90" y="100" width="220" height="100" rx="20" fill="url(#pa-black)" />
      <rect x="108" y="116" width="184" height="68" rx="12" fill="#f3f6fa" />
      <path d="M120 150h160" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
      <rect x="108" y="116" width="184" height="68" rx="12" fill="url(#pa-lens)" />
      <circle cx="104" cy="150" r="6" fill="url(#pa-chrome)" />
      <circle cx="296" cy="150" r="6" fill="url(#pa-chrome)" />
    </>
  ),
  drl: (
    <>
      <Shadow />
      <path d="M40 150c40-40 280-60 320-30 16 12 10 32-10 40-70 26-240 36-300 18-24-7-26-16-10-28z" fill="url(#pa-black)" />
      <path d="M70 152c70-26 210-38 270-22" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
      <path d="M70 152c70-26 210-38 270-22" stroke="#cfe8ff" strokeWidth="20" strokeLinecap="round" opacity="0.3" />
      <path d="M40 150c40-40 280-60 320-30 16 12 10 32-10 40-70 26-240 36-300 18-24-7-26-16-10-28z" fill="url(#pa-lens)" />
    </>
  ),
  mirror: (
    <>
      <Shadow rx={130} />
      <path d="M96 210l30-40h56l10 40z" fill="url(#pa-black)" />
      <path d="M112 70c70-24 190-20 230 22 22 24 16 80-14 102-40 30-150 30-196 4-40-22-60-108-20-128z" fill="url(#pa-black)" />
      <path d="M126 82c60-20 170-16 204 18 18 18 14 66-10 84-34 26-128 26-168 4-32-18-48-90-26-106z" fill="url(#pa-mirror)" />
      <path d="M150 96c40-12 110-10 150 6" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      <path d="M118 74c4-2 210-10 226 20" stroke="#6b6b75" strokeWidth="2" opacity="0.6" />
      <path d="M300 170l30-8" stroke="#f59316" strokeWidth="6" strokeLinecap="round" />
    </>
  ),
  mirrorglass: (
    <>
      <Shadow rx={130} />
      <path d="M86 92c70-30 210-26 250 16 22 24 16 76-12 98-40 30-160 30-210 4-40-22-64-96-28-118z" fill="#2a2a30" />
      <path d="M96 100c64-26 196-22 232 14 18 20 13 64-10 82-36 26-146 26-192 3-34-18-56-84-30-99z" fill="url(#pa-mirror)" />
      <path d="M126 112c50-14 130-12 176 8" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
    </>
  ),
  bumper: (
    <>
      <Shadow rx={175} />
      <path d="M22 110c10-20 60-30 178-30s168 10 178 30l-10 70c-4 26-24 40-50 42H82c-26-2-46-16-50-42z" fill="url(#pa-primer)" />
      <path d="M30 116c80-14 260-14 340 0" stroke="#eef0f2" strokeWidth="3" opacity="0.8" />
      <path d="M120 150h160l-10 34H130z" fill="url(#pa-mesh)" stroke="#5f6269" strokeWidth="2" />
      <rect x="44" y="150" width="56" height="34" rx="12" fill="url(#pa-mesh)" stroke="#5f6269" strokeWidth="2" />
      <rect x="300" y="150" width="56" height="34" rx="12" fill="url(#pa-mesh)" stroke="#5f6269" strokeWidth="2" />
      <circle cx="140" cy="126" r="5" fill="#7c8088" />
      <circle cx="260" cy="126" r="5" fill="#7c8088" />
    </>
  ),
  grille: (
    <>
      <Shadow rx={160} />
      <path d="M44 100c0-14 12-24 26-24h260c14 0 26 10 26 24l-14 92c-2 14-14 24-28 24H86c-14 0-26-10-28-24z" fill="url(#pa-chrome)" />
      <path d="M58 104c0-8 6-14 14-14h256c8 0 14 6 14 14l-12 84c-2 10-10 16-20 16H90c-10 0-18-6-20-16z" fill="url(#pa-mesh)" />
      <circle cx="200" cy="146" r="24" fill="url(#pa-chrome)" />
      <circle cx="200" cy="146" r="17" fill="#1a1a1f" />
      <path d="M58 104c0-8 6-14 14-14h256c8 0 14 6 14 14" stroke="#fff" strokeWidth="2" opacity="0.6" />
    </>
  ),
  bonnet: (
    <>
      <Shadow rx={170} />
      <path d="M40 210c10-70 40-130 70-150h180c30 20 60 80 70 150-50 16-270 16-320 0z" fill="url(#pa-primer)" />
      <path d="M150 64c-8 50-12 100-10 152M250 64c8 50 12 100 10 152" stroke="#9a9da3" strokeWidth="3" opacity="0.7" />
      <path d="M150 64c-8 50-12 100-10 152M250 64c8 50 12 100 10 152" stroke="#eceef0" strokeWidth="2" opacity="0.7" transform="translate(4 0)" />
      <path d="M110 60h180" stroke="#eceef0" strokeWidth="3" />
    </>
  ),
  wing: (
    <>
      <Shadow rx={160} />
      <path d="M40 90c60-20 200-26 300-10 20 4 30 20 26 40l-14 100H262c0-50-28-84-72-84s-72 34-72 84H48c-14-40-20-90-8-130z" fill="url(#pa-primer)" />
      <path d="M50 100c80-16 220-20 300-6" stroke="#eef0f2" strokeWidth="3" />
      <path d="M118 220c0-50 28-84 72-84s72 34 72 84" stroke="#6f727a" strokeWidth="4" fill="none" />
      <path d="M300 120l30-4v14l-30 4z" fill="url(#pa-amber)" />
    </>
  ),
  glass: (
    <>
      <Shadow rx={170} />
      <path d="M70 70c80-14 180-14 260 0l40 150c-100 14-240 14-340 0z" fill="#16161a" />
      <path d="M80 80c76-12 164-12 240 0l36 132c-96 12-216 12-312 0z" fill="url(#pa-glass)" opacity="0.92" />
      <path d="M120 96l-30 104M180 92l-40 114" stroke="#fff" strokeWidth="10" opacity="0.25" strokeLinecap="round" />
      <rect x="186" y="86" width="28" height="18" rx="4" fill="#16161a" />
    </>
  ),
  undertray: (
    <>
      <Shadow rx={170} />
      <path d="M40 100l40-30h240l40 30-20 110H60z" fill="url(#pa-black)" />
      <path d="M60 104l30-20h220l30 20" stroke="#4a4a52" strokeWidth="3" fill="none" />
      <rect x="110" y="130" width="70" height="40" rx="8" fill="#0a0a0c" stroke="#3b3b42" strokeWidth="2" />
      <rect x="220" y="130" width="70" height="40" rx="8" fill="#0a0a0c" stroke="#3b3b42" strokeWidth="2" />
      {[90, 150, 250, 310].map((x) => <circle key={x} cx={x} cy="196" r="5" fill="#3b3b42" />)}
    </>
  ),
  reinforcement: (
    <>
      <Shadow rx={175} />
      <path d="M30 120c40-12 300-12 340 0v40c-40 12-300 12-340 0z" fill="url(#pa-chrome)" />
      <path d="M40 132c40-8 280-8 320 0" stroke="#fff" strokeWidth="3" opacity="0.7" />
      <rect x="70" y="160" width="40" height="60" rx="6" fill="url(#pa-alu)" />
      <rect x="290" y="160" width="40" height="60" rx="6" fill="url(#pa-alu)" />
      {[110, 170, 230, 290].map((x) => <circle key={x} cx={x} cy="140" r="6" fill="#6f747c" />)}
    </>
  ),
  door: (
    <>
      <Shadow rx={160} />
      <path d="M70 120l50-70h190l20 70v110H70z" fill="url(#pa-primer)" />
      <path d="M92 116l40-54h164l14 54z" fill="#1a1a1f" />
      <path d="M100 112l36-46h154l12 46z" fill="url(#pa-glass)" opacity="0.6" />
      <rect x="250" y="150" width="50" height="12" rx="6" fill="url(#pa-chrome)" />
      <path d="M70 180h260" stroke="#eef0f2" strokeWidth="3" />
    </>
  ),
  radiator: (
    <>
      <Shadow rx={170} />
      <rect x="40" y="70" width="34" height="160" rx="6" fill="url(#pa-black)" />
      <rect x="326" y="70" width="34" height="160" rx="6" fill="url(#pa-black)" />
      <rect x="74" y="80" width="252" height="140" fill="url(#pa-fins)" />
      <rect x="74" y="80" width="252" height="140" fill="url(#pa-lens)" opacity="0.5" />
      <circle cx="57" cy="96" r="10" fill="url(#pa-chrome)" />
      <circle cx="343" cy="204" r="10" fill="url(#pa-chrome)" />
    </>
  ),
  sensor: (
    <>
      <Shadow rx={120} />
      <path d="M210 160c40 0 60 30 100 30s50-30 70-30" stroke="#1a1a1f" strokeWidth="8" fill="none" strokeLinecap="round" />
      <rect x="130" y="100" width="90" height="110" rx="14" fill="url(#pa-black)" />
      <circle cx="140" cy="155" r="48" fill="url(#pa-black)" />
      <circle cx="140" cy="155" r="38" fill="url(#pa-primer)" />
      <circle cx="140" cy="155" r="38" fill="url(#pa-lens)" />
      <rect x="370" y="150" width="20" height="22" rx="4" fill="#3b3b42" />
    </>
  ),
};

export function ProductArt({ kind, side, className, style }: { kind: ArtKind; side?: Side; className?: string; style?: React.CSSProperties }) {
  // Drawings face right; mirror "Gauche" parts so left/right look correct
  const flip = side === "Gauche";
  return (
    <svg viewBox="0 0 400 300" className={className} style={style} aria-hidden>
      <Defs />
      <g transform={flip ? "translate(400 0) scale(-1 1)" : undefined}>{art[kind]}</g>
    </svg>
  );
}
