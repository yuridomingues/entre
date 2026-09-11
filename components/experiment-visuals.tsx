export function ExperimentVisual({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const cls = compact ? "tile-art compact" : "tile-art";

  if (slug === "arvore") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Árvore desenhada à mão">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M210 231c-5-49-4-95 1-138 3-24 7-45 12-65" strokeWidth="8"/>
        <path d="M212 140c-27-34-58-58-92-72M214 116c31-38 64-67 101-86M211 170c-40-17-77-23-113-19M211 184c38-5 73 3 106 25" strokeWidth="6"/>
        <path d="M216 231c-5-48-2-94 4-136 4-24 8-45 13-64" strokeWidth="2" opacity=".25"/>
        <path d="M66 232c83 4 163-2 284 0" strokeWidth="5"/>
      </g>
      <g fill="currentColor" opacity=".82">
        <ellipse cx="114" cy="65" rx="25" ry="17" transform="rotate(-16 114 65)"/>
        <ellipse cx="159" cy="84" rx="30" ry="20" transform="rotate(11 159 84)"/>
        <ellipse cx="226" cy="54" rx="35" ry="23" transform="rotate(-8 226 54)"/>
        <ellipse cx="294" cy="67" rx="29" ry="19" transform="rotate(14 294 67)"/>
        <ellipse cx="335" cy="112" rx="24" ry="17" transform="rotate(-12 335 112)"/>
        <ellipse cx="137" cy="132" rx="28" ry="19" transform="rotate(7 137 132)"/>
        <ellipse cx="271" cy="127" rx="32" ry="21" transform="rotate(-9 271 127)"/>
      </g>
    </svg>
  );

  if (slug === "mente") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Olho">
      <path d="M45 130c45-72 105-93 165-93s120 21 165 93c-45 72-105 93-165 93S90 202 45 130Z" fill="none" stroke="currentColor" strokeWidth="5"/>
      <circle cx="210" cy="130" r="58" fill="currentColor"/><circle cx="210" cy="130" r="25" fill="#fffdf8"/><circle cx="192" cy="112" r="7" fill="#fffdf8"/>
    </svg>
  );

  if (slug === "musica") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Forma de onda">
      <path d="M22 131h52l12-31 20 68 18-119 21 162 22-129 21 83 21-47 20 27 20-15 22-71 20 140 21-97 21 56 20-27h65" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  if (slug === "conversa") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Balões de conversa">
      <path d="M42 35h205v75H118l-39 30 9-30H42ZM166 116h212v78H251l-42 32 11-32h-54Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round"/>
      <path d="M82 73h92M215 151h115M215 174h79" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
    </svg>
  );

  if (slug === "vida") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Grade de semanas">
      {Array.from({length:70}).map((_,i)=><circle key={i} cx={48+(i%14)*25} cy={54+Math.floor(i/14)*38} r="7" fill={i<44?"currentColor":"none"} stroke="currentColor" strokeWidth="2"/>)}
    </svg>
  );

  if (slug === "escala") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Rabiscos de objetos em diferentes escalas">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M53 216c78 2 151-2 224 1 42 2 81 0 112-2" strokeWidth="5"/>
        <path d="M55 220c80-1 150 3 222 0 43-2 79 1 109 1" strokeWidth="2" opacity=".28"/>
        <circle cx="82" cy="193" r="9" strokeWidth="4"/>
        <path d="M141 133c9-2 31-2 40 0 2 20 2 62 0 82-9 2-31 2-40 0-2-20-2-62 0-82Z" strokeWidth="4"/>
        <circle cx="236" cy="119" r="16" strokeWidth="4"/>
        <path d="M236 136v79M214 158l22-18 24 18M236 177l-17 38M236 177l20 38" strokeWidth="4"/>
        <path d="M300 112c13-3 43-3 57 0 4 22 4 80 0 102-13 3-43 3-57 0-4-22-4-80 0-102Z" strokeWidth="4"/>
        <path d="M309 133h39v42h-39M328 133v42" strokeWidth="2.5"/>
      </g>
    </svg>
  );

  if (slug === "acaso") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Pontos formando uma distribuição">
      {Array.from({length:45}).map((_,i)=>{
        const col=i%9; const row=Math.floor(i/9); const height=Math.abs(col-4);
        const x=75+col*34; const y=210-row*28-height*5;
        return <circle key={i} cx={x} cy={y} r="8" fill="currentColor"/>;
      })}
      <path d="M48 226h324" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
    </svg>
  );

  if (slug === "noite") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Cidade sob um céu estrelado">
      <g fill="currentColor">
        <path d="M40 213V132h62v81M92 213V92h72v121M151 213v-58h71v58M208 213V112h75v101M272 213V72h72v141M335 213v-91h45v91"/>
        <circle cx="75" cy="52" r="5"/><circle cx="135" cy="39" r="4"/><circle cx="206" cy="54" r="6"/><circle cx="253" cy="30" r="4"/><circle cx="330" cy="44" r="5"/>
      </g>
      <path d="M32 214h356" stroke="currentColor" strokeWidth="6"/>
    </svg>
  );

  if (slug === "rede") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Rede de pontos conectados">
      <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity=".8">
        <path d="M55 75 126 49 180 92 116 137 60 177 142 210 206 166 264 193 316 150 368 188M180 92l26 74M126 49l-10 88M206 166l58 27M264 193l52-43M316 150l25-73M341 77l-76 14M265 91l-59 75"/>
      </g>
      <g fill="#fffdf8" stroke="currentColor" strokeWidth="4">
        {[ [55,75],[126,49],[180,92],[116,137],[60,177],[142,210],[206,166],[264,193],[316,150],[368,188],[341,77],[265,91] ].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="13"/>)}
      </g>
      <circle cx="126" cy="49" r="8" fill="currentColor"/><circle cx="116" cy="137" r="8" fill="currentColor"/><circle cx="180" cy="92" r="8" fill="currentColor"/>
    </svg>
  );

  if (slug === "centro") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Pontos em um mapa e dois centros possíveis">
      <g fill="currentColor">
        {[ [62,82],[119,55],[151,122],[86,174],[180,194],[212,82],[238,145],[292,204],[346,64],[371,170] ].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="8"/>)}
      </g>
      <circle cx="205" cy="137" r="28" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="8 7"/>
      <path d="M184 137h42M205 116v42" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <circle cx="267" cy="135" r="15" fill="#fffdf8" stroke="currentColor" strokeWidth="4"/>
    </svg>
  );

  return null;
}
