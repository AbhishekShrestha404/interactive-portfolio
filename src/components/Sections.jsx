import { useState } from 'react';

const EMAIL = 'your@email.com'; // replace with your real address
const SOCIALS = [
  ['LinkedIn', 'https://www.linkedin.com/in/your-handle'], // replace
  ['GitHub', 'https://github.com/your-handle'], // replace
];

/* ---------- About ---------- */
const EXPERIENCE = [
  ['Operation and Technical Support', 'Slash Plus', 'Aug to Oct 2026'],
  ['Flutter Developer Intern', 'Infocom Solutions', 'Dec 2025 to Apr 2026'],
  ['UI/UX Designer Intern', 'Vyomite', 'Jun to Dec 2025'],
];
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

function Timeline({ items }) {
  return (
    <ul className="timeline">
      {items.map(([role, place, when]) => (
        <li key={role}><strong>{role}</strong><span>{place}, {when}</span></li>
      ))}
    </ul>
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
          <div className="block" id="experience">
            <h3>Experience</h3>
            <Timeline items={EXPERIENCE} />
          </div>
          <div className="block">
            <h3>Education</h3>
            <Timeline items={EDUCATION} />
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

/* ---------- Projects (Z-pattern: image and text alternate sides) ---------- */
const PROJECTS = [
  { slug: 'job-tracker', kind: 'Full-stack', title: 'Job Application Tracker',
    text: 'A Kanban board for tracking job applications by status, with deadlines and notes, so nothing in a job search slips through.',
    tech: ['React', 'Express', 'MongoDB'], links: [['Live demo', '#'], ['GitHub', '#']] },
  { slug: 'churn-api', kind: 'Backend and ML', title: 'Customer Churn Prediction API',
    text: 'A FastAPI service that predicts which customers are likely to leave, using an XGBoost model packaged with Docker.',
    tech: ['FastAPI', 'XGBoost', 'Docker'], links: [['GitHub', '#']] },
  { slug: 'segmentation', kind: 'Data analysis', title: 'Customer Segmentation',
    text: 'Groups customers into segments using K-Means clustering.',
    tech: ['Python', 'K-Means'], links: [['GitHub', '#']] },
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
  function send(e) {
    e.preventDefault();
    const f = new FormData(e.target);
    const body = `${f.get('message')}\n\n${f.get('name')} (${f.get('email')})`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Portfolio enquiry')}&body=${encodeURIComponent(body)}`;
  }
  return (
    <section className="contact" id="contact">
      <div className="contact-grid">
        <div>
          <h2>Let's talk.</h2>
          <p>Hiring for a junior developer role? I'd love to hear from you. Freelance projects are welcome too.</p>
          <a className="email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <p className="social">
            {SOCIALS.map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a>
            ))}
          </p>
        </div>
        <form onSubmit={send}>
          <label>Name<input name="name" required /></label>
          <label>Email<input name="email" type="email" required /></label>
          <label className="wide">Message<textarea name="message" rows="3" required /></label>
          <button className="btn solid wide" type="submit">Send message</button>
        </form>
      </div>
      <footer>© 2026 Abhishek Shrestha</footer>
    </section>
  );
}
