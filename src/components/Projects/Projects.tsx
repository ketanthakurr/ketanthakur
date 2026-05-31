import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  tags: string[];
  year: string;
  preview: string;
  link: string;
}

const projects: Project[] = [
  {
    title: 'Onified',
    description:
      'Enterprise multi-app workspace built on a shared design system, tokens, and governed UI primitives. Web + mobile via Capacitor, with audit tooling, i18n, and a Studio reference app driving consistency across every business module.',
    tags: ['React 19', 'React-Native', 'TypeScript', 'Redux', 'Jest', 'Vite', 'Capacitor'],
    year: '2026',
    preview: '/projects/onified.png',
    link: 'https://onified.ai/',
  },
  {
    title: 'ProdLis',
    description:
      'Product catalog platform that gives businesses a custom storefront link to showcase products, manage inventory, and route buyers straight to WhatsApp. Includes auth, dashboard, and public vendor pages.',
    tags: ['React 19', 'Redux Toolkit', 'Framer Motion', 'Vite'],
    year: '2025',
    preview: '/projects/prodlis.png',
    link: 'https://www.prodlis.com/',
  },
  {
    title: 'Matrib',
    description:
      'Cross-platform mobile news app on Expo with push notifications, OTA updates, offline-first caching via React Query, and deep linking. Shipped to iOS and Android.',
    tags: ['React Native', 'Next.js', 'Bun.js', 'Expo', 'React Query', 'Redux'],
    year: '2025',
    preview: '/projects/matrib.png',
    link: 'https://www.matrib.com/',
  },
  {
    title: 'Toolit',
    description:
      'AI-assisted content workspace with a rich TipTap editor, Excalidraw canvas, streamed model responses, and a Radix-based component system. Built for fast drafting and multimodal editing.',
    tags: ['React', 'AI SDK', 'Tailwind', 'FastAPI'],
    year: '2025',
    preview: '/projects/toolit.png',
    link: 'https://toolit.in/',
  },
  {
    title: 'Droneverse',
    description:
      'Marketing and product site for a drone-tech company. Next.js App Router with dynamic page registry, interactive Leaflet maps, COBE globe, motion-driven sections, and PDF rendering for spec sheets.',
    tags: ['Next.js 16', 'Bun.js', 'MongoDB', 'CRM'],
    year: '2025',
    preview: '/projects/droneverse.png',
    link: 'https://droneverse.in/',
  },
];

const pad = (n: number) => String(n).padStart(2, '0');

const domainOf = (link: string) => {
  try {
    return new URL(link).hostname.replace(/^www\./, '');
  } catch {
    return link;
  }
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    /* Header + progress bar (shared, motion only) */
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        section.querySelectorAll('.works-head > *'),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: section, start: 'top 72%' },
        }
      );

      const deck = section.querySelector<HTMLElement>('.works-deck');
      if (deck && progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            transformOrigin: 'left center',
            scrollTrigger: { trigger: deck, start: 'top 60%', end: 'bottom bottom', scrub: 0.5 },
          }
        );
      }
    });

    /* DESKTOP: sticky deck — stack, scale-down, parallax, tilt */
    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const cards = Array.from(section.querySelectorAll<HTMLElement>('.work-card'));
      const cleanups: Array<() => void> = [];

      cards.forEach((card, i) => {
        const scene = card.querySelector<HTMLElement>('.work-3d');
        const ghost = card.querySelector<HTMLElement>('.work-ghost');

        // Content reveal as the card enters
        gsap.fromTo(
          card.querySelectorAll('.work-reveal'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: card, start: 'top 70%' },
          }
        );

        // Deck stack: this card scales down + dims as the NEXT one deals over it.
        // Dim via an overlay (NOT filter) — filter would flatten the preserve-3d scene.
        const next = cards[i + 1];
        if (next) {
          const dim = card.querySelector<HTMLElement>('.work-dim');
          const tl = gsap.timeline({
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true },
          });
          tl.fromTo(card, { scale: 1 }, { scale: 0.9, ease: 'none' }, 0);
          if (dim) tl.fromTo(dim, { opacity: 0 }, { opacity: 0.62, ease: 'none' }, 0);
        }

        // Pointer-driven 3D parallax — the whole scene tilts, layered depths drift
        if (scene) {
          const onMove = (e: PointerEvent) => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            gsap.to(scene, {
              rotateY: px * 11,
              rotateX: -py * 9,
              duration: 0.6,
              ease: 'power2.out',
              overwrite: 'auto',
            });
            if (ghost) {
              gsap.to(ghost, {
                x: px * -46,
                y: py * -30,
                duration: 0.9,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            }
            // pointer light position for the frame sheen
            card.style.setProperty('--mx', `${(px + 0.5) * 100}%`);
            card.style.setProperty('--my', `${(py + 0.5) * 100}%`);
            card.classList.add('is-live');
          };
          const onLeave = () => {
            gsap.to(scene, { rotateX: 0, rotateY: 0, duration: 1, ease: 'power3.out' });
            if (ghost) gsap.to(ghost, { x: 0, y: 0, duration: 1, ease: 'power3.out' });
            card.classList.remove('is-live');
          };
          card.addEventListener('pointermove', onMove);
          card.addEventListener('pointerleave', onLeave);
          cleanups.push(() => {
            card.removeEventListener('pointermove', onMove);
            card.removeEventListener('pointerleave', onLeave);
          });
        }
      });

      gsap.delayedCall(0.1, () => ScrollTrigger.refresh());

      return () => {
        cleanups.forEach((fn) => fn());
        gsap.set(cards, { clearProps: 'all' });
      };
    });

    /* MOBILE / reduced-motion: simple fade-up, no sticky scale */
    mm.add('(max-width: 900px), (prefers-reduced-motion: reduce)', () => {
      const cards = Array.from(section.querySelectorAll<HTMLElement>('.work-card'));
      const t = cards.map((card) =>
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%' } }
        )
      );
      return () => t.forEach((tw) => tw.scrollTrigger?.kill());
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="works">
      <div className="works-head">
        <p className="works-badge">Selected Work</p>
        <h2 className="works-title">
          THINGS I&apos;VE<br />
          <span>SHIPPED.</span>
        </h2>
        <div className="works-progress-rail" aria-hidden="true">
          <div className="works-progress-fill" ref={progressRef} />
        </div>
      </div>

      <div className="works-deck">
        {projects.map((project, i) => (
          <article
            key={project.title}
            className={`work-card${i % 2 === 1 ? ' work-card--flip' : ''}`}
            style={{ zIndex: i + 1 }}
          >
            <span className="work-dim" aria-hidden="true" />

            <div className="work-3d">
              <span className="work-ghost" aria-hidden="true">{pad(i + 1)}</span>
              <span className="work-orb" aria-hidden="true" />

              <div className="work-body">
                <div className="work-topline work-reveal">
                  <span className="work-index">{pad(i + 1)}<i>/{pad(projects.length)}</i></span>
                  <span className="work-status"><i className="work-dot" />Live · {project.year}</span>
                </div>

                <h3 className="work-name work-reveal">{project.title}</h3>
                <p className="work-desc work-reveal">{project.description}</p>

                <ul className="work-tags work-reveal">
                  {project.tags.map((tag) => (
                    <li key={tag} className="work-tag">{tag}</li>
                  ))}
                </ul>

                <a
                  className="work-visit work-reveal"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Visit live site</span>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M7 17 17 7M17 7H7m10 0v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              <div className="work-visual">
                <a className="work-frame work-reveal" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`}>
                  <div className="work-frame-bar">
                    <span className="work-lights"><i /><i /><i /></span>
                    <span className="work-url">{domainOf(project.link)}</span>
                  </div>
                  <div className="work-shot">
                    <img src={project.preview} alt={`${project.title} screenshot`} loading="lazy" />
                    <span className="work-sheen" aria-hidden="true" />
                  </div>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
