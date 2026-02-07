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
    title: "E-Commerce Platform",
    description: "A full-stack shopping experience with seamless checkout, product filtering, and admin dashboard.",
    tags: ["React", "Node.js", "MongoDB"],
    year: "2025",
    preview: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    link: "https://example.com",
  },
  {
    title: "Portfolio Website",
    description: "A bold, brutalist portfolio for a creative agency featuring scroll-driven animations and 3D elements.",
    tags: ["Next.js", "GSAP", "Three.js"],
    year: "2025",
    preview: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    title: "SaaS Dashboard",
    description: "Analytics dashboard with real-time data visualization, team management, and billing integration.",
    tags: ["React", "TypeScript", "Recharts"],
    year: "2024",
    preview: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    link: "https://example.com",
  },
  {
    title: "Mobile Banking App",
    description: "UI/UX design and frontend development for a fintech startup's mobile-first banking application.",
    tags: ["React Native", "Figma", "Stripe"],
    year: "2024",
  },
  {
    title: "Photography Blog",
    description: "A minimal blog platform optimized for showcasing photography with lazy loading and infinite scroll.",
    tags: ["Gatsby", "GraphQL", "Cloudinary"],
    year: "2024",
    preview: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80",
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
    const x = e.clientX - rect.left - 250;
    const y = e.clientY - rect.top - 175;
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
    <section className="projects-section">
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
