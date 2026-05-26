import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

type TimelineKind = 'education' | 'work';

interface TimelineItem {
  kind: TimelineKind;
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
    period: '2020 — 2021',
    title: '12th, Science (PCM)',
    org: 'Royal Oak International School',
    description:
      'Finished senior secondary with Physics, Chemistry and Mathematics. First serious dive into programming — learned the basics that hooked me on building things on screen.',
    tags: ['PCM', 'CBSE'],
  },
  {
    kind: 'education',
    period: '2021 — 2025',
    title: 'B.Tech, CSE — AI/ML Specialization',
    org: 'BML Munjal University',
    description:
      'Computer Science with a specialization in Artificial Intelligence & Machine Learning. Spent the side hours obsessed with interfaces, motion and shipping real products.',
    tags: ['CSE', 'AI/ML', 'Product'],
  },
  {
    kind: 'work',
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
    period: 'Mar 2025 — Present',
    title: 'Team Lead & Frontend Engineer',
    org: 'Technumopus',
    location: 'On-site',
    description:
      'Leading the frontend team — owning architecture, motion language and code quality. Mentoring engineers, designing systems and turning ambitious briefs into polished, shipped interfaces.',
    tags: ['Leadership', 'React', 'Architecture', 'Motion'],
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        el.querySelectorAll('.timeline-header > *'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: 'top 75%' },
        }
      );

      // Spine draw — scrubbed
      const spine = el.querySelector<HTMLElement>('.timeline-spine-fill');
      const rail = el.querySelector<HTMLElement>('.timeline-rail');
      if (spine && rail) {
        gsap.fromTo(
          spine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: rail,
              start: 'top 70%',
              end: 'bottom 70%',
              scrub: 0.6,
            },
          }
        );
      }

      // Title parallax
      gsap.to('.timeline-title', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Per-item reveal: dot pops, card slides from its side
      const items = el.querySelectorAll<HTMLElement>('.timeline-item');
      items.forEach((item, i) => {
        const card = item.querySelector('.timeline-card');
        const dot = item.querySelector('.timeline-dot');
        const meta = item.querySelector('.timeline-meta');
        const side = item.classList.contains('is-right') ? 60 : -60;

        // Card parallax — slight Y drift on scroll, alternating depth
        if (card) {
          gsap.to(card, {
            yPercent: (i % 2 ? -8 : 8),
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        tl.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
        )
          .fromTo(
            card,
            { opacity: 0, x: side, y: 30 },
            { opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.3'
          )
          .fromTo(
            meta,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            '-=0.5'
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="timeline-section">
      <div className="timeline-container">
        <div className="timeline-header">
          <p className="timeline-badge">Journey</p>
          <div className="reveal-stack" data-reveal-target>
            <h2 className="timeline-title reveal-front">
              FROM CLASSROOM<br />TO <span>CODEBASE.</span>
            </h2>
            <h2 className="timeline-title reveal-back" aria-hidden="true">
              FROM RAMEN<br />TO <span>REFACTORS.</span>
            </h2>
          </div>
        </div>

        <div className="timeline-rail">
          <div className="timeline-spine" aria-hidden="true">
            <div className="timeline-spine-fill" />
          </div>

          <ul className="timeline-list">
            {timeline.map((item, i) => {
              const side = i % 2 === 0 ? 'is-left' : 'is-right';
              return (
                <li key={i} className={`timeline-item ${side}`}>
                  <div className="timeline-dot" aria-hidden="true">
                    <span className="timeline-dot-ring" />
                    <span className="timeline-dot-core" />
                  </div>

                  <div className="timeline-meta">
                    <span className={`timeline-kind kind-${item.kind}`}>
                      {item.kind === 'education' ? 'Education' : 'Work'}
                    </span>
                    <span className="timeline-period">{item.period}</span>
                  </div>

                  <article className="timeline-card">
                    <header className="timeline-card-head">
                      <h3 className="timeline-card-title">{item.title}</h3>
                      <p className="timeline-card-org">
                        {item.org}
                        {item.location && (
                          <span className="timeline-card-dot"> · </span>
                        )}
                        {item.location && (
                          <span className="timeline-card-loc">{item.location}</span>
                        )}
                      </p>
                    </header>
                    <p className="timeline-card-desc">{item.description}</p>
                    {item.tags && item.tags.length > 0 && (
                      <ul className="timeline-card-tags">
                        {item.tags.map((tag) => (
                          <li key={tag} className="timeline-tag">{tag}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
