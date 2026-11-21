import { useState } from 'react';

const EMAIL = 'your@email.com'; // replace with your real address
const SOCIALS = [ // replace the URLs, delete any you don't use
  ['LinkedIn', 'https://www.linkedin.com/in/your-handle'],
  ['GitHub', 'https://github.com/your-handle'],
  ['Behance', 'https://www.behance.net/your-handle'],
  ['Instagram', 'https://www.instagram.com/your-handle'],
];

/* ---------- About ---------- */
const EDUCATION = [['BSc CSIT', 'Orchid International College', '2022 to 2026']];
const STACK = ['Figma', 'Flutter', 'Dart', 'React', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'Python', 'FastAPI', 'XGBoost', 'Docker'];

function Portrait() {
  const [missing, setMissing] = useState(false);
  return (
    <figure className="portrait">
      {missing
        ? <span aria-hidden="true">AS</span>
        : <img src="/photo.jpg" alt="Portrait of Abhishek Shrestha" onError={() => setMissing(true)} />}
    </figure>
  );
}

export function About() {
  return (
    <section className="about" id="about">
      <h2>A developer who cares about how things work and feel.</h2>
      <div className="about-grid">
        <Portrait />
        <div className="about-text">
          <h3>Hi, I'm Abhishek</h3>
          <p>I'm a BSc CSIT graduate from Kathmandu who moves comfortably between Figma and code. I've worked as a UI/UX designer and a Flutter developer, and I like building products where design and engineering meet.</p>
          <div className="block">
            <h3>Education</h3>
            <ul className="timeline">
              {EDUCATION.map(([name, place, when]) => (
                <li key={name}><strong>{name}</strong><span>{place}, {when}</span></li>
              ))}
            </ul>
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

/* ---------- Professional background ---------- */
const JOBS = [
  { role: 'Operation and Technical Support', company: 'Slash Plus', when: 'Aug to Oct 2026',
    text: 'Add what you handled and the impact it had.' },
  { role: 'Flutter Developer Intern', company: 'Infocom Solutions', when: 'Dec 2025 to Apr 2026',
    text: 'Add what you built and the impact it had.' },
  { role: 'UI/UX Designer Intern', company: 'Vyomite', when: 'Jun to Dec 2025',
    text: 'Add what you designed and the impact it had.' },
];

export function Background() {
  return (
    <section className="background" id="experience">
      <h2>Professional background</h2>
      <ol className="jobs">
        {JOBS.map((j) => (
          <li key={j.role}>
            <p className="when">{j.when}</p>
            <div>
              <h3>{j.role}</h3>
              <p className="company">{j.company}</p>
              <p>{j.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------- Projects (Z-pattern: image and text alternate sides) ---------- */
const PROJECTS = [
  { slug: 'job-tracker', kind: 'Full-stack', title: 'Job Application Tracker',
    text: 'A Kanban board for tracking job applications by status, with deadlines and notes, so nothing in a job search slips through.',
    tech: ['React', 'Express', 'MongoDB'], links: [['Live demo', '#'], ['GitHub', '#']] },
  { slug: 'churn-api', kind: 'Backend and ML', title: 'Customer Churn Prediction API',
    text: 'A FastAPI service that predicts which customers are likely to leave, using an XGBoost model packaged with Docker.',
    tech: ['FastAPI', 'XGBoost', 'Docker'], links: [['GitHub', '#']] },
  { slug: 'website-case-study', kind: 'Web design', title: 'Company Website Design', // add the company name
    text: 'A case study of a website I designed for a company: the problem, my design process and the final result.',
    tech: ['Figma', 'UI/UX'], links: [['Read case study', '#']] },
];

function Shot({ slug, title, n }) {
  const [missing, setMissing] = useState(false);
  return (
    <div className="shot">
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
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a>
                ))}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
export function Contact() {
  return (
    <section className="contact" id="contact">
      <h2>Get in touch</h2>
      <p className="sub">Good things start with a hello.</p>
      <a className="email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      <p className="social">
        {SOCIALS.map(([label, href]) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a>
        ))}
      </p>
      <footer>© 2026 Abhishek Shrestha</footer>
    </section>
  );
}
