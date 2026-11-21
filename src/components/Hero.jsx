import { lazy, Suspense, useEffect, useState } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));
const SCENE = 'https://prod.spline.design/utttLGSspQSfGhmH/scene.splinecode';

export default function Hero({ onReady }) {
  const [live, setLive] = useState(false);

  useEffect(() => {
    // Phones and reduced-motion users skip the heavy 3D scene.
    const on = !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.innerWidth >= 768;
    setLive(on);
    // Safety net so the loader can never hang if the scene fails to load.
    const t = setTimeout(onReady, on ? 10000 : 800);
    return () => clearTimeout(t);
  }, [onReady]);

  return (
    <section className="hero" id="top">
      <div className="hero-scene" aria-hidden="true">
        {live && (
          <Suspense fallback={null}>
            <Spline scene={SCENE} onLoad={onReady} style={{ width: '100%', height: '100%' }} />
          </Suspense>
        )}
      </div>
      <div className="hero-copy">
        <h1 className="hero-title">Designer<br />who ships<br />code.</h1>
        <p className="hero-sub">Junior developer with a design brain. Open to full-time roles and freelance projects.</p>
        <div className="hero-actions">
          <a className="btn solid" href="#work">See my work</a>
          <a className="btn line" href="#contact">Let's talk</a>
        </div>
      </div>
    </section>
  );
}
