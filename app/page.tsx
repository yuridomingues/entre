import Link from "next/link";
import { experiments } from "@/lib/experiments";
import { ExperimentVisual } from "@/components/experiment-visuals";
import { BrandLogo } from "@/components/brand-logo";
import { SurpriseButton } from "@/components/surprise-button";

export default function Home() {
  return <main id="conteudo" className="home-page">
    <header className="home-header">
      <div className="home-brand"><BrandLogo/><small>coisas para pensar com as mãos</small></div>
      <nav aria-label="Navegação"><Link href="/sobre">sobre</Link><Link href="/fontes">fontes</Link></nav>
    </header>

    <section className="home-intro">
      <h1>Escolha uma ideia.<br/><span>Mexa nela.</span></h1>
      <p>Dez experiências curtas sobre percepção, natureza, música, linguagem, tempo, escala, acaso e vida coletiva.</p>
      <div className="intro-actions"><a href="#experimentos">ver experimentos ↓</a><SurpriseButton/></div>
    </section>

    <section id="experimentos" className="play-grid" aria-label="Experimentos">
      {experiments.map((exp) => (
        <Link href={`/${exp.slug}`} key={exp.slug} className={`play-tile tile-${exp.tone}`}>
          <div className="tile-bar"><span>{exp.number}</span><span>{exp.duration}</span></div>
          <div className="tile-visual"><ExperimentVisual slug={exp.slug}/></div>
          <div className="tile-copy"><p>{exp.question}</p><h2>{exp.title}</h2><div><span>{exp.action}</span><strong>abrir ↗</strong></div></div>
        </Link>
      ))}
    </section>

    <section className="home-note">
      <p>ENTRE não é um curso nem um feed.</p>
      <h2>Cada página transforma uma pergunta em alguma coisa que você pode fazer.</h2>
      <div><Link href="/sobre">por que existe →</Link><Link href="/fontes">fontes e créditos →</Link></div>
    </section>

    <footer className="home-footer"><BrandLogo compact/><span>feito por Yuri Domingues</span></footer>
  </main>;
}
