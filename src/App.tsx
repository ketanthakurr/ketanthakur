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
import AudioControl from './components/AudioControl/AudioControl'
import Intro from './components/Intro/Intro'
import { useEffect } from 'react'
import './App.css'

function App() {
  // Persist scroll position so the intro can tell a fresh top-load from a
  // reload that was already scrolled into the page (intro only plays at top).
  useEffect(() => {
    // Save only on real scrolls — calling it on mount could clobber the
    // persisted value with 0 before the browser restores scroll on reload.
    const save = () => sessionStorage.setItem('kt_scroll', String(Math.round(window.scrollY)))
    window.addEventListener('scroll', save, { passive: true })
    return () => window.removeEventListener('scroll', save)
  }, [])

  return (
    <div className="App">
      <Cursor />
      <AudioControl />
      <Header />
      {/* Intro section — its own scroll region. Scrolling through it runs the
          name-zoom reveal; the fixed visuals live in <Intro />. */}
      <div id="intro" className="intro-spacer" aria-hidden="true"></div>
      <Intro />
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
