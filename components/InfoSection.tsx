
import React from 'react';
import { motion } from 'framer-motion';

interface InfoSectionProps {
  isDark: boolean;
}

const InfoSection: React.FC<InfoSectionProps> = ({ isDark }) => {
  return (
    <section className={`relative py-32 px-8 overflow-hidden transition-colors duration-700 ${isDark ? 'bg-[#140c1d]' : 'bg-[#e9eaeb]'}`}>
      {/* Decorative Gradient Blob */}
      <div className={`absolute top-0 right-0 w-[600px] h-[600px] blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 transition-colors duration-700 ${isDark ? 'bg-[#a34ebc]/10' : 'bg-[#a34ebc]/15'}`}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`uppercase tracking-[0.4em] text-xs font-bold mb-8 transition-colors duration-500 ${isDark ? 'text-white/40' : 'text-black/40'}`}
            >
              The Formula of Success
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-5xl md:text-7xl font-black tracking-tighter mb-12 leading-[0.9] transition-colors duration-500 ${isDark ? 'text-white' : 'text-black'}`}
            >
              EXCELLENCE <br/>
              IN EVERY <br/>
              <span className="text-[#a4e37d]">FRAME.</span>
            </motion.h2>
            
            <div className="grid grid-cols-2 gap-12">
              {[
                { label: 'Project Growth', value: '130%+' },
                { label: 'Capital Generated', value: '$8M+' },
                { label: 'AI Models', value: '24' },
                { label: 'Creative Awards', value: '12' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className={`text-3xl font-black mb-2 transition-colors duration-500 ${isDark ? 'text-white' : 'text-black'}`}>{stat.value}</div>
                  <div className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-500 ${isDark ? 'text-white/40' : 'text-black/40'}`}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`aspect-square border rounded-2xl flex items-center justify-center p-12 overflow-hidden group transition-all duration-700 ${isDark ? 'bg-gradient-to-br from-[#050505] to-[#140c1d] border-white/5' : 'bg-gradient-to-br from-white to-[#f4f5f5] border-black/5'}`}
          >
             <img 
               src="https://picsum.photos/seed/filmmaiker/1200/1200" 
               alt="Studio Vision"
               className={`w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100 ${isDark ? 'opacity-60' : 'opacity-80'}`}
             />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
