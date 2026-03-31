
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const ACCENT = '#FF6B35';

const CustomCursor: React.FC = () => {
  const ringRef  = useRef<HTMLDivElement>(null);
  const dotRef   = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ring = ringRef.current!;
    const dot  = dotRef.current!;

    // quickTo for butter-smooth tracking
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3.out' });
    const xDot  = gsap.quickTo(dot,  'x', { duration: 0.08 });
    const yDot  = gsap.quickTo(dot,  'y', { duration: 0.08 });

    const onMove = (e: MouseEvent) => {
      xRing(e.clientX);
      yRing(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
    };

    // Expand ring on interactive elements
    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.closest('a, button, [data-cursor]');
      if (!isLink) return;

      gsap.to(ring, {
        scale: 2.2,
        opacity: 0.6,
        duration: 0.35,
        ease: 'power2.out',
      });
      gsap.to(dot, { scale: 0, duration: 0.2 });

      const label = target.getAttribute('data-cursor-label');
      if (label && labelRef.current) {
        labelRef.current.textContent = label;
        gsap.to(labelRef.current, { opacity: 1, duration: 0.2 });
      }
    };

    const onLeave = () => {
      gsap.to(ring, {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: 'power2.inOut',
      });
      gsap.to(dot, { scale: 1, duration: 0.2 });
      if (labelRef.current) gsap.to(labelRef.current, { opacity: 0, duration: 0.15 });
    };

    // Hide on mouse leave window
    const onLeaveDoc = () => gsap.to(wrapRef.current, { opacity: 0, duration: 0.3 });
    const onEnterDoc = () => gsap.to(wrapRef.current, { opacity: 1, duration: 0.3 });

    window.addEventListener('mousemove',   onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout',  onLeave);
    document.documentElement.addEventListener('mouseleave', onLeaveDoc);
    document.documentElement.addEventListener('mouseenter', onEnterDoc);

    return () => {
      window.removeEventListener('mousemove',   onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout',  onLeave);
      document.documentElement.removeEventListener('mouseleave', onLeaveDoc);
      document.documentElement.removeEventListener('mouseenter', onEnterDoc);
    };
  }, { scope: wrapRef });

  return (
    <div ref={wrapRef} className="hidden lg:block" aria-hidden="true">
      {/* Lagging ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          width: 44,
          height: 44,
          marginLeft: -22,
          marginTop: -22,
          border: `1.5px solid ${ACCENT}`,
          borderRadius: '50%',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      >
        <span
          ref={labelRef}
          className="text-[8px] font-black uppercase tracking-widest opacity-0"
          style={{ color: ACCENT }}
        />
      </div>

      {/* Instant dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          background: ACCENT,
          willChange: 'transform',
        }}
      />
    </div>
  );
};

export default CustomCursor;
