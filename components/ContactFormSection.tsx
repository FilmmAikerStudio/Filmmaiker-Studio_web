
import React from 'react';
import { motion } from 'framer-motion';

interface ContactFormSectionProps {
  isDark: boolean;
}

const ContactFormSection: React.FC<ContactFormSectionProps> = ({ isDark }) => {
  const textColor = isDark ? 'text-white' : 'text-black';
  const subTextColor = isDark ? 'text-white/40' : 'text-black/50';
  const borderColor = isDark ? 'border-white/10' : 'border-black/10';
  const placeholderColor = isDark ? 'placeholder:text-white/20' : 'placeholder:text-black/20';

  return (
    <section id="contact" className={`py-40 px-8 relative transition-colors duration-700 ${isDark ? 'bg-[#050505]' : 'bg-[#f4f5f5]'}`}>
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className={`text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 italic leading-none transition-colors duration-500 ${textColor}`}>
            Let's <span className="text-[#a4e37d]">Create</span>
          </h2>
          <p className={`text-sm md:text-base uppercase tracking-[0.3em] font-bold transition-colors duration-500 ${subTextColor}`}>
            Drop a message to initiate production
          </p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-8">
            <div className="group relative">
              <input 
                type="text" 
                placeholder="Full Name"
                className={`w-full bg-transparent border-b py-4 outline-none focus:border-[#a4e37d] transition-all ${borderColor} ${placeholderColor} ${textColor} font-medium`}
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#a4e37d] group-focus-within:w-full transition-all duration-500"></div>
            </div>
            
            <div className="group relative">
              <input 
                type="email" 
                placeholder="Email Address"
                className={`w-full bg-transparent border-b py-4 outline-none focus:border-[#a4e37d] transition-all ${borderColor} ${placeholderColor} ${textColor} font-medium`}
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#a4e37d] group-focus-within:w-full transition-all duration-500"></div>
            </div>

            <div className="group relative">
              <select className={`w-auto bg-transparent border-b py-4 outline-none focus:border-[#a4e37d] transition-all ${borderColor} ${textColor === 'text-white' ? 'text-white/40' : 'text-black/50'} font-medium appearance-none cursor-pointer pr-8`}>
                <option className={isDark ? "bg-[#050505]" : "bg-[#f4f5f5]"}>Project Type</option>
                <option className={isDark ? "bg-[#050505]" : "bg-[#f4f5f5]"}>Cinematic Production</option>
                <option className={isDark ? "bg-[#050505]" : "bg-[#f4f5f5]"}>AI Synthesis</option>
                <option className={isDark ? "bg-[#050505]" : "bg-[#f4f5f5]"}>Interactive Nexus</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div className="group relative flex-grow">
              <textarea 
                placeholder="Briefly describe your vision..."
                rows={5}
                className={`w-full h-full bg-transparent border-b py-4 outline-none focus:border-[#a4e37d] transition-all ${borderColor} ${placeholderColor} ${textColor} font-medium resize-none`}
              ></textarea>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#a4e37d] group-focus-within:w-full transition-all duration-500"></div>
            </div>
          </div>

          <div className="md:col-span-2 flex justify-center mt-12">
            <button className="group relative px-12 py-5 bg-[#a4e37d] text-black font-black tracking-widest uppercase text-xs overflow-hidden rounded-full transition-all hover:pr-16 active:scale-95 shadow-lg shadow-[#a4e37d]/10">
              <span className="relative z-10">Send Transmission</span>
              <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">→</span>
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactFormSection;
