import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div><strong>ENTRE.</strong><p>Um lugar para explorar ideias.</p></div>
      <div className="footer-links">
        <Link href="/sobre">manifesto</Link>
        <a href="https://github.com/yuridomingues" target="_blank" rel="noreferrer">código & autor ↗</a>
      </div>
      <p className="fine-print">Feito por Yuri Domingues. Sem anúncios, cadastro ou rastreamento pessoal.</p>
    </footer>
  );
}
