import { useEffect, useState } from 'react';

const LINKS = [['About', '#about'], ['Experience', '#experience'], ['Projects', '#work'], ['Contact', '#contact']];

// Your favicon artwork, drawn with currentColor so it follows the nav text color
function Logo() {
  return (
    <svg viewBox="0 0 257 241" fill="currentColor" aria-hidden="true">
      <path d="M138.5 150.5H187L127.5 0C127.5 0 96.6935 82.44 75.5 131.316C68.7579 146.864 58.1072 156.286 42.5 162.5H133C141.275 162.5 145.432 168.097 148.5 175C150.887 180.37 153.194 186.62 155.5 192.5C160.278 204.685 163.383 216.926 155.5 228C151.076 234.214 144.42 238.321 137 240H257C238.503 232.601 223.313 226.402 211.5 209C199.163 190.826 192.792 163.942 218.5 155H77.5L109 75.5L138.5 150.5Z" />
      <path d="M81.5 240.5H0C37.1831 231.062 50.1007 200.215 62 166.5H73C61.7646 192.716 45.1551 228.042 81.5 240.5Z" />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Hide when scrolling down, show again when scrolling up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 8) return;
      setHidden(y > last && y > 120);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={'nav' + (hidden && !open ? ' hidden' : '')}>
      <a className="logo" href="#top" aria-label="Abhishek Shrestha, home"><Logo /></a>
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
