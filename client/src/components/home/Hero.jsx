import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Hero = () => {
  const {token,user}=useSelector(state=>state.auth)

  const navigate = useNavigate();
  const buildresumehandler=()=>{
    try {
      if(token){
        navigate('/app')
      }
      else{
        navigate('/app?state=login')
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handlewatchai=async()=>{
   try {
    if(!token || !user){
      toast.error("You need to login and subscribe to watch AI")
      navigate('/app?state=login')
      return;
    }
    if(!user.isSubscribed){
      toast.error("You need to subscribe to watch AI")
      navigate('/payment')
      return;
    }
    else{
      navigate('/app')
    }
   } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || error.message)
   } 
  }
  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center pt-20">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl px-6 text-center">
        
        {/* AI Launch Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-emerald-300 uppercase tracking-widest">
            AI Powered Generation
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight mb-6 drop-shadow-xl relative z-10">
          Hire-ready in <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]">
            60 Seconds.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-slate-200 drop-shadow-md text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-glow">
         Go beyond basic formatting with AI-enhanced descriptions, premium designer templates, and a seamless subscription for unlimited career growth. Stop building resumes—start building your future.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button onClick={buildresumehandler} className="btn-neon px-8 py-4 rounded-xl text-lg">
            Build My Resume
          </button>
          <button onClick={handlewatchai} className="px-8 py-4 bg-black/60 backdrop-blur-md text-white border border-white/20 rounded-xl hover:bg-black/80 transition-all shadow-xl flex items-center gap-2 group hover:text-emerald-300">
            <svg className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span  className="drop-shadow-md">Watch AI in action</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
