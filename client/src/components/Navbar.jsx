import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const {user}=useSelector(state=>state.auth)
  return (
    <>
      {/* FIXED: Added 'fixed' and 'top-0' to keep it pinned while scrolling */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        
        {/* Container: Changed w-screen to w-full for better compatibility */}
        <div className="flex items-center justify-between w-full px-8 py-3 border-b border-white/10 bg-black/60 backdrop-blur-md">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-1.5 group">
            <span className="text-xl font-bold text-white tracking-tight">
              Resume
            </span>
            <span className="w-2 h-2 bg-purple-400 rounded-full mt-1 animate-pulse"></span>
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-10 text-sm font-normal text-white/60">
            <li>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#features" 
                onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Features
              </a>
            </li>
            <li>
              <a 
                href="#testimonials" 
                onClick={(e) => { e.preventDefault(); document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }); }} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Simplified Login Link to match common SaaS aesthetics */}
            <Link 
              to="/app?state=login" 
              className="btn-neon pl-2 pr-6 py-1.5 rounded-full"
              hidden={user}
            >
              <div className="size-8 bg-white rounded-full flex items-center justify-center text-[#7C3AED] group-hover:translate-x-0.5 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <span className="text-sm font-semibold">Login</span>
            </Link>

            <Link 
              to="/app?state=register" 
              className="btn-neon pl-2 pr-6 py-1.5 rounded-full"
              hidden={user}
            >
              <div className="size-8 bg-white rounded-full flex items-center justify-center text-[#7C3AED] group-hover:translate-x-0.5 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <span className="text-sm font-semibold">Get Started</span>
            </Link>
            <Link to='/app'
            className="btn-neon pl-2 pr-6 py-1.5 rounded-full"
            hidden={!user}
            >
             <div className="size-8 bg-white rounded-full flex items-center justify-center text-[#7C3AED] group-hover:translate-x-0.5 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <span className='text-sm font-semibold'>Dashboard</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
