import Link from "next/link";
import type { ReactNode } from "react";
import { getExperiment, publicExperiments } from "@/lib/experiments";
import { ExperimentVisual } from "@/components/experiment-visuals";
import { BrandLogo } from "@/components/brand-logo";

const hints: Record<string,string> = {
  arvore:"role para atravessar o tempo",
  mente:"responda antes de revelar",
  musica:"ouça e desligue camadas",
  conversa:"escolha o detalhe que seguiria",
  vida:"arraste a escala",
  escala:"role para crescer",
  acaso:"solte os pontos",
  noite:"diminua a luz",
  rede:"escolha começos, espalhe e corte a ponte",
  cooperar:"escolha sem saber a resposta do outro",
  memoria:"olhe, esconda, reconstrua",
  mudanca:"mude o começo e deixe acontecer",
  atencao:"conte uma coisa só",
  aleatorio:"toque nos lados ou use as setas",
  perguntas:"escolha perguntas que eliminem mais",
  regra:"teste a hipótese, inclusive contra ela",
  minuto:"pare quando sentir que chegou",
  stroop:"responda à tinta, não à palavra"
};

export function ExperimentShell({ slug, title, intro, children }: { slug: string; title: string; intro: string; children: ReactNode }) {
  const catalog = getExperiment(slug)!;
  const published = publicExperiments();
  const exp = published.find((item) => item.slug === slug) ?? catalog;
  const index = published.findIndex((item) => item.slug === slug);
  const next = published[index === -1 ? 0 : (index + 1) % published.length];

  return <main id="conteudo" className={"experience-page tone-"+exp.tone}>
    <div className="experience-nav">
      <BrandLogo compact/>
      <Link href="/#experimentos" className="close-experience" aria-label="Voltar à coleção">×</Link>
    </div>

    <section className="experience-cover">
      <div className="cover-copy">
        <div className="cover-meta"><span>{exp.number}</span><span>{exp.eyebrow}</span><span>{exp.duration}</span></div>
        <p className="cover-question">{exp.question}</p>
        <h1>{title}</h1>
        <p className="cover-intro">{intro}</p>
        <div className="cover-actions"><a href="#experiencia" className="cover-start">começar ↓</a><span>{hints[slug]}</span></div>
      </div>
      <div className="cover-art"><ExperimentVisual slug={slug}/></div>
    </section>

    <section id="experiencia" className="experience-body">{children}</section>

    <section className="next-card">
      <p>próxima ideia</p>
      <Link href={"/"+next.slug} className={"next-tile tile-"+next.tone}>
        <div><span>{next.number}</span><small>{next.duration}</small></div>
        <ExperimentVisual slug={next.slug} compact/>
        <h2>{next.title}</h2>
        <strong>abrir →</strong>
      </Link>
      <Link href="/#experimentos" className="back-collection">ver todos os experimentos</Link>
    </section>
  </main>;
}
