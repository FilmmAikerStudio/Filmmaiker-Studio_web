'use client';

import { useState } from 'react';
import { FOOTER_LINKS } from '../../constants';
import { useContactStore, useScrollStore, useThemeStore, useVideoStore } from '../../stores';

type MenuStyle = { from: string; to: string };

const GRADIENTS: Record<string, MenuStyle> = {
  LinkedIn: { from: '#56CCF2', to: '#2F80ED' },
  Portfolio: { from: '#a955ff', to: '#ea51ff' },
  Contacto: { from: '#FF9966', to: '#FF5E62' },
};

const GradientMenu = () => {
  const setContactOpen = useContactStore((state) => state.setContactOpen);
  const setVideoOpen = useVideoStore((state) => state.setVideoOpen);
  const scrollProgress = useScrollStore((state) => state.scrollProgress);
  const theme = useThemeStore((state) => state.theme);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const visible = scrollProgress > 0.96;
  const isDark = theme.type === 'dark';

  const handleClick = (name: string, url: string) => {
    if (name === 'Contacto') setContactOpen(true);
    else if (name === 'Portfolio') setVideoOpen(true);
    else window.open(url, '_blank');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 72,
        left: 0,
        right: 0,
        zIndex: 6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: visible ? 'auto' : 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      <ul
        style={{
          display: 'flex',
          gap: 24,
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {FOOTER_LINKS.map((link, idx) => {
          const gradient = GRADIENTS[link.name] ?? { from: '#a955ff', to: '#ea51ff' };
          const isHovered = hoveredIdx === idx;
          return (
            <li
              key={link.name}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => handleClick(link.name, link.url)}
              style={{
                position: 'relative',
                width: isHovered ? 180 : 60,
                height: 60,
                background: isDark ? '#1a1a1a' : '#ffffff',
                boxShadow: isHovered ? 'none' : '0 6px 20px rgba(0,0,0,0.25)',
                borderRadius: 999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'width 0.5s ease, box-shadow 0.5s ease',
                cursor: 'pointer',
                overflow: 'visible',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 999,
                  background: `linear-gradient(45deg, ${gradient.from}, ${gradient.to})`,
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 0,
                  right: 0,
                  height: '100%',
                  borderRadius: 999,
                  background: `linear-gradient(45deg, ${gradient.from}, ${gradient.to})`,
                  filter: 'blur(15px)',
                  opacity: isHovered ? 0.5 : 0,
                  zIndex: -1,
                  transition: 'opacity 0.5s ease',
                }}
              />
              <span
                style={{
                  position: 'relative',
                  zIndex: 2,
                  transform: isHovered ? 'scale(0)' : 'scale(1)',
                  transition: 'transform 0.4s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/${link.icon}`}
                  alt={link.name}
                  style={{
                    width: 24,
                    height: 24,
                    filter: isDark ? 'invert(0.85)' : 'invert(0.35)',
                  }}
                />
              </span>
              <span
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontSize: 13,
                  fontFamily: 'var(--font-vercetti), sans-serif',
                  transform: isHovered ? 'scale(1)' : 'scale(0)',
                  transition: 'transform 0.5s ease 0.15s',
                  whiteSpace: 'nowrap',
                }}
              >
                {link.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GradientMenu;
