import Link from "next/link";

const experiments = [
  { slug:"arvore",number:"01",eyebrow:"natureza + tempo",title:"A árvore que viu tudo",description:"Quinhentos anos cabem em uma rolagem. Veja o mundo mudar no tempo de uma árvore.",prompt:"desça por 526 anos",className:"card-moss" },
  { slug:"mente",number:"02",eyebrow:"psicologia + percepção",title:"O mundo que seu cérebro inventa",description:"Você não percebe tudo que vê. Teste atenção, cor, memória e as pequenas apostas que o cérebro faz.",prompt:"teste sua percepção",className:"card-violet" },
  { slug:"musica",number:"03",eyebrow:"música + física",title:"Anatomia de uma música",description:"Desmonte som em frequência, ritmo, harmonia e textura — e monte tudo de novo com os próprios ouvidos.",prompt:"ligue o som",className:"card-sun" },
  { slug:"conversa",number:"04",eyebrow:"linguagem + psicologia",title:"A história de uma conversa",description:"De 'calor hoje, né?' até perguntas que mudam uma relação. Explore o que faz uma conversa ganhar profundidade.",prompt:"comece falando",className:"card-water" },
  { slug:"vida",number:"05",eyebrow:"tempo + filosofia",title:"Quanto cabe em uma vida?",description:"Transforme anos em semanas e semanas em escolhas. Uma maneira menos abstrata de pensar sobre tempo.",prompt:"veja o tempo",className:"card-clay" }
];

export default function Home() {
  return <>
    <section className="hero">
      <div className="hero-copy"><p className="overline">um pequeno laboratório de curiosidade</p><h1>Algumas ideias<br/>merecem ser <em>sentidas.</em></h1><p className="hero-lede">Não é um curso. Não é um feed. É um lugar para mexer em ideias até elas fazerem sentido.</p><a className="text-link" href="#experimentos">começar a explorar ↓</a></div>
      <div className="hero-orbit" aria-hidden="true"><div className="orbit orbit-a"><span>mente</span></div><div className="orbit orbit-b"><span>natureza</span></div><div className="orbit orbit-c"><span>música</span></div><div className="seed">?</div></div>
    </section>
    <section className="manifesto-strip" aria-label="Manifesto curto"><p>rolar pode virar <strong>tempo</strong></p><i>·</i><p>clicar pode virar <strong>escolha</strong></p><i>·</i><p>ouvir pode virar <strong>entendimento</strong></p></section>
    <section id="experimentos" className="experiments-section">
      <div className="section-heading"><p>coleção 001</p><h2>Experimentos para gente curiosa.</h2></div>
      <div className="experiment-grid">{experiments.map((exp,index)=><Link href={`/${exp.slug}`} className={`experiment-card ${exp.className} ${index===0?"feature-card":""}`} key={exp.slug}><div className="card-top"><span>{exp.number}</span><span>{exp.eyebrow}</span></div><div className="card-art" aria-hidden="true"><span/><span/><span/></div><div className="card-copy"><h3>{exp.title}</h3><p>{exp.description}</p><strong>{exp.prompt} →</strong></div></Link>)}</div>
    </section>
    <section className="closing-note"><p className="overline">por que isso existe?</p><blockquote>"A internet também pode ser um lugar que recompensa a curiosidade."</blockquote><p>ENTRE é uma coleção independente de experiências sobre o que existe ao nosso redor — e dentro da gente.</p><Link className="text-link" href="/sobre">ler o manifesto →</Link></section>
  </>;
}
