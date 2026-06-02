import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

type TimelineKind = 'education' | 'work';

interface TimelineItem {
  kind: TimelineKind;
  year: string; // big ghost label for the depth backdrop
  period: string;
  title: string;
  org: string;
  location?: string;
  description: string;
  tags?: string[];
}

const timeline: TimelineItem[] = [
  {
    kind: 'education',
    year: '2020',
    period: '2020 — 2021',
    title: '12th, Science (PCM)',
    org: 'Royal Oak International School',
    description:
      'Finished senior secondary with Physics, Chemistry and Mathematics. First serious dive into programming — learned the basics that hooked me on building things on screen.',
    tags: ['PCM', 'CBSE'],
  },
  {
    kind: 'education',
    year: '2021',
    period: '2021 — 2025',
    title: 'B.Tech, CSE — AI/ML Specialization',
    org: 'BML Munjal University',
    description:
      'Computer Science with a specialization in Artificial Intelligence & Machine Learning. Spent the side hours obsessed with interfaces, motion and shipping real products.',
    tags: ['CSE', 'AI/ML', 'Product'],
  },
  {
    kind: 'work',
    year: '2023',
    period: 'Jun 2023 — Jul 2023',
    title: 'Frontend Developer Intern',
    org: 'Technodune',
    location: 'Remote',
    description:
      'Built and polished frontend features for client projects. Translated designs into clean, responsive React components and got my first taste of shipping for real users.',
    tags: ['React', 'JavaScript', 'CSS'],
  },
  {
    kind: 'work',
    year: '2025',
    period: 'Jan 2025 — Mar 2025',
    title: 'React Developer',
    org: 'MMTC-PAMP',
    location: 'On-site',
    description:
      'Worked on production React applications inside a precious-metals fintech environment. Focused on performant UI, reusable components and reliability across critical user flows.',
    tags: ['React', 'TypeScript', 'Fintech'],
  },
  {
    kind: 'work',
    year: 'NOW',
    period: 'Mar 2025 — Present',
    title: 'Team Lead & Frontend Engineer',
    org: 'Technumopus',
    location: 'On-site',
    description:
      'Leading the frontend team — owning architecture, motion language and code quality. Mentoring engineers, designing systems and turning ambitious briefs into polished, shipped interfaces.',
    tags: ['Leadership', 'React', 'Architecture', 'Motion'],
  },
];

const pad = (n: number) => String(n).padStart(2, '0');

const KindGlyph = ({ kind }: { kind: TimelineKind }) =>
  kind === 'education' ? (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 8.5 12 4l10 4.5-10 4.5L2 8.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M6 10.6V15c0 1.2 2.7 2.4 6 2.4s6-1.2 6-2.4v-4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 8.5V14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="7.5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 12.5h18" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );

const Experience = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const worldRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const floorRef = useRef<HTMLDivElement | null>(null);
  const ghostRef = useRef<HTMLSpanElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const phaseRef = useRef<HTMLSpanElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const travelerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    /* ---------- Header reveal (shared) ---------- */
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        section.querySelectorAll('.journey-header > *'),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: section, start: 'top 70%' },
        }
      );
    });

    /* ---------- DESKTOP: pinned horizontal 3D coverflow ---------- */
    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const viewport = viewportRef.current;
      const world = worldRef.current;
      const track = trackRef.current;
      const floor = floorRef.current;
      if (!viewport || !world || !track) return;

      const cards = Array.from(track.querySelectorAll<HTMLElement>('.milestone'));
      const dots = Array.from(section.querySelectorAll<HTMLButtonElement>('.journey-dot'));
      const lastIdx = cards.length - 1;

      let activeIdx = -1;

      // Continuous coverflow: position each card by layout + current trackX,
      // independent of its own rotateY/scale so there's no feedback wobble.
      const render = () => {
        const vpW = viewport.clientWidth;
        const center = vpW / 2;
        const trackX = Number(gsap.getProperty(track, 'x')) || 0;
        let best = 0;
        let bestDist = Infinity;

        cards.forEach((card, i) => {
          const cardCenter = card.offsetLeft + card.offsetWidth / 2 + trackX;
          const dist = cardCenter - center;
          const norm = Math.max(-1.7, Math.min(1.7, dist / (vpW * 0.46)));
          const a = Math.abs(norm);

          gsap.set(card, {
            rotateY: -norm * 44,
            scale: 1 - Math.min(a, 1) * 0.28,
            z: -a * 260 + (a < 0.16 ? 60 : 0),
            opacity: 1 - Math.min(a, 1.55) * 0.52,
            zIndex: Math.round(200 - a * 100),
          });

          const ad = Math.abs(dist);
          if (ad < bestDist) {
            bestDist = ad;
            best = i;
          }
        });

        if (best !== activeIdx) {
          activeIdx = best;
          // Only rewrite the DOM when the centered card actually changes —
          // not on every scrub frame.
          cards.forEach((c, i) => c.classList.toggle('is-active', i === best));
          const item = timeline[best];
          if (ghostRef.current) ghostRef.current.textContent = item.year;
          if (counterRef.current) counterRef.current.textContent = pad(best + 1);
          if (phaseRef.current) phaseRef.current.textContent = item.kind === 'education' ? 'Education' : 'Work';
          dots.forEach((d, di) => d.classList.toggle('is-on', di === best));
          if (floor) floor.classList.toggle('floor-work', item.kind === 'work');
        }
      };

      const total = () => Math.max(track.scrollWidth - viewport.clientWidth, 1);

      // Scrubbed tween drives the horizontal travel. Default position:fixed pin
      // is smooth now that html/body/.App use overflow-x:clip (not hidden).
      const tween = gsap.to(track, {
        x: () => -total(),
        ease: 'none',
        onUpdate: render, // fires every frame while x animates (covers scrub momentum)
        scrollTrigger: {
          trigger: viewport,
          start: 'top top',
          end: () => '+=' + total(),
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (fillRef.current) fillRef.current.style.transform = `scaleX(${self.progress})`;
            if (travelerRef.current) travelerRef.current.style.left = `${self.progress * 100}%`;
          },
          onRefresh: render,
        },
      });
      const st = tween.scrollTrigger!;

      // Pointer parallax — tilts the whole 3D scene + drifts the floor.
      const onPointer = (e: PointerEvent) => {
        const r = viewport.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(world, {
          rotateY: px * 7,
          rotateX: -py * 5,
          duration: 0.7,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        if (floor) {
          gsap.to(floor, { x: px * -50, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
        }
      };
      const onLeave = () => {
        gsap.to(world, { rotateX: 0, rotateY: 0, duration: 1, ease: 'power3.out' });
      };
      viewport.addEventListener('pointermove', onPointer);
      viewport.addEventListener('pointerleave', onLeave);

      // Station dots → fly to that milestone.
      const onDot = (e: Event) => {
        const i = Number((e.currentTarget as HTMLElement).dataset.i);
        const p = lastIdx ? i / lastIdx : 0;
        const top = st.start + (st.end - st.start) * p;
        window.scrollTo({ top, behavior: 'smooth' });
      };
      dots.forEach((d) => d.addEventListener('click', onDot));

      gsap.delayedCall(0.05, () => ScrollTrigger.refresh());
      render();

      return () => {
        viewport.removeEventListener('pointermove', onPointer);
        viewport.removeEventListener('pointerleave', onLeave);
        dots.forEach((d) => d.removeEventListener('click', onDot));
        st.kill();
        tween.kill();
        gsap.set([world, track, ...cards], { clearProps: 'all' });
      };
    });

    /* ---------- MOBILE / reduced-motion: clean vertical reveal ---------- */
    mm.add('(max-width: 900px), (prefers-reduced-motion: reduce)', () => {
      const items = Array.from(section.querySelectorAll<HTMLElement>('.milestone'));
      const triggers = items.map((card) =>
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' },
          }
        )
      );
      return () => triggers.forEach((t) => t.scrollTrigger?.kill());
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="journey">
      <div className="journey-viewport" ref={viewportRef}>
        <div className="journey-vignette" aria-hidden="true" />
        <div className="journey-floor" ref={floorRef} aria-hidden="true" />

        <div className="journey-ghost" aria-hidden="true">
          <span className="journey-ghost-year" ref={ghostRef}>2020</span>
        </div>

        <header className="journey-header">
          <p className="journey-badge">The Journey</p>
          <div className="reveal-stack" data-reveal-target>
            <h2 className="journey-title reveal-front">
              FROM CLASSROOM<br />TO <span>CODEBASE.</span>
            </h2>
            <h2 className="journey-title reveal-back" aria-hidden="true">
              FROM RAMEN<br />TO <span>REFACTORS.</span>
            </h2>
          </div>
        </header>

        <div className="journey-world" ref={worldRef}>
          <div className="journey-track" ref={trackRef}>
            {timeline.map((item, i) => (
              <article key={i} className="milestone timeline-card" data-kind={item.kind}>
                <span className="milestone-index" aria-hidden="true">{pad(i + 1)}</span>
                <span className="milestone-rule" aria-hidden="true" />

                <div className="milestone-top">
                  <span className={`milestone-kind kind-${item.kind}`}>
                    <KindGlyph kind={item.kind} />
                    {item.kind === 'education' ? 'Education' : 'Work'}
                  </span>
                  <span className="milestone-period">{item.period}</span>
                </div>

                <h3 className="milestone-title">{item.title}</h3>
                <p className="milestone-org">
                  {item.org}
                  {item.location && <span className="milestone-loc"> · {item.location}</span>}
                </p>
                <p className="milestone-desc">{item.description}</p>

                {item.tags && item.tags.length > 0 && (
                  <ul className="milestone-tags">
                    {item.tags.map((tag) => (
                      <li key={tag} className="milestone-tag">{tag}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>

        <div className="journey-hud" aria-hidden="true">
          <div className="journey-rail">
            <div className="journey-rail-fill" ref={fillRef} />
            <div className="journey-traveler" ref={travelerRef}>
              <span className="journey-traveler-core" />
            </div>
          </div>
          <div className="journey-hud-row">
            <span className="journey-counter">
              <span ref={counterRef}>01</span> / {pad(timeline.length)}
            </span>
            <div className="journey-dots">
              {timeline.map((_, i) => (
                <button
                  key={i}
                  className={`journey-dot${i === 0 ? ' is-on' : ''}`}
                  data-i={i}
                  type="button"
                  aria-label={`Go to milestone ${i + 1}`}
                />
              ))}
            </div>
            <span className="journey-phase" ref={phaseRef}>Education</span>
          </div>
          <p className="journey-hint">Scroll to travel<span>→</span></p>
        </div>
      </div>
    </section>
  );
};

export default Experience;
