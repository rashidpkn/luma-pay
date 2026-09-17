import { useState, useEffect, useRef, useCallback } from "react";

interface PreloaderProps {
  onComplete?: () => void;
  minDuration?: number; // Total duration in ms
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  maxLife: number;
  life: number;
}

export default function Preloader({
  onComplete,
  minDuration = 2800,
}: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<"l-trace" | "l-glint" | "p-trace" | "unified" | "exit" | "hidden">("l-trace");
  const [lProgress, setLProgress] = useState(0);
  const [pProgress, setPProgress] = useState(0);
  const [lLength, setLLength] = useState(1050);
  const [pLength, setPLength] = useState(1250);
  const [isLFillVisible, setIsLFillVisible] = useState(false);
  const [isPFillVisible, setIsPFillVisible] = useState(false);
  const [showGlint, setShowGlint] = useState(false);
  const [glintTwinkle, setGlintTwinkle] = useState(false);
  const [cometL, setCometL] = useState<{ x: number; y: number; angle: number; visible: boolean }>({
    x: 210,
    y: 52,
    angle: 105,
    visible: false,
  });
  const [cometP, setCometP] = useState<{ x: number; y: number; angle: number; visible: boolean }>({
    x: 340,
    y: 177,
    angle: 0,
    visible: false,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pathLRef = useRef<SVGPathElement | null>(null);
  const pathPRef = useRef<SVGPathElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const isManualRef = useRef<boolean>(false);

  // Helper to spawn sparkling stardust motes behind comet
  const spawnSparkles = useCallback((x: number, y: number, colorTier: "cyan" | "purple") => {
    const colors = colorTier === "cyan" 
      ? ["#FFFFFF", "#E0FAFF", "#00F0FF", "#3805F6", "#70E0FF"]
      : ["#FFFFFF", "#D8B4FE", "#7B2BFF", "#A855F7", "#08DBFF"];

    const count = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2.8 + 0.6;
      particlesRef.current.push({
        id: Math.random(),
        x: x + (Math.random() - 0.5) * 16,
        y: y + (Math.random() - 0.5) * 16,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3.5 + 1.2,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        maxLife: 28 + Math.random() * 22,
        life: 0,
      });
    }
  }, []);

  // Update animation state for a normalized progress t (0.0 to 1.0)
  const applyProgress = useCallback((t: number) => {
    const pct = Math.floor(t * 100);
    setProgress(pct);

    // STAGES BREAKDOWN:
    // 0.00 -> 0.38: Trace "L" spine (Comet sweeps from apex to foot base)
    // 0.38 -> 0.48: "L" Solidify & Apex Glint Flash
    // 0.48 -> 0.82: Trace "P" spine (Comet sweeps along top bar and outer loop)
    // 0.82 -> 0.94: "P" Solidify & Full "LP" Unified Bloom
    // 0.94 -> 1.00: Graceful Exit Dissolve

    if (t < 0.38) {
      setStage("l-trace");
      const lFrac = Math.min(t / 0.36, 1);
      setLProgress(lFrac);
      setPProgress(0);

      if (pathLRef.current) {
        const totalLen = pathLRef.current.getTotalLength();
        const curDist = lFrac * totalLen;
        const pt = pathLRef.current.getPointAtLength(curDist);
        const ptNext = pathLRef.current.getPointAtLength(Math.min(curDist + 4, totalLen));
        const angle = Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x) * (180 / Math.PI);

        setCometL({ x: pt.x, y: pt.y, angle, visible: true });
        spawnSparkles(pt.x, pt.y, "cyan");
      }

      setIsLFillVisible(lFrac > 0.45);
      setIsPFillVisible(false);
      setShowGlint(false);
      setGlintTwinkle(false);
      setCometP(prev => ({ ...prev, visible: false }));

    } else if (t < 0.48) {
      setStage("l-glint");
      setLProgress(1);
      setPProgress(0);
      setIsLFillVisible(true);
      setIsPFillVisible(false);
      setCometL(prev => ({ ...prev, visible: false }));
      setShowGlint(true);
      setGlintTwinkle(true);
      setCometP(prev => ({ ...prev, visible: false }));

    } else if (t < 0.82) {
      setStage("p-trace");
      setShowGlint(false);
      setGlintTwinkle(true); // Lingering subtle twinkle at L apex
      setLProgress(1);
      setIsLFillVisible(true);

      const pFrac = Math.min((t - 0.48) / (0.80 - 0.48), 1);
      setPProgress(pFrac);

      if (pathPRef.current) {
        const totalLen = pathPRef.current.getTotalLength();
        const curDist = pFrac * totalLen;
        const pt = pathPRef.current.getPointAtLength(curDist);
        const ptNext = pathPRef.current.getPointAtLength(Math.min(curDist + 4, totalLen));
        const angle = Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x) * (180 / Math.PI);

        setCometP({ x: pt.x, y: pt.y, angle, visible: true });
        spawnSparkles(pt.x, pt.y, "purple");
      }

      setIsPFillVisible(pFrac > 0.45);

    } else if (t < 0.94) {
      setStage("unified");
      setLProgress(1);
      setPProgress(1);
      setIsLFillVisible(true);
      setIsPFillVisible(true);
      setShowGlint(false);
      setGlintTwinkle(false);
      setCometL(prev => ({ ...prev, visible: false }));
      setCometP(prev => ({ ...prev, visible: false }));

    } else {
      setStage("exit");
    }
  }, [spawnSparkles]);

  // Main animation loop
  useEffect(() => {
    if (pathLRef.current) setLLength(pathLRef.current.getTotalLength());
    if (pathPRef.current) setPLength(pathPRef.current.getTotalLength());

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = (time: number) => {
      if (isManualRef.current) {
        // In manual debugging mode, particles still draw
      } else {
        if (!startTimeRef.current) startTimeRef.current = time;
        const elapsed = time - startTimeRef.current;
        const t = Math.min(elapsed / minDuration, 1);
        applyProgress(t);

        if (t >= 1) {
          setTimeout(() => {
            setStage("hidden");
            if (onComplete) onComplete();
          }, 400);
          return;
        }
      }

      // Render stardust particles
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const activeParticles: Particle[] = [];

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = 1 - p.life / p.maxLife;

        if (p.alpha > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(p.size * (1 - p.life / p.maxLife), 0.6), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(p.alpha, 0);
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.restore();
          activeParticles.push(p);
        }
      }
      particlesRef.current = activeParticles;

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    // Expose window debugging helper for inspecting specific frames
    (window as unknown as Record<string, unknown>).__setPreloaderProgress = (t: number) => {
      isManualRef.current = true;
      applyProgress(t);
    };

    (window as unknown as Record<string, unknown>).__replayPreloader = () => {
      isManualRef.current = false;
      startTimeRef.current = null;
      setStage("l-trace");
      applyProgress(0);
    };

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      delete (window as unknown as Record<string, unknown>).__setPreloaderProgress;
      delete (window as unknown as Record<string, unknown>).__replayPreloader;
    };
  }, [minDuration, onComplete, applyProgress]);

  const handleSkip = () => {
    setStage("hidden");
    if (onComplete) onComplete();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleSkip();
      if (e.key === "r" || e.key === "R") {
        if ((window as unknown as Record<string, () => void>).__replayPreloader) {
          (window as unknown as Record<string, () => void>).__replayPreloader();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (stage === "hidden") return null;

  return (
    <div
      onClick={handleSkip}
      onTouchEnd={handleSkip}
      className={`fixed inset-0 w-[100dvw] h-[100dvh] z-[99999] flex flex-col items-center justify-center bg-[#080F38] cursor-pointer select-none touch-none overflow-hidden transition-all duration-700 ease-out ${
        stage === "exit"
          ? "opacity-0 scale-105 pointer-events-none blur-sm"
          : "opacity-100 scale-100"
      }`}
      aria-label="Loading Luma Pay"
      role="status"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Deep atmospheric backdrop radial gradient */}
        <div
          className={`w-[680px] h-[680px] rounded-full blur-[130px] transition-all duration-700 ${
            stage === "unified"
              ? "bg-gradient-to-tr from-[#410FFD]/45 via-[#08DBFF]/35 to-[#3805F6]/45 scale-125"
              : stage === "p-trace"
              ? "bg-gradient-to-r from-[#410FFD]/35 to-[#08DBFF]/30 scale-110"
              : "bg-gradient-to-b from-[#3805F6]/35 to-[#06B9FF]/25 scale-100"
          }`}
        />
        {/* Concentric subtle radar rings */}
        <div
          className={`absolute w-[440px] h-[440px] rounded-full border border-cyan-400/20 blur-sm transition-all duration-1000 ${
            stage === "unified" ? "scale-140 opacity-40" : "scale-100 opacity-15"
          }`}
        />
      </div>

      {/* Main SVG Container */}
      <div className="relative w-[clamp(210px,68vw,360px)] aspect-[841/766] flex items-center justify-center">
        {/* Stardust Canvas Overlay */}
        <canvas
          ref={canvasRef}
          width={841}
          height={766}
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
        />

        <svg
          viewBox="0 0 841 766"
          className="w-full h-full overflow-visible z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Exact Linear Gradients from icon.svg */}
            <linearGradient
              id="preloader-l-fill"
              gradientUnits="userSpaceOnUse"
              x1="-34.5107"
              y1="572.5422"
              x2="436.4773"
              y2="300.6172"
            >
              <stop offset="0" stopColor="#3805F6" />
              <stop offset="0.1529" stopColor="#3317F7" />
              <stop offset="0.2506" stopColor="#3510F7" />
              <stop offset="0.5064" stopColor="#3219F7" />
              <stop offset="0.8589" stopColor="#06B9FF" />
            </linearGradient>

            <linearGradient
              id="preloader-p-fill"
              gradientUnits="userSpaceOnUse"
              x1="300.4818"
              y1="324.7616"
              x2="823.7707"
              y2="324.7616"
            >
              <stop offset="0" stopColor="#410FFD" />
              <stop offset="1" stopColor="#08DBFF" />
            </linearGradient>

            {/* Glowing Neon Ribbon Gradients */}
            <linearGradient id="comet-l-trail-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3805F6" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#06B9FF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="comet-p-trail-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#410FFD" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#08DBFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </linearGradient>

            {/* Neon Glow Filters */}
            <filter id="neon-glow-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="neon-glow-heavy" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blurH" />
              <feMerge>
                <feMergeNode in="blurH" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* 4-Point Star Glint Flash Filter */}
            <filter id="glint-filter" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blurG" />
              <feMerge>
                <feMergeNode in="blurG" />
                <feMergeNode in="blurG" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Guide Spine Paths for Length & Coordinates */}
          <path
            ref={pathLRef}
            d="M 210,52 L 72,636 C 55,710 100,722 170,722 L 380,722"
            fill="none"
            stroke="none"
          />
          <path
            ref={pathPRef}
            d="M 340,177 L 615,177 C 795,177 795,477 615,477 L 330,477"
            fill="none"
            stroke="none"
          />

          {/* Ambient Ghost Silhouette */}
          <path
            d="M332.8,736.1L120.2,736c-40.7,0-77.6-25.2-95.3-61c-10.6-21.2-15.4-45.9-10.1-69.3l46.9-204.8l63.7-273.4c5-21.4,16.9-38.8,31.4-54.4c31.7-30.3,74.7-41.5,117.6-53.3l-85.7,364.8l-53.3,228.6l337.3,0.1c-8.7,22.1-18.4,43.1-31.6,62.8c-13.4,17.1-27.8,32-46.8,42.3C375.2,728.6,355.6,736.1,332.8,736.1z"
            fill="none"
            stroke="#08DBFF"
            strokeWidth="1.5"
            strokeOpacity="0.10"
          />
          <path
            d="M300.5,537.4c6.6-18.7,13.5-36.2,23.5-53.3c26.3-45.1,72.3-76.2,125.6-77.6l159.2-0.7c37.3-0.2,67.9-26.7,77.2-62.2c6.9-26.2,0-53.8-17.8-73.9c-15.5-17.4-36.3-27.1-59.7-26.9l-270.3-0.1l31.1-130.7l254.5,0c46.4,2.2,87.1,16.6,123.3,45.4c53.4,42.4,80.5,110.5,76.3,177.9c-7,112.9-100.4,202.2-213.8,202.3l-260.5,0.2L300.5,537.4z"
            fill="none"
            stroke="#410FFD"
            strokeWidth="1.5"
            strokeOpacity="0.10"
          />

          {/* ======================================================== */}
          {/* STAGE 1: Glowing "L" Comet Stroke Ribbon                 */}
          {/* ======================================================== */}
          <g className={`transition-opacity duration-500 ${isLFillVisible && stage !== "l-trace" ? "opacity-30" : "opacity-100"}`}>
            {/* Outer halo ribbon */}
            <path
              d="M 210,52 L 72,636 C 55,710 100,722 170,722 L 380,722"
              fill="none"
              stroke="#3805F6"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.4"
              filter="url(#neon-glow-heavy)"
              style={{
                strokeDasharray: lLength,
                strokeDashoffset: lLength * (1 - lProgress),
              }}
            />
            {/* Mid vibrant cyan ribbon */}
            <path
              d="M 210,52 L 72,636 C 55,710 100,722 170,722 L 380,722"
              fill="none"
              stroke="url(#comet-l-trail-gradient)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#neon-glow-soft)"
              style={{
                strokeDasharray: lLength,
                strokeDashoffset: lLength * (1 - lProgress),
              }}
            />
            {/* Inner hot white filament */}
            <path
              d="M 210,52 L 72,636 C 55,710 100,722 170,722 L 380,722"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: lLength,
                strokeDashoffset: lLength * (1 - lProgress),
              }}
            />
          </g>

          {/* ======================================================== */}
          {/* Solid "L" Glyph Fill (Fades in & solidifies)             */}
          {/* ======================================================== */}
          <g
            className={`transition-all duration-700 ease-out ${
              isLFillVisible ? "opacity-100 scale-100" : "opacity-0 scale-95 origin-bottom-left"
            }`}
            style={{
              filter:
                stage === "unified"
                  ? "drop-shadow(0 0 28px rgba(6, 185, 255, 0.7)) drop-shadow(0 0 50px rgba(56, 5, 246, 0.5))"
                  : isLFillVisible
                  ? "drop-shadow(0 0 16px rgba(6, 185, 255, 0.45))"
                  : "none",
            }}
          >
            <path
              d="M332.8,736.1L120.2,736c-40.7,0-77.6-25.2-95.3-61c-10.6-21.2-15.4-45.9-10.1-69.3l46.9-204.8l63.7-273.4c5-21.4,16.9-38.8,31.4-54.4c31.7-30.3,74.7-41.5,117.6-53.3l-85.7,364.8l-53.3,228.6l337.3,0.1c-8.7,22.1-18.4,43.1-31.6,62.8c-13.4,17.1-27.8,32-46.8,42.3C375.2,728.6,355.6,736.1,332.8,736.1z"
              fill="url(#preloader-l-fill)"
            />
          </g>

          {/* ======================================================== */}
          {/* STAGE 1: Blazing Comet Head on "L"                       */}
          {/* ======================================================== */}
          {cometL.visible && (
            <g
              transform={`translate(${cometL.x}, ${cometL.y}) rotate(${cometL.angle})`}
              className="pointer-events-none"
            >
              {/* Comet Tail Streak */}
              <path
                d="M 0,0 L -40,-8 L -40,8 Z"
                fill="url(#comet-l-trail-gradient)"
                opacity="0.6"
                filter="url(#neon-glow-soft)"
              />
              {/* Outer soft neon flare */}
              <circle r="36" fill="#06B9FF" opacity="0.30" filter="url(#neon-glow-heavy)" />
              {/* Mid bright electric flare */}
              <circle r="18" fill="#00F0FF" opacity="0.85" filter="url(#neon-glow-soft)" />
              {/* Ultra hot white core */}
              <circle r="6.5" fill="#FFFFFF" />
            </g>
          )}

          {/* ======================================================== */}
          {/* STAGE 2: 4-Point Star Glint Flash at "L" Apex           */}
          {/* ======================================================== */}
          {(showGlint || glintTwinkle) && (
            <g
              transform="translate(210, 52)"
              className={`pointer-events-none transition-all duration-500 ${
                showGlint ? "scale-100 opacity-100" : "scale-75 opacity-70"
              }`}
            >
              {/* Primary 4-point Diamond Glint */}
              <polygon
                points="0,-46 10,-10 46,0 10,10 0,46 -10,10 -46,0 -10,-10"
                fill="#FFFFFF"
                filter="url(#glint-filter)"
              />
              {/* Rotated 45-degree Cyan Beam */}
              <polygon
                points="0,-26 6,-6 26,0 6,6 0,26 -6,6 -26,0 -6,-6"
                fill="#68DFFF"
                transform="rotate(45)"
                filter="url(#glint-filter)"
              />
              {/* Nova center circle */}
              <circle r="9" fill="#FFFFFF" />
              <circle r="18" fill="#00F0FF" opacity="0.75" filter="url(#neon-glow-soft)" />
            </g>
          )}

          {/* ======================================================== */}
          {/* STAGE 3: Glowing "P" Comet Stroke Ribbon                 */}
          {/* ======================================================== */}
          <g className={`transition-opacity duration-500 ${isPFillVisible && stage !== "p-trace" ? "opacity-30" : "opacity-100"}`}>
            {/* Outer violet halo */}
            <path
              d="M 340,177 L 615,177 C 795,177 795,477 615,477 L 330,477"
              fill="none"
              stroke="#410FFD"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.4"
              filter="url(#neon-glow-heavy)"
              style={{
                strokeDasharray: pLength,
                strokeDashoffset: pLength * (1 - pProgress),
              }}
            />
            {/* Mid neon cyan/purple ribbon */}
            <path
              d="M 340,177 L 615,177 C 795,177 795,477 615,477 L 330,477"
              fill="none"
              stroke="url(#comet-p-trail-gradient)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#neon-glow-soft)"
              style={{
                strokeDasharray: pLength,
                strokeDashoffset: pLength * (1 - pProgress),
              }}
            />
            {/* Inner hot white filament */}
            <path
              d="M 340,177 L 615,177 C 795,177 795,477 615,477 L 330,477"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: pLength,
                strokeDashoffset: pLength * (1 - pProgress),
              }}
            />
          </g>

          {/* ======================================================== */}
          {/* Solid "P" Glyph Fill (Fades in & solidifies)             */}
          {/* ======================================================== */}
          <g
            className={`transition-all duration-700 ease-out ${
              isPFillVisible ? "opacity-100 scale-100" : "opacity-0 scale-95 origin-center"
            }`}
            style={{
              filter:
                stage === "unified"
                  ? "drop-shadow(0 0 28px rgba(8, 219, 255, 0.7)) drop-shadow(0 0 50px rgba(65, 15, 253, 0.5))"
                  : isPFillVisible
                  ? "drop-shadow(0 0 16px rgba(8, 219, 255, 0.45))"
                  : "none",
            }}
          >
            <path
              d="M300.5,537.4c6.6-18.7,13.5-36.2,23.5-53.3c26.3-45.1,72.3-76.2,125.6-77.6l159.2-0.7c37.3-0.2,67.9-26.7,77.2-62.2c6.9-26.2,0-53.8-17.8-73.9c-15.5-17.4-36.3-27.1-59.7-26.9l-270.3-0.1l31.1-130.7l254.5,0c46.4,2.2,87.1,16.6,123.3,45.4c53.4,42.4,80.5,110.5,76.3,177.9c-7,112.9-100.4,202.2-213.8,202.3l-260.5,0.2L300.5,537.4z"
              fill="url(#preloader-p-fill)"
            />
          </g>

          {/* ======================================================== */}
          {/* STAGE 3: Blazing Comet Head on "P"                       */}
          {/* ======================================================== */}
          {cometP.visible && (
            <g
              transform={`translate(${cometP.x}, ${cometP.y}) rotate(${cometP.angle})`}
              className="pointer-events-none"
            >
              {/* Comet Tail Streak */}
              <path
                d="M 0,0 L -40,-8 L -40,8 Z"
                fill="url(#comet-p-trail-gradient)"
                opacity="0.6"
                filter="url(#neon-glow-soft)"
              />
              {/* Outer violet flare */}
              <circle r="36" fill="#7B2BFF" opacity="0.32" filter="url(#neon-glow-heavy)" />
              {/* Mid electric cyan-violet flare */}
              <circle r="18" fill="#08DBFF" opacity="0.85" filter="url(#neon-glow-soft)" />
              {/* Blazing core */}
              <circle r="6.5" fill="#FFFFFF" />
            </g>
          )}

          {/* ======================================================== */}
          {/* STAGE 4: Full Emblem Unified Electric Wave Pulse         */}
          {/* ======================================================== */}
          {stage === "unified" && (
            <g
              className="animate-ping opacity-25 pointer-events-none"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <path
                d="M332.8,736.1L120.2,736c-40.7,0-77.6-25.2-95.3-61c-10.6-21.2-15.4-45.9-10.1-69.3l46.9-204.8l63.7-273.4c5-21.4,16.9-38.8,31.4-54.4c31.7-30.3,74.7-41.5,117.6-53.3l-85.7,364.8l-53.3,228.6l337.3,0.1c-8.7,22.1-18.4,43.1-31.6,62.8c-13.4,17.1-27.8,32-46.8,42.3C375.2,728.6,355.6,736.1,332.8,736.1z"
                fill="none"
                stroke="#06B9FF"
                strokeWidth="4"
              />
              <path
                d="M300.5,537.4c6.6-18.7,13.5-36.2,23.5-53.3c26.3-45.1,72.3-76.2,125.6-77.6l159.2-0.7c37.3-0.2,67.9-26.7,77.2-62.2c6.9-26.2,0-53.8-17.8-73.9c-15.5-17.4-36.3-27.1-59.7-26.9l-270.3-0.1l31.1-130.7l254.5,0c46.4,2.2,87.1,16.6,123.3,45.4c53.4,42.4,80.5,110.5,76.3,177.9c-7,112.9-100.4,202.2-213.8,202.3l-260.5,0.2L300.5,537.4z"
                fill="none"
                stroke="#410FFD"
                strokeWidth="4"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Brand Typography & Progress Bar */}
      <div className="mt-8 flex flex-col items-center gap-3 select-none">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold tracking-[0.38em] text-lg sm:text-xl drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
            LUMA PAY
          </span>
        </div>

        {/* Minimal High-Tech Progress Bar */}
        <div className="w-48 sm:w-56 h-[3px] bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[#410FFD] via-[#08DBFF] to-[#3805F6] rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="flex items-center justify-between w-48 sm:w-56 text-[11px] font-mono tracking-widest text-cyan-300/70">
          <span>INITIALIZING</span>
          <span className="text-white font-semibold">{progress}%</span>
        </div>
      </div>

      {/* Subtle Skip Hint with Mobile Safe Area Inset */}
      <div className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] text-[11px] tracking-wider text-white/35 hover:text-white/75 transition-colors uppercase font-mono text-center px-4">
        Tap or click anywhere to skip
      </div>
    </div>
  );
}
