import { useEffect, useId, useRef, useState } from "react";
import { event } from "./event.js";

const nav = [
  { href: "#what", label: "What" },
  { href: "#schedule", label: "Schedule" },
  { href: "#food", label: "Food" },
  { href: "#visit", label: "Visit" },
  { href: "#faq", label: "FAQ" },
];

export default function App() {
  const [rsvpOpen, setRsvpOpen] = useState(false);

  return (
    <>
      <a className="skip" href="#what">
        Skip to content
      </a>
      <Header onRsvp={() => setRsvpOpen(true)} />
      <main>
        <Hero onRsvp={() => setRsvpOpen(true)} />
        <About />
        <Schedule />
        <Food />
        <Visit onRsvp={() => setRsvpOpen(true)} />
        <Faq />
      </main>
      <Footer />
      {rsvpOpen ? <RsvpDialog onClose={() => setRsvpOpen(false)} /> : null}
    </>
  );
}

function Header({ onRsvp }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top">
          <Flag />
          <span>{event.brand}</span>
        </a>
        <nav className="nav" aria-label="Page">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <button className="btn btn-solid" type="button" onClick={onRsvp}>
          RSVP
        </button>
      </div>
    </header>
  );
}

function Hero({ onRsvp }) {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">{event.eyebrow}</p>
        <h1>{event.title}</h1>
        <p className="subtitle">{event.subtitle}</p>
        <p className="tagline">{event.tagline}</p>
        <ul className="promises">
          {event.promises.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="fact-row">
          <Fact label={event.when.label} headline={event.when.headline} detail={event.when.detail} />
          <Fact label={event.where.label} headline={event.where.headline} detail={event.where.detail} />
          <Fact label={event.cost.label} headline={event.cost.headline} detail={event.cost.detail} />
        </div>
        <div className="cta-row">
          <button className="btn btn-solid" type="button" onClick={onRsvp}>
            Save a spot
          </button>
          <a className="btn btn-ghost" href="#what">
            What’s Užgavėnės?
          </a>
        </div>
      </div>
      <aside className="mask-card">
        <img
          className="hall-photo"
          src={`${import.meta.env.BASE_URL}uzgavenes-hall.jpg`}
          alt="Two people in carved wooden goat and witch masks, with a pancake supper behind them."
        />
        <p>{event.maskCaption}</p>
      </aside>
    </section>
  );
}

function Fact({ label, headline, detail }) {
  return (
    <article className="fact">
      <p className="fact-label">{label}</p>
      <p className="fact-headline">{headline}</p>
      {detail ? <p className="fact-detail">{detail}</p> : null}
    </article>
  );
}

function About() {
  return (
    <section className="about" id="what">
      <div>
        <h2>{event.aboutTitle}</h2>
        {event.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <aside className="why">
        <h2>{event.whyTitle}</h2>
        <ul>
          {event.why.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </aside>
    </section>
  );
}

function Schedule() {
  return (
    <section className="band" id="schedule">
      <div className="narrow schedule-layout">
        <div>
          <h2>{event.scheduleTitle}</h2>
          <p className="lede">{event.scheduleNote}</p>
        <ol className="timeline">
          {event.schedule.map((item) => (
            <li key={item.title}>
              <p className="time">{item.time}</p>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        </div>
        <figure className="match-photo">
          <img
            src={`${import.meta.env.BASE_URL}lasininis-kanapinis.jpg`}
            alt="Lašininis, padded and heavy, grappling with lean Kanapinis while families watch from pancake tables."
          />
          <figcaption>Lašininis, winter, meets Kanapinis, spring. Spring is supposed to win.</figcaption>
        </figure>
      </div>
    </section>
  );
}

function Food() {
  return (
    <section className="band band-food" id="food">
      <div className="split">
        <div>
          <h2>{event.foodTitle}</h2>
          <p className="lede">{event.foodIntro}</p>
          <div className="stack">
            {event.food.map((item) => (
              <article className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
        <div>
          <h2>{event.activitiesTitle}</h2>
          <p className="lede">{event.activitiesIntro}</p>
          <div className="stack">
            {event.activities.map((item) => (
              <article className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Visit({ onRsvp }) {
  return (
    <section className="band band-visit" id="visit">
      <div className="narrow">
        <h2>{event.visitTitle}</h2>
        <p className="lede">{event.visitIntro}</p>
        <div className="visit-grid">
          {event.visit.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
          <article className="card contact-card">
            <h3>Contact</h3>
            <p>
              Email <span className="mono">{event.contact.email}</span>
            </p>
            <p>
              Parish office phone <span className="mono">{event.contact.phone}</span>
            </p>
            <button className="btn btn-solid" type="button" onClick={onRsvp}>
              Hold a table
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="band band-faq" id="faq">
      <div className="narrow">
        <h2>FAQ</h2>
        <div className="faq-list">
          {event.faq.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="narrow">
        <p className="footer-title">
          {event.title} at {event.parish}
        </p>
        <p className="footer-byline">
          {event.organizers}
        </p>
        <p className="footer-note">
          {event.footerNote.split("src/event.js")[0]}
          <code>src/event.js</code>
          {event.footerNote.split("src/event.js")[1]}
        </p>
      </div>
    </footer>
  );
}

function RsvpDialog({ onClose }) {
  const titleId = useId();
  const nameRef = useRef(null);
  const closeRef = useRef(null);
  const [sent, setSent] = useState(null);

  useEffect(() => {
    const previous = document.activeElement;
    const onKey = (eventKey) => {
      if (eventKey.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("modal-open");
    nameRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-open");
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [onClose]);

  useEffect(() => {
    if (sent) closeRef.current?.focus();
  }, [sent]);

  function onSubmit(formEvent) {
    formEvent.preventDefault();
    const data = new FormData(formEvent.currentTarget);
    setSent(String(data.get("name") || "").trim());
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(mouseEvent) => mouseEvent.stopPropagation()}
      >
        <button
          ref={closeRef}
          className="modal-close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
        <h2 id={titleId}>Hold a table</h2>
        {sent ? (
          <p className="thanks">
            Thanks, {sent}. This form does not send yet — RSVP details are TBA. Email{" "}
            <span className="mono">{event.contact.email}</span> or call{" "}
            <span className="mono">{event.contact.phone}</span> when those are posted.
          </p>
        ) : (
          <form onSubmit={onSubmit}>
            <p className="modal-note">
              Admission is free. This form does not send and does not take payment. Food and drinks are paid at the event.
            </p>
            <label>
              Name
              <input ref={nameRef} name="name" required autoComplete="name" />
            </label>
            <label>
              Email
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <label>
              How many people
              <input name="people" type="number" min="1" max="40" defaultValue="2" required />
            </label>
            <label>
              Notes (allergies, first visit…)
              <textarea name="notes" rows="3" />
            </label>
            <button className="btn btn-solid btn-wide" type="submit">
              Send placeholder RSVP
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Flag() {
  return (
    <svg className="flag" viewBox="0 0 28 20" aria-hidden="true">
      <rect width="28" height="6.67" fill="#fdb913" />
      <rect y="6.67" width="28" height="6.66" fill="#006a44" />
      <rect y="13.33" width="28" height="6.67" fill="#c1272d" />
    </svg>
  );
}
