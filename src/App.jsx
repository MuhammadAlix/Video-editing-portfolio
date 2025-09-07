import { useState } from 'react'

import './App.css'

import Hero from "./components/Hero"
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Navbar from './components/Navbar'



function App() {
  const [count, setCount] = useState(0)

  return (
<div>

      
      <Navbar/>
      <Hero/>
      <About/>
      <Projects/>
      <Contact/>
      <Footer/>



</div>  

  )
}

export default App
