'use client';

import { useEffect } from 'react';
import { useVideoStore } from '../../stores';

const VIMEO_SRC =
  'https://player.vimeo.com/video/1108043135?title=0&byline=0&portrait=0&badge=0&autopause=0&autoplay=1&player_id=0&app_id=58479';

const VideoModal = () => {
  const { isVideoOpen, setVideoOpen } = useVideoStore();

  useEffect(() => {
    if (!isVideoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVideoOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isVideoOpen, setVideoOpen]);

  if (!isVideoOpen) return null;

  return (
    <div
      onClick={() => setVideoOpen(false)}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'videoModalFadeIn 0.3s ease',
      }}
    >
      <style>{`
        @keyframes videoModalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1280px',
          aspectRatio: '16 / 9',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
          borderRadius: '8px',
          overflow: 'hidden',
          background: '#000',
        }}
      >
        <button
          onClick={() => setVideoOpen(false)}
          aria-label="Cerrar video"
          style={{
            position: 'absolute',
            top: '-48px',
            right: 0,
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            cursor: 'pointer',
            fontSize: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
            transition: 'background 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ✕
        </button>
        <iframe
          src={VIMEO_SRC}
          width="1920"
          height="1080"
          frameBorder={0}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          title="DemoReel FilmmAiker Studio"
          style={{ width: '100%', height: '100%', display: 'block', border: 0 }}
        />
      </div>
    </div>
  );
};

export default VideoModal;
