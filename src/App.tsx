import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Experience from './components/Experience/Experience'
import Projects from './components/Projects/Projects'
import Gallery from './components/Gallery/Gallery'
import Testimonials from './components/Testimonials/Testimonials'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <section className='header_placeholder'></section>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Gallery />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default App
