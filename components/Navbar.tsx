
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, onToggleTheme }) => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
      className="fixed top-0 left-0 w-full z-[100] px-6 sm:px-10 py-6 sm:py-8 flex justify-between items-center mix-blend-difference"
    >
      <div className="flex items-center gap-8">
        <a href="/" className="text-2xl font-black tracking-tighter uppercase text-white hover:opacity-70 transition-opacity">
          FILMM<span className="text-[#a4e37d]">AI</span>KER
        </a>
        
        {/* Theme Toggle Button */}
        <button 
          onClick={onToggleTheme}
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors group relative"
          aria-label="Toggle Theme"
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.svg 
                key="moon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </motion.svg>
            ) : (
              <motion.svg 
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>
      
      <div className="hidden lg:flex gap-16 text-[10px] tracking-[0.4em] font-black uppercase text-white/70">
        {['Vision', 'Archive', 'Intelligence', 'Nexus'].map((item) => (
          <a key={item} href="#" className="relative group overflow-hidden h-4">
            <span className="block group-hover:-translate-y-full transition-transform duration-500 ease-in-out">{item}</span>
            <span className="block absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out text-[#a4e37d]">{item}</span>
          </a>
        ))}
      </div>

      <button className="group flex flex-col gap-[6px] items-end cursor-pointer">
        <div className="w-8 h-[2px] bg-white transition-all group-hover:w-12"></div>
        <div className="w-12 h-[2px] bg-white"></div>
        <div className="w-6 h-[2px] bg-white transition-all group-hover:w-12"></div>
      </button>
    </motion.nav>
  );
};

export default Navbar;
