import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { EMAIL, SOCIALS } from '../config.js';

const Constellation = lazy(() => import('./Constellation.jsx'));

/* ---------- About ---------- */
const EDUCATION = [['BSc. Computer Science and Information Technology (BSc. CSIT)', 'Orchid International College', '2022 - 2026'],
['High Secondary School', 'Kanjirowa National Secondary School', '2019 - 2021']];
const STACK = ['React', 'JavaScript', 'Material UI', 'Node.js', 'Express', 'MongoDB', 'Flutter', 'Dart', 'Figma', 'Docker'];

function Portrait() {
  const [missing, setMissing] = useState(false);
  return (
    <figure className="portrait">
      {missing
        ? <span aria-hidden="true">AS</span>
        : <img src="/profilePic.jpg" alt="Portrait of Abhishek Patrabansha" onError={() => setMissing(true)} />}
    </figure>
  );
}

const CERTS = [['The Web Developer Bootcamp 2026', 'Udemy', '2026'],
['Introduction to Generative AI: Art of the Possible', 'AWS Skill Builder', '2026'],
['Professional Python and Django Training', 'Broadway Infosys Nepal', '2023']];

function Entries({ title, items }) {
  return (
    <div className="block">
      <h3>{title}</h3>
      <ul className="timeline">
        {items.map(([name, place, when]) => (
          <li key={name}><strong>{name}</strong><span>{place}, {when}</span></li>
        ))}
      </ul>
    </div>
  );
}

export function About() {
  return (
    <section className="about" id="about">
      <h2>About Me</h2>
      <div className="about-grid">
        <Portrait />
        <div className="about-text">
          <h3>Hi, I'm Abhishek</h3>
          <p>I enjoy building web applications that are both functional and user-friendly. I focus on full-stack development, combining my design and coding skills to create practical solutions.</p>
          <div className="quals">
            <Entries title="Education" items={EDUCATION} />
            <Entries title="Certifications" items={CERTS} />
          </div>
        </div>
      </div>
      <div className="block stack">
        <h3>Tech stack</h3>
        <ul className="chips">{STACK.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
    </section>
  );
}

/* ---------- Professional background (click a company to see details) ---------- */

const JOBS = [
  {
    role: 'Operations & Technical Support',
    company: 'Slash Plus',
    when: 'Aug 2026 – Oct 2026',
    points: [
      'Supported fleet management operations through GPS tracking, device configuration, and system monitoring.',
      'Troubleshot connectivity issues, maintained operational records, and coordinated with clients and field teams.',
      'Technologies: GPS Tracking Systems, Fleet Management, System Monitoring, Technical Troubleshooting.'
    ],

  },
  {
    role: 'Flutter Developer Intern',
    company: 'Infocom Solutions',
    when: 'Dec 2025 – Apr 2026',
    points: [
      'Built responsive Android and iOS app interfaces using Flutter, focusing on clean layouts and usability.',
      'Integrated REST APIs, resolved UI issues, and tested mobile features to improve app stability.',
      'Technologies: Flutter, Dart, REST APIs, Mobile UI Development.'
    ],
  },
  {
    role: 'UI/UX Designer Intern',
    company: 'Vyomite',
    when: 'Jun 2025 – Dec 2025',
    points: [
      'Researched user needs and business goals to redesign website pages with improved structure and usability.',
      'Created wireframes, high-fidelity designs, interactive prototypes, and reusable design system components.',
      'Technologies: Figma, Wireframing, Prototyping, User Flows, Design Systems.'
    ]
  }
];


export function Background() {
  const [i, setI] = useState(0);
  const job = JOBS[i];
  return (
    <section className="background" id="experience">
      <h2>Professional background</h2>
      <div className="jobs">
        <div className="tabs" role="tablist" aria-label="Companies">
          {JOBS.map((j, n) => (
            <button key={j.company} role="tab" id={`tab-${n}`} aria-selected={n === i} aria-controls="job-panel"
              className={n === i ? 'on' : ''} onClick={() => setI(n)}>{j.company}</button>
          ))}
        </div>
        <div className="panel" role="tabpanel" id="job-panel" aria-labelledby={`tab-${i}`}>
          <h3>{job.role} <span>@ {job.company}</span></h3>
          <p className="when">{job.when}</p>
          <ul>{job.points.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects (Z-pattern: image and text alternate sides) ---------- */
const PROJECTS = [
  {
    slug: 'mavya', kind: 'Full-stack Web App', title: 'Inventory Management System',
    text: 'A planned full-stack web application for small businesses to manage products, track stock levels, and monitor inventory movements.',
    tech: ['React', 'Node.js', 'Express', 'Vite', 'Vercel', 'Render', 'Supabase'], links: [['Live demo', 'https://mavya-rose.vercel.app'], ['GitHub', 'https://github.com/AbhishekShrestha404/inventory-management-system']]
  },
  {
    slug: 'job-tracker', kind: 'Full-stack', title: 'Job Application Tracker',
    text: 'A Kanban board for tracking job applications by status, with deadlines and notes, so nothing in a job search slips through.',
    tech: ['React', 'Express', 'MongoDB'], links: [['Live demo', 'https://track-my-job-2026.vercel.app'], ['GitHub', 'https://github.com/AbhishekShrestha404/job-tracker']]
  },
  {
    slug: 'vyomiteMobandLap', kind: 'Web Redesign', title: 'Vyomite Website Redesign',
    text: 'A look at the research, structure, and visual system behind my redesign of Vyomite’s website.',
    tech: ['Figma', 'UI/UX'], links: [['Read case study', '/case-study/vyomite']]
  },
];

function Shot({ slug, title, n }) {
  const [missing, setMissing] = useState(false);
  return (
    <div className={`shot${slug === 'mavya' ? ' shot--mavya' : ''}`}>
      {missing
        ? <span>Project screenshot {n}</span>
        : <img src={`/projects/${slug}.png`} alt={`${title} screenshot`} loading="lazy" onError={() => setMissing(true)} />}
    </div>
  );
}

export function Projects() {
  return (
    <section className="work" id="work">
      <h2>Projects</h2>
      <div className="rows">
        {PROJECTS.map((p, i) => (
          <article className="row" key={p.slug}>
            <Shot slug={p.slug} title={p.title} n={i + 1} />
            <div className="info">
              <p className="kind">{i + 1}. {p.kind}</p>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <ul className="chips">{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
              <p className="links">
                {p.links.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('/') ? undefined : '_blank'}
                    rel={href.startsWith('/') ? undefined : 'noopener noreferrer'}
                  >
                    {label} ↗
                  </a>
                ))}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- Contact (constellation background loads when you scroll near) ---------- */
export function Contact() {
  const ref = useRef(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '400px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className="contact" id="contact" ref={ref}>
      {near && <Suspense fallback={null}><Constellation /></Suspense>}
      <h2>Get in touch</h2>
      <p className="sub">Good things start with a hello.</p>
      <a className="email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      <p className="social">
        {SOCIALS.map(([label, href]) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a>
        ))}
      </p>
      <footer>© 2026 Abhishek Patrabansha Shrestha <br />
        All Rights Reserved.
      </footer>
    </section>
  );
}
