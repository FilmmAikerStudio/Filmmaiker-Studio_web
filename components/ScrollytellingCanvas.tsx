
import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion, useSpring, AnimatePresence } from 'framer-motion';

const TOTAL_FRAMES = 120;
const IMAGE_BASE_URL = 'https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_bb6e_e29f52f3a0c6/anim/sequence/large/01-hero-lightpass/';

const CharReveal: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap mr-[0.2em]">
          {word.split("").map((char, j) => (
            <motion.span
              key={j}
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: (i * 0.1) + (j * 0.03), 
                ease: [0.215, 0.61, 0.355, 1] 
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
};

interface ScrollytellingCanvasProps {
  isDark: boolean;
}

const ScrollytellingCanvas: React.FC<ScrollytellingCanvasProps> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [1, TOTAL_FRAMES]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(4, '0');
      img.src = `${IMAGE_BASE_URL}${frameNum}.jpg`;
      
      const handleLoad = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) setIsLoading(false);
      };
      img.onload = handleLoad;
      img.onerror = handleLoad;
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  useEffect(() => {
    if (images.length < TOTAL_FRAMES || !canvasRef.current) return;
    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    const render = (index: number) => {
      const imgIndex = Math.floor(index) - 1;
      const safeIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, imgIndex));
      const image = images[safeIndex];

      if (image && image.complete && image.naturalWidth > 0) {
        const { width, height } = canvasRef.current!;
        const hRatio = width / image.width;
        const vRatio = height / image.height;
        const ratio = Math.min(hRatio, vRatio);
        const centerShiftX = (width - image.width * ratio) / 2;
        const centerShiftY = (height - image.height * ratio) / 2;

        context.clearRect(0, 0, width, height);
        // Dynamic background based on theme
        context.fillStyle = isDark ? '#050505' : '#f4f5f5';
        context.fillRect(0, 0, width, height);
        context.drawImage(image, 0, 0, image.width, image.height, centerShiftX, centerShiftY, image.width * ratio, image.height * ratio);
      }
    };

    const unsubscribe = frameIndex.on('change', (latest) => requestAnimationFrame(() => render(latest)));
    render(frameIndex.get());
    return () => unsubscribe();
  }, [images, frameIndex, isDark]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
        canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className={`relative h-[700vh] transition-colors duration-700 ${isDark ? 'bg-[#050505]' : 'bg-[#f4f5f5]'}`}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {isLoading && (
          <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center transition-colors duration-700 ${isDark ? 'bg-[#050505]' : 'bg-[#f4f5f5]'}`}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-[10px] tracking-[0.5em] font-black mb-6 transition-colors duration-500 ${isDark ? 'text-white' : 'text-black'}`}>
              LOADING ENGINE
            </motion.div>
            <div className={`w-64 h-[1px] relative transition-colors duration-500 ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
              <motion.div className="absolute inset-y-0 left-0 bg-[#a4e37d]" animate={{ width: `${loadProgress}%` }} />
            </div>
          </div>
        )}
        <canvas ref={canvasRef} className={`block w-full h-full object-contain mix-blend-multiply opacity-80 transition-opacity duration-700 ${isDark ? 'mix-blend-screen opacity-80' : 'mix-blend-multiply opacity-60'}`} />
        <div className="absolute inset-0 pointer-events-none">
          <SectionOverlays progress={smoothProgress} isDark={isDark} />
        </div>
      </div>
    </div>
  );
};

const SectionOverlays: React.FC<{ progress: any; isDark: boolean }> = ({ progress, isDark }) => {
  const s1Op = useTransform(progress, [0, 0.1, 0.2], [1, 1, 0]);
  const s2Op = useTransform(progress, [0.25, 0.35, 0.45], [0, 1, 0]);
  const s3Op = useTransform(progress, [0.5, 0.6, 0.7], [0, 1, 0]);
  const s4Op = useTransform(progress, [0.8, 0.9, 1], [0, 1, 1]);

  const textColorClass = isDark ? 'text-white' : 'text-black';
  const subTextColorClass = isDark ? 'text-white/40' : 'text-black/50';

  return (
    <div className="relative w-full h-full">
      <motion.div style={{ opacity: s1Op }} className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <h1 className={`text-[12vw] font-black tracking-tighter uppercase leading-[0.8] mb-6 overflow-hidden flex transition-colors duration-500 ${textColorClass}`}>
          <CharReveal text="FILMM" />
          <span className="text-[#a4e37d]">
            <CharReveal text="AI" />
          </span>
          <CharReveal text="KER" />
        </h1>
        <p className="text-[#a4e37d] tracking-[0.6em] uppercase text-[10px] sm:text-xs font-bold">
          The New Standard of Production
        </p>
      </motion.div>

      <motion.div style={{ opacity: s2Op }} className="absolute inset-0 flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <h2 className={`text-4xl md:text-7xl font-black uppercase mb-8 leading-none tracking-tight transition-colors duration-500 ${textColorClass}`}>
            Visionary <br/><span className="text-[#a4e37d]">Intelligence</span>
          </h2>
          <p className={`text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed transition-colors duration-500 ${subTextColorClass}`}>
            We don't just use AI. We orchestrate it with cinematic precision to build worlds that were previously impossible.
          </p>
        </div>
      </motion.div>

      <motion.div style={{ opacity: s3Op }} className="absolute inset-0 flex items-center justify-center px-6">
        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className={`text-4xl md:text-6xl font-black uppercase mb-6 leading-none tracking-tighter transition-colors duration-500 ${textColorClass}`}>
              Flawless <br/>Craft
            </h2>
            <p className={`text-lg leading-relaxed transition-colors duration-500 ${subTextColorClass}`}>
              Every pixel is refined through our proprietary AI-synthesis pipeline, ensuring a level of detail that meets the highest studio standards.
            </p>
          </div>
          <div className="aspect-video bg-[#a4e37d]/10 border border-[#a4e37d]/20 rounded-lg backdrop-blur-3xl"></div>
        </div>
      </motion.div>

      <motion.div style={{ opacity: s4Op }} className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <h2 className={`text-6xl md:text-9xl font-black tracking-tighter mb-12 uppercase italic leading-[0.8] text-center transition-colors duration-500 ${textColorClass}`}>
          Begin <br/> <span className="text-[#a4e37d]">Execution</span>
        </h2>
        <button className={`group relative px-10 py-5 font-black tracking-[0.2em] uppercase text-xs overflow-hidden rounded-full pointer-events-auto transition-all hover:scale-105 active:scale-95 ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
          Join the Nexus
        </button>
      </motion.div>
    </div>
  );
};

export default ScrollytellingCanvas;
