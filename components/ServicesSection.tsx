
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
      'Strategy-first campaigns powered by generative AI. From concept to multi-channel execution — narratives that convert and endure across every platform.',
    tags: ['Strategy', 'Campaigns', 'Performance', 'Social'],
    img: 'https://picsum.photos/seed/srv-adv/600/800',
  },
  {
    number: '02',
    title: 'Audiovisual',
    subtitle: 'Cinema-Grade Production',
    description:
      'Full-scale video production: commercials, brand films, documentary series. Human direction fused with AI-assisted pre-production and VFX.',
    tags: ['Brand Films', 'Commercials', 'Docs', 'VFX'],
    img: 'https://picsum.photos/seed/srv-av/600/800',
  },
  {
    number: '03',
    title: 'Generative AI',
    subtitle: 'AI-Driven Visuals',
    description:
      'Motion graphics, synthetic footage, AI voiceovers, 3D worlds. We orchestrate the full stack of generative tools into production-ready assets.',
    tags: ['Motion', 'Synthetic Video', '3D', 'AI Voice'],
    img: 'https://picsum.photos/seed/srv-ai/600/800',
  },
  {
    number: '04',
    title: 'Branding',
    subtitle: 'Visual Identity Systems',
    description:
      'Brand architecture that scales. Logo systems, typography, color, motion identities — designed to live coherently across every touchpoint.',
    tags: ['Identity', 'Typography', 'Motion Brand', 'Systems'],
    img: 'https://picsum.photos/seed/srv-brand/600/800',
  },
];

const ServicesSection: React.FC<ServicesSectionProps> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current!;

    // Header fade-in before pin
    gsap.from(headerRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headerRef.current,
        start: 'top 85%',
        once: true,
      },
    });

    // Horizontal scroll — pin the section, move the track
    const totalScroll = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: () => -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${totalScroll}`,
        invalidateOnRefresh: true,
      },
    });

    // Cards fade in once section enters view
    gsap.from(gsap.utils.toArray<HTMLElement>('.svc-card'), {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
      },
    });
  }, { scope: containerRef });

  const bg   = isDark ? 'bg-[#050505]' : 'bg-[#f4f5f5]';
  const tc   = isDark ? 'text-white' : 'text-black';
  const subc = isDark ? 'text-white/40' : 'text-black/50';
  const cardBg = isDark ? 'bg-[#0d0d0d] border-white/5' : 'bg-white border-black/5';

  return (
    <section
      id="services"
      ref={containerRef}
      className={`relative h-screen overflow-hidden ${bg}`}
    >
      <div className="h-full flex flex-col px-8 md:px-16">
        {/* Section header (fixed at top while pinned) */}
        <div
          ref={headerRef}
          className="flex items-end justify-between pt-28 pb-10 flex-shrink-0"
        >
          <div>
            <p
              className="uppercase tracking-[0.5em] text-[10px] font-black mb-3"
              style={{ color: ACCENT }}
            >
              What We Do
            </p>
            <h2 className={`text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none ${tc}`}>
              Our Services.
            </h2>
          </div>
          <p className={`hidden md:block max-w-xs text-sm leading-relaxed font-medium ${subc}`}>
            Drag or scroll to explore — four disciplines, one integrated creative engine.
          </p>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex gap-5 items-stretch flex-nowrap flex-1 pb-12"
          style={{ width: 'max-content' }}
        >
          {services.map((svc, i) => (
            <div
              key={i}
              className={`svc-card relative flex-shrink-0 w-[85vw] md:w-[520px] rounded-3xl border overflow-hidden flex flex-col cursor-crosshair group transition-all duration-500 ${cardBg} hover:border-[#FF6B35]/25`}
            >
              {/* Image */}
              <div className="h-64 overflow-hidden flex-shrink-0">
                <img
                  src={svc.img}
                  alt={svc.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-10">
                <div className="flex items-start justify-between mb-6">
                  <span className="font-black text-[10px] tracking-[0.4em]" style={{ color: ACCENT }}>
                    {svc.number}
                  </span>
                  <span className={`text-[9px] font-bold uppercase tracking-widest ${subc}`}>
                    {svc.subtitle}
                  </span>
                </div>

                <h3 className={`text-3xl font-black uppercase tracking-tighter mb-4 group-hover:translate-x-1.5 transition-transform duration-300 ${tc}`}>
                  {svc.title}
                </h3>

                <p className={`text-sm leading-relaxed font-medium mb-8 flex-1 ${subc}`}>
                  {svc.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {svc.tags.map((tag, j) => (
                    <span
                      key={j}
                      className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border transition-colors duration-300 ${
                        isDark
                          ? 'border-white/10 text-white/40 group-hover:border-[#FF6B35]/40 group-hover:text-[#FF6B35]'
                          : 'border-black/10 text-black/40 group-hover:border-[#FF6B35]/40 group-hover:text-[#FF6B35]'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* End card — CTA */}
          <div className="flex-shrink-0 w-[60vw] md:w-72 flex flex-col items-center justify-center gap-8 px-8">
            <p className={`text-center text-2xl font-black tracking-tight uppercase ${tc}`}>
              Ready to start your project?
            </p>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] text-black transition-all hover:scale-105"
              style={{ background: ACCENT }}
              data-cursor-label="Let's talk"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
