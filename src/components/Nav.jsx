const LINKS = [['About', '#about'], ['Process', '#process'], ['Work', '#work'], ['Services', '#services'], ['Contact', '#contact']];

export default function Nav() {
  return (
    <header className="nav">
      <a className="logo" href="#top">AS.</a>
      <nav aria-label="Main">
        {LINKS.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        <a className="hire" href="#contact">Hire me</a>
      </nav>
    </header>
  );
}
