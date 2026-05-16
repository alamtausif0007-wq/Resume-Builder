import React from 'react';
import { SparklesIcon, LayoutTemplateIcon, ShieldCheckIcon, ZapIcon, DownloadIcon, Share2Icon } from 'lucide-react';

const features = [
  {
    icon: <SparklesIcon className="w-6 h-6 text-emerald-400" />,
    title: "AI-Powered Generation",
    description: "Our advanced AI models analyze your career history to generate ATS-friendly bullet points that highlight your impact."
  },
  {
    icon: <LayoutTemplateIcon className="w-6 h-6 text-emerald-400" />,
    title: "Premium Templates",
    description: "Choose from a curated collection of modern, professional templates designed to stand out to recruiters."
  },
  {
    icon: <ZapIcon className="w-6 h-6 text-emerald-400" />,
    title: "Real-time Preview",
    description: "See your resume update instantly as you type. No more guessing how your final PDF will look."
  },
  {
    icon: <ShieldCheckIcon className="w-6 h-6 text-emerald-400" />,
    title: "Secure & Private",
    description: "Your data is encrypted and secure. You have full control over who sees your resume with our privacy toggles."
  },
  {
    icon: <DownloadIcon className="w-6 h-6 text-emerald-400" />,
    title: "Instant PDF Export",
    description: "Download your pixel-perfect resume as a PDF with a single click, ready to be attached to your next application."
  },
  {
    icon: <Share2Icon className="w-6 h-6 text-emerald-400" />,
    title: "One-Click Sharing",
    description: "Get a unique, public link to share your resume directly with recruiters or on your LinkedIn profile."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3 text-glow">Powerful Features</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 text-stylish text-glow">Everything you need to land the job</h3>
          <p className="text-slate-200 drop-shadow-md text-lg">
            We've built the most advanced tools to help you craft a resume that gets past the algorithms and impresses human recruiters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/20 hover:bg-black/80 transition-colors shadow-2xl group">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
              <p className="text-white drop-shadow-md leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
