import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../configs/api';
import { Loader2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      return toast.error("Please fill in all fields");
    }

    try {
      setIsLoading(true);
      const { data } = await api.post('/api/contact', formData);
      toast.success(data.message || "Message sent successfully!");
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(error?.response?.data?.message || "Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3 text-glow">Get in Touch</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 text-stylish text-glow">Let's build something great together.</h3>
            <p className="text-slate-200 drop-shadow-md text-lg mb-8">
              Have questions about our premium plans, API access, or just want to say hi? Drop us a message and our team will get back to you within 24 hours.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <p className="text-sm text-slate-200 drop-shadow-md">Email us at</p>
                  <p className="text-white font-medium">alamtausif0007@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/60 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 shadow-2xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2 drop-shadow-md">First Name</label>
                  <input type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full px-4 py-3 bg-black/80 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-inner" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2 drop-shadow-md">Last Name</label>
                  <input type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full px-4 py-3 bg-black/80 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-inner" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2 drop-shadow-md">Email Address</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-black/80 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-inner" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2 drop-shadow-md">Message</label>
                <textarea rows="4" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 bg-black/80 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-inner" placeholder="How can we help you?"></textarea>
              </div>
              <button disabled={isLoading} className="btn-neon w-full py-4 rounded-xl text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
