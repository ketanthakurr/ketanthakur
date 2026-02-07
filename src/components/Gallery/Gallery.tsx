import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import './Gallery.css';

interface Photo {
  src: string;
  title: string;
  category: string;
}

const photos: Photo[] = [
  { src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80", title: "Urban Streets", category: "Street" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", title: "Portraits", category: "Portrait" },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", title: "Misty Mountains", category: "Landscape" },
  { src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=600&q=80", title: "Geometry", category: "Architecture" },
  { src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&q=80", title: "Night City", category: "Street" },
  { src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80", title: "Macro Flora", category: "Macro" },
  { src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80", title: "City Lights", category: "Street" },
  { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80", title: "Studio Portrait", category: "Portrait" },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", title: "Mountain Peak", category: "Landscape" },
  { src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80", title: "Modern Building", category: "Architecture" },
  { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80", title: "Starry Night", category: "Landscape" },
  { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80", title: "Forest Path", category: "Landscape" },
  { src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=80", title: "Glass Tower", category: "Architecture" },
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80", title: "Fashion Portrait", category: "Portrait" },
  { src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80", title: "Urban Alley", category: "Street" },
  { src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80", title: "Flower Close-up", category: "Macro" },
  { src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80", title: "Sunset Lake", category: "Landscape" },
  { src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=600&q=80", title: "Concrete Structure", category: "Architecture" },
];

const categories = ["All", ...Array.from(new Set(photos.map((p) => p.category)))];

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const [loadCount, setLoadCount] = useState(1);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const filtered = filter === "All" ? photos : photos.filter((p) => p.category === filter);
  const displayedPhotos = filtered.slice(0, 6 * loadCount);
  const hasMore = displayedPhotos.length < filtered.length;

  useEffect(() => {
    setLoadCount(1);
  }, [filter]);

  useEffect(() => {
    if (selected !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selected]);

  const closeLightbox = () => {
    setSelected(null);
  };

  return (
    <section className="gallery-section">
      <div className="gallery-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="gallery-hero"
        >
          <p className="gallery-badge">Photography</p>
          <h1 className="gallery-title">
            VISUAL<br />
            <span>STORIES.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="gallery-filters"
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`filter-btn ${filter === c ? 'active' : ''}`}
            >
              {c}
            </button>
          ))}
        </motion.div>

        <div className="gallery-grid">
          {displayedPhotos.map((photo, i) => (
            <motion.div
              key={photo.title + filter}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="gallery-item"
              onClick={() => setSelected(i)}
            >
              <img src={photo.src} alt={photo.title} loading="lazy" />
              <div className="gallery-overlay">
                <div>
                  <p className="photo-title">{photo.title}</p>
                  <p className="photo-category">{photo.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={() => setLoadCount(prev => prev + 1)}>
              Load More
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox"
            onClick={closeLightbox}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              src={filtered[selected]?.src}
              alt={filtered[selected]?.title}
              className="lightbox-image"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
