
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface StudioSectionProps {
  isDark: boolean;
}

const ACCENT = '#FF6B35';

const team = [
  { name: 'Alexandra V.', role: 'Creative Director',     specialty: 'Brand Narrative',   image: 'https://picsum.photos/seed/fms-team1/500/500' },
  { name: 'Marcos T.',    role: 'AI Pipeline Lead',       specialty: 'Generative Systems', image: 'https://picsum.photos/seed/fms-team2/500/500' },
  { name: 'Sofia R.',     role: 'Dir. of Photography',    specialty: 'Cinematic Vision',   image: 'https://picsum.photos/seed/fms-team3/500/500' },
  { name: 'Kai L.',       role: 'Motion Designer',        specialty: 'Brand Motion',       image: 'https://picsum.photos/seed/fms-team4/500/500' },
];

const stats = [
  { value: '130%+', label: 'Avg. Project Growth' },
  { value: '$8M+',  label: 'Revenue Generated'   },
  { value: '24',    label: 'AI Models Deployed'  },
  { value: '12',    label: 'Creative Awards'      },
];

const StudioSection: React.FC<StudioSectionProps> = ({ isDark }) => {
  const sectionRef   = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const teamRef      = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Manifesto — letter-by-letter scrub
    gsap.from('.manifesto-text', {
      opacity: 0,
      y: 30,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: manifestoRef.current,
        start: 'top 75%',
        once: true,
      },
    });

    // Manifesto border line draws in
    gsap.from('.manifesto-border', {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: manifestoRef.current,
        start: 'top 75%',
        once: true,
      },
    });

    // Stats count-up feel — stagger in
    gsap.from(gsap.utils.toArray('.stat-item'), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: statsRef.current,
        start: 'top 80%',
        once: true,
      },
    });

    // Team cards — slide up stagger
    gsap.from(gsap.utils.toArray('.team-card'), {
      y: 60,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: teamRef.current,
        start: 'top 80%',
        once: true,
      },
    });
  }, { scope: sectionRef });

  const bg   = isDark ? 'bg-[#080808]' : 'bg-[#ececec]';
  const tc   = isDark ? 'text-white' : 'text-black';
  const subc = isDark ? 'text-white/40' : 'text-black/50';
  const divC = isDark ? 'border-white/5' : 'border-black/8';

  return (
    <section
      id="studio"
      ref={sectionRef}
      className={`py-40 px-8 relative overflow-hidden transition-colors duration-700 ${bg}`}
    >
      {/* Glow */}
      <div
        className="absolute top-0 left-0 w-[700px] h-[700px] blur-[200px] rounded-full -translate-x-1/2 -translate-y-1/3 pointer-events-none"
        style={{ background: isDark ? 'rgba(255,107,53,0.06)' : 'rgba(255,107,53,0.1)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-24">
          <p className="uppercase tracking-[0.5em] text-[10px] font-black mb-6" style={{ color: ACCENT }}>
            Who We Are
          </p>
          <h2 className={`text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] ${tc}`}>
            The Studio.
          </h2>
        </div>

        {/* Manifesto */}
        <div ref={manifestoRef} className="mb-32 flex gap-12">
          <div
            className="manifesto-border w-1 flex-shrink-0 rounded-full"
            style={{ background: ACCENT }}
          />
          <div className="py-2">
            <p
              className={`manifesto-text text-2xl md:text-4xl lg:text-5xl font-black leading-[1.12] tracking-tight max-w-5xl ${tc}`}
            >
              "We believe the future of storytelling belongs to those who dare to merge
              the precision of machines with the soul of human creativity. FilmmAiker Studio
              is that fusion — built for brands that refuse to be invisible."
            </p>
            <p className={`mt-8 text-sm font-bold uppercase tracking-widest ${isDark ? 'text-white/30' : 'text-black/30'}`}>
              — FilmmAiker Studio Manifesto, 2025
            </p>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 py-16 border-y ${divC}`}
        >
          {stats.map((stat, i) => (
            <div key={i} className="stat-item">
              <div className={`text-4xl md:text-5xl font-black mb-2 ${tc}`}>{stat.value}</div>
              <div className={`text-[10px] uppercase tracking-widest font-bold ${subc}`}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team */}
        <h3 className={`text-3xl md:text-5xl font-black tracking-tighter uppercase mb-16 ${tc}`}>
          The Team.
        </h3>

        <div ref={teamRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div
              key={i}
              className="team-card group cursor-crosshair"
              data-cursor-label={member.role}
            >
              <div className="aspect-square overflow-hidden rounded-2xl mb-5 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5"
                  style={{ background: 'linear-gradient(to top, rgba(255,107,53,0.5), transparent)' }}
                />
              </div>
              <h4 className={`font-black tracking-tight text-lg mb-1 ${tc}`}>{member.name}</h4>
              <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: ACCENT }}>
                {member.role}
              </p>
              <p className={`text-[10px] uppercase tracking-wider font-bold ${subc}`}>
                {member.specialty}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioSection;
