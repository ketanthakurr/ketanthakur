import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import './Contact.css';

const socials = [
  { name: "Twitter", preview: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=600&q=80" },
  { name: "Instagram", preview: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80" },
  { name: "LinkedIn", preview: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=600&q=80" },
  { name: "Behance", preview: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80" },
];

const SocialLink = ({ social }: { social: typeof socials[0] }) => {
  const [hovered, setHovered] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;
    imgRef.current.style.opacity = hovered ? '1' : '0';
    imgRef.current.style.transform = hovered ? 'scale(1)' : 'scale(0.95)';
  }, [hovered]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current || !linkRef.current) return;
    const rect = linkRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 100;
    const y = e.clientY - rect.top - 75;
    imgRef.current.style.left = `${x}px`;
    imgRef.current.style.top = `${y}px`;
  };

  return (
    <a
      ref={linkRef}
      href="#"
      className="social-link"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {social.preview && (
        <div ref={imgRef} className="social-preview">
          <img src={social.preview} alt={`${social.name} preview`} />
        </div>
      )}
      {social.name}
    </a>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thanks for reaching out! I'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="contact-hero"
        >
          <p className="contact-badge">Contact</p>
          <h1 className="contact-title">
            LET'S BUILD<br />
            <span>SOMETHING.</span>
          </h1>
        </motion.div>

        <div className="contact-content">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="contact-form"
          >
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <button type="submit" className="submit-btn">
              Send Message
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="contact-info"
          >
            <p className="info-text">
              Have a project in mind? I'd love to hear about it. Drop me a message and let's create something amazing together.
            </p>
            <div className="info-items">
              <div className="info-item">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>ketanthakur603@gmail.com</span>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>+91 84487 21488</span>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Sirmaur, Himachal Pradesh</span>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Gurugram, Haryana</span>
              </div>
            </div>
            <div className="socials">
              <p className="socials-label">Socials</p>
              <div className="social-links">
                {socials.map((s) => (
                  <SocialLink key={s.name} social={s} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
