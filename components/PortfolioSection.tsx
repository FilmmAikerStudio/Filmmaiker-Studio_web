
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface PortfolioSectionProps {
  isDark: boolean;
}

const ACCENT = '#FF6B35';

const projects = [
  { id: 1, title: 'Nexus Brand Film',   category: 'Production',  client: 'TechCorp Global', year: '2025', image: 'https://picsum.photos/seed/filmm-p1/900/600', tags: ['Brand Film', 'AI VFX'] },
  { id: 2, title: 'Synth Campaign',      category: 'Advertising', client: 'Luxe Co.',        year: '2025', image: 'https://picsum.photos/seed/filmm-p2/900/600', tags: ['Campaign', 'Social'] },
  { id: 3, title: 'Aurora Identity',     category: 'Branding',    client: 'Aurora Startup',  year: '2024', image: 'https://picsum.photos/seed/filmm-p3/900/600', tags: ['Identity', 'Motion Brand'] },
  { id: 4, title: 'Phantom Worlds',      category: 'AI Content',  client: 'StreamNet',       year: '2025', image: 'https://picsum.photos/seed/filmm-p4/900/600', tags: ['Synthetic Video', '3D'] },
  { id: 5, title: 'Orbit Launch',        category: 'Advertising', client: 'SpaceTech',       year: '2025', image: 'https://picsum.photos/seed/filmm-p5/900/600', tags: ['Campaign', 'Video'] },
  { id: 6, title: 'Meridian Doc',        category: 'Production',  client: 'NGO Global',      year: '2024', image: 'https://picsum.photos/seed/filmm-p6/900/600', tags: ['Documentary', 'Story'] },
];

const CATEGORIES = ['All', 'Advertising', 'Production', 'AI Content', 'Branding'];

/* 3D tilt card on hover */
const TiltCard: React.FC<{ project: typeof projects[0]; isDark: boolean }> = ({ project, isDark }) => {
  const cardRef = useRef<HTMLElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current!;
    const rect  = card.getBoundingClientRect();
    const rx = ((e.clientY - rect.top)  / rect.height - 0.5) * 18;
    const ry = ((e.clientX - rect.left) / rect.width  - 0.5) * -18;
    gsap.to(card, {
      rotateX: rx,
      rotateY: ry,
      scale: 1.03,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 900,
    });
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  return (
    <motion.article
      ref={cardRef as React.RefObject<HTMLElement>}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative overflow-hidden rounded-2xl cursor-crosshair"
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      data-cursor-label="View"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />

        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-7">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, j) => (
              <span key={j} className="text-[9px] bg-white/10 backdrop-blur-sm text-white/75 px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: ACCENT }}>
            {project.category} — {project.year}
          </p>
          <h3 className="text-white text-2xl font-black tracking-tighter leading-none">{project.title}</h3>
          <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-2">{project.client}</p>
        </div>

        {/* Resting label */}
        <div className="absolute bottom-0 inset-x-0 p-6 group-hover:opacity-0 transition-opacity duration-300">
          <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: ACCENT }}>
            {project.category}
          </p>
          <h3 className="text-white text-xl font-black tracking-tight leading-none">{project.title}</h3>
        </div>
      </div>
    </motion.article>
  );
};

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ isDark }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(headRef.current!.children, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headRef.current,
        start: 'top 82%',
        once: true,
      },
    });
  }, { scope: sectionRef });

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const tc = isDark ? 'text-white' : 'text-black';

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className={`py-40 px-8 transition-colors duration-700 ${isDark ? 'bg-[#050505]' : 'bg-[#f4f5f5]'}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-10">
          <div>
            <p className="uppercase tracking-[0.5em] text-[10px] font-black mb-6" style={{ color: ACCENT }}>
              Selected Work
            </p>
            <h2 className={`text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] ${tc}`}>
              Portfolio.
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full border transition-all duration-300"
                style={
                  activeFilter === cat
                    ? { background: ACCENT, borderColor: ACCENT, color: '#000' }
                    : {
                        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                        color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                      }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid with tilt cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <TiltCard key={project.id} project={project} isDark={isDark} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-20">
          <button
            className={`px-12 py-5 rounded-full font-black tracking-[0.2em] uppercase text-xs border transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'border-white/10 text-white/60 hover:border-[#FF6B35] hover:text-[#FF6B35]'
                : 'border-black/10 text-black/50 hover:border-[#FF6B35] hover:text-[#FF6B35]'
            }`}
            data-cursor-label="All"
          >
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
