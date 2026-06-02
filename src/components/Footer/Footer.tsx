import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to('.footer-name', {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="footer" className="footer">
      <div className="footer-container">
        <nav className="footer-nav">
          <a href="#hero">HOME</a>
          <a href="#about">ABOUT</a>
          <a href="#timeline">JOURNEY</a>
          <a href="#stack">STACK</a>
          <a href="#projects">WORK</a>
          <a href="#contact">CONTACT</a>
        </nav>
      </div>
      <div className="footer-footer">
        <div className="footer-social">
          <a href="mailto:ketanthakur603@gmail.com">GMAIL</a>
          <a href="https://instagram.com/_ketanthakur" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
          <a href="https://wa.me/918448721488" target="_blank" rel="noopener noreferrer">WHATSAPP</a>
          <a href="https://x.com/_ketanthakur" target="_blank" rel="noopener noreferrer">X</a>
          <a href="https://www.linkedin.com/in/ketanthakurr/" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
        </div>
        <div className="footer-copyright">
          © KETAN {new Date().getFullYear()} ALL RIGHTS RESERVED
        </div>
      </div>
      <div className="footer-name">KETAN</div>
      <div className="footer-gradient"></div>
    </section>
  );
};

export default Footer;