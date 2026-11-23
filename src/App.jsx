import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import Loader from './components/Loader.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Cursor from './components/Cursor.jsx';
import { About, Background, Projects, Contact } from './components/Sections.jsx';

const CaseStudy = lazy(() => import('./components/CaseStudy/VyomiteCaseStudy.jsx'));

// The loader plays on the first visit of a session and on refresh,
// but not when you come back from another page or press back/forward.
function loaderAlreadySeen() {
  try {
    const nav = performance.getEntriesByType('navigation')[0];
    return sessionStorage.getItem('loaderSeen') === '1' && nav?.type !== 'reload';
  } catch {
    return false;
  }
}

export default function App() {
  const onCase = window.location.pathname.startsWith('/case-study');
  const [sceneReady, setSceneReady] = useState(false);
  const [loaderGone, setLoaderGone] = useState(() => onCase || loaderAlreadySeen());
  const onReady = useCallback(() => setSceneReady(true), []);
  const onDone = useCallback(() => {
    try { sessionStorage.setItem('loaderSeen', '1'); } catch { /* storage unavailable */ }
    setLoaderGone(true);
  }, []);

  useEffect(() => {
    if (onCase) { document.title = 'Vyomite Website, Case Study | Abhishek Patrabansha'; return; }
    if (!loaderGone || !window.location.hash) return;
    // Coming back from a case study with /#work: scroll to that section once the page exists
    const t = setTimeout(() => {
      try { document.querySelector(window.location.hash)?.scrollIntoView(); } catch { /* ignore bad hash */ }
    }, 60);
    return () => clearTimeout(t);
  }, [onCase, loaderGone]);

  if (onCase) return <><Cursor /><Suspense fallback={null}><CaseStudy /></Suspense></>;

  return (
    <>
      <Cursor />
      {!loaderGone && <Loader ready={sceneReady} onDone={onDone} />}
      <Nav />
      <main>
        <Hero onReady={onReady} />
        <About />
        <Background />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
