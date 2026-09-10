import Link from "next/link";
import { experiments } from "@/lib/experiments";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="overline">um pequeno laboratório de curiosidade</p>
          <h1>Algumas ideias<br/>merecem ser <em>sentidas.</em></h1>
          <p className="hero-lede">Não é um curso. Não é um feed. É um lugar para mexer em ideias até elas fazerem sentido.</p>
          <a className="text-link" href="#experimentos">começar a explorar ↓</a>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit orbit-a"><span>mente</span></div>
          <div className="orbit orbit-b"><span>natureza</span></div>
          <div className="orbit orbit-c"><span>música</span></div>
          <div className="seed">?</div>
        </div>
      </section>

      <section className="manifesto-strip" aria-label="Manifesto curto">
        <p>rolar pode virar <strong>tempo</strong></p><i>·</i>
        <p>clicar pode virar <strong>escolha</strong></p><i>·</i>
        <p>ouvir pode virar <strong>entendimento</strong></p>
      </section>

      <section id="experimentos" className="experiments-section">
        <div className="section-heading"><p>coleção 001</p><h2>Experimentos para gente curiosa.</h2></div>
        <div className="experiment-grid">
          {experiments.map((exp, index) => (
            <Link href={`/${exp.slug}`} className={`experiment-card ${exp.className} ${index === 0 ? "feature-card" : ""}`} key={exp.slug}>
              <div className="card-top"><span>{exp.number}</span><span>{exp.eyebrow}</span></div>
              <div className="card-art" aria-hidden="true"><span></span><span></span><span></span></div>
              <div className="card-copy"><h3>{exp.title}</h3><p>{exp.description}</p><strong>{exp.prompt} →</strong></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="closing-note">
        <p className="overline">por que isso existe?</p>
        <blockquote>"A internet também pode ser um lugar que recompensa a curiosidade."</blockquote>
        <p>ENTRE é uma coleção independente de experiências sobre o que existe ao nosso redor — e dentro da gente.</p>
        <Link className="text-link" href="/sobre">ler o manifesto →</Link>
      </section>
    </>
  );
}
