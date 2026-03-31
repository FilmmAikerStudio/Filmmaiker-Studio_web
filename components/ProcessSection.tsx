
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ProcessSectionProps {
  isDark: boolean;
}

const ACCENT = '#FF6B35';

const steps = [
  {
    number: '01',
    phase: 'Brief',
    title: 'Discovery & Brief',
    description:
      'We dive deep into your brand, audience, and objectives. Every successful campaign starts with radical clarity — no templates, no shortcuts.',
    timeframe: '2–3 days',
  },
  {
    number: '02',
    phase: 'AI Strategy',
    title: 'AI Pipeline Design',
    description:
      'We architect the custom AI workflow for your project — selecting models, training on your brand language, and mapping the generation pipeline end-to-end.',
    timeframe: '3–5 days',
  },
  {
    number: '03',
    phase: 'Production',
    title: 'Creation & Production',
    description:
      'Cameras roll, models generate, artists refine. Our hybrid teams merge physical production with synthetic media in a seamless creative flow.',
    timeframe: '1–4 weeks',
  },
  {
    number: '04',
    phase: 'Delivery',
    title: 'Post & Delivery',
    description:
      'Color grading, sound design, final cut. We deliver production-ready assets in every format your campaign requires — from Reels to IMAX.',
    timeframe: '3–7 days',
  },
];

const ProcessSection: React.FC<ProcessSectionProps> = ({ isDark }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header reveal
    gsap.from(headRef.current!.children, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headRef.current,
        start: 'top 80%',
        once: true,
      },
    });

    // Steps — staggered slide-in
    gsap.utils.toArray<HTMLElement>('.proc-step').forEach((step, i) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: 'top 82%',
          once: true,
        },
      });

      tl.from(step.querySelector('.proc-num'), {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(2)',
      })
      .from(step.querySelector('.proc-body'), {
        x: -30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.3')
      .from(step.querySelector('.proc-time'), {
        opacity: 0,
        duration: 0.4,
      }, '-=0.3');
    });

    // Progress line animates down on scrub
    gsap.to('.proc-line-fill', {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'bottom 70%',
        scrub: 1,
      },
    });
  }, { scope: sectionRef });

  const bg   = isDark ? 'bg-[#0a0a0a]' : 'bg-[#efefef]';
  const tc   = isDark ? 'text-white' : 'text-black';
  const subc = isDark ? 'text-white/40' : 'text-black/50';
  const divC = isDark ? 'border-white/5' : 'border-black/5';

  return (
    <section
      id="process"
      ref={sectionRef}
      className={`py-40 px-8 relative overflow-hidden transition-colors duration-700 ${bg}`}
    >
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] blur-[220px] rounded-full pointer-events-none"
        style={{ background: isDark ? 'rgba(255,107,53,0.05)' : 'rgba(255,107,53,0.08)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headRef} className="mb-24">
          <p className="uppercase tracking-[0.5em] text-[10px] font-black mb-6" style={{ color: ACCENT }}>
            How We Work
          </p>
          <h2 className={`text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] ${tc}`}>
            The <br />Process.
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector */}
          <div className={`absolute left-[39px] top-0 bottom-0 w-px hidden md:block ${isDark ? 'bg-white/5' : 'bg-black/8'}`}>
            <div
              className="proc-line-fill absolute inset-x-0 top-0 h-full origin-top"
              style={{ background: `linear-gradient(to bottom, ${ACCENT}, transparent)`, transform: 'scaleY(0)' }}
            />
          </div>

          {steps.map((step, i) => (
            <div
              key={i}
              className={`proc-step group relative grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-8 md:gap-16 py-16 border-b -mx-4 px-4 rounded-xl transition-all duration-300 ${divC} ${
                isDark ? 'hover:bg-white/[0.015]' : 'hover:bg-black/[0.015]'
              }`}
            >
              {/* Circle indicator */}
              <div className="proc-num flex items-start justify-center md:justify-center pt-1">
                <div
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                >
                  <span className="font-black text-[10px]" style={{ color: ACCENT }}>
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="proc-body">
                <p
                  className={`text-[10px] font-black uppercase tracking-[0.4em] mb-3 group-hover:text-[#FF6B35] transition-colors ${subc}`}
                >
                  {step.phase}
                </p>
                <h3 className={`text-2xl md:text-4xl font-black uppercase tracking-tighter mb-5 group-hover:translate-x-1 transition-transform duration-300 ${tc}`}>
                  {step.title}
                </h3>
                <p className={`max-w-2xl text-sm md:text-base leading-relaxed font-medium ${subc}`}>
                  {step.description}
                </p>
              </div>

              {/* Timeframe */}
              <div className="proc-time hidden md:flex items-start pt-14">
                <div className="text-right">
                  <p className={`text-[9px] uppercase tracking-[0.3em] font-black mb-1 ${isDark ? 'text-white/20' : 'text-black/20'}`}>
                    Timeframe
                  </p>
                  <p className={`text-sm font-bold ${subc}`}>{step.timeframe}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className={`text-sm font-medium ${subc}`}>
            Average end-to-end turnaround:{' '}
            <span className={isDark ? 'text-white/60' : 'text-black/60'}>3–6 weeks</span>
          </p>
          <a
            href="#contact"
            className="px-10 py-4 rounded-full font-black tracking-[0.2em] uppercase text-xs text-black transition-all hover:scale-105 active:scale-95"
            style={{ background: ACCENT, boxShadow: `0 16px 48px rgba(255,107,53,0.3)` }}
            data-cursor-label="Start"
          >
            Start Your Project →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
