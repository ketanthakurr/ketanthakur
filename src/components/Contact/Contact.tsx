import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import './Contact.css';

interface Social {
  name: string;
  handle: string;
  url: string;
  brand: string;
  brandText: string;
  slug: string;
  bg: string;
}

const socials: Social[] = [
  {
    name: 'Gmail',
    handle: 'ketanthakur603@gmail.com',
    url: 'mailto:ketanthakur603@gmail.com',
    brand: '#EA4335',
    brandText: '#fff',
    slug: 'gmail',
    bg: 'conic-gradient(from 210deg at 50% 50%, #4285F4 0%, #34A853 25%, #FBBC05 55%, #EA4335 80%, #4285F4 100%)',
  },
  {
    name: 'Instagram',
    handle: '@ketanthakur',
    url: 'https://instagram.com/_ketanthakur',
    brand: '#E1306C',
    brandText: '#fff',
    slug: 'instagram',
    bg: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
  },
  {
    name: 'WhatsApp',
    handle: '+91 84487 21488',
    url: 'https://wa.me/918448721488',
    brand: '#25D366',
    brandText: '#0a0a0a',
    slug: 'whatsapp',
    bg: '#25D366',
  },
  {
    name: 'X',
    handle: '@ketanthakur',
    url: 'https://x.com/_ketanthakur',
    brand: '#0a0a0a',
    brandText: '#fff',
    slug: 'x',
    bg: '#0a0a0a',
  },
  {
    name: 'LinkedIn',
    handle: 'in/ketanthakur',
    url: 'https://www.linkedin.com/in/ketanthakurr/',
    brand: '#0A66C2',
    brandText: '#fff',
    slug: 'linkedin',
    bg: '#0A66C2',
  },
];

// Inline SVGs for slugs Simple Icons doesn't reliably serve (LinkedIn removed from SI).
const inlineSocialIcon = (slug: string) => {
  switch (slug) {
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    default:
      return null;
  }
};

const SocialPill = ({ social }: { social: Social }) => {
  const isEmail = social.slug === 'gmail';
  const inline = inlineSocialIcon(social.slug);
  return (
    <a
      href={social.url}
      target={isEmail ? undefined : '_blank'}
      rel="noopener noreferrer"
      className="social-pill"
      style={{
        ['--brand' as string]: social.brand,
        ['--brand-bg' as string]: social.bg,
      } as React.CSSProperties}
      aria-label={social.name}
    >
      <span className="social-pill-icon" aria-hidden="true">
        {inline ?? <img src={`https://cdn.simpleicons.org/${social.slug}`} alt="" loading="lazy" />}
      </span>
      <span className="social-pill-tip">{social.name}</span>
    </a>
  );
};

/** Mascot — chunky SVG character with eyes that track the cursor across the section. */
const Mascot = ({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) => {
  const mascotRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const mouthRef = useRef<SVGPathElement>(null);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;
    let targetLX = 0, targetLY = 0, targetRX = 0, targetRY = 0;
    let curLX = 0, curLY = 0, curRX = 0, curRY = 0;
    const maxOffset = 4;

    const handleMove = (e: MouseEvent) => {
      const l = leftPupilRef.current?.getBoundingClientRect();
      const r = rightPupilRef.current?.getBoundingClientRect();
      if (!l || !r) return;

      const lcx = l.left + l.width / 2;
      const lcy = l.top + l.height / 2;
      const rcx = r.left + r.width / 2;
      const rcy = r.top + r.height / 2;

      const la = Math.atan2(e.clientY - lcy, e.clientX - lcx);
      const ra = Math.atan2(e.clientY - rcy, e.clientX - rcx);

      const ldist = Math.hypot(e.clientX - lcx, e.clientY - lcy);
      const rdist = Math.hypot(e.clientX - rcx, e.clientY - rcy);

      const lk = Math.min(1, ldist / 220);
      const rk = Math.min(1, rdist / 220);

      targetLX = Math.cos(la) * maxOffset * lk;
      targetLY = Math.sin(la) * maxOffset * lk;
      targetRX = Math.cos(ra) * maxOffset * rk;
      targetRY = Math.sin(ra) * maxOffset * rk;

      // Floaters parallax
      const floaters = section.querySelectorAll<HTMLElement>('.contact-floater');
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      floaters.forEach((f, i) => {
        const depth = (i + 1) * 10;
        f.style.transform = `translate3d(${dx * depth}px, ${dy * depth}px, 0) rotate(${dx * (i % 2 ? 8 : -8)}deg)`;
      });
    };

    const tick = () => {
      curLX += (targetLX - curLX) * 0.18;
      curLY += (targetLY - curLY) * 0.18;
      curRX += (targetRX - curRX) * 0.18;
      curRY += (targetRY - curRY) * 0.18;
      if (leftPupilRef.current) leftPupilRef.current.setAttribute('transform', `translate(${curLX} ${curLY})`);
      if (rightPupilRef.current) rightPupilRef.current.setAttribute('transform', `translate(${curRX} ${curRY})`);
      raf = requestAnimationFrame(tick);
    };
    tick();

    const blink = setInterval(() => {
      mascotRef.current?.classList.add('mascot-blink');
      setTimeout(() => mascotRef.current?.classList.remove('mascot-blink'), 160);
    }, 4200);

    section.addEventListener('mousemove', handleMove);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(blink);
      section.removeEventListener('mousemove', handleMove);
    };
  }, [sectionRef]);

  useEffect(() => {
    if (mouthRef.current) {
      mouthRef.current.setAttribute(
        'd',
        typing
          ? 'M 38 70 Q 50 84 62 70'
          : 'M 38 72 Q 50 78 62 72'
      );
    }
  }, [typing]);

  useEffect(() => {
    const onTyping = (e: Event) => setTyping((e as CustomEvent).detail);
    const onHappy = () => {
      mascotRef.current?.classList.add('mascot-happy');
      setTimeout(() => mascotRef.current?.classList.remove('mascot-happy'), 1100);
    };
    window.addEventListener('mascot:typing', onTyping);
    window.addEventListener('mascot:happy', onHappy);
    return () => {
      window.removeEventListener('mascot:typing', onTyping);
      window.removeEventListener('mascot:happy', onHappy);
    };
  }, []);

  return (
    <div ref={mascotRef} className="mascot" aria-hidden="true">
      <svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="100" rx="32" ry="4" fill="rgba(0,0,0,0.15)" />
        <path
          d="M 18 36 Q 18 12 50 12 Q 82 12 82 36 L 82 70 Q 82 92 50 92 Q 18 92 18 70 Z"
          fill="#ff6b35"
        />
        <path
          d="M 28 22 Q 36 14 50 14"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <line x1="50" y1="12" x2="50" y2="2" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="2" r="3" fill="#0a0a0a" />
        <circle cx="38" cy="46" r="9" fill="#fff" />
        <circle cx="62" cy="46" r="9" fill="#fff" />
        <circle ref={leftPupilRef} cx="38" cy="46" r="4" fill="#0a0a0a" />
        <circle ref={rightPupilRef} cx="62" cy="46" r="4" fill="#0a0a0a" />
        <circle cx="28" cy="60" r="3" fill="rgba(255,255,255,0.35)" />
        <circle cx="72" cy="60" r="3" fill="rgba(255,255,255,0.35)" />
        <path
          ref={mouthRef}
          d="M 38 72 Q 50 78 62 72"
          stroke="#0a0a0a"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <div className={`mascot-bubble ${typing ? 'is-typing' : ''}`}>
        {typing ? <span className="bubble-dots"><i/><i/><i/></span> : <span>Say hi!</span>}
      </div>
    </div>
  );
};

// Web3Forms key is public by design (sent from the browser). Env var overrides if set.
const WEB3FORMS_ACCESS_KEY =
  (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) ||
  "c02067ab-32b6-4711-b019-0dfbac995333";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [burst, setBurst] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      setErrorMsg("Form not configured. Set VITE_WEB3FORMS_KEY.");
      return;
    }

    // Honeypot: a hidden field no human can see. If it's filled, it's a bot —
    // fake success and never hit the network.
    if (honeypotRef.current?.value) {
      setStatus("ok");
      setForm({ name: "", email: "", message: "" });
      return;
    }

    // Normalize input before sending.
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name || !email || !message) {
      setStatus("error");
      setErrorMsg("Please fill in every field.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name,
          email,
          message,
          replyto: email,
          subject: `Portfolio contact — ${name}`,
          from_name: "Portfolio Contact Form",
        }),
      });
      const data = await res.json();

      if (data.success) {
        window.dispatchEvent(new CustomEvent('mascot:happy'));
        setBurst(true);
        setTimeout(() => setBurst(false), 1200);
        setStatus("ok");
        setForm({ name: "", email: "", message: "" });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        setTimeout(() => setStatus("idle"), 3200);
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Check connection and retry.");
    }
  };

  const broadcastTyping = (on: boolean) => {
    window.dispatchEvent(new CustomEvent('mascot:typing', { detail: on }));
  };

  useEffect(() => {
    const btn = submitRef.current;
    if (!btn) return;
    const handleMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    };
    const reset = () => { btn.style.transform = ''; };
    btn.addEventListener('mousemove', handleMove);
    btn.addEventListener('mouseleave', reset);
    return () => {
      btn.removeEventListener('mousemove', handleMove);
      btn.removeEventListener('mouseleave', reset);
    };
  }, []);

  return (
    <section ref={sectionRef} className="contact-section" id="contact">
      <div className="contact-floaters" aria-hidden="true">
        <div className="contact-floater floater-ring" />
        <div className="contact-floater floater-square" />
        <div className="contact-floater floater-blob" />
        <div className="contact-floater floater-plus">
          <svg viewBox="0 0 40 40"><path d="M20 4v32M4 20h32" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
        </div>
        <div className="contact-floater floater-star">
          <svg viewBox="0 0 40 40"><path d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z" fill="currentColor"/></svg>
        </div>
      </div>

      <div className="contact-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="contact-hero"
        >
          <p className="contact-badge">Contact · 04 channels</p>
          <h1 className="contact-title">
            LET'S BUILD<br />
            <span>SOMETHING.</span>
          </h1>
          <p className="contact-lede">
            Email, DMs, carrier pigeons — pick a lane. Replies usually within a day.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="contact-card form-card"
        >
          <Mascot sectionRef={sectionRef} />

          <div className="form-card-head">
            <span className="form-card-tag">Drop a Line</span>
            <h3 className="form-card-title">Got a brief?</h3>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            {/* Honeypot — hidden from real users; bots that fill it are dropped */}
            <input
              ref={honeypotRef}
              type="text"
              name="company"
              className="hp-field"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <div className="form-row form-row-2">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text" required maxLength={80}
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={() => broadcastTyping(true)}
                  onBlur={() => broadcastTyping(false)}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email" required maxLength={120}
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={() => broadcastTyping(true)}
                  onBlur={() => broadcastTyping(false)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Tell me about it</label>
              <textarea
                required maxLength={1500}
                rows={3}
                placeholder="A new product, a weird side-project, a redesign that scares you…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={() => broadcastTyping(true)}
                onBlur={() => broadcastTyping(false)}
              />
            </div>
            <div className="submit-wrap">
              <button ref={submitRef} type="submit" className="submit-btn" disabled={status === "sending"}>
                <span className="submit-btn-label">
                  {status === "sending" ? "Sending…" : status === "ok" ? "Sent ✓" : "Send Message"}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {burst && (
                <div className="submit-burst" aria-hidden="true">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} className="burst-bit" style={{ ['--a' as string]: `${i * 30}deg` }} />
                  ))}
                  <span className="burst-heart">♥</span>
                </div>
              )}
            </div>
            {status === "error" && (
              <p className="form-status form-status-error" role="alert">
                {errorMsg}
              </p>
            )}
          </form>

          {/* Compact socials row */}
          <div className="form-socials">
            <span className="form-socials-label">or reach me on —</span>
            <div className="form-socials-row">
              {socials.map((s) => (
                <SocialPill key={s.name} social={s} />
              ))}
            </div>
          </div>

          <div className="form-card-foot">
            <div className="form-foot-row">
              <span className="form-foot-key">Based in</span>
              <span className="form-foot-val">Gurugram, Haryana, IN</span>
            </div>
            <div className="form-foot-row">
              <span className="form-foot-key">Status</span>
              <span className="form-foot-val">
                <span className="status-dot" /> Available for work
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            className="sent-toast"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
          >
            <span className="sent-toast-confetti" aria-hidden="true">
              {Array.from({ length: 10 }).map((_, i) => (
                <i key={i} style={{ ['--a' as string]: `${i * 36}deg` }} />
              ))}
            </span>

            <span className="sent-toast-check" aria-hidden="true">
              <svg viewBox="0 0 52 52">
                <circle className="stc-ring" cx="26" cy="26" r="23" />
                <path className="stc-tick" d="M15 27 l7 7 l15 -16" />
              </svg>
            </span>

            <span className="sent-toast-body">
              <span className="sent-toast-title">Message Sent</span>
              <span className="sent-toast-sub">Reply heading your way within a day.</span>
            </span>

            <span className="sent-toast-progress" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
