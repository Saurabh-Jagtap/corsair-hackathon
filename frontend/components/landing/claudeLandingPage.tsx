import { useEffect, useRef, useState, type ReactNode } from "react";

/* ---------------------------------------------------------------
   Design tokens
   ink        #1A2B35  — primary text, dark surfaces
   primary    #2D4A5E  — buttons, emphasis
   accent     #4A7FA0  — links, icons, "review" tag
   paper      #F4F6F7  — page background
   mist       #E8ECF0  — section background, borders
   signal     #C77B4A  — "needs reply" triage tag ONLY. Never decorative.
----------------------------------------------------------------- */

/* Real inbox content — mirrors the actual connected-account screenshot
   rather than a fictional "executive inbox" scenario. */
const EMAILS = [
  {
    id: 1,
    initials: "GO",
    name: "Google",
    subject: "Security alert",
    snippet:
      "You allowed triagent-x14x.onrender.com access to some of your Google Account data.",
    time: "11:17 PM",
    delay: 0,
  },
  {
    id: 2,
    initials: "IT",
    name: "Internshala Trainings",
    subject: "Update: Your industry-recognized certification is ready to be claimed",
    snippet: "Full Stack Web Development with AI · Programming in Python with AI",
    time: "8:58 PM",
    delay: 700,
  },
  {
    id: 3,
    initials: "IN",
    name: "Internshala",
    subject: "RSVR Technologies is hiring ReactJS Development intern",
    snippet: "Saurabh, earn high stipend in your preferred field and location.",
    time: "7:58 PM",
    delay: 1400,
  },
  {
    id: 4,
    initials: "D",
    name: "daily.dev",
    subject: "Saurabh, your personal update from daily.dev is ready",
    snippet: "Here's what developers in your topics are reading and bookmarking.",
    time: "9:30 AM",
    delay: 2100,
  },
];

const LOOP_DURATION = 9000;

/* Trust-strip marquee content — real, verifiable claims only. */
const MARQUEE_ITEMS = [
  "Gmail integration",
  "Google Calendar integration",
  "Secured by OAuth",
  "Read-only access by default",
  "Revoke access anytime",
  "No password stored",
];

/* ---------------------------------------------------------------
   Hook: scroll progress (0 → 1 across full page height)
   Drives the floating nav state and the background parallax layer.
   Single passive listener, no per-section observers.
----------------------------------------------------------------- */
function useScrollProgress() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        const y = window.scrollY;
        setScrolled(y > 8);
        setProgress(max > 0 ? Math.min(y / max, 1) : 0);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { scrolled, progress };
}

/* ---------------------------------------------------------------
   Hook: reveal-on-scroll
----------------------------------------------------------------- */
function useReveal(): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

type RevealProps = {
  children: ReactNode;
  className?: string;
};

function Reveal({ children, className = "" }: RevealProps) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------
   Ambient background
   Two very low-opacity radial fields that drift on scroll via a
   single transform (GPU-accelerated, no repaint of content).
   Decorative only — aria-hidden, pointer-events: none.
----------------------------------------------------------------- */
function AmbientBackground({ progress }: { progress: number }) {
  return (
    <div className="tg-ambient" aria-hidden="true">
      <div
        className="tg-ambient-blob tg-ambient-blob-a"
        style={{ transform: `translate3d(0, ${progress * -120}px, 0)` }}
      />
      <div
        className="tg-ambient-blob tg-ambient-blob-b"
        style={{ transform: `translate3d(0, ${progress * 90}px, 0)` }}
      />
      <div className="tg-ambient-grid" />
    </div>
  );
}

/* ---------------------------------------------------------------
   Marquee — infinite trust strip. Pure CSS keyframe loop,
   duplicated content for a seamless wrap, paused on hover.
----------------------------------------------------------------- */
function Marquee() {
  return (
    <div className="tg-marquee">
      <div className="tg-marquee-track">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span className="tg-marquee-item" key={i}>
            <span className="tg-marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Nav — floating pill, gains depth on scroll, mobile menu toggle.
----------------------------------------------------------------- */
function Nav({ scrolled }: { scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`tg-nav ${scrolled ? "tg-nav-scrolled" : ""}`}>
      <div className="tg-nav-inner">
        <span className="tg-logo">Triagent</span>

        <nav className="tg-nav-links">
          <a href="#how">How it works</a>
          <a href="#features">Features</a>
          <a href="#signin">Sign in</a>
          <button className="tg-btn tg-btn-primary tg-btn-sm">
            Get started
          </button>
        </nav>

        <button
          className="tg-nav-burger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`tg-nav-mobile ${menuOpen ? "tg-nav-mobile-open" : ""}`}>
        <a href="#how" onClick={() => setMenuOpen(false)}>How it works</a>
        <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
        <a href="#signin" onClick={() => setMenuOpen(false)}>Sign in</a>
        <button className="tg-btn tg-btn-primary tg-btn-sm">
          Get started
        </button>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------
   Live inbox demo — the signature element.
   Mirrors the real connected Triagent inbox (Google security
   alert, Internshala, daily.dev) rather than a fictional
   "executive inbox" scenario, with the same Search + Compose
   header your actual app uses. Rows stagger in, the "New" badge
   pulses once on entry, and rows lift gently on hover.
----------------------------------------------------------------- */
function LiveInboxDemo() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1);
    }, LOOP_DURATION);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="tg-demo-window" key={tick}>
      <div className="tg-demo-chrome">
        <span className="tg-dot tg-dot-red" />
        <span className="tg-dot tg-dot-amber" />
        <span className="tg-dot tg-dot-green" />
        <span className="tg-demo-title">Triagent — Inbox</span>
      </div>

      <div className="tg-demo-toolbar">
        <div className="tg-demo-search">
          <span className="tg-demo-search-icon">⌕</span>
          Search emails...
        </div>
        <button className="tg-demo-compose">Compose</button>
      </div>

      <div className="tg-demo-body">
        {EMAILS.map((email) => (
          <div
            key={email.id}
            className="tg-demo-row tg-anim-in"
            style={{ animationDelay: `${email.delay}ms` }}
          >
            <span className="tg-avatar">{email.initials}</span>
            <div className="tg-demo-row-text">
              <span className="tg-demo-sender">{email.name}</span>
              <span className="tg-demo-subject">{email.subject}</span>
              <span className="tg-demo-snippet">{email.snippet}</span>
            </div>
            <div className="tg-demo-meta">
              <span
                className="tg-tag tg-tag-new tg-anim-tag"
                style={{ animationDelay: `${email.delay + 350}ms` }}
              >
                New
              </span>
              <span className="tg-demo-time">{email.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Hero
----------------------------------------------------------------- */
function Hero() {
  return (
    <section className="tg-hero">
      <div className="tg-hero-inner">
        <Reveal className="tg-hero-text">
          <p className="tg-eyebrow">Intelligent executive assistant</p>
          <h1 className="tg-h1">
            Your inbox and calendar,
            <br />
            organized by intelligence.
          </h1>
          <p className="tg-hero-sub">
            Triagent connects to Gmail and Google Calendar, reads what
            matters, and gives you a clear daily brief — so you spend less
            time sorting and more time deciding.
          </p>
          <div className="tg-hero-actions">
            <button className="tg-btn tg-btn-primary">
              Continue with Google
            </button>
            <button className="tg-btn tg-btn-ghost">See how it works</button>
          </div>
          <p className="tg-fine-print">
            No credit card required · Read-only access by default · Revoke
            anytime
          </p>
        </Reveal>
      </div>

      <Reveal className="tg-demo-wrap">
        <LiveInboxDemo />
      </Reveal>
    </section>
  );
}

const STEPS = [
  {
    n: "01",
    icon: "plug",
    title: "Connect Gmail & Calendar",
    text: "One-click OAuth. Triagent reads your data — it never stores your password.",
  },
  {
    n: "02",
    icon: "spark",
    title: "Triagent reads what matters",
    text: "Your inbox and schedule are scanned and ranked, so the important things surface first.",
  },
  {
    n: "03",
    icon: "check",
    title: "Get your daily brief",
    text: "One clear summary of what needs attention today — emails, meetings, and what to do next.",
  },
];

const STEP_ICONS: Record<string, ReactNode> = {
  plug: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M9 7V3M15 7V3M7 7h10v3a5 5 0 0 1-5 5 5 5 0 0 1-5-5V7zM12 15v3a3 3 0 0 0 3 3h1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M17.5 17.5L15 15M6 18l2.5-2.5M17.5 6.5L15 9" strokeLinecap="round" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 12.5l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function HowItWorks() {
  return (
    <section className="tg-section" id="how">
      <div className="tg-section-inner">
        <Reveal>
          <p className="tg-eyebrow">How it works</p>
          <h2 className="tg-h2">
            From connected to in control,
            <br />
            in under two minutes.
          </h2>
          <p className="tg-section-sub">
            No setup, no configuration. Just your inbox and schedule, made
            clear.
          </p>
        </Reveal>

        <div className="tg-steps">
          <div className="tg-steps-rail" aria-hidden="true" />
          {STEPS.map((step, i) => (
            <Reveal key={step.n} className="tg-step">
              <div
                className="tg-step-inner"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="tg-step-icon">{STEP_ICONS[step.icon]}</div>
                <span className="tg-step-n">{step.n}</span>
                <h3 className="tg-step-title">{step.title}</h3>
                <p className="tg-step-text">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: "brief",
    title: "Daily Brief",
    text: "One clear morning summary of what matters across your inbox and calendar.",
  },
  {
    icon: "priority",
    title: "Priority Emails",
    text: "Emails sorted into high, medium, and low priority — with a reason for each.",
  },
  {
    icon: "meeting",
    title: "Meeting Summaries",
    text: "Upcoming meetings, deadlines, and what needs preparation, all in one view.",
  },
  {
    icon: "focus",
    title: "Focus Today",
    text: "A straight answer to 'what should I actually do right now.'",
  },
  {
    icon: "gmail",
    title: "Gmail integration",
    text: "Connects securely over OAuth. Read access only. Revoke anytime.",
  },
  {
    icon: "calendar",
    title: "Calendar integration",
    text: "Your schedule, pulled in alongside your inbox — no app-switching.",
  },
];

const FEATURE_ICONS: Record<string, ReactNode> = {
  brief: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 4h11l3 3v13H5V4z" strokeLinejoin="round" />
      <path d="M9 10h6M9 14h6M9 18h3" strokeLinecap="round" />
    </svg>
  ),
  priority: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 18V10M11 18V6M18 18v-4" strokeLinecap="round" />
    </svg>
  ),
  meeting: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  ),
  focus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  gmail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M8 3v4M16 3v4" strokeLinecap="round" />
      <path d="M8 14.5h2M14 14.5h2M8 17.5h2" strokeLinecap="round" />
    </svg>
  ),
};

function Features() {
  return (
    <section className="tg-section tg-section-mist" id="features">
      <div className="tg-section-inner">
        <Reveal>
          <p className="tg-eyebrow">Features</p>
          <h2 className="tg-h2">
            Everything your inbox demands.
            <br />
            Nothing it doesn't.
          </h2>
        </Reveal>

        <div className="tg-feature-grid">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} className="tg-feature-card">
              <div
                className="tg-feature-inner"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="tg-feature-icon">{FEATURE_ICONS[f.icon]}</div>
                <h3 className="tg-feature-title">{f.title}</h3>
                <p className="tg-feature-text">{f.text}</p>
                <span className="tg-feature-arrow" aria-hidden="true">→</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   Final CTA
----------------------------------------------------------------- */
function FinalCTA() {
  return (
    <section className="tg-section tg-section-mist">
      <div className="tg-section-inner tg-cta-inner">
        <Reveal>
          <h2 className="tg-h2 tg-center">
            Stop managing your inbox.
            <br />
            Let Triagent handle it.
          </h2>
          <p className="tg-section-sub tg-center">
            Free to start. No credit card. Works with your existing Gmail and
            Google Calendar.
          </p>
          <div className="tg-hero-actions tg-center-actions">
            <button className="tg-btn tg-btn-primary">
              Continue with Google
            </button>
            <button className="tg-btn tg-btn-ghost">Sign up with email</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="tg-footer">
      <div className="tg-footer-inner">
        <span className="tg-logo tg-logo-footer">Triagent</span>
        <div className="tg-footer-links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#contact">Contact</a>
        </div>
        <span className="tg-footer-copy">© 2026 Triagent</span>
      </div>
    </footer>
  );
}

export default function TriagentLanding() {
  const { scrolled, progress } = useScrollProgress();

  return (
    <div className="tg-root">
      <style>{CSS}</style>
      <AmbientBackground progress={progress} />
      <Nav scrolled={scrolled} />
      <Hero />
      <HowItWorks />
      <Features />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ---------------------------------------------------------------
   Styles
----------------------------------------------------------------- */
const CSS = `
:root {
  --ink: #1A2B35;
  --primary: #2D4A5E;
  --accent: #4A7FA0;
  --paper: #F4F6F7;
  --mist: #E8ECF0;
  --signal: #C77B4A;
  --signal-bg: #FBEDE3;
  --accent-bg: #E9F0F6;
  --border: #D7DEE3;
  --font-serif: Georgia, 'Iowan Old Style', 'Palatino Linotype', serif;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  --font-mono: 'SF Mono', 'Roboto Mono', Menlo, monospace;
}

.tg-root {
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-sans);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  position: relative;
}
.tg-nav, .tg-hero, .tg-section, .tg-footer {
  position: relative;
  z-index: 1;
}

.tg-root * { box-sizing: border-box; }

.tg-root a { color: inherit; text-decoration: none; }

/* Ambient background — fixed behind all content, decorative only */
.tg-ambient {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}
.tg-ambient-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  will-change: transform;
  transition: transform 0.1s linear;
}
.tg-ambient-blob-a {
  width: 560px; height: 560px;
  top: -120px; left: -80px;
  background: radial-gradient(circle, rgba(74, 127, 160, 0.16), transparent 70%);
}
.tg-ambient-blob-b {
  width: 620px; height: 620px;
  top: 55vh; right: -160px;
  background: radial-gradient(circle, rgba(45, 74, 94, 0.13), transparent 70%);
}
.tg-ambient-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(26, 43, 53, 0.05) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: radial-gradient(ellipse 70% 50% at 50% 0%, black 0%, transparent 75%);
}
@media (max-width: 860px) {
  .tg-ambient-blob { display: none; }
}

.tg-root a { color: inherit; text-decoration: none; }

@media (prefers-reduced-motion: reduce) {
  .tg-root *, .tg-root *::before, .tg-root *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}

/* Nav — floating pill, gains depth on scroll */
.tg-nav {
  position: sticky;
  top: 0;
  z-index: 30;
  padding: 14px 20px 0;
}
.tg-nav-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 11px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 999px;
  border: 1px solid transparent;
  background: rgba(244, 246, 247, 0.6);
  backdrop-filter: blur(0px);
  transition: background 0.35s ease, border-color 0.35s ease,
    box-shadow 0.35s ease, backdrop-filter 0.35s ease, padding 0.35s ease;
}
.tg-nav-scrolled .tg-nav-inner {
  background: rgba(255, 255, 255, 0.78);
  border-color: var(--border);
  box-shadow: 0 10px 30px -16px rgba(26, 43, 53, 0.22);
  backdrop-filter: blur(14px);
  padding: 9px 20px;
}
.tg-logo {
  font-family: var(--font-serif);
  font-size: 19px;
  font-weight: 500;
  color: var(--ink);
  letter-spacing: -0.01em;
}
.tg-nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
  font-size: 13.5px;
  color: #4A5568;
}
.tg-nav-links a {
  position: relative;
  padding-bottom: 2px;
}
.tg-nav-links a::after {
  content: "";
  position: absolute;
  left: 0; right: 100%;
  bottom: -2px;
  height: 1px;
  background: var(--accent);
  transition: right 0.25s ease;
}
.tg-nav-links a:hover { color: var(--ink); }
.tg-nav-links a:hover::after { right: 0; }

.tg-nav-burger {
  display: none;
  width: 34px; height: 34px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: transparent;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
}
.tg-nav-burger span {
  width: 14px; height: 1.4px;
  background: var(--ink);
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.tg-nav-mobile {
  max-width: 1120px;
  margin: 8px auto 0;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 0.3s ease, opacity 0.25s ease;
}
.tg-nav-mobile-open {
  max-height: 260px;
  opacity: 1;
}
.tg-nav-mobile a {
  padding: 11px 14px;
  font-size: 14px;
  color: var(--ink);
  border-radius: 10px;
}
.tg-nav-mobile a:hover { background: var(--mist); }
.tg-nav-mobile .tg-btn { margin: 8px 14px 4px; }

/* Buttons */
.tg-btn {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  padding: 11px 20px;
  border-radius: 7px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;
}
.tg-btn:hover { transform: translateY(-1px); }
.tg-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.tg-btn-primary {
  background: var(--primary);
  color: var(--paper);
}
.tg-btn-primary:hover { background: var(--ink); }
.tg-btn-ghost {
  background: transparent;
  border-color: var(--border);
  color: var(--ink);
}
.tg-btn-ghost:hover { border-color: var(--accent); }
.tg-btn-sm { padding: 8px 16px; font-size: 13px; }

/* Hero */
.tg-hero {
  max-width: 1120px;
  margin: 0 auto;
  padding: 88px 32px 0;
}
.tg-hero-inner { max-width: 640px; }
.tg-eyebrow {
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 14px;
}
.tg-h1 {
  font-family: var(--font-serif);
  font-size: 44px;
  line-height: 1.15;
  font-weight: 400;
  color: var(--ink);
  margin: 0 0 20px;
  letter-spacing: -0.01em;
}
.tg-hero-sub {
  font-size: 15.5px;
  color: #4A5568;
  line-height: 1.65;
  max-width: 520px;
  margin: 0 0 28px;
}
.tg-hero-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 14px;
}
.tg-fine-print {
  font-size: 12px;
  color: #8A98A3;
}

/* Live demo window */
.tg-demo-wrap {
  margin: 56px 0 0;
  display: flex;
  justify-content: center;
}
.tg-demo-window {
  width: 100%;
  max-width: 620px;
  background: white;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 24px 60px -24px rgba(26, 43, 53, 0.25);
}
.tg-demo-chrome {
  background: var(--ink);
  padding: 11px 16px;
  display: flex;
  align-items: center;
  gap: 7px;
}
.tg-dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }
.tg-dot-red { background: #E0857A; }
.tg-dot-amber { background: #E3C27A; }
.tg-dot-green { background: #7ABF8E; }
.tg-demo-title {
  margin-left: 8px;
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: #8EABB8;
}

.tg-demo-toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
}
.tg-demo-search {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: #8A98A3;
  background: var(--paper);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px 12px;
}
.tg-demo-search-icon { font-size: 13px; color: #9AA8B2; }
.tg-demo-compose {
  font-size: 12.5px;
  font-weight: 600;
  color: white;
  background: var(--ink);
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;
}
.tg-demo-compose:hover { background: var(--primary); transform: translateY(-1px); }

.tg-demo-snippet {
  font-size: 12px;
  color: #9AA8B2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 1px;
}
.tg-demo-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
}
.tg-demo-time { font-size: 11.5px; color: #9AA8B2; white-space: nowrap; }
.tg-tag-new {
  background: var(--accent-bg);
  color: var(--primary);
}

.tg-demo-body { padding: 6px 0; }
.tg-demo-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 13px 16px;
  border-bottom: 1px solid #F0F2F4;
  opacity: 0;
  transition: background 0.18s ease, transform 0.18s ease;
}
.tg-demo-row:hover {
  background: #FAFBFC;
  transform: translateX(2px);
}
.tg-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--mist);
  color: var(--primary);
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.tg-demo-row-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
  gap: 1px;
}
.tg-demo-sender { font-size: 13px; font-weight: 600; color: var(--ink); }
.tg-demo-subject {
  font-size: 12.5px;
  color: #7A8B96;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tg-tag {
  font-size: 10.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  flex-shrink: 0;
  opacity: 0;
}
.tg-tag-signal { background: var(--signal-bg); color: var(--signal); }
.tg-tag-accent { background: var(--accent-bg); color: var(--primary); }

@keyframes tgPulseBadge {
  0% { box-shadow: 0 0 0 0 rgba(74, 127, 160, 0.45); }
  70% { box-shadow: 0 0 0 6px rgba(74, 127, 160, 0); }
  100% { box-shadow: 0 0 0 0 rgba(74, 127, 160, 0); }
}
.tg-tag-new.tg-anim-tag {
  animation: tgFadeIn 0.4s ease forwards, tgPulseBadge 1.1s ease-out 0.4s 1;
}

/* Marquee — trust strip beneath hero demo */
.tg-marquee {
  margin-top: 48px;
  padding: 18px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
  mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
}
.tg-marquee-track {
  display: flex;
  gap: 40px;
  width: max-content;
  animation: tgMarquee 26s linear infinite;
}
.tg-marquee:hover .tg-marquee-track { animation-play-state: paused; }
.tg-marquee-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #6B7C87;
  white-space: nowrap;
}
.tg-marquee-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}
@keyframes tgMarquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes tgFadeUp {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes tgFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.tg-anim-in {
  animation: tgFadeUp 0.5s ease forwards;
}
.tg-anim-tag {
  animation: tgFadeIn 0.4s ease forwards;
}

/* Sections */
.tg-section { padding: 96px 0; }
.tg-section-mist { background: var(--mist); }
.tg-section-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 32px;
}
.tg-h2 {
  font-family: var(--font-serif);
  font-size: 30px;
  line-height: 1.25;
  font-weight: 400;
  color: var(--ink);
  margin: 0 0 14px;
  letter-spacing: -0.01em;
}
.tg-section-sub {
  font-size: 14.5px;
  color: #4A5568;
  max-width: 480px;
  margin: 0;
}
.tg-center { text-align: center; margin-left: auto; margin-right: auto; }
.tg-center-actions { justify-content: center; }
.tg-cta-inner { max-width: 640px; }

/* Steps */
.tg-steps {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 48px;
}
.tg-steps-rail {
  position: absolute;
  top: 38px;
  left: calc(16.66% + 10px);
  right: calc(16.66% + 10px);
  height: 1px;
  background: repeating-linear-gradient(
    90deg, var(--border) 0 6px, transparent 6px 12px
  );
  z-index: 0;
}
.tg-step-inner {
  position: relative;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px 22px;
  background: var(--paper);
  height: 100%;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}
.tg-step-inner:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
  box-shadow: 0 14px 32px -18px rgba(26, 43, 53, 0.2);
}
.tg-step-icon {
  width: 38px; height: 38px;
  border-radius: 10px;
  background: var(--accent-bg);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
}
.tg-step-icon svg { width: 18px; height: 18px; }
.tg-step-inner:hover .tg-step-icon {
  background: var(--primary);
  color: white;
  transform: scale(1.06);
}
.tg-step-n {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #B9C6CD;
  display: block;
  margin-bottom: 8px;
}
.tg-step-title {
  font-size: 14.5px;
  font-weight: 600;
  color: var(--ink);
  margin: 0 0 6px;
}
.tg-step-text {
  font-size: 13px;
  color: #6B7C87;
  line-height: 1.55;
  margin: 0;
}

/* Features */
.tg-feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 44px;
}
.tg-feature-inner {
  position: relative;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px 22px 26px;
  background: white;
  height: 100%;
  overflow: hidden;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}
.tg-feature-inner:hover {
  border-color: var(--accent);
  box-shadow: 0 14px 34px -16px rgba(26, 43, 53, 0.2);
  transform: translateY(-3px);
}
.tg-feature-icon {
  width: 36px; height: 36px;
  border-radius: 9px;
  background: var(--mist);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  transition: background 0.25s ease, color 0.25s ease;
}
.tg-feature-icon svg { width: 17px; height: 17px; }
.tg-feature-inner:hover .tg-feature-icon {
  background: var(--primary);
  color: white;
}
.tg-feature-title {
  font-size: 14.5px;
  font-weight: 600;
  color: var(--ink);
  margin: 0 0 6px;
}
.tg-feature-text {
  font-size: 13px;
  color: #6B7C87;
  line-height: 1.55;
  margin: 0;
}
.tg-feature-arrow {
  position: absolute;
  right: 18px;
  bottom: 16px;
  font-size: 14px;
  color: var(--accent);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.tg-feature-inner:hover .tg-feature-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Footer */
.tg-footer { padding: 28px 0 36px; }
.tg-footer-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.tg-logo-footer { font-size: 15px; }
.tg-footer-links {
  display: flex;
  gap: 20px;
  font-size: 12.5px;
  color: #6B7C87;
}
.tg-footer-links a:hover { color: var(--ink); }
.tg-footer-copy { font-size: 12px; color: #9AA8B2; }

@media (max-width: 860px) {
  .tg-steps, .tg-feature-grid { grid-template-columns: 1fr; }
  .tg-steps-rail { display: none; }
  .tg-h1 { font-size: 34px; }
  .tg-h2 { font-size: 24px; }
  .tg-hero { padding: 56px 20px 0; }
  .tg-section-inner { padding: 0 20px; }
  .tg-section { padding: 64px 0; }
  .tg-nav-links { display: none; }
  .tg-nav-burger { display: flex; }
  .tg-marquee-track { animation-duration: 18s; }
}
@media (max-width: 480px) {
  .tg-hero-actions, .tg-center-actions { flex-direction: column; }
  .tg-btn { width: 100%; text-align: center; }
  .tg-demo-snippet { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .tg-marquee-track { animation: none; }
  .tg-ambient-blob { transform: none !important; }
}
  `