import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './Marquee.css';

gsap.registerPlugin(ScrollTrigger);

const ROLES = ['PRODUCT DEVELOPER', 'VISUAL STORYTELLER', 'PHOTOGRAPHER'];
// Render the phrase twice so the -50% scroll loops seamlessly.
const SEP = ' · ';

const Marquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    gsap.to(el, {
      xPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return (
    <section className="marquee-section">
      <div ref={marqueeRef} className="marquee-content">
        <h2 className="marquee-text">
          {[...ROLES, ...ROLES].map((role, i) => (
            <span key={i}>{role}{SEP}</span>
          ))}
        </h2>
      </div>
    </section>
  );
};

export default Marquee;
