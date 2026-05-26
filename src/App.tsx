import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Marquee from './components/Marquee/Marquee'
import About from './components/About/About'
import Experience from './components/Experience/Experience'
import TechStack from './components/TechStack/TechStack'
import Projects from './components/Projects/Projects'
import Gallery from './components/Gallery/Gallery'
import Testimonials from './components/Testimonials/Testimonials'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Cursor from './components/Cursor/Cursor'
import './App.css'

function App() {
  return (
    <div className="App">
      <Cursor />
      <Header />
      <section className='header_placeholder'></section>
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <TechStack />
      <Projects />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
