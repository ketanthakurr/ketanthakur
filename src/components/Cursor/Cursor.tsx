import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Cursor.css';

const Cursor = () => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const bubble = bubbleRef.current;
    if (!bubble) return;

    let visible = false;
    let currentTarget: HTMLElement | null = null;

    // Half the lens diameter — must track the responsive --mask-size in Cursor.css
    // (360 desktop / 280 ≤1024 / 200 ≤670) so the circle stays centered on the cursor.
    const maskHalf = () => {
      const w = window.innerWidth;
      if (w <= 670) return 100;
      if (w <= 1024) return 140;
      return 180;
    };

    const updateRevealCoords = (clientX: number, clientY: number) => {
      if (!currentTarget) return;
      const back = currentTarget.querySelector('.reveal-back') as HTMLElement | null;
      if (!back) return;
      const r = back.getBoundingClientRect();
      const half = maskHalf();
      gsap.to(back, {
        '--mask-x': `${clientX - r.left - half}px`,
        '--mask-y': `${clientY - r.top - half}px`,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    const onMove = (e: MouseEvent) => {
      const w = bubble.offsetWidth;
      const h = bubble.offsetHeight;
      const x = e.clientX - w / 2;
      const y = e.clientY - h / 2;
      bubble.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!visible) {
        bubble.style.opacity = '1';
        visible = true;
      }
      updateRevealCoords(e.clientX, e.clientY);
    };

    const onLeave = () => {
      bubble.style.opacity = '0';
      visible = false;
    };

    const clearReveal = () => {
      if (currentTarget) {
        currentTarget.classList.remove('reveal-active');
        currentTarget = null;
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;

      // Hide cursor over TechStack (its own invert blob) and reveal targets (the lens is the cursor)
      const inTech = !!t.closest('.tech-section');
      const reveal = t.closest('[data-reveal-target]') as HTMLElement | null;

      if (inTech || reveal) {
        bubble.classList.add('c-hidden');
      } else {
        bubble.classList.remove('c-hidden');
      }

      // Manage reveal target
      if (reveal && reveal !== currentTarget) {
        clearReveal();
        currentTarget = reveal;
        currentTarget.classList.add('reveal-active');
      } else if (!reveal && currentTarget) {
        clearReveal();
      }

      // Subtle grow on regular interactive (skip reveal targets)
      if (!reveal && t.closest('a, button, input, textarea, .tech-pill, .el, .social-pill, .gallery-slide, .project-row, .timeline-card, .hero_cta')) {
        bubble.classList.add('c-grow');
      } else {
        bubble.classList.remove('c-grow');
      }
    };

    const onDown = () => bubble.classList.add('c-down');
    const onUp = () => bubble.classList.remove('c-down');

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseleave', onLeave);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    document.body.classList.add('has-custom-cursor');

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      if (progressFillRef.current) progressFillRef.current.style.height = `${pct}%`;
      if (progressTextRef.current) progressTextRef.current.textContent = `${Math.round(pct).toString().padStart(2, '0')}`;
      if (progressRef.current) {
        progressRef.current.classList.toggle('is-active', pct > 0.5);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      window.removeEventListener('scroll', onScroll);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <div ref={bubbleRef} className="cur-bubble" aria-hidden="true" />

      <div ref={progressRef} className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress-rail">
          <div ref={progressFillRef} className="scroll-progress-fill" />
        </div>
        <div className="scroll-progress-num">
          <span ref={progressTextRef}>00</span>
          <span className="scroll-progress-pct">%</span>
        </div>
        <div className="scroll-progress-ticks" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="scroll-tick" />
          ))}
        </div>
      </div>
    </>
  );
};

export default Cursor;
