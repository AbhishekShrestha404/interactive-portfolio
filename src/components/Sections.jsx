import { useState } from 'react';

const EMAIL = 'your@email.com'; // replace with your real address

export function About() {
  const cards = [
    ['Design', 'UI/UX and Figma', -3],
    ['Develop', 'Flutter and React', 2],
    ['Data', 'Python and machine learning', -2],
  ];
  return (
    <section className="about" id="about">
      <h2 className="statement">I research, design and build products people actually enjoy using.</h2>
      <p className="bio">Short bio goes here: who you are, what you care about, and what you are looking for next.</p>
      <ul className="cards">
        {cards.map(([title, sub, tilt]) => (
          <li key={title} style={{ '--tilt': tilt + 'deg' }}>
            <h3>{title}</h3>
            <p>{sub}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const STAGES = [
  ['Research', 'Users, goals and references'],
  ['Design', 'Wireframes and a Figma prototype'],
  ['Develop', 'React, Flutter and APIs'],
  ['Test', 'Fixing, polishing and performance'],
  ['Ship', 'Deploying and improving'],
];

export function Process() {
  return (
    <section className="process" id="process">
      <h2>How I work</h2>
      <ol className="stages">
        {STAGES.map(([title, desc], i) => (
          <li key={title}>
            <span className="num">{i + 1}</span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

const WORK = [
  ['p1', 'Customer Churn Prediction API', 'FastAPI, XGBoost and Docker'],
  ['p2', 'Job Application Tracker', 'React, Express and MongoDB'],
  ['p3', 'Customer Segmentation', 'Python and K-Means'],
  ['p4', 'More case studies', 'Flutter and UI/UX'],
];

export function Projects() {
  return (
    <section className="work" id="work">
      <h2>Selected projects</h2>
      <div className="grid">
        {WORK.map(([area, title, stack]) => (
          <article key={area} className={'project ' + area}>
            <div className="thumb">Thumbnail or live demo</div>
            <h3>{title}</h3>
            <p>{stack}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const SERVICES = [
  ['UI/UX design', 'Wireframes, prototypes and clean interfaces for apps and websites.'],
  ['Flutter and web development', 'Mobile apps in Flutter and responsive websites in React.'],
  ['ML and APIs', 'Prediction models and the APIs that serve them.'],
  ['Design-to-code handoff', 'Turning finished Figma designs into pixel-accurate code.'],
];

export function Services() {
  const [open, setOpen] = useState(0);
  return (
    <section className="services" id="services">
      <h2>What I can build for you</h2>
      <ul>
        {SERVICES.map(([title, desc], i) => (
          <li key={title} className={open === i ? 'open' : ''}>
            <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{title}</span>
              <span aria-hidden="true">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && <p>{desc}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Contact() {
  function send(e) {
    e.preventDefault();
    const f = new FormData(e.target);
    const body = `${f.get('message')}\n\n${f.get('name')} (${f.get('email')})`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Portfolio enquiry')}&body=${encodeURIComponent(body)}`;
  }
  return (
    <section className="contact" id="contact">
      <h2>Let's build<br />something.</h2>
      <div className="contact-side">
        <a className="email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <form onSubmit={send}>
          <label>Name<input name="name" required /></label>
          <label>Email<input name="email" type="email" required /></label>
          <label>Tell me about your project<textarea name="message" rows="5" required /></label>
          <button className="btn solid" type="submit">Send message</button>
        </form>
      </div>
      <footer>© 2026 Abhishek Shrestha</footer>
    </section>
  );
}
