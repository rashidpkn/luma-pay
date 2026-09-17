import { useEffect, useState, createContext, useContext, type ReactNode } from "react";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

interface SmoothScrollProps {
  children: ReactNode;
}

function LenisAnchorHandler({ lenis }: { lenis: Lenis | null }) {
  useEffect(() => {
    if (!lenis) return;

    // Smoothly scroll to initial hash target if present in URL
    if (window.location.hash && window.location.hash.length > 1) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        const timer = setTimeout(() => {
          lenis.scrollTo(target as HTMLElement, {
            offset: -80,
            duration: 1.2,
            immediate: false,
          });
        }, 400);
        return () => clearTimeout(timer);
      }
    }

    // Intercept in-page anchor links for buttery-smooth Lenis scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element as HTMLElement, {
            offset: -80,
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
          // Update URL hash cleanly without default harsh browser jump
          window.history.pushState(null, "", href);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      autoRaf: true,
    });

    setLenisInstance(lenis);

    return () => {
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisInstance}>
      <LenisAnchorHandler lenis={lenisInstance} />
      {children}
    </LenisContext.Provider>
  );
}
