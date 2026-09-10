import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="ENTRE, início">ENTRE<span>.</span></Link>
      <nav aria-label="Navegação principal">
        <Link href="/#experimentos">experimentos</Link>
        <Link href="/sobre">sobre</Link>
      </nav>
    </header>
  );
}
