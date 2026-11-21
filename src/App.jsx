import { useCallback, useState } from 'react';
import Loader from './components/Loader.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import { About, Projects, Contact } from './components/Sections.jsx';

export default function App() {
  const [sceneReady, setSceneReady] = useState(false);
  const [loaderGone, setLoaderGone] = useState(false);
  const onReady = useCallback(() => setSceneReady(true), []);
  const onDone = useCallback(() => setLoaderGone(true), []);

  return (
    <>
      {!loaderGone && <Loader ready={sceneReady} onDone={onDone} />}
      <Nav />
      <main>
        <Hero onReady={onReady} />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
