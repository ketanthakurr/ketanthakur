import { useState, useEffect, useRef } from 'react';
import './Header.css';

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#photography', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuOrigin, setMenuOrigin] = useState({ x: '50%', y: '2rem' });
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

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

  // While the mobile menu is open: lock body scroll, close on Escape, and move
  // focus into the overlay (restoring it to the hamburger on close).
  useEffect(() => {
    if (!isMenuOpen) return;
    const hamburger = hamburgerRef.current; // stable node; capture for the cleanup
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
      hamburger?.focus();
    };
  }, [isMenuOpen]);

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuOrigin({ x: `${rect.left + rect.width / 2}px`, y: `${rect.top + rect.height / 2}px` });
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
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </nav>
          <button
            ref={hamburgerRef}
            className="hamburger"
            onClick={openMenu}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
        style={{
          clipPath: isMenuOpen
            ? `circle(150% at ${menuOrigin.x} ${menuOrigin.y})`
            : `circle(0% at ${menuOrigin.x} ${menuOrigin.y})`
        }}
      >
        <button
          ref={closeBtnRef}
          className="close-btn"
          onClick={closeMenu}
          aria-label="Close menu"
          style={{ left: menuOrigin.x, top: menuOrigin.y }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <nav className="mobile-nav">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
