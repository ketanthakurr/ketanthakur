import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Intro.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Intro — splash → name → scroll-zoom → smoke reveal, now part of the page.
 *
 *  - Splash loader (00→100) plays once on a fresh load at the top.
 *  - The reveal is tied to scroll: pinning the hero for ~1.2 screens drives a
 *    scrubbed progress 0→1. The name zooms toward the viewer + blurs out, the
 *    orange dissolves, and the hero behind sharpens out of a smoke blur.
 *  - Fully REVERSIBLE — scroll back up and the name blurs + zooms back in,
 *    exactly the way it left.
 */
const Intro = () => {
  const orangeRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const smokeRef = useRef<HTMLDivElement | null>(null);
  const splashRef = useRef<HTMLDivElement | null>(null);
  const countRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);

  const [reduce] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  // Splash only on a fresh load while on the intro (at the very top).
  const [showSplash] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return Number(sessionStorage.getItem('kt_scroll') || '0') <= 50;
  });
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    if (reduce) return;

    const clamp = (v: number) => Math.max(0, Math.min(1, v));

    const drive = (p: number) => {
      // NAME — zoom toward viewer from center, then blur + fade as it passes
      const nameScale = 1 + p * 9;
      const nameOp = p < 0.5 ? 1 : 1 - (p - 0.5) / 0.3;
      const nameBlur = p < 0.45 ? 0 : ((p - 0.45) / 0.55) * 16;
      if (nameRef.current) {
        gsap.set(nameRef.current, { scale: nameScale, opacity: clamp(nameOp), filter: `blur(${nameBlur}px)` });
      }
      // ORANGE — hold, then dissolve to reveal the site
      const orangeOp = p < 0.38 ? 1 : 1 - (p - 0.38) / 0.34;
      if (orangeRef.current) gsap.set(orangeRef.current, { autoAlpha: clamp(orangeOp) });

      // SMOKE — blurs the revealed site, then clears + fades (fog lifting)
      const blur = 18 * (1 - clamp((p - 0.55) / 0.45));
      const smokeOp = p < 0.82 ? 1 : 1 - (p - 0.82) / 0.18;
      if (smokeRef.current) {
        gsap.set(smokeRef.current, {
          backdropFilter: `blur(${blur}px)`,
          webkitBackdropFilter: `blur(${blur}px)`,
          opacity: clamp(smokeOp),
        });
      }
      // HINT — visible with the orange, gone once revealing
      if (hintRef.current) gsap.set(hintRef.current, { opacity: clamp((orangeOp - 0.15) / 0.85) });
    };

    // Initial visual state
    gsap.set(nameRef.current, { scale: 1, opacity: showSplash ? 0 : 1, filter: 'blur(0px)', transformOrigin: 'center center' });
    drive(showSplash ? 0 : 1);

    // ---- Scroll-driven, reversible reveal across the #intro spacer ----
    // No pinning — the intro is a real in-flow section, so reloads simply
    // restore wherever you were and the reveal runs as you scroll through it.
    const spacer = document.querySelector<HTMLElement>('#intro');
    // Always start the tween at 0 so it has a real 0→1 range; ScrollTrigger
    // sets the actual progress from scroll on refresh (so scrolling back up to
    // the top re-runs the reveal even when reloaded deep in the page).
    const proxy = { p: 0 };
    let tween: gsap.core.Tween | null = null;

    if (spacer) {
      tween = gsap.to(proxy, {
        p: 1,
        ease: 'none',
        immediateRender: false, // don't paint p=0 (orange) on creation — avoids reload flash
        onUpdate: () => drive(proxy.p),
        scrollTrigger: {
          trigger: spacer,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }

    // ---- Splash (first top-load only) ----
    let tl: gsap.core.Timeline | null = null;
    const html = document.documentElement;
    const body = document.body;

    const unlock = () => {
      html.classList.remove('intro-lock');
      body.classList.remove('intro-lock');
    };

    if (showSplash) {
      html.classList.add('intro-lock');
      body.classList.add('intro-lock');
      window.scrollTo(0, 0);

      const counter = { v: 0 };
      tl = gsap.timeline();
      tl.to(barRef.current, { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0)
        .to(
          counter,
          {
            v: 100,
            duration: 1.5,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (countRef.current) countRef.current.textContent = String(Math.round(counter.v));
            },
          },
          0
        )
        .to(splashRef.current, { autoAlpha: 0, duration: 0.7, ease: 'power2.inOut' }, '+=0.25')
        .to(nameRef.current, { opacity: 1, duration: 0.8, ease: 'power3.out' }, '<')
        .add(() => {
          unlock();
          setSplashDone(true);
          ScrollTrigger.refresh();
        });
    } else {
      ScrollTrigger.refresh();
    }

    return () => {
      tl?.kill();
      tween?.scrollTrigger?.kill();
      tween?.kill();
      unlock();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (reduce) return null;

  return (
    <div className="intro" aria-hidden="true">
      {/* solid orange backdrop — dissolves to reveal the site */}
      <div className="intro-orange" ref={orangeRef} />

      {/* smoke / blur layer that clears to sharpen the revealed site */}
      <div className="intro-smoke" ref={smokeRef} />

      {/* the name (solid, zooms toward the viewer) */}
      <div className="intro-stage">
        <h1 className="intro-name" ref={nameRef}>
          <span>KETAN</span>
          <span>THAKUR</span>
        </h1>
      </div>

      {/* scroll hint — fades out as the reveal begins */}
      <div className="intro-hint" ref={hintRef}>
        <span>Scroll to enter</span>
        <svg className="chev" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* splash / loader (first top-load only) */}
      {showSplash && !splashDone && (
        <div className="intro-splash" ref={splashRef}>
          <div className="intro-loader">
            <span className="intro-load-label">Ketan Thakur — Portfolio</span>
            <span className="intro-count">
              <span ref={countRef}>0</span>
              <i>%</i>
            </span>
            <span className="intro-bar">
              <span className="intro-bar-fill" ref={barRef} />
            </span>
          </div>
          <button
            type="button"
            className="intro-skip"
            onClick={() => {
              document.documentElement.classList.remove('intro-lock');
              document.body.classList.remove('intro-lock');
              setSplashDone(true);
              ScrollTrigger.refresh();
            }}
          >
            Skip
          </button>
        </div>
      )}
    </div>
  );
};

export default Intro;
