export function ExperimentVisual({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const cls = compact ? "tile-art compact" : "tile-art";
  if (slug === "arvore") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Ilustração simples de uma árvore e seus anéis">
      <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M204 233c-5-48-4-91 5-128m0 32-48-39m47 18 50-45m-51 79-71 1m72 18 66 12"/>
        <path d="M182 235h57"/>
      </g>
      <g fill="currentColor">
        <circle cx="146" cy="79" r="43"/><circle cx="206" cy="64" r="52"/><circle cx="272" cy="85" r="45"/>
        <circle cx="116" cy="136" r="37"/><circle cx="181" cy="126" r="48"/><circle cx="249" cy="130" r="53"/><circle cx="311" cy="139" r="34"/>
      </g>
      <g fill="#fffdf8" opacity=".85"><circle cx="156" cy="93" r="6"/><circle cx="227" cy="45" r="5"/><circle cx="286" cy="116" r="6"/><circle cx="192" cy="144" r="4"/></g>
    </svg>
  );
  if (slug === "mente") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Olho geométrico e formas ambíguas">
      <path d="M45 130c45-72 105-93 165-93s120 21 165 93c-45 72-105 93-165 93S90 202 45 130Z" fill="none" stroke="currentColor" strokeWidth="5"/>
      <circle cx="210" cy="130" r="58" fill="currentColor"/><circle cx="210" cy="130" r="25" fill="#fffdf8"/>
      <circle cx="192" cy="112" r="7" fill="#fffdf8"/>
      <g fill="none" stroke="currentColor" strokeWidth="3" opacity=".5"><path d="M45 64h64M311 196h64M72 210l44-34M304 85l44-35"/></g>
    </svg>
  );
  if (slug === "musica") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Forma de onda sonora desenhada">
      <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 131h52l12-31 20 68 18-119 21 162 22-129 21 83 21-47 20 27 20-15 22-71 20 140 21-97 21 56 20-27h65"/>
      </g>
      <g fill="currentColor"><circle cx="84" cy="44" r="8"/><circle cx="330" cy="55" r="6"/><circle cx="357" cy="192" r="9"/></g>
    </svg>
  );
  if (slug === "conversa") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Balões de conversa descendo em camadas">
      <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round">
        <path d="M42 35h205v75H118l-39 30 9-30H42Z"/>
        <path d="M166 116h212v78H251l-42 32 11-32h-54Z"/>
      </g>
      <g fill="currentColor"><circle cx="89" cy="73" r="7"/><circle cx="119" cy="73" r="7"/><circle cx="149" cy="73" r="7"/></g>
      <path d="M215 151h115M215 174h79" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
    </svg>
  );
  return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Grade de semanas preenchidas">
      <g>
        {Array.from({length:70}).map((_,i)=><circle key={i} cx={48+(i%14)*25} cy={54+Math.floor(i/14)*38} r="7" fill={i<44?"currentColor":"none"} stroke="currentColor" strokeWidth="2"/>)}
      </g>
    </svg>
  );
}
