import { useEffect, useState } from 'react';
import Logo from './Logo.jsx';

const LINKS = [['About', '#about'], ['Experience', '#experience'], ['Projects', '#work'], ['Contact', '#contact']];

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
