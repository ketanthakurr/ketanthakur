import './Footer.css';

const Footer = () => {
  return (
    <section id="footer" className="footer">
      <div className="footer-container">
        <div className="footer-image">
          <img src="https://via.placeholder.com/400x200" alt="Team" />
        </div>
        <nav className="footer-nav">
          <a href="#home">HOME</a>
          <a href="#about">ABOUT</a>
          <a href="#services">SERVICES</a>
          <a href="#work">WORK</a>
          <a href="#footer">CONTACT US</a>
        </nav>
      </div>
      <div className="footer-footer">
        <div className="footer-social">
          <a href="#">X (TWITTER)</a>
          <a href="#">INSTAGRAM</a>
          <a href="#">LINKEDIN</a>
          <a href="#">BEHANCE</a>
        </div>
        <div className="footer-copyright">
          © KETAN 2025 ALL RIGHTS RESERVED
        </div>
      </div>
      <div className="footer-name">KETAN</div>
      <div className="footer-gradient"></div>
    </section>
  );
};

export default Footer;