import Link from "next/link";
import type { ReactNode } from "react";
import { experiments, getExperiment } from "@/lib/experiments";

export function ExperimentShell({ slug, title, intro, children }: { slug: string; title: string; intro: string; children: ReactNode }) {
  const exp = getExperiment(slug)!;
  const index = experiments.findIndex((item) => item.slug === slug);
  const next = experiments[(index + 1) % experiments.length];

  return (
    <article className={`experiment-page tone-${exp.tone}`}>
      <header className="experiment-heading">
        <Link href="/#experimentos" className="back-link">← voltar à coleção</Link>
        <div className="kicker"><span>{exp.number}</span>{exp.eyebrow}</div>
        <h1>{title}</h1>
        <p>{intro}</p>
        <div className="experiment-meta" aria-label="Informações do experimento">
          <span><small>tempo</small>{exp.duration}</span>
          <span><small>interação</small>{exp.action}</span>
          <span><small>privacidade</small>nada é salvo</span>
        </div>
        <a className="start-link" href="#experiencia">começar a experiência ↓</a>
      </header>
      <div id="experiencia">{children}</div>
      <section className="next-experiment">
        <div><p className="overline">continuar explorando</p><h2>{next.question}</h2></div>
        <Link href={`/${next.slug}`}><span>{next.number}</span><strong>{next.title}</strong><em>abrir →</em></Link>
      </section>
    </article>
  );
}
