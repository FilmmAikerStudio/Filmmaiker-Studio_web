
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollytellingCanvas from './components/ScrollytellingCanvas';
import Navbar from './components/Navbar';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import PortfolioSection from './components/PortfolioSection';
import StudioSection from './components/StudioSection';
import PricingSection from './components/PricingSection';
import ContactFormSection from './components/ContactFormSection';
import Footer from './components/Footer';

const MARQUEE_ITEMS = [
  'VisualSynthesis',
  'CinematicAI',
  'BrandFilms',
  'GenerativeMotion',
  'AdCampaigns',
  'NeuralBranding',
  'PostProduction',
];

const Marquee: React.FC<{ items: string[]; speed?: number; isDark: boolean }> = ({
  items,
  speed = 22,
  isDark,
}) => (
  <div
    className={`flex overflow-hidden select-none gap-10 py-10 border-y transition-colors duration-500 ${
      isDark ? 'border-white/5 bg-white/[0.02]' : 'border-black/5 bg-black/[0.02]'
    }`}
  >
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: '-50%' }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      className="flex flex-nowrap gap-10 shrink-0"
    >
      {[...items, ...items].map((item, i) => (
        <span
          key={i}
          className={`text-[8vw] font-black uppercase italic tracking-tighter shrink-0 leading-none transition-colors duration-500 ${
            isDark ? 'text-white/5' : 'text-black/5'
          }`}
        >
          #{item}
        </span>
      ))}
    </motion.div>
  </div>
);

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const isDark = theme === 'dark';

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <div
      className={`relative transition-colors duration-700 selection:bg-[#FF6B35] selection:text-black ${
        isDark ? 'bg-[#050505] text-white' : 'bg-[#f4f5f5] text-black'
      }`}
    >
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}
      />

      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

      {/* 1. Hero — scroll-linked canvas */}
      <ScrollytellingCanvas isDark={isDark} />

      {/* Marquee ticker */}
      <Marquee isDark={isDark} items={MARQUEE_ITEMS} />

      {/* 2. Services */}
      <ServicesSection isDark={isDark} />

      {/* 3. Process */}
      <ProcessSection isDark={isDark} />

      {/* 4. Portfolio */}
      <PortfolioSection isDark={isDark} />

      {/* 5. Studio (manifesto + team + stats) */}
      <StudioSection isDark={isDark} />

      {/* 6. Pricing */}
      <PricingSection isDark={isDark} />

      {/* 7. Contact */}
      <ContactFormSection isDark={isDark} />

      <Footer isDark={isDark} />

      {/* Floating status indicator */}
      <div className="fixed bottom-10 left-10 z-[90] hidden lg:block">
        <div className="flex items-center gap-4">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: '#FF6B35' }}
          />
          <div
            className={`text-[9px] font-black tracking-[0.3em] uppercase transition-colors duration-500 ${
              isDark ? 'text-white/40' : 'text-black/40'
            }`}
          >
            Engine Status: Optimal
          </div>
        </div>
      </div>

      <div className="fixed bottom-10 right-10 z-[90] hidden lg:block">
        <div
          className={`text-[9px] font-black tracking-[0.3em] uppercase transition-colors duration-500 rotate-90 origin-right ${
            isDark ? 'text-white/40' : 'text-black/40'
          }`}
        >
          FilmmAiker Studio © 2025
        </div>
      </div>
    </div>
  );
};

export default App;
