import { useRef, useState } from 'react';
import './case-study.css';
import project from './caseStudyData.js';
import homePage from '../../assets/home_page.png';
import workPage from '../../assets/work_page.png';
import servicePage from '../../assets/service_page.png';
import aboutPage from '../../assets/about_page.png';
import blogPage from '../../assets/blog_page.png';

const screens = [
  { title: 'Home', image: homePage, description: 'The studio introduction, services, and featured work.' },
  { title: 'Work', image: workPage, description: 'A dedicated place to explore projects.' },
  { title: 'Services', image: servicePage, description: 'The studio’s offerings, grouped for easier scanning.' },
  { title: 'About', image: aboutPage, description: 'The people and thinking behind Vyomite.' },
  { title: 'Blog', image: blogPage, description: 'A space for updates and ideas.' },
];

export default function VyomiteCaseStudy() {
  const [selectedScreen, setSelectedScreen] = useState(screens[0]);
  const screenFrameRef = useRef(null);
  const chooseScreen = (screen) => {
    setSelectedScreen(screen);
    if (screenFrameRef.current) screenFrameRef.current.scrollTop = 0;
  };

  return <div className="cs-story" id="case-study-top">
    <header className="cs-story-header"><div className="cs-story-container cs-story-header-inner"><a href={project.backUrl} className="cs-story-back"><span aria-hidden="true">←</span> Back to projects</a><span className="cs-story-mark">Case Study</span></div></header>
    <main>
      <section className="cs-story-hero cs-story-container" aria-labelledby="cs-story-title">
        <div className="cs-story-hero-copy"><div><p className="cs-story-label">Vyomite · Website redesign</p><h1 id="cs-story-title">A clearer digital presence for Vyomite.</h1></div><p className="cs-story-summary">During my internship, I redesigned the website of a small web-services startup to make its offer and next steps easier to understand.</p></div>
        <figure className="cs-story-hero-figure"><div className="cs-story-hero-preview"><img src={homePage} alt="Vyomite homepage design with a purple introduction and prominent contact actions" fetchPriority="high" /></div><figcaption>A closer look at the redesigned homepage</figcaption></figure>
        <div className="cs-story-brief"><p className="cs-story-label">The brief</p><div><h2>The homepage needed to explain the studio sooner.</h2><p>Vyomite’s services were hard to spot, and the main contact action sat below the fold. The redesign focused on a clearer first impression, easier navigation, and a more consistent look across pages.</p></div></div>
        <div className="cs-story-meta" aria-label="Project details"><p><span>Role</span>UI/UX design intern</p><p><span>Duration</span>3 months</p><p><span>Tool</span>Figma</p></div>
      </section>

      <section className="cs-story-process cs-story-container" aria-labelledby="cs-story-process-title"><div className="cs-story-heading"><p className="cs-story-label">Design process</p><h2 id="cs-story-process-title">Structure first. Then expression.</h2></div><div className="cs-story-process-grid"><div><h3>Find a direction</h3><p>I reviewed website references to identify useful layout and visual ideas.</p></div><div><h3>Shape the pages</h3><p>Low-fidelity wireframes helped organize content and navigation before detailed design.</p></div><div><h3>Design and refine</h3><p>I built the high-fidelity screens and prototype, then adjusted the work using mentor feedback.</p></div></div></section>

      <section className="cs-story-visual" aria-labelledby="cs-story-visual-title"><div className="cs-story-container"><div className="cs-story-visual-head"><div><p className="cs-story-label">Visual design</p><h2 id="cs-story-visual-title">A consistent voice across pages.</h2></div><p>Violet, lavender, and yellow give the brand its energy. Avenir Next and repeatable layout rules keep the pages connected.</p></div><div className="cs-story-visual-grid"><div className="cs-story-palette"><span>Color palette</span><div className="cs-story-swatches" aria-label="Deep violet, purple, soft purple, lavender, and yellow"><i /><i /><i /><i /><i /></div><p>Primary color carries the brand; yellow marks key actions.</p></div><div className="cs-story-type"><span>Typography</span><strong aria-hidden="true">Aa</strong><p>Avenir Next · clear type hierarchy</p></div></div></div></section>

      <section className="cs-story-gallery" aria-labelledby="cs-story-gallery-title"><div className="cs-story-container"><div className="cs-story-gallery-head"><div><p className="cs-story-label">Selected screens</p><h2 id="cs-story-gallery-title">Explore the full pages.</h2><p>Choose a page, then scroll through its full design in the viewer below.</p></div><a href={project.figmaUrl} target="_blank" rel="noopener noreferrer" className="cs-story-prototype">Open Figma design ↗</a></div><div className="cs-story-gallery-tabs" aria-label="Choose a Vyomite page">{screens.map(screen => <button type="button" key={screen.title} aria-pressed={selectedScreen.title === screen.title} onClick={() => chooseScreen(screen)}>{screen.title}</button>)}</div><figure className="cs-story-full-screen"><div className="cs-story-frame-label"><strong>{selectedScreen.title} page</strong><span>Scroll inside to explore ↓</span></div><div className="cs-story-screen-viewport" ref={screenFrameRef} role="region" aria-label={`Scrollable full ${selectedScreen.title} page design`} tabIndex="0"><img src={selectedScreen.image} alt={`Full ${selectedScreen.title} page design`} /></div><figcaption><div><strong>{selectedScreen.title}</strong><span>{selectedScreen.description}</span></div><a href={selectedScreen.image} target="_blank" rel="noopener noreferrer">Open full image ↗</a></figcaption></figure></div></section>

      <section className="cs-story-close cs-story-container" aria-labelledby="cs-story-close-title"><p className="cs-story-label">Takeaway</p><h2 id="cs-story-close-title">A stronger visual system made the pages feel connected.</h2><p>Working through wireframes and mentor feedback reinforced how much a clear hierarchy and small navigation choices shape the experience.</p><div className="cs-story-close-actions"><a href={project.backUrl}>← Back to projects</a><a href="#case-study-top" className="cs-story-to-top">↑ Back to top</a></div></section>
    </main>
  </div>;
}
