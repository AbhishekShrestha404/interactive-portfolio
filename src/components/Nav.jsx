import { useState } from 'react';

const LINKS = [['About', '#about'], ['Experience', '#experience'], ['Projects', '#work'], ['Contact', '#contact']];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <a className="logo" href="#top">AS.</a>
      <div className="nav-right">
        <nav aria-label="Main" className={open ? 'open' : ''}>
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
        <a className="resume" href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
        <button className="menu" aria-expanded={open} onClick={() => setOpen(!open)}>Menu</button>
      </div>
    </header>
  );
}
