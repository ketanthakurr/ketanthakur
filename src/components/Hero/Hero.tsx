import './Hero.css';
import Ketan from '../../assets/HeroSection/ketan.png';
import chip1 from '../../assets/HeroSection/1.png';
import chip2 from '../../assets/HeroSection/2.png';
import chip3 from '../../assets/HeroSection/3.png';
import chip4 from '../../assets/HeroSection/4.png';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let enterHandler: (() => void) | null = null;
    let leaveHandler: (() => void) | null = null;

    const ctx = gsap.context(() => {
      const heading = el.querySelector('.hero_content_heading');
      const cta = el.querySelector('.hero_cta');
      const image = el.querySelector('.hero_image');
      const chips = el.querySelectorAll('.hero_chip_image');

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Entrance sequence
      tl.fromTo(
        heading,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.1 }
      );

      tl.fromTo(
        cta,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.6'
      );

      tl.fromTo(
        image,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power4.out' },
        '-=0.8'
      );

      // Doodle wobble — each chip jiggles with its own irregular timing
      chips.forEach((chip, i) => {
        const baseRot = parseFloat((chip as HTMLElement).dataset.baseRot || '0');
        const rotAmp = 6 + i * 2;
        const xAmp = 5 + (i % 3) * 2;
        const yAmp = 4 + (i % 2) * 3;

        gsap.to(chip, {
          rotation: baseRot + rotAmp,
          x: `+=${xAmp}`,
          y: `-=${yAmp}`,
          duration: 1.8 + i * 0.25,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });

        gsap.to(chip, {
          scale: 1.04,
          duration: 2.2 + i * 0.3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.2,
        });
      });

      // Scribble drift for chip3 (figure-8-ish path via keyframes)
      const chip3 = el.querySelector('.chip3');
      if (chip3) {
        gsap.to(chip3, {
          keyframes: {
            x: [0, 12, -10, -14, 0],
            y: [0, -8, -16, 4, 0],
          },
          duration: 6,
          ease: 'sine.inOut',
          repeat: -1,
        });
      }

      // Small parallax on scroll for chips
      chips.forEach((chip, i) => {
        gsap.to(chip, {
          yPercent: (i % 2 === 0 ? -6 : 6),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Rotating circle badge — slow infinite
      const badge = el.querySelector('.hero_badge_ring');
      if (badge) {
        gsap.to(badge, {
          rotation: 360,
          duration: 22,
          ease: 'none',
          repeat: -1,
          transformOrigin: 'center center',
        });
      }

      // CTA hover micro-interaction
      if (cta) {
        enterHandler = () => gsap.to(cta, { scale: 1.03, duration: 0.18 });
        leaveHandler = () => gsap.to(cta, { scale: 1, duration: 0.18 });
        cta.addEventListener('mouseenter', enterHandler);
        cta.addEventListener('mouseleave', leaveHandler);
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      // remove raw listeners
      const el = sectionRef.current;
      const ctaEl = el?.querySelector('.hero_cta');
      if (ctaEl && enterHandler && leaveHandler) {
        ctaEl.removeEventListener('mouseenter', enterHandler);
        ctaEl.removeEventListener('mouseleave', leaveHandler);
      }
    };
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="hero_section">
      <div className="hero_content">
        <div className="reveal-stack" data-reveal-target>
          <h1 className='hero_content_heading reveal-front'>PRODUCT DEVELOPER</h1>
          <h1 className='hero_content_heading reveal-back' aria-hidden="true">SOFTWARE DEVELOPER</h1>
        </div>
        <a href="#contact" className="hero_cta">
          <span className="hero_cta_text">Get in Touch</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

      </div>

      {/* -------------- Grid content image and chips ------------- */}
      <div className="hero_grid">
        <div className="hero_image_container">
          <div className="hero_portrait">
            <img src={Ketan} alt="Ketan" className="hero_image" />

            {/* Doodle decorations around figure — animate on hover */}
            <svg className="doodle doodle-squiggle" viewBox="0 0 120 50" aria-hidden="true">
              <path d="M 5 30 Q 20 5 35 25 T 65 25 T 95 25 T 115 25" fill="none" stroke="#ff6b35" strokeWidth="2.5" strokeLinecap="round" />
            </svg>

            <svg className="doodle doodle-star" viewBox="0 0 40 40" aria-hidden="true">
              <path d="M 20 4 L 22 16 L 36 18 L 22 22 L 20 36 L 18 22 L 4 18 L 18 16 Z" fill="#ff6b35" />
            </svg>

            <svg className="doodle doodle-star-sm" viewBox="0 0 30 30" aria-hidden="true">
              <path d="M 15 3 L 17 12 L 27 14 L 17 16 L 15 27 L 13 16 L 3 14 L 13 12 Z" fill="#ff6b35" />
            </svg>

            <svg className="doodle doodle-arrow" viewBox="0 0 140 90" aria-hidden="true">
              <path d="M 130 10 Q 80 0 50 35 Q 35 55 25 75" fill="none" stroke="#ff6b35" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 18 65 L 25 75 L 36 70" fill="none" stroke="#ff6b35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <svg className="doodle doodle-circle" viewBox="0 0 120 80" aria-hidden="true">
              <path d="M 60 8 C 100 8 112 38 110 55 C 105 78 70 76 35 70 C 12 64 4 38 22 20 C 36 8 50 6 60 8 Z" fill="none" stroke="#ff6b35" strokeWidth="2.2" strokeLinecap="round" />
            </svg>

            <svg className="doodle doodle-underline" viewBox="0 0 160 24" aria-hidden="true">
              <path d="M 5 10 Q 40 22 80 12 T 155 14" fill="none" stroke="#ff6b35" strokeWidth="3" strokeLinecap="round" />
            </svg>

            <svg className="doodle doodle-dots" viewBox="0 0 60 60" aria-hidden="true">
              <circle cx="10" cy="10" r="3" fill="#ff6b35" />
              <circle cx="30" cy="22" r="2.2" fill="#ff6b35" />
              <circle cx="50" cy="14" r="3.4" fill="#ff6b35" />
              <circle cx="22" cy="44" r="2.6" fill="#ff6b35" />
              <circle cx="48" cy="48" r="2.8" fill="#ff6b35" />
            </svg>

            <span className="doodle doodle-label">that&apos;s me!</span>
          </div>

          <img src={chip1} alt="Chip 1" className="hero_chip_image chip1" data-base-rot="20" />
          <img src={chip2} alt="Chip 2" className="hero_chip_image chip2" data-base-rot="0" />
          <img src={chip3} alt="Chip 3" className="hero_chip_image chip3" data-base-rot="10" />
          <img src={chip4} alt="Chip 4" className="hero_chip_image chip4" data-base-rot="-20" />
        </div>
      </div>

      {/* Rotating circular badge — placed at hero root, above chips, white text on dark bg */}
      <div className="hero_badge" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="hero_badge_ring">
          <defs>
            <path id="hero-badge-circle" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
          </defs>
          <text fill="#ffffff" fontFamily="Oswald, sans-serif" fontWeight="700" fontSize="13" letterSpacing="2">
            <textPath href="#hero-badge-circle" startOffset="0" textLength="490" lengthAdjust="spacingAndGlyphs">
              AVAILABLE FOR PROJECTS · LET'S BUILD ·
            </textPath>
          </text>
        </svg>
      </div>


    </section>
  );
};

export default Hero;