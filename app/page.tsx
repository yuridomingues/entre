import Link from "next/link";
import { publicExperiments, type Experiment } from "@/lib/experiments";
import { ExperimentVisual } from "@/components/experiment-visuals";
import { BrandLogo } from "@/components/brand-logo";
import { SurpriseButton } from "@/components/surprise-button";


function Cards({items,compact=false}:{items:Experiment[];compact?:boolean}){
  return <div className={compact?"play-grid experimental-grid":"play-grid"}>
    {items.map(exp=>(
      <Link href={"/"+exp.slug} key={exp.slug} className={"play-tile tile-"+exp.tone+(compact?" compact-tile":"")}>
        <div className="tile-bar"><span>{exp.number}</span><span>{exp.duration}</span></div>
        <div className="tile-visual"><ExperimentVisual slug={exp.slug}/></div>
        <div className="tile-copy"><p>{exp.question}</p><h2>{exp.title}</h2><div><span>{exp.action}</span><strong>abrir ↗</strong></div></div>
      </Link>
    ))}
  </div>;
}

function pick(slugs:string[], items:Experiment[]){
  return slugs.map(slug=>items.find(exp=>exp.slug===slug)).filter(Boolean) as Experiment[];
}

export default function Home() {
  const published=publicExperiments();
  const flagships=pick(["acaso","musica","vida","arvore"], published);
  const collection=pick(["mente","conversa","escala","noite"], published);
  const fresh=published.filter(exp=>exp.group==="experiment");

  return <main id="conteudo" className="home-page">
    <header className="home-header">
      <div className="home-brand"><BrandLogo/><small>coisas para pensar com as mãos</small></div>
      <nav aria-label="Navegação"><Link href="/sobre">sobre</Link><Link href="/fontes">fontes</Link></nav>
    </header>

    <section className="home-intro">
      <h1>Escolha uma ideia.<br/><span>Mexa nela.</span></h1>
      <p>Experimentos curtos para perceber, comparar, testar, ouvir e mudar de ideia com as próprias mãos.</p>
      <div className="intro-actions"><a href="#experimentos">ver experimentos ↓</a><SurpriseButton/></div>
    </section>

    <section id="experimentos" className="collection-block">
      <header className="collection-heading"><span>comece por aqui</span><h2>As experiências que melhor apresentam o ENTRE.</h2><p>Quatro jeitos diferentes de descobrir alguma coisa mexendo, não lendo uma explicação pronta.</p></header>
      <Cards items={flagships}/>
    </section>

    <section className="collection-block collection-secondary">
      <header className="collection-heading"><span>explore mais</span><h2>A coleção continua.</h2><p>Percepção, linguagem, escala e céu. Nem toda experiência precisa pedir o mesmo tipo de atenção.</p></header>
      <Cards items={collection}/>
    </section>

    <section className="collection-block collection-new">
      <header className="collection-heading"><span>mais experiências</span><h2>Outras perguntas para mexer.</h2><p>Tempo, acaso, hipótese e leitura. Cada uma pede um gesto diferente.</p></header>
      <Cards items={fresh} compact/>
    </section>

    <section className="home-note">
      <p>ENTRE não é um curso nem um feed.</p>
      <h2>Cada página tenta transformar uma pergunta em alguma coisa que você pode fazer.</h2>
      <div><Link href="/sobre">por que existe →</Link><Link href="/fontes">fontes e créditos →</Link></div>
    </section>

    <footer className="home-footer"><BrandLogo compact/><span>feito por Yuri Domingues</span></footer>
  </main>;
}
