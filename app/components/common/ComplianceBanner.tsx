'use client';

import { useState } from 'react';
import { useThemeStore, useScrollStore } from '../../stores';

const LOGO_HEIGHT = 20;
const LOGO_HEIGHT_HOVER = 42;

const ComplianceBanner = () => {
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme.type === 'dark';
  const scrollProgress = useScrollStore((state) => state.scrollProgress);
  const visible = scrollProgress > 0.96;
  const [hovered, setHovered] = useState(false);
  const logoHeight = hovered ? LOGO_HEIGHT_HOVER : LOGO_HEIGHT;

  const textColor = isDark ? 'rgba(235, 235, 235, 0.85)' : 'rgba(40, 40, 40, 0.85)';
  const bgColor = isDark ? 'rgba(0, 0, 0, 0.55)' : 'rgba(255, 255, 255, 0.75)';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 5,
        padding: hovered ? '12px 16px 13px' : '4px 16px 5px',
        background: bgColor,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderTop: `1px solid ${borderColor}`,
        color: textColor,
        fontFamily: 'var(--font-vercetti), sans-serif',
        fontSize: hovered ? '11px' : '9px',
        lineHeight: 1.3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: hovered ? '8px' : '3px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'opacity 0.5s ease, transform 0.5s ease, padding 0.3s ease, gap 0.3s ease, font-size 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          flexWrap: 'wrap',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={isDark ? '/images/subvention/empresa_blanc_h3.png' : '/images/subvention/empresa_h3_color.png'}
          alt="Generalitat de Catalunya — Departament d'Empresa i Treball"
          style={{ height: `${logoHeight}px`, width: 'auto', display: 'block', transition: 'height 0.3s ease' }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={isDark ? '/images/subvention/UE_FSE_21-27.png' : '/images/subvention/UE_FSE_21-27_color.jpg'}
          alt="Unió Europea — Fons Social Europeu Plus"
          style={{ height: `${logoHeight}px`, width: 'auto', display: 'block', transition: 'height 0.3s ease' }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/subvention/GOB_MTES_SEPE_GJ.png"
          alt="Gobierno de España — Ministerio de Trabajo y Economía Social — SEPE — Sistema Nacional de Garantía Juvenil"
          style={{ height: `${logoHeight}px`, width: 'auto', display: 'block', transition: 'height 0.3s ease' }}
        />
      </div>
      <p
        style={{
          fontStyle: 'italic',
          margin: 0,
          textAlign: 'center',
          maxWidth: '900px',
          padding: '0 8px',
        }}
      >
        Aquesta actuació està impulsada i subvencionada pel Departament d&apos;Empresa i
        Treball i cofinançada per la Unió Europea mitjançant el Fons Social Europeu Plus.
      </p>
    </div>
  );
};

export default ComplianceBanner;
