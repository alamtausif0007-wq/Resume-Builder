import React from 'react';
import { Link } from 'react-router-dom';

const Templates = () => {
    const templates = [
        { id: 'modern', name: 'Modern Template', desc: 'A sleek, dynamic design perfect for tech and creative roles.' },
        { id: 'classic', name: 'Classic Template', desc: 'Traditional and professional formatting for corporate environments.' },
        { id: 'minimal', name: 'Minimal Template', desc: 'Clean, distraction-free layout highlighting your core skills.' },
        { id: 'minimal-image', name: 'Minimal Image Template', desc: 'Modern minimal layout with a dedicated profile picture section.' }
    ];

    return (
        <div className="min-h-screen bg-[#030712] py-24 px-6 relative flex flex-col">
            {/* Header/Nav overlay if needed, but assuming user uses Layout for app, here just a simple back link */}
            <div className="absolute top-6 left-6 z-20">
                <Link to="/" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2">
                    &larr; Back to Home
                </Link>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-600 bg-clip-text text-transparent text-center mb-16">
                    Our Resume Templates
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {templates.map(tpl => (
                        <div key={tpl.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-colors group flex flex-col">
                            {/* Placeholder for template image */}
                            <div className="h-64 bg-gradient-to-br from-white/5 to-white/10 w-full flex items-center justify-center p-4 border-b border-white/5">
                                <span className="text-lg font-medium text-emerald-500/50">{tpl.name}</span>
                            </div>
                            
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold text-white mb-2">{tpl.name}</h3>
                                <p className="text-slate-400 mb-6 flex-grow">{tpl.desc}</p>
                                <Link to="/app" className="block w-full text-center py-2.5 px-4 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors font-medium">
                                    Use Template
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Templates;
