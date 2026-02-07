import './Hero.css';
import Ketan from '../../assets/HeroSection/ketan.png';
import chip1 from '../../assets/HeroSection/1.png';
import chip2 from '../../assets/HeroSection/2.png';
import chip3 from '../../assets/HeroSection/3.png';
import chip4 from '../../assets/HeroSection/4.png';


const Hero = () => {
  return (
    <section id="hero" className="hero_section">
      <div className="hero_content">
        <h1 className='hero_content_heading'>PRODUCT DEVELOPER</h1>
        <a href="#contact" className="hero_cta">
          <span className="hero_cta_text">Get in Touch</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

      </div>

      {/* -------------- Grid content image and chips ------------- */}
      <div className="hero_grid">
        <div className="hero_image_container">
          <img src={Ketan} alt="Ketan" className="hero_image" />
          <img src={chip1} alt="Chip 1" className="hero_chip_image chip1" />
          <img src={chip2} alt="Chip 2" className="hero_chip_image chip2" />
          <img src={chip3} alt="Chip 3" className="hero_chip_image chip3" />
          <img src={chip4} alt="Chip 4" className="hero_chip_image chip4" />
        </div>
      </div>


    </section>
  );
};

export default Hero;