
import React from 'react';
import { motion } from 'framer-motion';

interface StudioSectionProps {
  isDark: boolean;
}

const ACCENT = '#FF6B35';

const team = [
  {
    name: 'Alexandra V.',
    role: 'Creative Director',
    specialty: 'Brand Narrative',
    image: 'https://picsum.photos/seed/fms-team1/500/500',
  },
  {
    name: 'Marcos T.',
    role: 'AI Pipeline Lead',
    specialty: 'Generative Systems',
    image: 'https://picsum.photos/seed/fms-team2/500/500',
  },
  {
    name: 'Sofia R.',
    role: 'Dir. of Photography',
    specialty: 'Cinematic Vision',
    image: 'https://picsum.photos/seed/fms-team3/500/500',
  },
  {
    name: 'Kai L.',
    role: 'Motion Designer',
    specialty: 'Brand Motion',
    image: 'https://picsum.photos/seed/fms-team4/500/500',
  },
];

const stats = [
  { value: '130%+', label: 'Avg. Project Growth' },
  { value: '$8M+', label: 'Revenue Generated' },
  { value: '24', label: 'AI Models Deployed' },
  { value: '12', label: 'Creative Awards' },
];

const StudioSection: React.FC<StudioSectionProps> = ({ isDark }) => {
  return (
    <section
      id="studio"
      className={`py-40 px-8 relative overflow-hidden transition-colors duration-700 ${
        isDark ? 'bg-[#080808]' : 'bg-[#ececec]'
      }`}
    >
      {/* Accent glow */}
      <div
        className="absolute top-0 left-0 w-[700px] h-[700px] blur-[200px] rounded-full -translate-x-1/2 -translate-y-1/3 pointer-events-none"
        style={{ background: isDark ? 'rgba(255,107,53,0.06)' : 'rgba(255,107,53,0.1)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ color: ACCENT }}
            className="uppercase tracking-[0.5em] text-[10px] font-black mb-6"
          >
            Who We Are
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
            The Studio.
          </motion.h2>
        </div>

        {/* Manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 pl-12 py-4 border-l-4"
          style={{ borderColor: ACCENT }}
        >
          <p
            className={`text-2xl md:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight max-w-5xl transition-colors duration-500 ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            "We believe the future of storytelling belongs to those who dare to merge the
            precision of machines with the soul of human creativity. FilmmAiker Studio is that
            fusion — built for brands that refuse to be invisible."
          </p>
          <p
            className={`mt-8 text-sm font-bold uppercase tracking-widest transition-colors duration-500 ${
              isDark ? 'text-white/30' : 'text-black/30'
            }`}
          >
            — FilmmAiker Studio Manifesto, 2025
          </p>
        </motion.div>

        {/* Stats bar */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 py-16 border-y transition-colors duration-500 ${
            isDark ? 'border-white/5' : 'border-black/8'
          }`}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className={`text-4xl md:text-5xl font-black mb-2 transition-colors duration-500 ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                {stat.value}
              </div>
              <div
                className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-500 ${
                  isDark ? 'text-white/30' : 'text-black/40'
                }`}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-3xl md:text-5xl font-black tracking-tighter uppercase mb-16 transition-colors duration-500 ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          The Team.
        </motion.h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="aspect-square overflow-hidden rounded-2xl mb-5">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <h4
                className={`font-black tracking-tight text-lg mb-1 transition-colors duration-500 ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                {member.name}
              </h4>
              <p
                className="text-[10px] font-black uppercase tracking-widest mb-1"
                style={{ color: ACCENT }}
              >
                {member.role}
              </p>
              <p
                className={`text-[10px] uppercase tracking-wider font-bold transition-colors duration-500 ${
                  isDark ? 'text-white/30' : 'text-black/40'
                }`}
              >
                {member.specialty}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioSection;
