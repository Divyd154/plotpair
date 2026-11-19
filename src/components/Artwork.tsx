import { useId, useMemo, type ReactNode } from "react";
import {
  SCENE_PALETTES,
  createSeededRandom,
  getSceneKind,
  hashString,
  type SceneKind,
} from "@/utils/placeholderArt";
import type { CatalogItem } from "@/types";
import { cn } from "@/utils/cn";

interface ArtworkProps {
  item: Pick<CatalogItem, "title" | "mediaType" | "posterUrl" | "genres"> & { id?: string };
  className?: string;
  /** Kept for layout density hints; scenes scale automatically. */
  size?: "thumb" | "card" | "detail";
}

const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

function range(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i);
}

interface SceneProps {
  uid: string;
  kind: SceneKind;
  top: string;
  bottom: string;
  glow: string;
  glow2: string;
  accent: string;
  randomValues: number[];
}

/** All foreground artwork for a scene, drawn above the shared gradients. */
function SceneForeground({ uid, kind, glow, glow2, accent, bottom, randomValues }: SceneProps): ReactNode {
  let randomIndex = 0;
  const rand = () => {
    const value = randomValues[randomIndex];
    randomIndex += 1;
    return value ?? 0;
  };

  switch (kind) {
    case "cosmic":
      return (
        <g>
          {range(26).map((i) => (
            <circle
              key={i}
              cx={rand() * 200}
              cy={rand() * 300}
              r={0.5 + rand() * 1.2}
              fill="#fff"
              opacity={0.3 + rand() * 0.6}
            />
          ))}
          <g transform="translate(140 216) rotate(-18)">
            <ellipse rx="32" ry="8.5" fill="none" stroke={accent} strokeOpacity="0.6" strokeWidth="1.6" />
            <circle r="15" fill="#000" fillOpacity="0.6" />
            <circle r="15" fill="none" stroke={glow} strokeOpacity="0.55" strokeWidth="1.2" />
          </g>
          <line x1="26" y1="58" x2="72" y2="30" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          <line x1="22" y1="62" x2="34" y2="54" stroke={accent} strokeWidth="1" strokeLinecap="round" opacity="0.45" />
        </g>
      );
    case "fantasy":
      return (
        <g>
          {range(9).map((i) => (
            <circle key={i} cx={rand() * 200} cy={rand() * 130} r={0.5 + rand()} fill="#fff" opacity={0.3 + rand() * 0.5} />
          ))}
          <circle cx="150" cy="56" r="20" fill={accent} fillOpacity="0.92" />
          <circle cx="150" cy="56" r="20" fill="#000" fillOpacity="0.14" />
          <path d="M0 214 L52 148 L96 206 L138 140 L200 214 L200 300 L0 300 Z" fill="#000" fillOpacity="0.38" />
          <path d="M0 244 L60 180 L118 246 L170 186 L200 244 L200 300 L0 300 Z" fill="#000" fillOpacity="0.52" />
          <path d="M0 272 L74 224 L140 268 L200 236 L200 300 L0 300 Z" fill="#000" fillOpacity="0.68" />
          <rect x="0" y="176" width="200" height="26" fill={`url(#${uid}-mist)`} />
        </g>
      );
    case "adventure":
      return (
        <g>
          <circle cx="100" cy="198" r="34" fill={glow} fillOpacity="0.95" />
          <circle cx="100" cy="188" r="34" fill={bottom} fillOpacity="0.2" />
          <path d="M0 210 Q50 178 100 206 T200 196 L200 300 L0 300 Z" fill="#000" fillOpacity="0.5" />
          <path d="M0 242 Q70 214 130 238 T200 232 L200 300 L0 300 Z" fill="#000" fillOpacity="0.64" />
          <path d="M0 272 Q60 252 120 272 T200 266 L200 300 L0 300 Z" fill="#000" fillOpacity="0.78" />
          <path d="M58 84 q6 -6 12 0 q6 -6 12 0" stroke={accent} strokeWidth="1.7" fill="none" opacity="0.85" />
          <path d="M104 66 q5 -5 10 0 q5 -5 10 0" stroke={accent} strokeWidth="1.4" fill="none" opacity="0.65" />
          <path d="M0 120 L18 94 L30 300 L0 300 Z" fill="#000" fillOpacity="0.5" />
        </g>
      );
    case "mystery":
      return (
        <g>
          <polygon points="0,300 200,64 200,300" fill={glow2} fillOpacity="0.1" />
          <circle cx="118" cy="110" r="52" fill={`url(#${uid}-g1)`} opacity="0.4" />
          <circle cx="118" cy="110" r="44" fill="none" stroke={glow} strokeWidth="5" strokeOpacity="0.9" />
          <line x1="150" y1="142" x2="180" y2="172" stroke={glow} strokeWidth="8" strokeLinecap="round" strokeOpacity="0.9" />
          {range(4).map((i) => (
            <circle key={i} cx={26 + i * 18} cy={246} r={2.4} fill={accent} opacity={0.35 + i * 0.16} />
          ))}
          <line x1="0" y1="266" x2="200" y2="266" stroke={glow2} strokeOpacity="0.16" strokeWidth="1" />
        </g>
      );
    case "thriller": {
      const buildings = range(7).map((i) => {
        const w = 18 + rand() * 18;
        const h = 62 + rand() * 78;
        const x = i * 28 + rand() * 8 - 4;
        return { x, w, h };
      });
      return (
        <g>
          <polygon points="64,-10 94,-10 26,300 6,300" fill={`url(#${uid}-beam)`} />
          <polygon points="150,-10 176,-10 120,300 102,300" fill={`url(#${uid}-beam)`} opacity="0.55" />
          <rect x="0" y="150" width="200" height="30" fill={`url(#${uid}-mist)`} />
          {buildings.map((b, i) => (
            <rect key={i} x={b.x} y={300 - b.h} width={b.w} height={b.h} fill="#000" fillOpacity="0.82" />
          ))}
        </g>
      );
    }
    case "horror":
      return (
        <g>
          <circle cx="56" cy="54" r="15" fill={accent} fillOpacity="0.85" />
          <circle cx="56" cy="54" r="30" fill={`url(#${uid}-g2)`} opacity="0.5" />
          <rect x="0" y="170" width="200" height="30" fill={`url(#${uid}-mist)`} />
          <rect x="0" y="212" width="200" height="36" fill={`url(#${uid}-mist)`} opacity="0.7" />
          <g stroke="#020207" strokeLinecap="round" fill="none">
            <path d="M148 300 V136 M148 176 L178 148 M148 206 L118 178 M148 244 L186 224 M150 268 L120 252" strokeWidth="3.5" />
            <path d="M56 300 V198 M56 230 L80 210 M56 250 L36 236" strokeWidth="2.6" opacity="0.85" />
          </g>
          <path d="M104 76 q5 -5 10 0 q5 -5 10 0" stroke={accent} strokeWidth="1.4" fill="none" opacity="0.7" />
        </g>
      );
    case "romance":
      return (
        <g>
          <path d="M40 262 A60 60 0 0 1 160 262" stroke={glow2} strokeOpacity="0.85" strokeWidth="2" fill="none" />
          <path d="M62 262 A38 38 0 0 1 138 262" stroke={glow2} strokeOpacity="0.4" strokeWidth="1.4" fill="none" />
          <path d="M63 60 l4.5 11 11 4.5 -11 4.5 -4.5 11 -4.5 -11 -11 -4.5 11 -4.5 z" fill={glow2} fillOpacity="0.95" />
          <path d="M138 108 l3.2 8 8 3.2 -8 3.2 -3.2 8 -3.2 -8 -8 -3.2 8 -3.2 z" fill={accent} fillOpacity="0.7" />
          <circle cx="100" cy="220" r="92" fill={`url(#${uid}-g1)`} opacity="0.7" />
          <path d="M100 128 c-8 -12 -28 -6 -28 8 c0 12 16 20 28 30 c12 -10 28 -18 28 -30 c0 -14 -20 -20 -28 -8 z" fill={glow} fillOpacity="0.85" />
        </g>
      );
    case "drama":
      return (
        <g>
          {range(7).map((i) => (
            <circle key={i} cx={20 + rand() * 160} cy={rand() * 90} r={0.6 + rand()} fill="#fff" opacity={0.25 + rand() * 0.4} />
          ))}
          <polygon points="100,-16 28,300 172,300" fill={`url(#${uid}-beam)`} opacity="0.85" />
          <ellipse cx="100" cy="284" rx="72" ry="9" fill={glow} fillOpacity="0.28" />
          <ellipse cx="100" cy="284" rx="42" ry="5.5" fill={glow} fillOpacity="0.4" />
          <rect x="0" y="0" width="10" height="300" fill="#000" fillOpacity="0.6" />
          <rect x="190" y="0" width="10" height="300" fill="#000" fillOpacity="0.6" />
        </g>
      );
    case "crime": {
      const buildings = range(6).map((i) => {
        const w = 26 + rand() * 12;
        const h = 96 + rand() * 90;
        const x = i * 34 + rand() * 6 - 6;
        const windows = range(10).map(() => ({
          wx: 4 + rand() * (w - 9),
          wy: 300 - h + 8 + rand() * (h - 60 > 8 ? h - 60 : 18),
          lit: rand() > 0.5,
        }));
        return { x, w, h, windows };
      });
      return (
        <g>
          <polygon points="52,164 200,26 200,74" fill={`url(#${uid}-beam)`} opacity="0.5" />
          {buildings.map((b, i) => (
            <g key={i}>
              <rect x={b.x} y={300 - b.h - 36} width={b.w} height={b.h} fill="#000" fillOpacity="0.8" />
              {b.windows.map((win, j) =>
                win.lit ? (
                  <rect key={j} x={b.x + win.wx} y={win.wy - 36} width="3" height="4.4" fill={glow2} fillOpacity="0.85" />
                ) : null
              )}
            </g>
          ))}
          <rect x="0" y="264" width="200" height="36" fill="#000" fillOpacity="0.7" />
        </g>
      );
    }
    case "dystopian": {
      const heights = [104, 168, 132, 92, 148];
      return (
        <g>
          <rect x="0" y="228" width="200" height="72" fill={`url(#${uid}-g1)`} opacity="0.55" />
          {heights.map((h, i) => {
            const w = 26 + (i % 3) * 9;
            const x = i * 42 - 4 + (i % 2) * 7;
            return (
              <g key={i}>
                <rect x={x} y={300 - h} width={w} height={h} fill="#000" fillOpacity={0.55 + (i % 3) * 0.12} />
                {h === 168 && <line x1={x + w / 2} y1={300 - h} x2={x + w / 2} y2={300 - h - 22} stroke="#000" strokeWidth="3" />}
              </g>
            );
          })}
          {range(11).map((i) => (
            <line key={i} x1="0" y1={8 + i * 27} x2="200" y2={8 + i * 27} stroke="#fff" strokeOpacity="0.05" strokeWidth="1" />
          ))}
        </g>
      );
    }
    case "noir": {
      const buildings = range(7).map((i) => {
        const w = 20 + rand() * 16;
        const h = 70 + rand() * 70;
        return { x: i * 30 + rand() * 6 - 5, w, h };
      });
      return (
        <g>
          {buildings.map((b, i) => (
            <rect key={i} x={b.x} y={300 - b.h - 40} width={b.w} height={b.h} fill="#000" fillOpacity="0.85" />
          ))}
          <circle cx="58" cy="150" r="46" fill={`url(#${uid}-g1)`} opacity="0.55" />
          <circle cx="152" cy="168" r="42" fill={`url(#${uid}-g2)`} opacity="0.55" />
          <rect x="55" y="86" width="6" height="132" fill={glow} fillOpacity="0.95" />
          <rect x="149" y="104" width="5" height="114" fill={glow2} fillOpacity="0.95" />
          <rect x="0" y="258" width="200" height="42" fill={`url(#${uid}-refl)`} />
          {range(6).map((i) => {
            const x = 20 + rand() * 160;
            const y = rand() * 110;
            return (
              <line key={i} x1={x} y1={y} x2={x - 7} y2={y + 26} stroke="#fff" strokeOpacity="0.12" strokeWidth="1" />
            );
          })}
        </g>
      );
    }
    case "biography":
      return (
        <g>
          {[34, 66, 98, 130].map((r, i) => (
            <circle key={i} cx="100" cy="312" r={r} fill="none" stroke={glow} strokeOpacity={0.28 - i * 0.05} strokeWidth="1.6" />
          ))}
          <line x1="100" y1="28" x2="100" y2="300" stroke={accent} strokeOpacity="0.5" strokeWidth="1.4" strokeDasharray="2 7" />
          {[74, 138, 202].map((y, i) => (
            <circle key={i} cx="100" cy={y} r="3" fill={accent} fillOpacity="0.85" />
          ))}
          <circle cx="100" cy="138" r="7" fill={glow} fillOpacity="0.9" />
        </g>
      );
    default:
      return null;
  }
}

function GenreScene({ item }: { item: ArtworkProps["item"] }) {
  const uid = useId();
  const kind = getSceneKind(item.genres);
  const palette = SCENE_PALETTES[kind];
  const randomValues = useMemo(() => {
    const seededRandom = createSeededRandom(hashString(`${item.title}-${kind}`));
    return Array.from({ length: 1024 }, () => seededRandom());
  }, [item.title, kind]);

  return (
    <svg
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={palette.top} />
          <stop offset="1" stopColor={palette.bottom} />
        </linearGradient>
        <radialGradient id={`${uid}-g1`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={palette.glow} stopOpacity="0.6" />
          <stop offset="1" stopColor={palette.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-g2`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={palette.glow2} stopOpacity="0.55" />
          <stop offset="1" stopColor={palette.glow2} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-mist`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-beam`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={palette.accent} stopOpacity="0.4" />
          <stop offset="1" stopColor={palette.accent} stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id={`${uid}-refl`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={palette.glow} stopOpacity="0.3" />
          <stop offset="1" stopColor={palette.glow2} stopOpacity="0.3" />
        </linearGradient>
      </defs>

      <rect width="200" height="300" fill={`url(#${uid}-bg)`} />
      <circle cx="60" cy="70" r="120" fill={`url(#${uid}-g1)`} opacity="0.5" />
      <circle cx="155" cy="225" r="95" fill={`url(#${uid}-g2)`} opacity="0.45" />
      <SceneForeground uid={uid} kind={kind} randomValues={randomValues} {...palette} />
      {/* Edge vignette for depth */}
      <rect width="200" height="300" fill="url(#${uid}-vig)" opacity="0.55" />
      <defs>
        <radialGradient id={`${uid}-vig`} cx="0.5" cy="0.42" r="0.75">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.55" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/**
 * Consistent 2:3 artwork surface used by carousels, search suggestions,
 * recommendation cards, and the details modal.
 *
 * Fallback art is a deterministic, genre-specific SVG illustration (cosmic
 * Sci-Fi scenes, fantasy mountainscapes, noir skylines...). These are
 * original placeholder illustrations — not imitations of real covers. A
 * genuine posterUrl would be displayed automatically if supplied.
 */
export function Artwork({ item, className }: ArtworkProps) {
  return (
    <div
      className={cn(
        "relative aspect-[2/3] w-full overflow-hidden rounded-lg border border-border/70 bg-elevated",
        className
      )}
    >
      {item.posterUrl ? (
        <img
          src={item.posterUrl}
          alt={`${item.title} artwork`}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <GenreScene item={item} />
      )}
      {/* Subtle grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay" style={{ backgroundImage: NOISE_URI }} />
    </div>
  );
}
