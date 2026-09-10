import { ImageResponse } from "next/og";
export const alt = "ENTRE — um lugar para explorar ideias";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image(){
  return new ImageResponse(
    <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",background:"#efe9dc",color:"#17231b",padding:"70px",fontFamily:"serif"}}>
      <div style={{display:"flex",fontSize:34,letterSpacing:8}}>ENTRE.</div>
      <div style={{display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",fontSize:80,lineHeight:1.05,maxWidth:900}}>um lugar para<br/>explorar ideias.</div>
        <div style={{display:"flex",fontFamily:"sans-serif",fontSize:25,marginTop:28}}>mente · natureza · música · filosofia · tempo</div>
      </div>
    </div>,
    size
  );
}
