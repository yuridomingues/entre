import Link from "next/link";
import { experiments } from "@/lib/experiments";
import { ExperimentVisual, IdeaMap } from "@/components/experiment-visuals";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="overline">ENTRE / coleção 001</p>
          <h1>Um lugar para<br/><em>explorar ideias.</em></h1>
          <p className="hero-lede">Cinco experiências curtas sobre mente, natureza, música, conversa e tempo. Você aprende mexendo, ouvindo, escolhendo e observando.</p>
          <div className="hero-actions"><a className="primary-link" href="#experimentos">escolher um experimento ↓</a><Link className="secondary-link" href="/sobre">entender o projeto</Link></div>
          <div className="hero-facts"><span>5 experiências</span><span>3–8 min cada</span><span>sem login</span></div>
        </div>
        <IdeaMap />
      </section>

      <section className="how-section" aria-labelledby="como-funciona">
        <p className="overline">como funciona</p>
        <h2 id="como-funciona">Primeiro você experimenta.<br/>A explicação vem depois.</h2>
        <div className="how-grid">
          <article><span>01</span><h3>Escolha uma pergunta</h3><p>Não precisa seguir ordem. Entre pela ideia que mais puxar sua curiosidade.</p></article>
          <article><span>02</span><h3>Faça alguma coisa</h3><p>Role, ouça, escolha, compare. A interface faz parte da ideia — não é só decoração.</p></article>
          <article><span>03</span><h3>Leve outra pergunta</h3><p>O objetivo não é terminar sabendo tudo. É sair vendo o assunto de um jeito menos automático.</p></article>
        </div>
      </section>

      <section id="experimentos" className="experiments-section">
        <div className="collection-heading"><div><p className="overline">coleção 001</p><h2>Escolha por curiosidade.</h2></div><p>Não existe caminho certo. Cada experiência funciona sozinha.</p></div>
        <div className="experiment-grid">
          {experiments.map((exp) => (
            <Link href={`/${exp.slug}`} className={`experiment-card card-${exp.tone}`} key={exp.slug} aria-label={`${exp.title}. ${exp.duration}. Abrir experimento.`}>
              <div className="card-top"><span>{exp.number}</span><span>{exp.eyebrow}</span></div>
              <div className="card-visual-wrap"><ExperimentVisual slug={exp.slug}/></div>
              <div className="card-copy">
                <p className="card-question">{exp.question}</p>
                <h3>{exp.title}</h3>
                <p className="card-description">{exp.description}</p>
                <div className="card-bottom"><span>{exp.duration} · {exp.action}</span><strong>abrir →</strong></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="closing-note">
        <p className="overline">uma web que vale a pena visitar</p>
        <blockquote>Menos coisa pedindo atenção.<br/>Mais coisa que recompensa atenção.</blockquote>
        <p>ENTRE é um projeto independente e não comercial. Sem conta, ranking, sequência diária ou respostas armazenadas.</p>
        <div><Link className="secondary-link" href="/sobre">ler o manifesto</Link><Link className="secondary-link" href="/fontes">fontes e créditos</Link></div>
      </section>
    </>
  );
}
