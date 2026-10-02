"use client";
import { useMemo, useState } from "react";

const SKY_W = 1000;
const SKY_H = 420;

type SkyStar = { x: number; y: number; r: number; threshold: number; warm?: boolean };

type Figure = {
  name: string;
  lineAt: number;
  pairs: [number, number][];
  stars: SkyStar[];
};

const FIGURES: Figure[] = [
  {
    name: "Três Marias",
    lineAt: 50,
    stars: [
      { x: 562, y: 118, r: 2.1, threshold: 38, warm: true },
      { x: 612, y: 108, r: 2.8, threshold: 34, warm: true },
      { x: 662, y: 98, r: 2.6, threshold: 36, warm: true },
    ],
    pairs: [
      [0, 1],
      [1, 2],
    ],
  },
  {
    name: "Cruzeiro do Sul",
    lineAt: 38,
    stars: [
      { x: 820, y: 200, r: 2.2, threshold: 42, warm: true },
      { x: 820, y: 248, r: 2.7, threshold: 40, warm: true },
      { x: 792, y: 224, r: 2, threshold: 44, warm: true },
      { x: 848, y: 224, r: 2, threshold: 44, warm: true },
    ],
    pairs: [
      [0, 1],
      [2, 3],
    ],
  },
  {
    name: "Escorpião",
    lineAt: 28,
    stars: [
      { x: 180, y: 260, r: 1.6, threshold: 48, warm: true },
      { x: 228, y: 232, r: 1.7, threshold: 46, warm: true },
      { x: 278, y: 208, r: 1.9, threshold: 44, warm: true },
      { x: 332, y: 192, r: 2.6, threshold: 40, warm: true },
      { x: 388, y: 198, r: 1.7, threshold: 44, warm: true },
      { x: 438, y: 218, r: 1.5, threshold: 46, warm: true },
    ],
    pairs: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ],
  },
];

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

function starOpacity(darkness: number, threshold: number) {
  if (darkness <= threshold) return 0.04;
  return clamp(0.08 + (darkness - threshold) / 28);
}

function lineOpacity(effectiveLight: number, lineAt: number) {
  return clamp((lineAt + 10 - effectiveLight) / 16);
}

function headline(effectiveLight: number, shapes: number) {
  if (effectiveLight > 62) return "quase nada";
  if (effectiveLight > 40) return "só pontos";
  if (shapes === 0) return "role para escurecer";
  if (shapes === 1) return "um desenho";
  return "figuras de novo";
}

export function NightSky() {
  const [light, setLight] = useState(82);
  const [districts, setDistricts] = useState([true, true, true]);

  const fieldStars = useMemo(() => {
    const rnd = mulberry32(90817);
    const anchors = FIGURES.flatMap((f) => f.stars);
    const out: SkyStar[] = [];
    for (let i = 0; i < 160; i++) {
      const x = 20 + rnd() * (SKY_W - 40);
      const y = 16 + rnd() * (SKY_H - 32);
      const tooClose = anchors.some((a) => (a.x - x) ** 2 + (a.y - y) ** 2 < 900);
      if (tooClose) continue;
      out.push({
        x,
        y,
        r: 0.55 + rnd() * 1.35,
        threshold: 18 + rnd() * 72,
      });
    }
    return out;
  }, []);

  const active = districts.filter(Boolean).length;
  const effectiveLight = light * (active / 3);
  const darkness = 100 - effectiveLight;
  const names = ["casas", "avenida", "centro"];

  const visibleShapes = FIGURES.filter((f) => lineOpacity(effectiveLight, f.lineAt) > 0.55);
  const whisper =
    visibleShapes.length === 0
      ? ""
      : visibleShapes.length === 1
        ? visibleShapes[0].name
        : visibleShapes.map((f) => f.name).join(" · ");

  const toggle = (i: number) => setDistricts((values) => values.map((v, n) => (n === i ? !v : v)));

  const ending =
    visibleShapes.length >= 2
      ? "Não faltam estrelas. Falta escuridão para o olho ligar os pontos — como quando criança a gente enxergava Três Marias e Cruzeiro sem mapa."
      : "As estrelas não ficaram mais brilhantes. Você mudou o que competia com elas.";

  return (
    <div className="night-lab">
      <section
        className="night-stage"
        style={{
          background: `rgb(${8 + effectiveLight * 0.48},${12 + effectiveLight * 0.42},${32 + effectiveLight * 0.38})`,
        }}
      >
        <div className="night-sky-canvas" aria-hidden="true">
          <svg viewBox={`0 0 ${SKY_W} ${SKY_H}`} preserveAspectRatio="xMidYMid meet">
            <g className="night-lines">
              {FIGURES.map((fig) => {
                const op = lineOpacity(effectiveLight, fig.lineAt);
                if (op < 0.02) return null;
                return (
                  <g key={fig.name} style={{ opacity: op * 0.85 }}>
                    {fig.pairs.map(([a, b], i) => {
                      const s = fig.stars[a];
                      const t = fig.stars[b];
                      return <line key={i} x1={s.x} y1={s.y} x2={t.x} y2={t.y} />;
                    })}
                  </g>
                );
              })}
            </g>
            <g className="night-stars">
              {fieldStars.map((s, i) => (
                <circle key={`f${i}`} cx={s.x} cy={s.y} r={s.r} style={{ opacity: starOpacity(darkness, s.threshold) }} />
              ))}
              {FIGURES.flatMap((fig) =>
                fig.stars.map((s, i) => (
                  <circle
                    key={`${fig.name}-${i}`}
                    className={s.warm ? "warm" : ""}
                    cx={s.x}
                    cy={s.y}
                    r={s.r}
                    style={{ opacity: starOpacity(darkness, s.threshold) }}
                  />
                )),
              )}
            </g>
          </svg>
        </div>

        <div className="night-title night-title-minimal">
          <span>{Math.round(effectiveLight)}% de luz no céu</span>
          <h2 key={headline(effectiveLight, visibleShapes.length)}>{headline(effectiveLight, visibleShapes.length)}</h2>
        </div>

        <div className="skyline" aria-hidden="true">
          {[38, 55, 31, 68, 44, 60, 35, 73, 48, 57, 40].map((h, i) => {
            const zone = i % 3;
            return (
              <b key={i} className={districts[zone] ? "lit" : "off"} style={{ height: `${h}%` }}>
                <em style={{ opacity: districts[zone] ? light / 100 : 0 }} />
              </b>
            );
          })}
        </div>
      </section>

      <p className="night-whisper" aria-live="polite">
        {whisper}
      </p>

      <div className="night-switches">
        <div>
          <span>apague por partes</span>
          <small>luz de rua, avenida e centro</small>
        </div>
        <div>
          {names.map((name, i) => (
            <button
              key={name}
              className={districts[i] ? "on" : ""}
              onClick={() => toggle(i)}
              aria-pressed={districts[i]}
            >
              <i />
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="night-control">
        <label htmlFor="city-light">luzes que ainda estão acesas</label>
        <input
          id="city-light"
          type="range"
          min="0"
          max="100"
          value={light}
          onChange={(e) => setLight(Number(e.target.value))}
        />
        <div>
          <span>apagadas</span>
          <span>acesas</span>
        </div>
      </div>

      <p className="night-ending">{ending}</p>
    </div>
  );
}
