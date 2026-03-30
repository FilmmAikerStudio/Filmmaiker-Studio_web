
import React from 'react';
import { motion } from 'framer-motion';

interface ServicesSectionProps {
  isDark: boolean;
}

const ACCENT = '#FF6B35';

const services = [
  {
    number: '01',
    title: 'Advertising',
    subtitle: 'Integrated Campaigns',
    description:
      'Strategy-first campaigns powered by generative AI. From concept to multi-channel execution — we build narratives that convert and endure across every platform.',
    tags: ['Strategy', 'Campaigns', 'Performance', 'Social'],
  },
  {
    number: '02',
    title: 'Audiovisual Production',
    subtitle: 'Cinema-Grade Content',
    description:
      'Full-scale video production: commercials, brand films, documentary series. Human direction fused with AI-assisted pre-production, VFX, and post.',
    tags: ['Brand Films', 'Commercials', 'Docs', 'VFX'],
  },
  {
    number: '03',
    title: 'Generative AI',
    subtitle: 'AI-Driven Visuals',
    description:
      'Motion graphics, synthetic footage, AI voiceovers, 3D worlds. We orchestrate the full stack of generative tools into production-ready assets.',
    tags: ['Motion', 'Synthetic Video', '3D', 'AI Voice'],
  },
  {
    number: '04',
    title: 'Branding',
    subtitle: 'Visual Identity Systems',
    description:
      'Brand architecture that scales. Logo systems, typography, color, motion identities — designed to live coherently across every touchpoint.',
    tags: ['Identity', 'Typography', 'Motion Brand', 'Systems'],
  },
];

const ServicesSection: React.FC<ServicesSectionProps> = ({ isDark }) => {
  return (
    <section
      id="services"
      className={`py-40 px-8 relative transition-colors duration-700 ${
        isDark ? 'bg-[#050505]' : 'bg-[#f4f5f5]'
      }`}
    >
      {/* Accent blob */}
      <div
        className="absolute bottom-0 right-0 w-[700px] h-[700px] blur-[200px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none"
        style={{ background: isDark ? 'rgba(255,107,53,0.07)' : 'rgba(255,107,53,0.1)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ color: ACCENT }}
              className="uppercase tracking-[0.5em] text-[10px] font-black mb-6"
            >
              What We Do
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              Our <br />
              Services.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className={`max-w-xs text-sm leading-relaxed font-medium transition-colors duration-500 ${
              isDark ? 'text-white/40' : 'text-black/50'
            }`}
          >
            Four disciplines. One integrated engine. We craft visual universes where human
            creativity and artificial intelligence converge.
          </motion.p>
        </div>

        {/* Services list */}
        <div
          className={`divide-y transition-colors duration-500 ${
            isDark ? 'divide-white/5' : 'divide-black/5'
          }`}
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`group py-12 grid grid-cols-1 md:grid-cols-[80px_1fr_1fr_auto] gap-8 items-center cursor-crosshair transition-all duration-300 -mx-4 px-4 rounded-xl ${
                isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-black/[0.02]'
              }`}
            >
              {/* Number */}
              <div
                className="font-black text-[10px] tracking-[0.4em]"
                style={{ color: ACCENT }}
              >
                {service.number}
              </div>

              {/* Title */}
              <div>
                <h3
                  className={`text-2xl md:text-4xl font-black uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-300 ${
                    isDark ? 'text-white' : 'text-black'
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${
                    isDark ? 'text-white/30' : 'text-black/30'
                  }`}
                >
                  {service.subtitle}
                </p>
              </div>

              {/* Description */}
              <p
                className={`text-sm leading-relaxed font-medium hidden md:block transition-colors duration-500 ${
                  isDark ? 'text-white/40' : 'text-black/50'
                }`}
              >
                {service.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                {service.tags.map((tag, j) => (
                  <span
                    key={j}
                    className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border transition-all duration-300 ${
                      isDark
                        ? 'border-white/10 text-white/40 group-hover:border-[#FF6B35]/40 group-hover:text-[#FF6B35]'
                        : 'border-black/10 text-black/40 group-hover:border-[#FF6B35]/40 group-hover:text-[#FF6B35]'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
