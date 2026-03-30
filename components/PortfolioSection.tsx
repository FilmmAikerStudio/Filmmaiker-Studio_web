
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PortfolioSectionProps {
  isDark: boolean;
}

const ACCENT = '#FF6B35';

const projects = [
  {
    id: 1,
    title: 'Nexus Brand Film',
    category: 'Production',
    client: 'TechCorp Global',
    year: '2025',
    image: 'https://picsum.photos/seed/filmm-p1/900/600',
    tags: ['Brand Film', 'AI VFX'],
    featured: true,
  },
  {
    id: 2,
    title: 'Synth Campaign',
    category: 'Advertising',
    client: 'Luxe Co.',
    year: '2025',
    image: 'https://picsum.photos/seed/filmm-p2/900/600',
    tags: ['Campaign', 'Social'],
    featured: false,
  },
  {
    id: 3,
    title: 'Aurora Identity',
    category: 'Branding',
    client: 'Aurora Startup',
    year: '2024',
    image: 'https://picsum.photos/seed/filmm-p3/900/600',
    tags: ['Identity', 'Motion Brand'],
    featured: false,
  },
  {
    id: 4,
    title: 'Phantom Worlds',
    category: 'AI Content',
    client: 'StreamNet',
    year: '2025',
    image: 'https://picsum.photos/seed/filmm-p4/900/600',
    tags: ['Synthetic Video', '3D'],
    featured: true,
  },
  {
    id: 5,
    title: 'Orbit Launch',
    category: 'Advertising',
    client: 'SpaceTech',
    year: '2025',
    image: 'https://picsum.photos/seed/filmm-p5/900/600',
    tags: ['Campaign', 'Video'],
    featured: false,
  },
  {
    id: 6,
    title: 'Meridian Doc',
    category: 'Production',
    client: 'NGO Global',
    year: '2024',
    image: 'https://picsum.photos/seed/filmm-p6/900/600',
    tags: ['Documentary', 'Story'],
    featured: false,
  },
];

const CATEGORIES = ['All', 'Advertising', 'Production', 'AI Content', 'Branding'];

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ isDark }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="portfolio"
      className={`py-40 px-8 transition-colors duration-700 ${
        isDark ? 'bg-[#050505]' : 'bg-[#f4f5f5]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ color: ACCENT }}
              className="uppercase tracking-[0.5em] text-[10px] font-black mb-6"
            >
              Selected Work
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
              Portfolio.
            </motion.h2>
          </div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full border transition-all duration-300 ${
                  activeFilter === cat
                    ? 'text-black border-transparent'
                    : isDark
                    ? 'border-white/10 text-white/50 hover:border-[#FF6B35]/40 hover:text-[#FF6B35]'
                    : 'border-black/10 text-black/50 hover:border-[#FF6B35]/40 hover:text-[#FF6B35]'
                }`}
                style={activeFilter === cat ? { background: ACCENT, borderColor: ACCENT } : {}}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35 }}
                className="group relative overflow-hidden rounded-2xl cursor-crosshair"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  {/* Gradient overlay — always visible at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Hover overlay (extra info) */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-7">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="text-[9px] bg-white/10 backdrop-blur-sm text-white/70 px-2.5 py-1 rounded-full uppercase tracking-wider font-bold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p
                      className="text-[10px] font-black uppercase tracking-widest mb-2"
                      style={{ color: ACCENT }}
                    >
                      {project.category} — {project.year}
                    </p>
                    <h3 className="text-white text-2xl font-black tracking-tighter leading-none">
                      {project.title}
                    </h3>
                    <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-2">
                      {project.client}
                    </p>
                  </div>

                  {/* Resting state info (bottom of image) */}
                  <div className="absolute bottom-0 inset-x-0 p-6 group-hover:opacity-0 transition-opacity duration-300">
                    <p
                      className="text-[10px] font-black uppercase tracking-widest mb-1"
                      style={{ color: ACCENT }}
                    >
                      {project.category}
                    </p>
                    <h3 className="text-white text-xl font-black tracking-tight leading-none">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <button
            className={`px-12 py-5 rounded-full font-black tracking-[0.2em] uppercase text-xs border transition-all duration-300 hover:scale-105 active:scale-95 ${
              isDark
                ? 'border-white/10 text-white/60 hover:border-[#FF6B35] hover:text-[#FF6B35]'
                : 'border-black/10 text-black/50 hover:border-[#FF6B35] hover:text-[#FF6B35]'
            }`}
          >
            View All Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
