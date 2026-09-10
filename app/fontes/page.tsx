import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Fontes", description: "Referências e limites editoriais das experiências do ENTRE." };

export default function Sources() {
  return <main id="conteudo" className="info-page">
    <header className="info-nav"><Link href="/" className="mini-brand">ENTRE</Link><Link href="/">← voltar</Link></header>
    <article>
      <p className="info-kicker">fontes e créditos</p>
      <h1>Brincar com uma ideia não significa <em>inventar os fatos.</em></h1>
      <p className="info-lead">As experiências simplificam assuntos para torná-los interativos. Aqui ficam as referências principais e os limites de cada metáfora.</p>
      <div className="sources-list">
        <section><span>01</span><div><h2>A árvore que viu tudo</h2><p>A árvore de 1500 é imaginária e funciona apenas como régua narrativa. A leitura científica de anéis de crescimento é estudada pela dendrocronologia.</p><a href="https://www.usgs.gov/media/images/tree-ring-illustration" target="_blank" rel="noreferrer">U.S. Geological Survey ↗</a></div></section>
        <section><span>02</span><div><h2>O mundo que seu cérebro inventa</h2><p>As demonstrações são inspiradas no efeito Stroop, cegueira à mudança e limites da memória de trabalho. Não são testes clínicos nem de inteligência.</p></div></section>
        <section><span>03</span><div><h2>Anatomia de uma música</h2><p>O som é sintetizado no navegador com Web Audio API. Frequência, forma de onda e timbre são tratados de maneira introdutória.</p><a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API" target="_blank" rel="noreferrer">MDN Web Audio API ↗</a></div></section>
        <section><span>04</span><div><h2>A história de uma conversa</h2><p>“Profundidade” é uma metáfora de interface. Conversas cotidianas não são inferiores a conversas pessoais, e contexto importa.</p></div></section>
        <section><span>05</span><div><h2>Quanto cabe em uma vida?</h2><p>Semanas são uma unidade visual para tornar anos menos abstratos. A página não prescreve como alguém deve usar seu tempo.</p></div></section>
      </div>
      <div className="credits-box"><strong>Crédito visual</strong><p>Os visuais principais do site são SVGs geométricos simples feitos como parte da própria interface. Não foram usadas imagens geradas por IA.</p></div>
    </article>
  </main>;
}
