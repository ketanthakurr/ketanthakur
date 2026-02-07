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

      // Subtle floating animation for chips (continuous)
      gsap.to(chips, {
        y: '+=18',
        duration: 3.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.35, from: 'center' },
      });

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
        <h1 className='hero_content_heading'>PRODUCT DEVELOPER</h1>
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
          <img src={Ketan} alt="Ketan" className="hero_image" />
          <img src={chip1} alt="Chip 1" className="hero_chip_image chip1" />
          <img src={chip2} alt="Chip 2" className="hero_chip_image chip2" />
          <img src={chip3} alt="Chip 3" className="hero_chip_image chip3" />
          <img src={chip4} alt="Chip 4" className="hero_chip_image chip4" />
        </div>
      </div>


    </section>
  );
};

export default Hero;