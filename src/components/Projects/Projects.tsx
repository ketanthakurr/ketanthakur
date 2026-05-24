import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import './Projects.css';

interface Project {
  title: string;
  description: string;
  tags: string[];
  year: string;
  preview?: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: "Onified",
    description: "Enterprise multi-app workspace built on a shared design system, tokens, and governed UI primitives. Web + mobile via Capacitor, with audit tooling, i18n, and a Studio reference app driving consistency across every business module.",
    tags: ["React 19", "React-Native", "React-Native-Web", "TypeScript", "Redux", "Jest", "Vite", "Capacitor"],
    year: "2026",
    preview: "/projects/onified.png",
    link: "https://onified.ai/",
  },
  {
    title: "ProdLis",
    description: "Product catalog platform that gives businesses a custom storefront link to showcase products, manage inventory, and route buyers straight to WhatsApp. Includes auth, dashboard, and public vendor pages.",
    tags: ["React 19", "Redux Toolkit", "Framer Motion", "Vite"],
    year: "2025",
    preview: "/projects/prodlis.png",
    link: "https://www.prodlis.com/",
  },
  {
    title: "Matrib",
    description: "Cross-platform mobile news app on Expo with push notifications, OTA updates, offline-first caching via React Query, and deep linking. Shipped to iOS and Android.",
    tags: ["React Native", "Next.js", "Bun.Js", "Expo", "React Query", "Redux"],
    year: "2025",
    preview: "/projects/matrib.png",
    link: "https://www.matrib.com/",
  },
  {
    title: "Toolit",
    description: "AI-assisted content workspace with a rich TipTap editor, Excalidraw canvas, streamed model responses, and a Radix-based component system. Built for fast drafting and multimodal editing.",
    tags: ["React", "AI SDK", "Tailwind", "Fast API"],
    year: "2025",
    preview: "/projects/toolit.png",
    link: "https://toolit.in/",
  },
  {
    title: "Droneverse",
    description: "Marketing and product site for a drone-tech company. Next.js App Router with dynamic page registry, interactive Leaflet maps, COBE globe, motion-driven sections, and PDF rendering for spec sheets.",
    tags: ["Next.js 16", "bun.js", "MongoDB", "CRM integration"],
    year: "2025",
    preview: "/projects/droneverse.png",
    link: "https://droneverse.in/",
  },
];

const ProjectRow = ({ project }: { project: Project }) => {
  const [hovered, setHovered] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imgRef.current || !project.preview) return;
    imgRef.current.style.opacity = hovered ? '1' : '0';
    imgRef.current.style.transform = hovered ? 'scale(1)' : 'scale(0.95)';
  }, [hovered, project.preview]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current || !rowRef.current || !project.preview) return;
    const rect = rowRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + 24;
    const y = e.clientY - rect.top - 120;
    imgRef.current.style.left = `${x}px`;
    imgRef.current.style.top = `${y}px`;
  };

  return (
    <div
      ref={rowRef}
      className={`project-row ${hovered ? 'hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {project.preview && (
        <div ref={imgRef} className="project-preview">
          <img src={project.preview} alt={`${project.title} preview`} />
        </div>
      )}

      <div className="project-content">
        <div className="project-main">
          <div className="project-header">
            <h3>{project.title}</h3>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="arrow-icon">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="project-description">{project.description}</p>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Visit Live Site
            </a>
          )}
        </div>
        <div className="project-meta">
          <span className="project-year">{project.year}</span>
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="projects-hero"
        >
          <p className="projects-badge">Projects</p>
          <h1 className="projects-title">
            SELECTED<br />
            <span>WORK.</span>
          </h1>
        </motion.div>

        <div className="projects-list">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ProjectRow project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
