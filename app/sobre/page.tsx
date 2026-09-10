import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Sobre", description: "Por que o ENTRE existe e como as experiências são pensadas." };

export default function About() {
  return <main id="conteudo" className="info-page">
    <header className="info-nav"><Link href="/" className="mini-brand">ENTRE</Link><Link href="/">← voltar</Link></header>
    <article>
      <p className="info-kicker">sobre</p>
      <h1>Uma internet feita para <em>curiosidade</em>, não para rolagem infinita.</h1>
      <p className="info-lead">ENTRE é uma coleção de pequenos experimentos interativos. A regra é simples: quando uma ideia pode virar ação, a ação vem antes da explicação.</p>
      <div className="principles">
        <section><span>01</span><h2>Entender fazendo.</h2><p>Rolar vira tempo. Ouvir vira comparação. Escolher vira argumento. A interface não ilustra a ideia; ela participa dela.</p></section>
        <section><span>02</span><h2>Sem placar.</h2><p>Nada aqui mede inteligência, produtividade ou personalidade. Não há ranking, streak ou resultado para provar alguma coisa.</p></section>
        <section><span>03</span><h2>Visual com função.</h2><p>Os desenhos são simples e feitos como parte da interface. Sem imagens geradas por IA para fingir profundidade visual.</p></section>
        <section><span>04</span><h2>Sem conta.</h2><p>As experiências funcionam no navegador e não precisam de um perfil seu para fazer sentido.</p></section>
      </div>
      <div className="info-end"><strong>ENTRE</strong><p>projeto autoral de Yuri Domingues</p></div>
    </article>
  </main>;
}
