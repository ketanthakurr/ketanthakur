import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-background-lines">
        <div className="bg-line"></div>
        <div className="bg-line"></div>
        <div className="bg-line"></div>
        <div className="bg-line"></div>
      </div>
      <div className="about-container">
        <div className="about-content">
          <h2 className="about-title">ABOUT ME</h2>
          <p className="about-description">
            I&apos;m a developer and creator, shaping ideas into digital experiences.
            With over a year of experience, I&apos;ve helping brands and companies transform their ideas into experiences.
          </p>
        </div>
        <div className="about-image">
          <div className="image-placeholder"></div>
        </div>
      </div>
      <div className="about-roles">
        <h1 className="role-title">
          <span className="role-black">PRODUCT DEVELOPER</span><br />
          <span className="role-black">VISUAL STORYTELLER.</span><br />
          <span className="role-orange">PHOTOGRAPHER.</span>
        </h1>
      </div>
    </section>
  );
};

export default About;