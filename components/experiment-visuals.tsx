export function ExperimentVisual({ slug }: { slug: string }) {
  if (slug === "arvore") return (
    <svg className="experiment-visual" viewBox="0 0 320 200" role="img" aria-label="Anéis de crescimento de uma árvore">
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="160" cy="100" rx="126" ry="72"/><ellipse cx="160" cy="100" rx="104" ry="59"/>
        <ellipse cx="160" cy="100" rx="80" ry="45"/><ellipse cx="160" cy="100" rx="57" ry="31"/>
        <ellipse cx="160" cy="100" rx="31" ry="17"/><path d="M160 100 272 68M160 100 73 148M160 100 147 30"/>
      </g>
      <circle cx="160" cy="100" r="4" fill="currentColor"/>
    </svg>
  );
  if (slug === "mente") return (
    <svg className="experiment-visual" viewBox="0 0 320 200" role="img" aria-label="Duas formas que mudam conforme o ponto de vista">
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M58 47c40 16 48 48 49 58-1 12-10 40-49 52M262 47c-40 16-48 48-49 58 1 12 10 40 49 52"/>
        <path d="M122 54c21 8 28 25 28 38 0 13-8 23-8 34 0 13 8 21 18 28 10-7 18-15 18-28 0-11-8-21-8-34 0-13 7-30 28-38"/>
      </g>
      <circle cx="160" cy="101" r="8" fill="currentColor"/>
    </svg>
  );
  if (slug === "musica") return (
    <svg className="experiment-visual" viewBox="0 0 320 200" role="img" aria-label="Forma de onda sonora">
      <path d="M20 100h38l10-26 18 66 19-99 20 123 20-91 20 55 19-27 18 8 20-44 18 70 18-35h42" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M20 166h280M20 34h280" fill="none" stroke="currentColor" strokeWidth="1" opacity=".25"/>
    </svg>
  );
  if (slug === "conversa") return (
    <svg className="experiment-visual" viewBox="0 0 320 200" role="img" aria-label="Duas caixas de conversa">
      <path d="M36 38h158v78H96l-35 28 8-28H36zM132 92h152v73H214l-31 23 7-23h-58z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
      <circle cx="76" cy="77" r="5" fill="currentColor"/><circle cx="102" cy="77" r="5" fill="currentColor"/><circle cx="128" cy="77" r="5" fill="currentColor"/>
      <path d="M170 126h76M170 143h52" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
  return (
    <svg className="experiment-visual" viewBox="0 0 320 200" role="img" aria-label="Semanas organizadas em uma grade">
      {Array.from({length:48}).map((_,i)=><circle key={i} cx={42+(i%12)*21.5} cy={55+Math.floor(i/12)*30} r="5" fill={i<31?"currentColor":"none"} stroke="currentColor" strokeWidth="1.5"/>)}
    </svg>
  );
}

export function IdeaMap() {
  return (
    <div className="idea-map" aria-label="Mapa dos temas do ENTRE">
      <div className="idea-map-center"><span>uma ideia</span><strong>?</strong></div>
      <span className="idea-node node-1">mente</span><span className="idea-node node-2">natureza</span>
      <span className="idea-node node-3">música</span><span className="idea-node node-4">linguagem</span>
      <span className="idea-node node-5">tempo</span>
      <svg viewBox="0 0 420 420" aria-hidden="true"><g fill="none" stroke="currentColor" opacity=".22"><path d="M210 210 104 82M210 210 318 88M210 210 336 264M210 210 92 288M210 210 212 354"/><circle cx="210" cy="210" r="142"/><circle cx="210" cy="210" r="92"/></g></svg>
    </div>
  );
}
