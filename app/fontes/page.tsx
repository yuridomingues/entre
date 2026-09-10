import type { Metadata } from "next";
export const metadata: Metadata = { title: "Fontes e créditos", description: "Referências editoriais e créditos visuais das experiências do ENTRE." };

export default function Sources(){
  return <article className="sources-page">
    <p className="overline">fontes e créditos</p>
    <h1>Curiosidade também precisa de procedência.</h1>
    <p className="lead">As experiências simplificam ideias para torná-las interativas. Esta página registra as referências principais e deixa claro onde a experiência é uma metáfora, não uma medição científica.</p>
    <section className="source-list">
      <article><span>01</span><div><h2>A árvore que viu tudo</h2><p>A árvore de 1500 é uma régua narrativa, não um indivíduo histórico documentado. A leitura dos anéis de crescimento é estudada pela dendrocronologia.</p><a href="https://www.usgs.gov/media/images/tree-ring-illustration" target="_blank" rel="noreferrer">USGS — Tree Ring Illustration ↗</a></div></article>
      <article><span>02</span><div><h2>O mundo que seu cérebro inventa</h2><p>Demonstrações inspiradas no efeito Stroop, cegueira à mudança e limites da memória de trabalho. São experiências educativas, não testes clínicos ou de inteligência.</p></div></article>
      <article><span>03</span><div><h2>Anatomia de uma música</h2><p>O áudio é sintetizado no navegador com Web Audio API. As relações entre frequência, forma de onda e timbre são apresentadas de forma introdutória.</p><a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API" target="_blank" rel="noreferrer">MDN — Web Audio API ↗</a></div></article>
      <article><span>04</span><div><h2>A história de uma conversa</h2><p>A metáfora de “profundidade” organiza tipos de pergunta e de troca. Ela não pretende classificar relações nem afirmar que conversas pessoais são sempre melhores que conversas cotidianas.</p></div></article>
      <article><span>05</span><div><h2>Quanto cabe em uma vida?</h2><p>Semanas são usadas apenas como unidade visual para reduzir a abstração dos anos. A experiência não define como o tempo de alguém deveria ser usado.</p></div></article>
    </section>
    <aside className="credit-note"><strong>Imagens</strong><p>O projeto evita imagens geradas por IA. Os cartões usam ilustrações geométricas simples feitas em SVG. Na experiência da árvore, a imagem de referência dos anéis é do U.S. Geological Survey e está marcada como domínio público na página de origem.</p></aside>
  </article>
}
