
import React from 'react';

interface FooterProps {
  isDark: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDark }) => {
  const textColor = isDark ? 'text-white' : 'text-black';
  const subTextColor = isDark ? 'text-white/40' : 'text-black/50';

  return (
    <footer className={`transition-colors duration-700 border-t py-20 px-8 relative z-10 ${isDark ? 'bg-[#050505] border-white/5' : 'bg-[#f4f5f5] border-black/5'}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
        <div>
          <div className={`text-5xl font-black tracking-tighter uppercase mb-6 transition-colors duration-500 ${textColor}`}>
            FILMM<span className="text-[#a4e37d]">AI</span>KER
          </div>
          <p className={`max-w-sm text-sm leading-relaxed mb-8 transition-colors duration-500 ${subTextColor}`}>
            The nexus of human creativity and artificial intelligence. 
            Crafting the next generation of visual storytelling from our studio in the void.
          </p>
          <div className={`flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${isDark ? 'text-white/50' : 'text-black/50'}`}>
            <a href="#" className="hover:text-[#a4e37d] transition-colors">YouTube</a>
            <a href="#" className="hover:text-[#a4e37d] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#a4e37d] transition-colors">LinkedIn</a>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-6">
          <div className="text-right">
            <div className="text-[#a4e37d] text-[10px] uppercase tracking-[0.3em] mb-2 font-black">Direct Contact</div>
            <div className={`text-xl font-bold tracking-tight transition-colors duration-500 ${textColor}`}>info@filmmaikerstudio.com</div>
          </div>
          <div className="text-right">
            <div className={`text-[10px] uppercase tracking-widest mb-2 font-bold transition-colors duration-500 ${isDark ? 'text-white/40' : 'text-black/40'}`}>Location</div>
            <div className={`text-xl font-medium transition-colors duration-500 ${textColor}`}>Remote / Decentralized</div>
          </div>
          <div className={`mt-8 text-[10px] uppercase tracking-[0.4em] font-black transition-colors duration-500 ${isDark ? 'text-white/20' : 'text-black/20'}`}>
            © 2025 FILMM<span className="text-[#a4e37d]">AI</span>KER STUDIO.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
