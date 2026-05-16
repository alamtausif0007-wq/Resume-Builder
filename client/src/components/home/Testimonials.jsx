import React from 'react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Senior Product Manager",
    company: "Google",
    image: "https://i.pravatar.cc/150?u=sarah",
    text: "This AI resume builder completely transformed my job search. The bullet points it generated highlighted my impact far better than I ever could."
  },
  {
    name: "David Chen",
    role: "Software Engineer",
    company: "Stripe",
    image: "https://i.pravatar.cc/150?u=david",
    text: "I was struggling to condense 10 years of experience into a single page. The templates and AI suggestions made it incredibly easy and sleek."
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    company: "Figma",
    image: "https://i.pravatar.cc/150?u=emily",
    text: "As a designer, I'm picky about aesthetics. The templates here are gorgeous, and the dark mode interface was a joy to use while building."
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 relative border-t border-white/10">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3 text-glow">Success Stories</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white text-stylish text-glow">Loved by professionals worldwide</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/20 shadow-2xl relative">
              <svg className="absolute top-6 right-6 w-8 h-8 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-white text-lg mb-8 leading-relaxed relative z-10 drop-shadow-md">"{t.text}"</p>
              
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full ring-2 ring-white/10" />
                <div>
                  <h4 className="text-white font-semibold">{t.name}</h4>
                  <p className="text-sm text-slate-200 drop-shadow-md">{t.role} at <span className="text-emerald-400">{t.company}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
