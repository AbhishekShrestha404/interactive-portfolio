import { useEffect, useState } from 'react';
import Logo from './Logo.jsx';

// The bar and the logo fill together: they ease toward 90% while the hero scene
// loads, then complete the moment the scene reports it is ready.
export default function Loader({ ready, onDone }) {
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (ready) return;
    const id = setInterval(() => setPct((p) => p + (90 - p) * 0.06), 120);
    return () => clearInterval(id);
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    setPct(100);
    const a = setTimeout(() => setLeaving(true), 500);
    const b = setTimeout(onDone, 1300);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [ready, onDone]);

  return (
    <div className={'loader' + (leaving ? ' leaving' : '')} role="status" aria-label="Loading">
      <div className="loader-logo">
        <Logo />
        <Logo className="lit" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }} />
      </div>
      <div className="loader-track"><div className="loader-fill" style={{ width: pct + '%' }} /></div>
      <p className="loader-pct">{Math.round(pct)}%</p>
    </div>
  );
}
