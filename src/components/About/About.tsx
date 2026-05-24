import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const peeperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let tlx = 0, tly = 0, trx = 0, try_ = 0;
    let lx = 0, ly = 0, rx = 0, ry = 0;
    const maxOff = 4;

    const onMove = (e: MouseEvent) => {
      const l = leftPupilRef.current?.getBoundingClientRect();
      const r = rightPupilRef.current?.getBoundingClientRect();
      if (!l || !r) return;
      const lcx = l.left + l.width / 2;
      const lcy = l.top + l.height / 2;
      const rcx = r.left + r.width / 2;
      const rcy = r.top + r.height / 2;
      const la = Math.atan2(e.clientY - lcy, e.clientX - lcx);
      const ra = Math.atan2(e.clientY - rcy, e.clientX - rcx);
      tlx = Math.cos(la) * maxOff;
      tly = Math.sin(la) * maxOff;
      trx = Math.cos(ra) * maxOff;
      try_ = Math.sin(ra) * maxOff;
    };

    const tick = () => {
      lx += (tlx - lx) * 0.18;
      ly += (tly - ly) * 0.18;
      rx += (trx - rx) * 0.18;
      ry += (try_ - ry) * 0.18;
      leftPupilRef.current?.setAttribute('transform', `translate(${lx} ${ly})`);
      rightPupilRef.current?.setAttribute('transform', `translate(${rx} ${ry})`);
      raf = requestAnimationFrame(tick);
    };
    tick();

    // Blink loop
    const blink = setInterval(() => {
      peeperRef.current?.classList.add('peeper-blink');
      setTimeout(() => peeperRef.current?.classList.remove('peeper-blink'), 160);
    }, 5200);

    window.addEventListener('mousemove', onMove);

    // Parallax — roles title moves slower, peeper drifts
    const section = sectionRef.current;
    const ctx = gsap.context(() => {
      gsap.to('.role-title', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
      gsap.to('.about-peeper', {
        yPercent: 60,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
      gsap.to('.about-image .image-placeholder', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(blink);
      window.removeEventListener('mousemove', onMove);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about">
      <div className="about-background-lines">
        <div className="bg-line"></div>
        <div className="bg-line"></div>
        <div className="bg-line"></div>
        <div className="bg-line"></div>
      </div>

      {/* Peeking creature */}
      <div ref={peeperRef} className="about-peeper" aria-hidden="true">
        <svg viewBox="0 0 120 70">
          <path d="M 6 60 Q 6 4 60 4 Q 114 4 114 60 Z" fill="#ff6b35" />
          <circle cx="44" cy="38" r="11" fill="#fff" />
          <circle cx="76" cy="38" r="11" fill="#fff" />
          <circle ref={leftPupilRef} cx="44" cy="38" r="5" fill="#0a0a0a" />
          <circle ref={rightPupilRef} cx="76" cy="38" r="5" fill="#0a0a0a" />
        </svg>
      </div>

      <div className="about-container">
        <div className="about-content">
          <h2 className="about-title">ABOUT ME</h2>
          <p className="about-description">
            I&apos;m a developer and creator, shaping ideas into digital experiences.
            With over a year of experience, I&apos;ve helping brands and companies transform their ideas into experiences.
          </p>
        </div>
        <div className="about-image">
          <img src="/me/ketan.jpg" alt="Ketan Thakur" className="image-placeholder" />
        </div>
      </div>
      <div className="about-roles">
        <h1 className="role-title">
          <span className="role-black">PRODUCT DEVELOPER</span><br />
          <span className="role-black">VISUAL STORYTELLER.</span><br />
          <span className="role-orange">PHOTOGRAPHER.</span>
        </h1>
      </div>
    </section>
  );
};

export default About;