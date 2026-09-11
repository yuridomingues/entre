import Link from "next/link";
import type { Metadata } from "next";
import { BrandLogo } from "@/components/brand-logo";

export const metadata: Metadata = { title: "Sobre", description: "Por que o ENTRE existe." };

export default function About() {
  return <main id="conteudo" className="info-page">
    <header className="info-nav"><BrandLogo compact/><Link href="/">← voltar</Link></header>
    <article>
      <p className="info-kicker">sobre</p>
      <h1>Uma internet feita para <em>curiosidade</em>.</h1>
      <p className="info-lead">ENTRE é uma coleção de coisas que ficam mais interessantes quando você pode mexer nelas.</p>
      <div className="principles">
        <section><span>01</span><h2>Primeiro, experimente.</h2><p>Rolar pode virar tempo. Ouvir pode virar comparação. Uma escolha pode mudar o sentido de uma conversa.</p></section>
        <section><span>02</span><h2>Sem placar.</h2><p>Não tem ranking, sequência diária ou resultado para provar alguma coisa.</p></section>
        <section><span>03</span><h2>Desenho com motivo.</h2><p>As formas, cores e movimentos existem para ajudar uma ideia a acontecer na tela.</p></section>
        <section><span>04</span><h2>Curiosidade sem obrigação.</h2><p>Escolha algo interessante, mexa, pense um pouco e vá embora quando quiser.</p></section>
      </div>
      <section id="apoio" className="support-note">
        <span>apoio</span>
        <h2>Se o ENTRE continuar crescendo, o apoio continua opcional.</h2>
        <p>Uma contribuição pode ajudar a bancar pesquisa, tempo de desenvolvimento e novas experiências. Ela não deve comprar acesso, vantagem ou uma versão melhor do projeto.</p>
        <p>As experiências continuam abertas. Apoiar é só uma forma de dizer: quero que isso continue existindo.</p>
      </section>
      <div className="info-end"><BrandLogo/><p>feito por Yuri Domingues</p></div>
    </article>
  </main>;
}
