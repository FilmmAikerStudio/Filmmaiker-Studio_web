
import React from 'react';

interface FooterProps {
  isDark: boolean;
}

const ACCENT = '#FF6B35';

const LINKS = {
  services: ['Advertising', 'Audiovisual Production', 'Generative AI', 'Branding'],
  company: ['Studio', 'Process', 'Portfolio', 'Contact'],
  social: [
    { label: 'YouTube', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Behance', href: '#' },
  ],
};

const Footer: React.FC<FooterProps> = ({ isDark }) => {
  const textColor = isDark ? 'text-white' : 'text-black';
  const subTextColor = isDark ? 'text-white/40' : 'text-black/50';

  return (
    <footer
      className={`transition-colors duration-700 border-t pt-24 pb-12 px-8 relative z-10 ${
        isDark ? 'bg-[#050505] border-white/5' : 'bg-[#f4f5f5] border-black/5'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-16 mb-20">
          {/* Brand */}
          <div>
            <div className={`text-4xl font-black tracking-tighter uppercase mb-6 transition-colors duration-500 ${textColor}`}>
              FILMM<span style={{ color: ACCENT }}>AI</span>KER
            </div>
            <p className={`max-w-xs text-sm leading-relaxed mb-8 transition-colors duration-500 ${subTextColor}`}>
              The nexus of human creativity and artificial intelligence. Crafting the next
              generation of visual storytelling from our decentralized studio.
            </p>
            <div className="flex gap-6">
              {LINKS.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${
                    isDark ? 'text-white/40 hover:text-[#FF6B35]' : 'text-black/40 hover:text-[#FF6B35]'
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p
              className="text-[9px] font-black uppercase tracking-[0.4em] mb-6"
              style={{ color: ACCENT }}
            >
              Services
            </p>
            <ul className="space-y-3">
              {LINKS.services.map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isDark
                        ? 'text-white/40 hover:text-white'
                        : 'text-black/40 hover:text-black'
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p
              className="text-[9px] font-black uppercase tracking-[0.4em] mb-6"
              style={{ color: ACCENT }}
            >
              Company
            </p>
            <ul className="space-y-3">
              {LINKS.company.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isDark
                        ? 'text-white/40 hover:text-white'
                        : 'text-black/40 hover:text-black'
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-[9px] font-black uppercase tracking-[0.4em] mb-6"
              style={{ color: ACCENT }}
            >
              Contact
            </p>
            <a
              href="mailto:info@filmmaikerstudio.com"
              className={`text-sm font-medium transition-colors duration-300 block mb-3 ${
                isDark ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'
              }`}
            >
              info@filmmaikerstudio.com
            </a>
            <p className={`text-sm font-medium ${subTextColor}`}>Remote / Decentralized</p>
            <a
              href="#contact"
              className="mt-8 inline-block text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
              style={{ background: ACCENT, color: '#000' }}
            >
              Start a Project
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className={`flex flex-col md:flex-row justify-between items-center pt-8 border-t gap-4 transition-colors duration-500 ${
            isDark ? 'border-white/5' : 'border-black/5'
          }`}
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDark ? 'text-white/20' : 'text-black/20'}`}>
            © 2025 FILMM<span style={{ color: ACCENT }}>AI</span>KER STUDIO. All rights reserved.
          </p>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-white/20' : 'text-black/20'}`}>
            Powered by Human + AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
