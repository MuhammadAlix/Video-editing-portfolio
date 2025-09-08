import { useState } from 'react'

import './App.css'

import Hero from "./components/Hero"
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import useSmoothScroll from './components/useSmoothScroll'
import NavBubble from './components/NavBubble'



function App() {
  useSmoothScroll();

  return (
<div>

      
      <Navbar/>
      <Hero/>
      <About/>
      <Projects/>
      <Contact/>
      <Footer/>
      <NavBubble/>



</div>  

  )
}

export default App
