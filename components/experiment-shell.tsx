import Link from "next/link";
import type { ReactNode } from "react";
import { experiments, getExperiment } from "@/lib/experiments";
import { ExperimentVisual } from "@/components/experiment-visuals";
import { BrandLogo } from "@/components/brand-logo";

const hints: Record<string,string> = {
  arvore:"role para atravessar o tempo",
  mente:"responda antes de revelar",
  musica:"ouça e desligue camadas",
  conversa:"escolha o detalhe que seguiria",
  vida:"arraste a escala",
  escala:"avance pelas comparações",
  acaso:"solte os pontos",
  noite:"diminua a luz",
  rede:"mude os começos e a ponte",
  cooperar:"escolha sem saber a resposta do outro",
  memoria:"olhe, esconda, reconstrua",
  mudanca:"mude o começo e deixe acontecer",
  centro:"coloque antes de calcular",
  atencao:"conte uma coisa só",
  evidencia:"puxe pistas e mova sua certeza"
};

export function ExperimentShell({ slug, title, intro, children }: { slug: string; title: string; intro: string; children: ReactNode }) {
  const exp = getExperiment(slug)!;
  const index = experiments.findIndex((item) => item.slug === slug);
  const next = experiments[(index + 1) % experiments.length];

  return <main id="conteudo" className={"experience-page tone-"+exp.tone}>
    <div className="experience-nav">
      <BrandLogo compact/>
      <Link href="/#experimentos" className="close-experience" aria-label="Voltar à coleção">×</Link>
    </div>

    <section className="experience-cover">
      <div className="cover-copy">
        <div className="cover-meta"><span>{exp.number}</span><span>{exp.eyebrow}</span><span>{exp.duration}</span>{exp.group==="experiment"&&<span>em experimento</span>}</div>
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
