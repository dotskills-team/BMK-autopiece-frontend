/**
 * Dark sports car, 3/4 front view, headlights on — stands in for the hero and
 * banner photos of the design until real photos are added (lib/constants/images.ts).
 * Pure SVG: no external asset. The car is anchored to the right of the box.
 */
export function CarScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 900 500" preserveAspectRatio="xMaxYMax slice" className={className} aria-hidden>
      <defs>
        <radialGradient id="cs-bg" cx="0.62" cy="0.45" r="0.7">
          <stop offset="0" stopColor="#25252d" />
          <stop offset="0.55" stopColor="#111115" />
          <stop offset="1" stopColor="#08080a" />
        </radialGradient>
        <radialGradient id="cs-redglow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e30613" stopOpacity="0.35" />
          <stop offset="1" stopColor="#e30613" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cs-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a4b55" />
          <stop offset="0.18" stopColor="#24252c" />
          <stop offset="0.6" stopColor="#121217" />
          <stop offset="1" stopColor="#060608" />
        </linearGradient>
        <linearGradient id="cs-front" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2c2d35" />
          <stop offset="0.5" stopColor="#15151b" />
          <stop offset="1" stopColor="#09090b" />
        </linearGradient>
        <linearGradient id="cs-hood" x1="0" y1="1" x2="0.6" y2="0">
          <stop offset="0" stopColor="#1b1c22" />
          <stop offset="0.55" stopColor="#3a3b45" />
          <stop offset="0.75" stopColor="#5b5d69" />
          <stop offset="1" stopColor="#2a2b33" />
        </linearGradient>
        <linearGradient id="cs-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3c4250" />
          <stop offset="0.35" stopColor="#0d0f14" />
          <stop offset="0.6" stopColor="#1d222c" />
          <stop offset="1" stopColor="#07080a" />
        </linearGradient>
        <linearGradient id="cs-rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.4" stopColor="#dfe8ff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cs-beam" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#e6f2ff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#e6f2ff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="cs-wheel" cx="0.45" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#5a5c66" />
          <stop offset="0.6" stopColor="#2a2b31" />
          <stop offset="1" stopColor="#111114" />
        </radialGradient>
        <pattern id="cs-mesh" width="10" height="8" patternUnits="userSpaceOnUse">
          <rect width="10" height="8" fill="#070708" />
          <path d="M5 1l4 2.5v3L5 8 1 6.5v-3z" fill="#1d1d22" />
        </pattern>
        <filter id="cs-blur-lg" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14" /></filter>
        <filter id="cs-blur-sm" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
        <linearGradient id="cs-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="cs-reflect-mask">
          <rect x="0" y="410" width="900" height="120" fill="url(#cs-fade)" />
        </mask>
      </defs>

      {/* Studio backdrop */}
      <rect width="900" height="500" fill="url(#cs-bg)" />
      <ellipse cx="720" cy="170" rx="300" ry="190" fill="url(#cs-redglow)" />
      <rect y="410" width="900" height="90" fill="#060607" />
      <path d="M0 410h900" stroke="#2a2a31" strokeWidth="1" />

      {/* Headlight beams on the floor */}
      <path d="M150 300L0 330v120l300-30z" fill="url(#cs-beam)" filter="url(#cs-blur-lg)" />
      <path d="M360 268L120 300v60l260-60z" fill="url(#cs-beam)" opacity="0.6" filter="url(#cs-blur-lg)" />

      <g id="cs-car">
        {/* Ground shadow */}
        <ellipse cx="500" cy="408" rx="390" ry="20" fill="#000" opacity="0.85" filter="url(#cs-blur-sm)" />

        {/* Rear wheel */}
        <ellipse cx="755" cy="366" rx="44" ry="52" fill="#050506" />
        <ellipse cx="757" cy="366" rx="30" ry="37" fill="url(#cs-wheel)" />
        <g stroke="#6b6d78" strokeWidth="3">
          <path d="M757 333v66M730 366h54M738 344l38 44M738 388l38-44" />
        </g>
        <ellipse cx="757" cy="366" rx="8" ry="10" fill="#9a9ca6" />

        {/* Side body */}
        <path
          d="M470 245C560 222 700 212 810 222c38 4 58 26 60 60l-2 58c-2 18-16 26-36 26h-24c-3-36-23-59-53-59s-52 23-55 63l-105 4c-3-40-23-67-55-67s-52 27-55 73l-15 2z"
          fill="url(#cs-side)"
        />
        <path d="M478 300c120-10 260-16 380-14" stroke="#3a3b44" strokeWidth="2" fill="none" />
        <path d="M470 247C560 224 700 214 810 224c30 3 48 16 56 36" stroke="url(#cs-rim)" strokeWidth="2.5" fill="none" />

        {/* Front face */}
        <path d="M120 330c-8-30 0-55 30-68l290-24c15 2 30 12 32 32l-2 110c0 15-10 22-30 22l-280-2c-25-2-38-15-40-35z" fill="url(#cs-front)" />

        {/* Hood */}
        <path d="M150 262l290-24 120-40c-110-2-230 7-310 24-50 11-85 26-100 40z" fill="url(#cs-hood)" />
        <path d="M200 252c90-22 230-40 340-50" stroke="#8d90a0" strokeWidth="1.5" opacity="0.6" fill="none" />
        <path d="M150 262l290-24" stroke="url(#cs-rim)" strokeWidth="2" />

        {/* Windscreen + side window */}
        <path d="M300 210c80-10 180-15 260-14l40-46c-80-2-170 2-220 10z" fill="url(#cs-glass)" />
        <path d="M600 150l-40 46 160 9c-20-25-50-45-80-53z" fill="url(#cs-glass)" />
        <path d="M340 205l90-50M390 202l70-46" stroke="#ffffff" strokeWidth="6" opacity="0.06" />
        <path d="M380 160c50-8 140-12 220-10l40 2" stroke="url(#cs-rim)" strokeWidth="2" fill="none" />
        {/* Side mirror */}
        <path d="M566 196l-26 6c-6 2-6 10 0 12l30 2z" fill="#1a1b21" />

        {/* Lower intake + side intakes */}
        <path d="M200 332l200-14 5 42-195 12z" fill="url(#cs-mesh)" stroke="#2c2d34" strokeWidth="2" />
        <path d="M128 336l50-4 4 34-46 2c-6-10-8-20-8-32z" fill="url(#cs-mesh)" />
        <path d="M418 316l42-3-1 40-38 3z" fill="url(#cs-mesh)" />
        <path d="M160 300l260-20" stroke="#34353e" strokeWidth="2" />

        {/* Front wheel */}
        <ellipse cx="540" cy="372" rx="50" ry="56" fill="#050506" />
        <ellipse cx="542" cy="372" rx="35" ry="40" fill="url(#cs-wheel)" />
        <g stroke="#7a7c88" strokeWidth="3.5">
          <path d="M542 334v76M507 372h70M517 346l50 52M517 398l50-52" />
        </g>
        <ellipse cx="542" cy="372" rx="9" ry="11" fill="#b3b5be" />

        {/* Headlights (near + far) */}
        <path d="M140 290l115-18-5 13-105 16z" fill="#f4f9ff" />
        <path d="M145 285l108-16" stroke="#ffffff" strokeWidth="2.5" />
        <path d="M350 258l90-10-4 10-84 10z" fill="#f4f9ff" />
        <path d="M352 254l86-9" stroke="#ffffff" strokeWidth="2" />
        {/* Light bloom */}
        <ellipse cx="195" cy="286" rx="85" ry="26" fill="#d6ebff" opacity="0.55" filter="url(#cs-blur-lg)" />
        <ellipse cx="395" cy="258" rx="60" ry="18" fill="#d6ebff" opacity="0.45" filter="url(#cs-blur-lg)" />
        <ellipse cx="195" cy="287" rx="50" ry="8" fill="#ffffff" opacity="0.9" filter="url(#cs-blur-sm)" />
        <ellipse cx="395" cy="258" rx="36" ry="6" fill="#ffffff" opacity="0.8" filter="url(#cs-blur-sm)" />
      </g>

      {/* Floor reflection */}
      <use href="#cs-car" transform="matrix(1 0 0 -1 0 820)" mask="url(#cs-reflect-mask)" opacity="0.5" />
    </svg>
  );
}
