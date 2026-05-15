import React from 'react'
import Hero from '../components/home/Hero'
import Navbar from '../components/Navbar'
import Features from '../components/home/Features'
import Testimonials from '../components/home/Testimonials'
import Contact from '../components/home/Contact'
import Footer from '../components/home/Footer'

const Home = () => {
  return (
    <div className="bg-[#030712] min-h-screen relative overflow-hidden">
      <div className="relative z-10">
        <Navbar/>
        <Hero />
        <Features />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default Home