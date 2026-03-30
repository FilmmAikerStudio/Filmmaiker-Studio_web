
import React from 'react';
import { motion } from 'framer-motion';

interface ContactFormSectionProps {
  isDark: boolean;
}

const ACCENT = '#FF6B35';

const PROJECT_TYPES = [
  'Project Type',
  'Brand Film / Commercial',
  'Advertising Campaign',
  'Generative AI Content',
  'Branding & Identity',
  'Documentary / Series',
  'Social Media Content',
  'Other',
];

const ContactFormSection: React.FC<ContactFormSectionProps> = ({ isDark }) => {
  const textColor = isDark ? 'text-white' : 'text-black';
  const subTextColor = isDark ? 'text-white/40' : 'text-black/50';
  const borderColor = isDark ? 'border-white/10' : 'border-black/10';
  const placeholderColor = isDark ? 'placeholder:text-white/20' : 'placeholder:text-black/20';

  return (
    <section
      id="contact"
      className={`py-40 px-8 relative overflow-hidden transition-colors duration-700 ${
        isDark ? 'bg-[#050505]' : 'bg-[#f4f5f5]'
      }`}
    >
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[200px] rounded-full pointer-events-none"
        style={{ background: isDark ? 'rgba(255,107,53,0.05)' : 'rgba(255,107,53,0.08)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p
            className="uppercase tracking-[0.5em] text-[10px] font-black mb-6"
            style={{ color: ACCENT }}
          >
            Start a Project
          </p>
          <h2
            className={`text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 italic leading-none transition-colors duration-500 ${textColor}`}
          >
            Let's <span style={{ color: ACCENT }}>Create</span>
          </h2>
          <p
            className={`text-sm md:text-base uppercase tracking-[0.3em] font-bold transition-colors duration-500 ${subTextColor}`}
          >
            Tell us about your vision — we'll take it from there
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-8">
            {/* Name */}
            <div className="group relative">
              <input
                type="text"
                placeholder="Full Name"
                className={`w-full bg-transparent border-b py-4 outline-none transition-all ${borderColor} ${placeholderColor} ${textColor} font-medium`}
              />
              <div
                className="absolute bottom-0 left-0 w-0 h-[1px] group-focus-within:w-full transition-all duration-500"
                style={{ background: ACCENT }}
              />
            </div>

            {/* Email */}
            <div className="group relative">
              <input
                type="email"
                placeholder="Email Address"
                className={`w-full bg-transparent border-b py-4 outline-none transition-all ${borderColor} ${placeholderColor} ${textColor} font-medium`}
              />
              <div
                className="absolute bottom-0 left-0 w-0 h-[1px] group-focus-within:w-full transition-all duration-500"
                style={{ background: ACCENT }}
              />
            </div>

            {/* Company */}
            <div className="group relative">
              <input
                type="text"
                placeholder="Company / Brand"
                className={`w-full bg-transparent border-b py-4 outline-none transition-all ${borderColor} ${placeholderColor} ${textColor} font-medium`}
              />
              <div
                className="absolute bottom-0 left-0 w-0 h-[1px] group-focus-within:w-full transition-all duration-500"
                style={{ background: ACCENT }}
              />
            </div>

            {/* Project type */}
            <div className="group relative">
              <select
                className={`w-full bg-transparent border-b py-4 outline-none transition-all ${borderColor} ${textColor} font-medium appearance-none cursor-pointer`}
                defaultValue="Project Type"
              >
                {PROJECT_TYPES.map((type, i) => (
                  <option
                    key={i}
                    value={type}
                    disabled={i === 0}
                    className={isDark ? 'bg-[#050505]' : 'bg-[#f4f5f5]'}
                  >
                    {type}
                  </option>
                ))}
              </select>
              <div
                className="absolute bottom-0 left-0 w-0 h-[1px] group-focus-within:w-full transition-all duration-500"
                style={{ background: ACCENT }}
              />
            </div>
          </div>

          {/* Textarea */}
          <div className="flex flex-col h-full">
            <div className="group relative flex-grow">
              <textarea
                placeholder="Describe your vision, goals, and timeline..."
                rows={8}
                className={`w-full h-full bg-transparent border-b py-4 outline-none transition-all ${borderColor} ${placeholderColor} ${textColor} font-medium resize-none`}
              />
              <div
                className="absolute bottom-0 left-0 w-0 h-[1px] group-focus-within:w-full transition-all duration-500"
                style={{ background: ACCENT }}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex flex-col items-center gap-6 mt-12">
            <button
              type="submit"
              className="group relative px-14 py-5 text-black font-black tracking-widest uppercase text-xs overflow-hidden rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg"
              style={{ background: ACCENT, boxShadow: `0 20px 60px rgba(255,107,53,0.25)` }}
            >
              <span className="relative z-10">Send Transmission</span>
              <span className="ml-3 inline-block group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </button>
            <p className={`text-[10px] font-bold uppercase tracking-widest ${subTextColor}`}>
              We respond within 24 hours
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactFormSection;
