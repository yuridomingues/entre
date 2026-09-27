"use client";
import { useEffect, useRef } from "react";
import { preload } from "react-dom";

const TREE="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Beech_tree_%28PSF%29.png/960px-Beech_tree_%28PSF%29.png";
const MAN="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Silhouette_of_a_man_%28PSF%29.png/960px-Silhouette_of_a_man_%28PSF%29.png";

// phase 0 = start of spring; each season is pure at the middle of its quarter
const Y0=1500.125;
const Y1=2026.375;
const VIEWPORTS=7.8;
// display cap, in years per millisecond: about 0.45 s per season
const RATE=.55/1000;

const seasons=[
  {crown:"#6e9b2f",paper:"#eef0da",ground:"#bdd08b",sun:.45},
  {crown:"#1d5728",paper:"#f5e8c4",ground:"#9dac59",sun:1},
  {crown:"#bb501b",paper:"#f3dbbd",ground:"#c69a5c",sun:.55},
  {crown:"#8f99a5",paper:"#e4e9eb",ground:"#f6f5f0",sun:.1}
];
const INK="#2a2119";

const people=[
  {name:"Copérnico",life:"1473–1543",from:1473,to:1543,ink:"#7b3a2a"},
  {name:"Newton",life:"1643–1727",from:1643,to:1727,ink:"#2d4a6b"},
  {name:"Darwin",life:"1809–1882",from:1809,to:1882,ink:"#4a5a28"},
  {name:"você",life:"2026",from:1990,to:1e4,ink:"#64416f"}
];

const clamp=(v:number)=>v<0?0:v>1?1:v;
const smooth=(k:number)=>k*k*(3-2*k);
const ramp=(v:number,a:number,b:number)=>smooth(clamp((v-a)/(b-a)));
const hex=(h:string)=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const mixHex=(a:string,b:string,t:number)=>{
  const x=hex(a),y=hex(b);
  return `rgb(${x.map((v,i)=>Math.round(v+(y[i]-v)*t)).join(" ")})`;
};

// lines take the color, white becomes transparent
const tint=(color:string,gain=1.35)=>{
  const [r,g,b]=hex(color).map(v=>(v/255).toFixed(3));
  return `0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} ${(-gain*.2126).toFixed(3)} ${(-gain*.7152).toFixed(3)} ${(-gain*.0722).toFixed(3)} ${gain} 0`;
};

// scroll (in viewports) → years: one slow first year, then about 80 years per screen
const yearAt=(()=>{
  const N=4000;
  const pace=(v:number,fast:number)=>{
    const slow=1/.6;
    if(v<.5)return slow;
    if(v<1.1)return slow+(fast-slow)*ramp(v,.5,1.1);
    if(v<VIEWPORTS-.8)return fast;
    if(v<VIEWPORTS-.5)return fast*(1-ramp(v,VIEWPORTS-.8,VIEWPORTS-.5));
    return 0;
  };
  const total=(fast:number)=>{let s=0;for(let i=0;i<N;i++)s+=pace((i+.5)/N*VIEWPORTS,fast)*VIEWPORTS/N;return s};
  const base=total(0),unit=total(1)-base;
  const fast=(Y1-Y0-base)/unit;
  const table=new Float64Array(N+1);
  table[0]=Y0;
  for(let i=0;i<N;i++)table[i+1]=table[i]+pace((i+.5)/N*VIEWPORTS,fast)*VIEWPORTS/N;
  return (v:number)=>{
    const x=clamp(v/VIEWPORTS)*N,i=Math.min(N-1,Math.floor(x));
    return table[i]+(table[i+1]-table[i])*(x-i);
  };
})();

// which two seasons are on screen, and how far the second one has come in
function seasonPair(year:number):[number,number,number]{
  let u=(((year%1)+1)%1)*4-.5;
  if(u<0)u+=4;
  const k=Math.floor(u)%4;
  return [k,(k+1)%4,smooth(clamp((u-Math.floor(u)-.3)/.4))];
}

export function TreeExperience(){
  preload(TREE,{as:"image",fetchPriority:"high"});
  preload(MAN,{as:"image"});
  const track=useRef<HTMLDivElement>(null);
  const stage=useRef<HTMLDivElement>(null);
  const sun=useRef<HTMLElement>(null);
  const crowns=useRef<(HTMLImageElement|null)[]>([]);
  const figures=useRef<(HTMLDivElement|null)[]>([]);

  useEffect(()=>{
    const memo=new WeakMap<Element,Record<string,string>>();
    const put=(el:HTMLElement|null|undefined,name:string,value:string)=>{
      if(!el)return;
      let m=memo.get(el);
      if(!m){m={};memo.set(el,m)}
      if(m[name]===value)return;
      m[name]=value;
      el.style.setProperty(name,value);
    };
    const reduce=matchMedia("(prefers-reduced-motion: reduce)");

    const paint=(seen:number,year:number)=>{
      const [a,b,t]=seasonPair(seen);
      const lo=Math.min(a,b),hi=Math.max(a,b);
      crowns.current.forEach((el,i)=>{
        let o=0;
        if(t<.002)o=i===a?1:0;
        else if(t>.998)o=i===b?1:0;
        else if(i===lo)o=1;
        else if(i===hi)o=hi===b?t:1-t;
        put(el,"opacity",o.toFixed(3));
      });
      const A=seasons[a],B=seasons[b];
      put(stage.current,"--paper",mixHex(A.paper,B.paper,t));
      put(stage.current,"--ground",mixHex(A.ground,B.ground,t));
      put(sun.current,"opacity",(A.sun+(B.sun-A.sun)*t).toFixed(3));

      people.forEach((p,i)=>{
        const inn=ramp(year,p.from-4,p.from+4),out=1-ramp(year,p.to-4,p.to+4);
        const el=figures.current[i];
        put(el,"opacity",Math.min(inn,out).toFixed(3));
        put(el,"transform",`translate3d(0,${((1-inn)*10-(1-out)*5).toFixed(1)}px,0) rotate(${((1-inn)*-5).toFixed(1)}deg)`);
      });
    };

    const read=()=>{
      const el=track.current;
      if(!el)return 0;
      return clamp(-el.getBoundingClientRect().top/Math.max(1,el.offsetHeight-innerHeight))*VIEWPORTS;
    };

    let target=0,shown=0,seen=Y0,raf=0,last=0;
    const tick=(now:number)=>{
      const dt=Math.max(1,Math.min(64,now-last));
      last=now;
      shown+=(target-shown)*(1-Math.exp(-dt/90));
      if(Math.abs(target-shown)<.0005)shown=target;
      const year=yearAt(shown);
      let gap=year-seen;
      if(Math.abs(gap)>1){seen+=Math.trunc(gap);gap=year-seen}
      const step=RATE*dt*(shown===target?1.6:1);
      seen=Math.abs(gap)<=step?year:seen+Math.sign(gap)*step;
      paint(seen,year);
      raf=shown===target&&seen===year?0:requestAnimationFrame(tick);
    };
    const onScroll=()=>{
      if(reduce.matches)return;
      target=read();
      if(!raf){last=performance.now();raf=requestAnimationFrame(tick)}
    };
    const settle=()=>{
      cancelAnimationFrame(raf);raf=0;
      target=shown=reduce.matches?VIEWPORTS:read();
      seen=yearAt(shown);
      paint(seen,seen);
    };

    settle();
    addEventListener("scroll",onScroll,{passive:true});
    addEventListener("resize",settle);
    reduce.addEventListener("change",settle);
    return()=>{
      cancelAnimationFrame(raf);
      removeEventListener("scroll",onScroll);
      removeEventListener("resize",settle);
      reduce.removeEventListener("change",settle);
    };
  },[]);

  const finaleRings=()=>Array.from({length:9}).map((_,i)=><i key={i} style={{inset:(6+i*3.5)+"%"}}/>);

  return <div className="tree-experience">
  <div className="tree-story tree-seasons" ref={track}>
    <div className="tree-story-stage season-stage" ref={stage} role="img" aria-label="Uma faia parada enquanto as estações de 1500 a 2026 passam por ela. Ao pé do tronco, uma pessoa de cada vez: Copérnico, Newton, Darwin e, no fim, você.">
      <svg className="season-filters" aria-hidden="true" focusable="false">
        {seasons.map((s,i)=><filter key={i} id={"tree-season-"+i} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values={tint(s.crown)}/></filter>)}
        <filter id="tree-ink" colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values={tint(INK)}/></filter>
        {people.map((p,i)=><filter key={i} id={"tree-person-"+i} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values={tint(p.ink,1.1)}/></filter>)}
      </svg>
      <i className="season-sun" ref={sun}/>
      <i className="season-ground"/>
      <div className="season-tree" aria-hidden="true">
        <div className="season-crown">
          {seasons.map((_,i)=><img key={i} ref={el=>{crowns.current[i]=el}} src={TREE} alt="" draggable={false} fetchPriority={i?undefined:"high"} style={{filter:`url(#tree-season-${i})`,opacity:i?0:1}}/>)}
        </div>
        <img className="season-trunk" src={TREE} alt="" draggable={false} style={{filter:"url(#tree-ink)"}}/>
        {people.map((p,i)=><div key={p.name} className="season-person" ref={el=>{figures.current[i]=el}} style={{opacity:i?0:1,["--ink" as string]:p.ink}}>
          <span className="season-figure"><img src={MAN} alt="" draggable={false} style={{filter:`url(#tree-person-${i})`}}/></span>
          <span className="season-tag"><b>{p.name}</b><small>{p.life}</small></span>
        </div>)}
      </div>
      <i className="season-halftone"/>
      <p className="season-credit">desenhos Pearson Scott Foresman · domínio público</p>
    </div>
  </div>
    <section className="tree-finale">
      <div className="tree-rings-stage">
        <div className="tree-rings collage-rings" aria-hidden="true">
          {finaleRings()}
          <span>526</span>
        </div>
        <div className="tree-rings collage-rings is-reflection" aria-hidden="true">{finaleRings()}</div>
      </div>
      <div>
        <small>uma árvore imaginária</small>
        <h2>A história parece diferente quando a régua está viva.</h2>
        <p>Para nós foram descobertas, máquinas, redes e séculos. Para a árvore foram estações, água, luz e crescimento.</p>
      </div>
    </section>
  </div>;
}
