import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import './Testimonials.css';

const testimonialData = [
  {
    name: "Erfan Hossain",
    role: "Co founder at Bingo",
    quote: "Asia Agency's data-driven strategies have completely transformed our business approach. They don't just deliver campaigns; they create comprehensive growth plans that help us connect with customers in meaningful ways.",
    rating: 5.0,
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Sarah Johnson",
    role: "CEO at TechStart",
    quote: "Working with this team has been transformative. Their attention to detail and innovative approach exceeded all our expectations.",
    rating: 5.0,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Michael Chen",
    role: "Director at Innovation Labs",
    quote: "The results speak for themselves. Professional, creative, and always delivering on time. Highly recommended!",
    rating: 5.0,
    image: "https://randomuser.me/api/portraits/men/22.jpg"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonialData.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonialData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="testimonials-section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="testimonials-title"
      >
        <span className="title-green">Our partners</span> find numerous<br />
        reasons to love us
      </motion.h2>

      <div className="testimonials-carousel">
        <div className="testimonial-cards-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <TestimonialCard data={testimonialData[currentIndex]} />
            </motion.div>
          </AnimatePresence>
          <TestimonialCard 
            data={testimonialData[(currentIndex + 1) % testimonialData.length]} 
            isReflection 
          />
        </div>

        <div className="carousel-controls">
          <button onClick={handlePrev} className="carousel-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={handleNext} className="carousel-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="carousel-progress">
          <div 
            className="progress-bar" 
            style={{ width: `${((currentIndex + 1) / testimonialData.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ data, isReflection = false }: { data: typeof testimonialData[0], isReflection?: boolean }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      className={`testimonial-card ${isReflection ? 'reflection' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {isHovered && !isReflection && (
        <div
          className="card-reflection"
          style={{
            background: `radial-gradient(circle 200px at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.15), transparent)`,
          }}
        />
      )}
      
      <div className="card-header">
        <div className="card-avatar">
          <img src={data.image} alt={data.name} />
        </div>
        <div className="card-info">
          <h3>{data.name}</h3>
          <p>{data.role}</p>
        </div>
      </div>

      <p className="card-quote">{data.quote}</p>

      <div className="card-rating">
        <span className="rating-icon">G</span>
        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
        <span className="rating-value">{data.rating}</span>
      </div>
    </motion.div>
  );
};

export default Testimonials;
