import { motion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import './Testimonials.css';

const testimonials = [
  {
    name: "DroneVerse Team",
    role: "DroneVerse",
    text: "Working with Ketan to build our website for DroneVerse was an outstanding experience. He was collaborative, understood our vision right from the start, and delivered everything smoothly and on time. His creativity, attention to detail, and consistent support throughout the entire process truly set them apart.",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>();

  const animateCard = useCallback((direction: number, callback: () => void) => {
    if (!cardRef.current || isAnimating) return;
    setIsAnimating(true);
    
    cardRef.current.style.transition = 'opacity 0.25s ease-in, transform 0.25s ease-in';
    cardRef.current.style.opacity = '0';
    cardRef.current.style.transform = `translateX(${direction * -60}px)`;
    
    setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.style.transition = 'none';
        cardRef.current.style.transform = `translateX(${direction * 60}px)`;
        callback();
        
        setTimeout(() => {
          if (cardRef.current) {
            cardRef.current.style.transition = 'opacity 0.35s ease-out, transform 0.35s ease-out';
            cardRef.current.style.opacity = '1';
            cardRef.current.style.transform = 'translateX(0)';
            setTimeout(() => setIsAnimating(false), 350);
          }
        }, 50);
      }
    }, 250);
  }, [isAnimating]);

  const goTo = useCallback((index: number, direction: number) => {
    if (index === current || isAnimating) return;
    animateCard(direction, () => setCurrent(index));
  }, [current, animateCard, isAnimating]);

  const next = useCallback(() => {
    const nextIdx = (current + 1) % testimonials.length;
    goTo(nextIdx, 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    const prevIdx = (current - 1 + testimonials.length) % testimonials.length;
    goTo(prevIdx, -1);
  }, [current, goTo]);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    autoPlayRef.current = setInterval(next, 5000);
    return () => clearInterval(autoPlayRef.current);
  }, [next]);

  const resetAutoPlay = () => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(next, 5000);
  };

  const t = testimonials[current];

  return (
    <section className="testimonials-section-new">
      <div className="testimonials-container-new">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="testimonials-hero-new"
        >
          <p className="testimonials-badge-new">Testimonials</p>
          <h1 className="testimonials-title-new">
            WHAT PEOPLE<br />
            <span>SAY.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="testimonials-carousel-new"
        >
          <div ref={cardRef} className="testimonial-card-new">
            <svg className="quote-icon" width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" fill="currentColor"/>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" fill="currentColor"/>
            </svg>
            <p className="testimonial-text">"{t.text}"</p>
            <div className="testimonial-author">
              <p className="author-name">{t.name}</p>
              <p className="author-role">{t.role}</p>
            </div>
          </div>

          {testimonials.length > 1 && (
            <div className="carousel-controls-new">
              <div className="carousel-dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      goTo(i, i > current ? 1 : -1);
                      resetAutoPlay();
                    }}
                    className={`dot ${i === current ? 'active' : ''}`}
                  />
                ))}
              </div>
              <div className="carousel-arrows">
                <button onClick={() => { prev(); resetAutoPlay(); }} className="arrow-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18L9 12L15 6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button onClick={() => { next(); resetAutoPlay(); }} className="arrow-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18L15 12L9 6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
