import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sobre", description: "Por que o ENTRE existe." };

export default function About() {
  return <main id="conteudo" className="info-page">
    <header className="info-nav"><Link href="/" className="mini-brand">ENTRE</Link><Link href="/">← voltar</Link></header>
    <article>
      <p className="info-kicker">sobre</p>
      <h1>Uma internet feita para <em>curiosidade</em>.</h1>
      <p className="info-lead">ENTRE é uma coleção de coisas que ficam mais interessantes quando você pode mexer nelas.</p>
      <div className="principles">
        <section><span>01</span><h2>Primeiro, experimente.</h2><p>Rolar pode virar tempo. Ouvir pode virar comparação. Uma escolha pode mudar o sentido de uma conversa.</p></section>
        <section><span>02</span><h2>Sem placar.</h2><p>Não tem ranking, sequência diária ou resultado para provar alguma coisa.</p></section>
        <section><span>03</span><h2>Desenho com motivo.</h2><p>As formas, cores e movimentos existem para ajudar uma ideia a acontecer na tela.</p></section>
        <section><span>04</span><h2>Entre e saia.</h2><p>Não precisa criar conta. Escolha algo interessante, brinque um pouco e siga o dia.</p></section>
      </div>
      <div className="info-end"><strong>ENTRE</strong><p>feito por Yuri Domingues</p></div>
    </article>
  </main>;
}
