import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TechStack.css';

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(500, 33);
ScrollTrigger.config({ ignoreMobileResize: true });

type IconKey = string;

interface Tech {
  name: string;
  icon: IconKey;
  color: string;
}

const monogram = (name: string) => {
  const clean = name.replace(/[^A-Za-z0-9]/g, '');
  if (clean.length <= 2) return clean.toUpperCase();
  // Use first two consonants or first letter + uppercase
  const upper = name.match(/[A-Z0-9]/g);
  if (upper && upper.length >= 2) return (upper[0] + upper[1]).toUpperCase();
  return clean.slice(0, 2).toUpperCase();
};

interface Category {
  label: string;
  caption: string;
  techs: Tech[];
}

const categories: Category[] = [
  {
    label: 'Languages',
    caption: 'Speak fluent',
    techs: [
      { name: 'C++', icon: 'cpp', color: '#00599C' },
      { name: 'TypeScript', icon: 'typescript', color: '#3178C6' },
      { name: 'JavaScript', icon: 'javascript', color: '#F7DF1E' },
      { name: 'Python', icon: 'python', color: '#3776AB' },
      { name: 'HTML5', icon: 'html', color: '#E34F26' },
      { name: 'CSS3', icon: 'css', color: '#1572B6' },
    ],
  },
  {
    label: 'Frontend',
    caption: 'Interfaces & motion',
    techs: [
      { name: 'React.js', icon: 'react', color: '#61DAFB' },
      { name: 'Next.js', icon: 'next', color: '#0a0a0a' },
      { name: 'React Native', icon: 'reactnative', color: '#61DAFB' },
      { name: 'RN Web', icon: 'rnweb', color: '#61DAFB' },
      { name: 'Tailwind', icon: 'tailwind', color: '#06B6D4' },
      { name: 'Bootstrap', icon: 'bootstrap', color: '#7952B3' },
    ],
  },
  {
    label: 'Mobile',
    caption: 'On the go',
    techs: [
      { name: 'React Native', icon: 'reactnative', color: '#61DAFB' },
      { name: 'RN Web', icon: 'rnweb', color: '#61DAFB' },
      { name: 'Expo Go', icon: 'expo', color: '#0a0a0a' },
      { name: 'OTA Updates', icon: 'ota', color: '#ff6b35' },
      { name: 'Capacitor', icon: 'capacitor', color: '#119EFF' },
      { name: 'iOS / TestFlight', icon: 'apple', color: '#0a0a0a' },
      { name: 'Android Studio', icon: 'android', color: '#3DDC84' },
      { name: 'App Store Release', icon: 'store', color: '#ff6b35' },
    ],
  },
  {
    label: 'State Management',
    caption: 'Single source',
    techs: [
      { name: 'Zustand', icon: 'zustand', color: '#0a0a0a' },
      { name: 'Redux', icon: 'redux', color: '#764ABC' },
      { name: 'React Query', icon: 'query', color: '#FF4154' },
    ],
  },
  {
    label: 'Backend',
    caption: 'Servers & APIs',
    techs: [
      { name: 'Node.js', icon: 'node', color: '#5FA04E' },
      { name: 'Express.js', icon: 'express', color: '#0a0a0a' },
      { name: 'Bun', icon: 'bun', color: '#FBF0DF' },
      { name: 'Elysia', icon: 'elysia', color: '#A855F7' },
    ],
  },
  {
    label: 'Databases',
    caption: 'Data layer',
    techs: [
      { name: 'MongoDB', icon: 'mongo', color: '#47A248' },
      { name: 'PostgreSQL', icon: 'postgres', color: '#4169E1' },
      { name: 'MySQL', icon: 'mysql', color: '#4479A1' },
      { name: 'Firestore', icon: 'firebase', color: '#FFCA28' },
    ],
  },
  {
    label: 'Cloud & DevOps',
    caption: 'Ship & scale',
    techs: [
      { name: 'Firebase (FCM, Auth)', icon: 'firebase', color: '#FFCA28' },
      { name: 'Vercel', icon: 'vercel', color: '#0a0a0a' },
      { name: 'Docker', icon: 'docker', color: '#2496ED' },
      { name: 'CI / CD', icon: 'cicd', color: '#ff6b35' },
    ],
  },
  {
    label: 'Testing & Quality',
    caption: 'Sleep at night',
    techs: [
      { name: 'Jest', icon: 'jest', color: '#C21325' },
      { name: 'React Testing Library', icon: 'rtl', color: '#E33332' },
    ],
  },
  {
    label: 'Tools & Workflow',
    caption: 'Day to day',
    techs: [
      { name: 'Git', icon: 'git', color: '#F05032' },
      { name: 'GitHub', icon: 'github', color: '#0a0a0a' },
      { name: 'VS Code', icon: 'vscode', color: '#007ACC' },
      { name: 'Postman', icon: 'postman', color: '#FF6C37' },
      { name: 'Storybook', icon: 'storybook', color: '#FF4785' },
    ],
  },
  {
    label: 'Design',
    caption: 'Craft & systems',
    techs: [
      { name: 'Figma', icon: 'figma', color: '#F24E1E' },
      { name: 'UI / UX', icon: 'uiux', color: '#A855F7' },
      { name: 'Responsive Layouts', icon: 'responsive', color: '#0a0a0a' },
    ],
  },
  {
    label: 'Hardware / IoT',
    caption: 'Robotics roots',
    techs: [
      { name: 'Arduino', icon: 'arduino', color: '#00979D' },
      { name: 'Raspberry Pi', icon: 'rpi', color: '#A22846' },
    ],
  },
];

const marqueeStrip = [
  'React', 'TypeScript', 'Next.js', 'React Native', 'Node', 'Bun', 'PostgreSQL',
  'MongoDB', 'AWS', 'Firebase', 'Docker', 'Figma', 'Tailwind', 'Storybook',
];

/* Simple Icons CDN slugs — https://simpleicons.org */
const SI_SLUGS: Record<string, string> = {
  typescript: 'typescript',
  javascript: 'javascript',
  python: 'python',
  cpp: 'cplusplus',
  html: 'html5',
  css: 'css',
  sql: 'mysql',
  react: 'react',
  next: 'nextdotjs',
  reactnative: 'react',
  rnweb: 'react',
  vite: 'vite',
  tailwind: 'tailwindcss',
  bootstrap: 'bootstrap',
  styled: 'styledcomponents',
  sass: 'sass',
  crossplatform: 'react',
  expo: 'expo',
  ota: 'expo',
  store: 'appstore',
  capacitor: 'capacitor',
  apple: 'apple',
  android: 'android',
  zustand: 'react',
  redux: 'redux',
  query: 'reactquery',
  context: 'react',
  node: 'nodedotjs',
  express: 'express',
  bun: 'bun',
  elysia: 'bun',
  rest: 'fastapi',
  jwt: 'jsonwebtokens',
  mongo: 'mongodb',
  postgres: 'postgresql',
  mysql: 'mysql',
  firebase: 'firebase',
  aws: 'amazonwebservices',
  vercel: 'vercel',
  docker: 'docker',
  gha: 'githubactions',
  cicd: 'githubactions',
  jest: 'jest',
  rtl: 'testinglibrary',
  git: 'git',
  github: 'github',
  vscode: 'visualstudiocode',
  postman: 'postman',
  storybook: 'storybook',
  figma: 'figma',
  uiux: 'figma',
  responsive: 'css',
  arduino: 'arduino',
  rpi: 'raspberrypi',
  npm: 'npm',
  gsap: 'greensock',
  framer: 'framer',
  photoshop: 'adobephotoshop',
  illustrator: 'adobeillustrator',
  aftereffects: 'adobeaftereffects',
  linear: 'linear',
  graphql: 'graphql',
};

const ICON_URL_OVERRIDES: Record<string, string> = {
  vscode: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
};

const Icon = ({ icon, name }: { icon: IconKey; name?: string }) => {
  const overrideUrl = ICON_URL_OVERRIDES[icon];
  const slug = SI_SLUGS[icon];
  const [failed, setFailed] = useState(false);

  const src = overrideUrl || (slug ? `https://cdn.simpleicons.org/${slug}` : null);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name || icon}
        loading="eager"
        decoding="async"
        fetchPriority="low"
        className="el-icon-img"
        onError={() => setFailed(true)}
      />
    );
  }
  const text = monogram(name || icon);
  return (
    <svg viewBox="0 0 32 32">
      <rect x="2" y="2" width="28" height="28" rx="6" fill="currentColor"/>
      <text x="16" y="22" textAnchor="middle" fontFamily="Oswald, sans-serif" fontWeight="900" fontSize={text.length > 2 ? 9 : 13} fill="#fff">{text}</text>
    </svg>
  );
};

const TechElement = ({ tech, atomic }: { tech: Tech; atomic: number }) => {
  const delay = ((atomic * 137) % 1000) / 1000; // pseudo-random per tile
  return (
    <article
      className="el"
      style={{
        ['--brand' as string]: tech.color,
        ['--delay' as string]: `${delay}s`,
      } as React.CSSProperties}
    >
      <span className="el-num">{String(atomic).padStart(2, '0')}</span>
      <span className="el-icon-main" aria-hidden="true">
        <Icon icon={tech.icon} name={tech.name} />
      </span>
      <span className="el-name">{tech.name}</span>
      <span className="el-corner" aria-hidden="true" />
      <span className="el-pulse" aria-hidden="true" />
    </article>
  );
};

const CategoryLabel = ({ idx, label, caption, count }: { idx: number; label: string; caption: string; count: number }) => (
  <article className="el el-label">
    <span className="el-num">[ {String(idx + 1).padStart(2, '0')} ]</span>
    <span className="el-cat-name">{label}</span>
    <span className="el-cat-caption">{caption}</span>
    <span className="el-cat-count">{count} elements</span>
  </article>
);

const TechStack = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Header reveal + parallax
      gsap.fromTo(
        el.querySelectorAll('.tech-header > *'),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 80%' },
        }
      );

      gsap.to('.tech-title', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      // Element tiles: staggered scale-in scroll reveal (periodic-table assembly)
      const elements = el.querySelectorAll<HTMLElement>('.el');
      gsap.fromTo(elements,
        { opacity: 0, scale: 0.85, y: 16 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.4, ease: 'power3.out',
          stagger: { each: 0.02, from: 'random' },
          force3D: true,
          scrollTrigger: { trigger: '.periodic-grid', start: 'top 85%' },
          onComplete: () => elements.forEach((e) => { e.style.willChange = ''; }),
        }
      );

      // Parallax depth — batched into 6 depth bands.
      // Was 1 ScrollTrigger per tile (~50); now 6 grouped tweens.
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      if (!prefersReduced && !isMobile) {
        const bands: HTMLElement[][] = [[], [], [], [], [], []];
        elements.forEach((e, i) => {
          bands[(i * 7) % 6].push(e);
          e.style.willChange = 'transform';
        });
        const depthMap = [-3, -2, -1, 1, 2, 3];
        bands.forEach((band, idx) => {
          if (!band.length) return;
          gsap.to(band, {
            yPercent: depthMap[idx] * 4,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        });
      }

      // Bottom marquee
      const marquee = marqueeRef.current;
      if (marquee) {
        gsap.to(marquee, { xPercent: -50, duration: 30, ease: 'none', repeat: -1 });
      }

      // Float decor shapes
      const shapes = el.querySelectorAll<HTMLElement>('.tech-deco');
      shapes.forEach((s, i) => {
        gsap.to(s, {
          y: i % 2 ? -22 : 22,
          rotation: i % 2 ? 12 : -12,
          duration: 4 + i * 0.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
        gsap.to(s, {
          yPercent: (i % 2 ? -25 : 25),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Cursor blob: rAF-throttled + skip on touch devices.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const blob = el.querySelector<HTMLDivElement>('.tech-cursor-blob');
    if (!blob) return;
    if (window.matchMedia('(hover: none)').matches) return;

    let raf = 0;
    let lastX = 0;
    let lastY = 0;
    const size = blob.offsetWidth;

    const flush = () => {
      raf = 0;
      blob.style.transform = `translate3d(${lastX - size / 2}px, ${lastY - size / 2}px, 0)`;
      blob.style.opacity = '1';
    };
    const onMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!raf) raf = requestAnimationFrame(flush);
    };
    const onLeave = () => { blob.style.opacity = '0'; };
    // Event delegation: single listener for tile hover state instead of N×2.
    const onOver = (e: Event) => {
      if ((e.target as HTMLElement).closest('.el')) blob.classList.add('is-hover-tile');
    };
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement;
      const r = (e as MouseEvent).relatedTarget as HTMLElement | null;
      if (t.closest('.el') && !r?.closest('.el')) blob.classList.remove('is-hover-tile');
    };

    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mouseover', onOver);
    el.addEventListener('mouseout', onOut);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mouseover', onOver);
      el.removeEventListener('mouseout', onOut);
    };
  }, []);

  return (
    <section id="stack" ref={sectionRef} className="tech-section">
      {/* Decorative floating shapes */}
      <div className="tech-deco deco-1" aria-hidden="true" />
      <div className="tech-deco deco-2" aria-hidden="true" />
      <div className="tech-deco deco-3" aria-hidden="true">
        <svg viewBox="0 0 40 40"><path d="M20 4v32M4 20h32" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
      </div>
      <div className="tech-deco deco-4" aria-hidden="true">
        <svg viewBox="0 0 40 40"><path d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z" fill="currentColor"/></svg>
      </div>

      {/* Cursor follower */}
      <div className="tech-cursor-blob" aria-hidden="true" />

      <div className="tech-container">
        <div className="tech-header">
          <p className="tech-badge">Stack</p>
          <h2 className="tech-title">
            TOOLS OF<br />THE <span>TRADE.</span>
          </h2>
          <p className="tech-lede">
            What I reach for when turning ideas into shipped interfaces. Polished
            in production, sharpened on side-projects.
          </p>
        </div>

        <div className="periodic-grid">
          {(() => {
            const out: React.ReactNode[] = [];
            let atomic = 1;
            categories.forEach((cat, ci) => {
              out.push(
                <CategoryLabel key={`label-${ci}`} idx={ci} label={cat.label} caption={cat.caption} count={cat.techs.length} />
              );
              cat.techs.forEach((tech) => {
                out.push(<TechElement key={`${ci}-${atomic}`} tech={tech} atomic={atomic} />);
                atomic++;
              });
            });
            return out;
          })()}
        </div>
      </div>

      {/* Marquee */}
      <div className="tech-marquee" aria-hidden="true">
        <div className="tech-marquee-track" ref={marqueeRef}>
          {[...marqueeStrip, ...marqueeStrip].map((t, i) => (
            <span key={i} className="tech-marquee-item">
              {t}<span className="tech-marquee-dot">★</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
