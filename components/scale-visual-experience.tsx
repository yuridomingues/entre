"use client";
import { useEffect, useRef, useState } from "react";

type Axis = "w" | "h";
type Mode = "ink" | "planet";
type Item = {
  name: string;
  size: string;
  meters: number;
  axis: Axis;
  aspect: number;
  src: string;
  pos: string;
  crop: number;
  mode: Mode;
  note: string;
};

const OBI = "https://www.oldbookillustrations.com/site/assets/high-res";

const items: Item[] = [
  {name:"pulga", size:"1 mm", meters:0.001, axis:"h", aspect:1.15, pos:"74% 32%", crop:1.62, mode:"ink", note:"a pulga-da-areia, do tamanho de um grão", src:`${OBI}/1885-1891/chigoe-flea-1600.jpg`},
  {name:"joaninha", size:"7 mm", meters:0.007, axis:"h", aspect:1, pos:"50% 28%", crop:1.62, mode:"ink", note:"já cabe na unha", src:`${OBI}/1885-1891/ladybird-1600.jpg`},
  {name:"denário", size:"1,9 cm", meters:0.019, axis:"h", aspect:1, pos:"20% 32%", crop:1.95, mode:"ink", note:"uma moeda romana, em tamanho real na gravura", src:`${OBI}/1885-1891/denarius-1600.jpg`},
  {name:"figura", size:"1,6 m", meters:1.6, axis:"h", aspect:0.46, pos:"50% 56%", crop:1.15, mode:"ink", note:"uma pessoa inteira", src:`${OBI}/n-d-1914/temple-dancing-girl-1600.jpg`},
  {name:"locomotiva", size:"7,5 m", meters:7.5, axis:"w", aspect:2.6, pos:"50% 42%", crop:1.22, mode:"ink", note:"uma locomotiva de estrada", src:`${OBI}/1876/thomson-road-steamer-1600.jpg`},
  {name:"carvalho", size:"26 m", meters:26, axis:"h", aspect:1.02, pos:"50% 46%", crop:1.08, mode:"ink", note:"o carvalho de Cowthorpe", src:`${OBI}/1826/cowthorpe-oak-1600.jpg`},
  {name:"monte", size:"155 m", meters:155, axis:"h", aspect:1.25, pos:"50% 42%", crop:1.12, mode:"ink", note:"a pirâmide de Tucumcari, cerca de 510 pés", src:`${OBI}/1862/pyramid-mountain-1600.jpg`},
  {name:"Saturno", size:"270 mil km", meters:270000000, axis:"w", aspect:1.85, pos:"50% 46%", crop:1.06, mode:"planet", note:"de ponta a ponta dos anéis. O planeta em si tem cerca de 120 mil km", src:`${OBI}/1882/planet-saturn-1600.jpg`}
];

function fold(n: number) {
  if (n >= 1e9) return (n / 1e9).toLocaleString("pt-BR", {maximumFractionDigits: 1}) + " bilhões";
  if (n >= 1e6) return (n / 1e6).toLocaleString("pt-BR", {maximumFractionDigits: 1}) + " milhões";
  if (n >= 100) return Math.round(n).toLocaleString("pt-BR");
  if (n >= 10) return String(Math.round(n));
  return n.toFixed(1).replace(".", ",");
}

export function ScaleExplorer() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [vmin, setVmin] = useState(800);

  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const total = Math.max(1, el.offsetHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total));
      setProgress(p);
      setVmin(Math.min(window.innerWidth, window.innerHeight));
    };
    measure();
    window.addEventListener("scroll", measure, {passive: true});
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const last = items.length - 1;
  const t = progress * last;
  const i0 = Math.min(last - 1, Math.floor(t));
  const frac = Math.min(1, t - i0);
  const viewLog = Math.log10(items[i0].meters) * (1 - frac) + Math.log10(items[i0 + 1].meters) * frac;
  const viewMeters = 10 ** viewLog;
  const px = (0.52 * vmin) / viewMeters;
  const focus = Math.min(last, Math.round(t));
  const item = items[focus];
  const previous = focus > 0 ? items[focus - 1] : null;
  const ratio = previous ? item.meters / previous.meters : 1;

  const jump = (index: number) => {
    const el = ref.current;
    if (!el) return;
    const total = Math.max(1, el.offsetHeight - window.innerHeight);
    window.scrollTo({top: el.offsetTop + (index / last) * total, behavior: "smooth"});
  };

  return <div className="size-journey" ref={ref} style={{height: `calc(100svh + ${last * 130}vh)`}}>
    <div className="size-stage">
      <p className="size-hint" style={{opacity: Math.max(0, 1 - progress * 5)}}>role para crescer</p>
      <div className="size-field" aria-hidden="true">
        {items.map((thing, i) => {
          const full = thing.meters * px;
          if (full < 1.5) return null;
          const limit = vmin * 1.35;
          const main = Math.min(full, limit);
          const zoom = full / main;
          if (zoom > 1.65) return null;
          const width = thing.axis === "w" ? main : main * thing.aspect;
          const height = thing.axis === "h" ? main : main / thing.aspect;
          if (full < 12) return <i key={thing.name} className="size-speck" style={{opacity: Math.min(1, full / 8), zIndex: 40}}/>;
          const [ax, ay] = thing.pos.split(" ").map((value) => parseFloat(value));
          return <div key={thing.name} className={"size-thing mode-" + thing.mode} style={{width, height, zIndex: items.length - i, transform: `translate(${-ax}%, ${-ay}%)`}}>
            <img src={thing.src} alt="" style={{objectPosition: thing.pos, transform: `scale(${zoom * thing.crop})`, transformOrigin: thing.pos}} draggable={false}/>
          </div>;
        })}
      </div>
      <aside className="size-readout">
        <span>{String(focus + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
        <h2>{item.name}</h2>
        <strong>{item.size}</strong>
        <p>{item.note}</p>
        {previous && <small>{ratio >= 1e6 ? fold(ratio) + " de vezes " + previous.name : "cerca de " + fold(ratio) + "× " + previous.name}</small>}
      </aside>
      <nav className="size-rail" aria-label="Objetos da escala">
        {items.map((thing, i) => <button key={thing.name} className={i === focus ? "on" : i < focus ? "passed" : ""} onClick={() => jump(i)}>{thing.name}</button>)}
      </nav>
      <p className="size-credit">gravuras · Old Book Illustrations</p>
    </div>
  </div>;
}
