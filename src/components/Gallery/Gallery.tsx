import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { TextReveal, HorizontalScroll } from '../ScrollReveal';
import './Gallery.css';

interface Photo {
  src: string;
  title: string;
  category: string;
}

const photos: Photo[] = [
  { src: "/gallery/gallery1.jpg", title: "Squad Goals", category: "Photography" },
  { src: "/gallery/gallery2.jpg", title: "Chai pe charcha", category: "Photography" },
  { src: "/gallery/gallery4.jpg", title: "Sweet Heist", category: "Photography" },
  { src: "/gallery/gallery5.jpg", title: "Sharp Eyes", category: "Photography" },
  { src: "/gallery/gallery6.jpg", title: "Do Not Disturb", category: "Photography" },
  { src: "/gallery/gallery7.jpg", title: "Cold Blood", category: "Photography" },
  { src: "/gallery/gallery8.jpg", title: "Gods Live Here", category: "Photography" },
  { src: "/gallery/gallery9.jpg", title: "Ghungroo Riot", category: "Photography" },
  { src: "/gallery/gallery10.JPG", title: "Sky Riot", category: "Photography" },
  { src: "/gallery/gallery11.jpg", title: "Spotlight", category: "Photography" },
];

const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const closeLightbox = useCallback(() => {
    if (lightboxRef.current) {
      gsap.to(lightboxRef.current, {
        opacity: 0, duration: 0.2, ease: "power2.in",
        onComplete: () => setSelectedPhoto(null),
      });
    } else {
      setSelectedPhoto(null);
    }
  }, []);

  const openLightbox = (i: number, e: React.SyntheticEvent<HTMLElement>) => {
    triggerRef.current = e.currentTarget;
    setSelectedPhoto(i);
  };

  // When the lightbox opens: animate in, lock scroll, focus the close button,
  // and wire Escape. On close, restore scroll and focus the originating slide.
  useEffect(() => {
    if (selectedPhoto === null) return;

    if (lightboxRef.current) {
      gsap.fromTo(lightboxRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      const img = lightboxRef.current.querySelector("img");
      if (img) gsap.fromTo(img, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, delay: 0.1, ease: "power3.out" });
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [selectedPhoto, closeLightbox]);

  return (
    <section id="photography">
      <div className="gallery-header">
        <TextReveal>
          <p className="gallery-badge">Photography</p>
          <h2 className="gallery-title">
            VISUAL <span>STORIES.</span>
          </h2>
        </TextReveal>
      </div>

      <HorizontalScroll className="gallery-scroll">
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            className="gallery-slide"
            role="button"
            tabIndex={0}
            aria-label={`View photo: ${photo.title}`}
            onClick={(e) => openLightbox(i, e)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLightbox(i, e);
              }
            }}
          >
            <div className="gallery-slide-inner">
              <img
                src={photo.src}
                alt={photo.title}
                className="gallery-image"
                loading="lazy"
              />
              <div className="gallery-overlay">
                <div>
                  <p className="photo-title">{photo.title}</p>
                  <p className="photo-category">{photo.category}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </HorizontalScroll>

      {selectedPhoto !== null && (
        <div
          ref={lightboxRef}
          className="lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${photos[selectedPhoto]?.title} — enlarged photo`}
          style={{ opacity: 0 }}
        >
          <button
            ref={closeBtnRef}
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <img
            src={photos[selectedPhoto]?.src}
            alt={photos[selectedPhoto]?.title}
            className="lightbox-image"
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;
