
import React from 'react';
import { motion } from 'framer-motion';

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
      'We dive deep into your brand, audience, and objectives. Every successful campaign starts with radical clarity about the problem we are solving — no templates, no shortcuts.',
    timeframe: '2–3 days',
  },
  {
    number: '02',
    phase: 'AI Strategy',
    title: 'AI Pipeline Design',
    description:
      'We architect the custom AI workflow for your project — selecting models, training on your brand language, building prompt libraries, and mapping the generation pipeline end-to-end.',
    timeframe: '3–5 days',
  },
  {
    number: '03',
    phase: 'Production',
    title: 'Creation & Production',
    description:
      'Cameras roll, models generate, artists refine. Our hybrid teams merge physical production with synthetic media in a seamless creative flow designed for maximum fidelity.',
    timeframe: '1–4 weeks',
  },
  {
    number: '04',
    phase: 'Delivery',
    title: 'Post & Delivery',
    description:
      'Color grading, sound design, final cut. We deliver production-ready assets in every format your campaign requires — from Instagram Reels to full broadcast and IMAX.',
    timeframe: '3–7 days',
  },
];

const ProcessSection: React.FC<ProcessSectionProps> = ({ isDark }) => {
  return (
    <section
      id="process"
      className={`py-40 px-8 relative overflow-hidden transition-colors duration-700 ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-[#efefef]'
      }`}
    >
      {/* Central glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] blur-[220px] rounded-full pointer-events-none"
        style={{ background: isDark ? 'rgba(255,107,53,0.05)' : 'rgba(255,107,53,0.08)' }}
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
            How We Work
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
            The <br />
            Process.
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line */}
          <div
            className={`absolute left-[39px] top-0 bottom-0 w-[1px] hidden md:block transition-colors duration-500 ${
              isDark ? 'bg-white/5' : 'bg-black/8'
            }`}
          />

          <div>
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`group relative grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-8 md:gap-16 py-16 border-b transition-all duration-300 -mx-4 px-4 rounded-xl ${
                  isDark
                    ? 'border-white/5 hover:bg-white/[0.015]'
                    : 'border-black/5 hover:bg-black/[0.015]'
                }`}
              >
                {/* Step indicator */}
                <div className="flex flex-col items-center pt-1">
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                      isDark ? 'border-white/10 bg-[#0a0a0a]' : 'border-black/10 bg-[#efefef]'
                    }`}
                    style={{
                      borderColor: undefined,
                    }}
                  >
                    <span
                      className="font-black text-[10px]"
                      style={{ color: ACCENT }}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <p
                    className={`text-[10px] font-black uppercase tracking-[0.4em] mb-3 transition-colors duration-300 group-hover:text-[#FF6B35] ${
                      isDark ? 'text-white/30' : 'text-black/30'
                    }`}
                  >
                    {step.phase}
                  </p>
                  <h3
                    className={`text-2xl md:text-4xl font-black uppercase tracking-tighter mb-5 group-hover:translate-x-1 transition-transform duration-300 ${
                      isDark ? 'text-white' : 'text-black'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`max-w-2xl text-sm md:text-base leading-relaxed font-medium transition-colors duration-500 ${
                      isDark ? 'text-white/40' : 'text-black/50'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Timeframe */}
                <div className="hidden md:flex items-start pt-14">
                  <div className="text-right">
                    <p
                      className={`text-[9px] uppercase tracking-[0.3em] font-black mb-1 ${
                        isDark ? 'text-white/20' : 'text-black/20'
                      }`}
                    >
                      Timeframe
                    </p>
                    <p
                      className={`text-sm font-bold transition-colors duration-500 ${
                        isDark ? 'text-white/40' : 'text-black/50'
                      }`}
                    >
                      {step.timeframe}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <p
            className={`text-sm font-medium transition-colors duration-500 ${
              isDark ? 'text-white/30' : 'text-black/30'
            }`}
          >
            Average end-to-end turnaround: <span className={isDark ? 'text-white/60' : 'text-black/60'}>3–6 weeks</span>
          </p>
          <a
            href="#contact"
            className="group relative px-10 py-4 rounded-full font-black tracking-[0.2em] uppercase text-xs overflow-hidden transition-all hover:scale-105 active:scale-95"
            style={{ background: ACCENT, color: '#000' }}
          >
            Start Your Project
            <span className="ml-3 inline-block group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
