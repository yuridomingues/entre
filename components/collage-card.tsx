import type { CSSProperties } from "react";
import { assetPath } from "@/lib/asset-path";

type Asset = { src: string; width: number; height: number };

const A: Record<string, Asset> = {
  oak: { src: assetPath("/assets/collage/oak.jpg"), width: 768, height: 639 },
  brain: { src: assetPath("/assets/collage/brain.jpg"), width: 565, height: 768 },
  music: { src: assetPath("/assets/collage/music.jpg"), width: 627, height: 768 },
  talk: { src: assetPath("/assets/collage/talk.jpg"), width: 447, height: 768 },
  clock: { src: assetPath("/assets/collage/clock.jpg"), width: 768, height: 533 },
  reading: { src: assetPath("/assets/collage/reading.jpg"), width: 489, height: 768 },
  microscope: { src: assetPath("/assets/collage/microscope.jpg"), width: 620, height: 768 },
  switchboard: { src: assetPath("/assets/collage/switchboard.jpg"), width: 768, height: 655 },
  planets: { src: assetPath("/assets/collage/planets.jpg"), width: 581, height: 768 },
  mansion: { src: assetPath("/assets/collage/mansion.jpg"), width: 553, height: 768 },
  person: { src: assetPath("/assets/collage/person.jpg"), width: 405, height: 768 },
  ant: { src: assetPath("/assets/collage/ant.jpg"), width: 768, height: 639 },
  study: { src: assetPath("/assets/collage/study.jpg"), width: 569, height: 768 },
  seesaw: { src: assetPath("/assets/collage/seesaw.jpg"), width: 605, height: 768 },
  heron: { src: assetPath("/assets/collage/heron.jpg"), width: 768, height: 642 },
  questions: { src: assetPath("/assets/collage/questions.jpg"), width: 506, height: 768 },
  tower: { src: assetPath("/assets/collage/tower.jpg"), width: 758, height: 768 },
  palette: { src: assetPath("/assets/collage/palette.jpg"), width: 768, height: 456 },
  ship: { src: assetPath("/assets/collage/ship.jpg"), width: 623, height: 768 },
  ferry: { src: assetPath("/assets/collage/ferry.jpg"), width: 591, height: 768 },
  earth: { src: assetPath("/assets/collage/earth.jpg"), width: 768, height: 498 },
};

const sceneAssets: Record<string, Asset[]> = {
  arvore: [A.oak],
  mente: [A.brain],
  musica: [A.music],
  conversa: [A.talk],
  vida: [A.clock],
  escala: [A.microscope],
  acaso: [A.planets],
  noite: [A.mansion],
  rede: [A.switchboard],
  cooperar: [A.ant],
  memoria: [A.study],
  mudanca: [A.seesaw],
  atencao: [A.heron],
  aleatorio: [A.person],
  perguntas: [A.questions],
  regra: [A.reading],
  minuto: [A.tower],
  stroop: [A.palette],
};

const accent: Record<string, string> = {
  arvore: "#78834B", mente: "#64416F", musica: "#d8b84d", conversa: "#6aa4b2",
  vida: "#9b684d", escala: "#9aac5c", acaso: "#bd7294", noite: "#3b405c",
  rede: "#6ea683", cooperar: "#d57d66", memoria: "#8d79b8", mudanca: "#7daab6",
  atencao: "#d9b64c", aleatorio: "#bd7294", perguntas: "#6ea683", regra: "#7daab6",
  minuto: "#aa775a", stroop: "#76558b",
};

function Tape({ className = "" }: { className?: string }) {
  return <i className={"collage-tape " + className} aria-hidden="true" />;
}

function Scribble({ children, className = "" }: { children: string; className?: string }) {
  return <span className={"collage-scribble " + className}>{children}</span>;
}

export function CollageCard({ scene, className = "", priority = false }: { scene: string; className?: string; priority?: boolean }) {
  const imgs = sceneAssets[scene] || [A.reading];
  const color = accent[scene] || "#64416F";

  return <div className={"collage-card scene-" + scene + " " + className} style={{ "--accent": color } as CSSProperties} aria-hidden="true">
    <div className="collage-paper collage-paper-main"/>
    <div className="collage-halftone"/>
    {imgs.map((asset, i) => <img
      key={asset.src+i}
      src={asset.src}
      width={asset.width}
      height={asset.height}
      alt=""
      className={"collage-img piece piece-"+i}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "low"}
      decoding="async"
    />)}
    {scene==="rede"&&<><span className="collage-node n1"/><span className="collage-node n2"/><span className="collage-node n3"/><span className="collage-node n4"/><b className="collage-bridge"/></>}
    {scene==="mudanca"&&<><b className="trajectory t1"/><b className="trajectory t2"/></>}
    {scene==="aleatorio"&&<><Scribble>←</Scribble><Scribble className="right">→</Scribble></>}
    {scene==="regra"&&<Scribble className="numbers">2 · 4 · 6 · ?</Scribble>}
    {scene==="stroop"&&<><Scribble className="stroop s1">AZUL</Scribble><Scribble className="stroop s2">VERDE</Scribble></>}
    <Tape className="top"/><Tape className="bottom"/>
  </div>;
}
