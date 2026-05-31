import { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuOrigin, setMenuOrigin] = useState({ x: '50%', y: '2rem' });

  useEffect(() => {
    // Full-width while on the intro + hero; floats once you scroll past the hero.
    const handleScroll = () => {
      const hero = document.getElementById('hero');
      const threshold = hero ? hero.offsetTop + hero.offsetHeight - 120 : 50;
      setIsScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    setMenuOrigin({ x: `${x}px`, y: `${y}px` });
    setIsMenuOpen(true);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          <div className="logo">
            <span>Ketan Thakur</span>
          </div>
          <nav className="nav">
            <a href="#hero">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#photography">Gallery</a>
            <a href="#contact">Contact</a>
          </nav>
          <button className="hamburger" onClick={openMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div 
        className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
        style={{
          clipPath: isMenuOpen 
            ? `circle(150% at ${menuOrigin.x} ${menuOrigin.y})` 
            : `circle(0% at ${menuOrigin.x} ${menuOrigin.y})`
        }}
      >
        <button 
          className="close-btn" 
          onClick={closeMenu}
          style={{ left: menuOrigin.x, top: menuOrigin.y }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <nav className="mobile-nav">
          <a href="#hero" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#photography" onClick={closeMenu}>Gallery</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </div>
    </>
  );
};

export default Header;