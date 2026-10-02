"use client";
import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { assetPath } from "@/lib/asset-path";

type Mode = "ink" | "photo" | "glow";
type Item = {
  name: string;
  size: string;
  meters: number;
  axis: "w" | "h";
  src: string;
  px: [number, number];
  crop: [number, number, number, number];
  clip?: string;
  mode: Mode;
};

const items: Item[] = [
  {name:"pulga", size:"2 mm", meters:0.002, axis:"w", mode:"ink", px:[960, 870], crop:[0.005, 0.029, 0.968, 0.842],
    clip:"polygon(evenodd,0 0,100% 0,100% 100%,0 100%,0 0,17% 83.5%,39% 83.5%,39% 90%,17% 90%,17% 83.5%)",
    src:assetPath("/assets/scale/flea.png")},
  {name:"joaninha", size:"7 mm", meters:0.007, axis:"h", mode:"ink", px:[960, 960], crop:[0.22, 0.17, 0.59, 0.68],
    src:assetPath("/assets/scale/ladybug.png")},
  {name:"camundongo", size:"15 cm", meters:0.15, axis:"w", mode:"ink", px:[960, 480], crop:[0, 0, 1, 1],
    src:assetPath("/assets/scale/mouse.png")},
  {name:"pessoa", size:"1,75 m", meters:1.75, axis:"h", mode:"ink", px:[960, 1643], crop:[0.2, 0.055, 0.53, 0.93],
    src:assetPath("/assets/scale/person.png")},
  {name:"ônibus", size:"12 m", meters:12, axis:"w", mode:"ink", px:[721, 258], crop:[0.06, 0.11, 0.86, 0.76],
    src:assetPath("/assets/scale/bus.jpg")},
  {name:"pinheiro", size:"30 m", meters:30, axis:"h", mode:"ink", px:[960, 1490], crop:[0.01, 0, 0.98, 0.98],
    src:assetPath("/assets/scale/evergreen.png")},
  {name:"pirâmide de Gizé", size:"139 m", meters:139, axis:"h", mode:"ink", px:[960, 698], crop:[0.0625, 0.011, 0.922, 0.608],
    clip:"polygon(48.6% 0,100% 100%,17.5% 100%,10.2% 70%)",
    src:assetPath("/assets/scale/pyramid.png")},
  {name:"monte Everest", size:"8.849 m", meters:8849, axis:"h", mode:"ink", px:[960, 844], crop:[0.14, 0, 0.86, 1],
    clip:"polygon(38.4% 0,53.5% 0,100% 50%,100% 68%,91% 100%,7% 100%,7% 84%,1.2% 66%,3.5% 52%,18.6% 30%)",
    src:assetPath("/assets/scale/everest.png")},
  {name:"Grande São Paulo", size:"90 km", meters:108000, axis:"w", mode:"glow", px:[960, 640], crop:[0.1, 0.02, 0.84, 0.96],
    src:assetPath("/assets/scale/sao-paulo.jpg")},
  {name:"furacão", size:"700 km", meters:1193000, axis:"w", mode:"glow", px:[960, 1268], crop:[0.044, 0.179, 0.9, 0.681],
    src:assetPath("/assets/scale/hurricane.jpg")},
  {name:"Lua", size:"3.474 km", meters:3474000, axis:"w", mode:"photo", px:[960, 960], crop:[0, 0, 1, 1], clip:"circle(49.6%)",
    src:assetPath("/assets/scale/moon.jpg")},
  {name:"Terra", size:"12.742 km", meters:12742000, axis:"w", mode:"photo", px:[960, 961], crop:[0.053, 0.05, 0.89, 0.89], clip:"circle(49.6%)",
    src:assetPath("/assets/scale/earth.jpg")}
];

const boxes = items.map((item) => {
  const aspect = (item.px[0] * item.crop[2]) / (item.px[1] * item.crop[3]);
  return item.axis === "w" ? {w: item.meters, h: item.meters / aspect} : {w: item.meters * aspect, h: item.meters};
});

const centers = boxes.reduce<number[]>((acc, box, i) => {
  if (i === 0) return [0];
  const prev = boxes[i - 1];
  return [...acc, acc[i - 1] + prev.w / 2 + 0.35 * prev.w + 0.12 * box.w + box.w / 2];
}, []);

const ease = (x: number) => {
  const k = Math.min(1, Math.max(0, (x - 0.14) / 0.72));
  return k * k * (3 - 2 * k);
};

export function ScaleExplorer() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [view, setView] = useState({w: 1280, h: 800});

  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const total = Math.max(1, el.offsetHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total)));
      setView({w: window.innerWidth, h: window.innerHeight});
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
  const frac = ease(t - i0);
  const focus = Math.min(last, Math.round(t));

  preload(items[focus].src, {as: "image"});
  if (focus < last) preload(items[focus + 1].src, {as: "image"});

  const fit = (i: number) => Math.min((0.62 * view.w) / boxes[i].w, (0.5 * view.h) / boxes[i].h);
  const k0 = fit(i0), k1 = fit(i0 + 1);
  const px = k0 * (k1 / k0) ** frac;
  const r = k0 / k1;
  const pan = Math.abs(r - 1) < 1e-6 ? frac : (r ** frac - 1) / (r - 1);
  const camera = centers[i0] + (centers[i0 + 1] - centers[i0]) * pan;
  const cameraY = boxes[i0].h / 2 + (boxes[i0 + 1].h / 2 - boxes[i0].h / 2) * pan;
  const midY = view.h * 0.47;
  const floor = midY + cameraY * px;
  const reach = Math.max(view.w, view.h) * 6;

  const jump = (index: number) => {
    const el = ref.current;
    if (!el) return;
    const total = Math.max(1, el.offsetHeight - window.innerHeight);
    window.scrollTo({top: el.offsetTop + (index / last) * total, behavior: "smooth"});
  };

  const labelOpacity = Math.max(0, 1 - Math.max(0, Math.abs(t - focus) - 0.12) * 2.8);
  const focusX = view.w / 2 + (centers[focus] - camera) * px;
  const focusBottom = floor;

  return <div className="size-journey" ref={ref} style={{height: `calc(100svh + ${last * 120}vh)`}}>
    <div className="size-stage">
      <div className="size-field" aria-hidden="true">
        {items.map((item, i) => {
          const w = boxes[i].w * px, h = boxes[i].h * px;
          const x = view.w / 2 + (centers[i] - camera) * px;
          const big = Math.max(w, h);
          if (big < 0.4 || big > reach) return null;
          if (x + w / 2 < -40 || x - w / 2 > view.w + 40) return null;
          if (big < 3) return <i key={item.name} className="size-speck" style={{left: x, top: floor - h / 2}}/>;
          const [cx, cy, cw, ch] = item.crop;
          return <div key={item.name} className={"size-thing mode-" + item.mode} style={{left: x - w / 2, top: floor - h, width: w, height: h, clipPath: item.clip}}>
            <img src={item.src} alt="" draggable={false} style={{width: `${100 / cw}%`, height: `${100 / ch}%`, left: `${(-cx / cw) * 100}%`, top: `${(-cy / ch) * 100}%`}}/>
          </div>;
        })}
      </div>
      <p className="size-label" style={{left: focusX, top: Math.min(focusBottom + 14, view.h - 64), opacity: labelOpacity}}>
        <strong>{items[focus].name}</strong><span>{items[focus].size}</span>
      </p>
      <p className="size-hint" style={{opacity: Math.max(0, 1 - t * 2.5)}}>role para crescer</p>
      <nav className="size-rail" aria-label="Objetos da escala">
        {items.map((item, i) => <button key={item.name} title={item.name} aria-label={item.name} className={i === focus ? "on" : i < focus ? "passed" : ""} onClick={() => jump(i)}/>)}
      </nav>
      <p className="size-credit">desenhos Pearson Scott Foresman · fotos NASA · domínio público</p>
    </div>
  </div>;
}
