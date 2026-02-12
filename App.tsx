
import React, { useState, useEffect } from 'react';
import ScrollytellingCanvas from './components/ScrollytellingCanvas';
import Navbar from './components/Navbar';
import InfoSection from './components/InfoSection';
import Footer from './components/Footer';
import ContactFormSection from './components/ContactFormSection';
import PricingSection from './components/PricingSection';
import { motion, AnimatePresence } from 'framer-motion';

const Marquee: React.FC<{ items: string[]; speed?: number; isDark: boolean }> = ({ items, speed = 20, isDark }) => (
  <div className={`flex overflow-hidden select-none gap-10 py-10 border-y transition-colors duration-500 ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-black/5 bg-black/[0.02]'}`}>
    <motion.div 
      initial={{ x: 0 }}
      animate={{ x: "-50%" }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      className="flex flex-nowrap gap-10 shrink-0"
    >
      {[...items, ...items].map((item, i) => (
        <span key={i} className={`text-[8vw] font-black uppercase italic tracking-tighter shrink-0 leading-none transition-colors duration-500 ${isDark ? 'text-white/5' : 'text-black/5'}`}>
          #{item}
        </span>
      ))}
    </motion.div>
  </div>
);

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const isDark = theme === 'dark';

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div className={`relative transition-colors duration-700 selection:bg-[#a4e37d] selection:text-black ${isDark ? 'bg-[#050505] text-white' : 'bg-[#f4f5f5] text-black'}`}>
      {/* Noise Texture Overlay */}
      <div className={`fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay transition-opacity duration-700`} style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}></div>
      
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
      
      <ScrollytellingCanvas isDark={isDark} />

      <Marquee isDark={isDark} items={['VisualSynthesis', 'NeuralMotion', 'CinemaAI', 'CreativeCore', 'NexusEngine']} />

      <InfoSection isDark={isDark} />

      <section className={`py-40 px-8 relative overflow-hidden transition-colors duration-700 ${isDark ? 'bg-[#050505]' : 'bg-[#f4f5f5]'}`}>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[150px] rounded-full transition-colors duration-700 ${isDark ? 'bg-[#a4e37d]/5' : 'bg-[#a4e37d]/10'}`}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <h3 className="text-[#a4e37d] uppercase tracking-[0.5em] text-[10px] font-black mb-6">Our Methodology</h3>
              <h2 className={`text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] transition-colors duration-500 ${isDark ? 'text-white' : 'text-black'}`}>
                Engineered <br/> Excellence.
              </h2>
            </div>
            <div className={`text-sm uppercase tracking-[0.2em] font-bold pb-2 border-b transition-colors duration-500 ${isDark ? 'text-white/30 border-white/10' : 'text-black/30 border-black/10'}`}>
              Est. 2025 // Studio
            </div>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-1px transition-colors duration-500 ${isDark ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5'}`}>
            {[
              {
                title: 'Synthesis',
                desc: 'We merge hyper-realistic AI generation with legacy cinematography to break the ceiling of visual storytelling.',
                tag: '01'
              },
              {
                title: 'Intelligence',
                desc: 'A data-driven creative process that optimizes every frame for emotional impact and brand resonance.',
                tag: '02'
              },
              {
                title: 'Deployment',
                desc: 'Seamless scale across digital ecosystems, from interactive web platforms to IMAX-ready motion.',
                tag: '03'
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-12 group transition-colors duration-500 cursor-crosshair ${isDark ? 'bg-[#050505] hover:bg-[#a4e37d]/5' : 'bg-[#f4f5f5] hover:bg-[#a4e37d]/10'}`}
              >
                <div className="text-[10px] font-black text-[#a4e37d] mb-12 flex items-center gap-4">
                  <span className="w-10 h-1px bg-[#a4e37d]"></span> {item.tag}
                </div>
                <h4 className="text-3xl font-black mb-6 uppercase tracking-tighter group-hover:translate-x-2 transition-transform">
                  {item.title}
                </h4>
                <p className={`leading-relaxed text-base font-medium transition-colors duration-500 ${isDark ? 'text-white/40' : 'text-black/50'}`}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PricingSection isDark={isDark} />

      <ContactFormSection isDark={isDark} />

      <Footer isDark={isDark} />

      {/* Floating UI Elements */}
      <div className="fixed bottom-10 left-10 z-[90] hidden lg:block">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-[#a4e37d] animate-pulse"></div>
          <div className={`text-[9px] font-black tracking-[0.3em] uppercase transition-colors duration-500 ${isDark ? 'text-white/40' : 'text-black/40'}`}>Engine Status: Optimal</div>
        </div>
      </div>

      <div className="fixed bottom-10 right-10 z-[90] hidden lg:block">
        <div className={`text-[9px] font-black tracking-[0.3em] uppercase transition-colors duration-500 rotate-90 origin-right ${isDark ? 'text-white/40' : 'text-black/40'}`}>
          FilmmAiker Studio © 2025
        </div>
      </div>
    </div>
  );
};

export default App;
