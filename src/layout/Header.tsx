import { useState, useEffect } from "react";
import { HelpCircle } from "lucide-react";
import { useLenis } from "../components/SmoothScroll";
import { usePreloader } from "../context/PreloaderContext";

// Chevron Icon matching reference
export function ChevronIcon({ className = "w-3 h-2" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 8"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1.5 2L6 6.5L10.5 2" />
    </svg>
  );
}

// Close (X) Icon matching reference image 4 exactly
export function CloseIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

export default function Header() {
  const { isLoaded } = usePreloader();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScrollCheck = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Check if header is currently intersecting with the light OneApp section
      const oneAppEl = document.getElementById("oneapp");
      if (oneAppEl) {
        const rect = oneAppEl.getBoundingClientRect();
        // Header height is ~75px, check if header overlaps OneApp with slight buffer
        const overlapsOneApp = rect.top <= 80 && rect.bottom >= 20;
        setIsLightSection(overlapsOneApp);
      } else {
        setIsLightSection(false);
      }
    };

    window.addEventListener("scroll", handleScrollCheck, { passive: true });
    window.addEventListener("resize", handleScrollCheck, { passive: true });
    handleScrollCheck();

    if (lenis) {
      lenis.on("scroll", handleScrollCheck);
    }

    return () => {
      window.removeEventListener("scroll", handleScrollCheck);
      window.removeEventListener("resize", handleScrollCheck);
      if (lenis) {
        lenis.off("scroll", handleScrollCheck);
      }
    };
  }, [lenis]);

  // Prevent background scrolling and pause Lenis when full-screen menu is open
  useEffect(() => {
    if (isMenuOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, lenis]);

  return (
    <>
      {/* Fixed Header Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-[70] w-full px-4 sm:px-8 lg:px-14 flex items-center justify-between transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "bg-transparent py-4 sm:py-6 border-b border-transparent"
            : isLightSection
            ? "bg-white/85 backdrop-blur-xl py-3 sm:py-4 border-b border-black/5 shadow-[0_4px_25px_rgba(0,0,0,0.06)]"
            : isScrolled
            ? "bg-[#080F38]/85 backdrop-blur-xl py-3 sm:py-4 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-4 sm:py-7 border-b border-transparent"
        }`}
      >
        {/* Left: Luma Pay Brand Identity */}
        <div
          className={`flex items-center gap-2 sm:gap-2.5 z-10 min-w-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <button
            type="button"
            className="group flex items-center gap-1.5 sm:gap-2 focus:outline-none cursor-pointer shrink-0"
          >
            {/* Luma Pay Official Logo Glyph */}
            <img
              src="/favicon.png"
              alt="Luma Pay logo"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-contain shadow-sm transition-transform group-hover:scale-105"
            />
            <ChevronIcon
              className={`w-2.5 h-2 transition-colors hidden xs:block ${
                !isMenuOpen && isLightSection
                  ? "text-[#080F38]/70 group-hover:text-[#080F38]"
                  : "text-white/80 group-hover:text-white"
              }`}
            />
          </button>

          {/* Subtitle text: visible when closed, cleanly hidden when menu is open */}
          <div
            className={`flex flex-col text-left transition-all duration-300 min-w-0 ${
              isMenuOpen
                ? "opacity-0 -translate-x-3 pointer-events-none hidden sm:flex"
                : "opacity-100 translate-x-0"
            }`}
          >
            <span
              className={`text-[13px] sm:text-[15px] md:text-[16px] leading-tight truncate transition-colors ${
                !isMenuOpen && isLightSection ? "text-[#080F38]" : "text-white"
              }`}
            >
              <strong className="font-bold">Luma Pay</strong>
              <span className="font-normal hidden xs:inline">, welcome!</span>
            </span>
            <span
              className={`text-[12px] sm:text-[13px] leading-tight mt-0.5 font-normal hidden md:inline truncate transition-colors ${
                !isMenuOpen && isLightSection ? "text-slate-500" : "text-[#94A3B8]"
              }`}
            >
              Smart payments. Limitless possibilities.
            </span>
          </div>
        </div>

        {/* Center: Menu & Close Icon - MATHEMATICALLY PERFECTLY CENTERED */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close Menu" : "Open Navigation Menu"}
            className={`relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center group cursor-pointer focus:outline-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 active:scale-95 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            {isMenuOpen ? (
              /* Image 4: Crisp white X with smooth entrance */
              <div className="text-white hover:text-[#00D2FF] transition-colors flex items-center justify-center animate-fadeIn">
                <CloseIcon className="w-6 h-6 sm:w-7 sm:h-7 hover:rotate-90 transition-transform duration-300" />
              </div>
            ) : (
              /* Two crisp horizontal bars */
              <div className="flex flex-col items-center justify-center gap-[5px] sm:gap-[6px] w-7 h-7 sm:w-8 sm:h-8">
                <span
                  className={`w-7 sm:w-8 h-[2px] rounded-full transition-all group-hover:w-9 sm:group-hover:w-10 group-hover:bg-[#00D2FF] ${
                    isLightSection ? "bg-[#080F38]" : "bg-white"
                  }`}
                />
                <span
                  className={`w-7 sm:w-8 h-[2px] rounded-full transition-all group-hover:w-9 sm:group-hover:w-10 group-hover:bg-[#00D2FF] ${
                    isLightSection ? "bg-[#080F38]" : "bg-white"
                  }`}
                />
              </div>
            )}
          </button>
        </div>

        {/* Right: "Get the app" CTA Button */}
        <div
          className={`z-10 shrink-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <button
            type="button"
            className={`text-[12px] sm:text-[13px] md:text-[14px] font-semibold px-3.5 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full transition-all duration-200 active:scale-95 cursor-pointer shadow-md tracking-tight whitespace-nowrap ${
              !isMenuOpen && isLightSection
                ? "bg-[#080F38] text-white hover:bg-[#0f1d6b] hover:shadow-[0_0_20px_rgba(8,15,56,0.3)]"
                : "bg-white text-[#080F38] hover:bg-slate-100 hover:shadow-[0_0_25px_rgba(255,255,255,0.45)]"
            }`}
          >
            Get the app
          </button>
        </div>
      </header>

      {/* Full-Screen Menu Overlay with Smooth Animations */}
      <div
        data-lenis-prevent
        className={`fixed inset-0 z-[60] bg-[#080F38] text-white flex flex-col justify-between px-4 sm:px-12 lg:px-20 pt-24 sm:pt-28 pb-8 sm:pb-10 overflow-y-auto transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMenuOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Ambient Cyan Background Accents */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00D2FF]/6 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-indigo-950/25 rounded-full blur-[160px] pointer-events-none" />

        {/* Menu Body Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 my-auto py-6">
          {/* Left Column: DISCOVER Links */}
          <div
            className={`lg:col-span-7 flex flex-col justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <span className="text-[12px] font-semibold tracking-widest text-gray-500 uppercase mb-8 block">
              DISCOVER
            </span>

            <nav className="flex flex-col gap-6 sm:gap-8">
              {/* Luma Business */}
              <div className="flex items-baseline flex-wrap gap-3 group cursor-pointer">
                <span className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  Luma
                </span>
                <span className="text-sm sm:text-lg text-gray-400 font-normal group-hover:text-gray-200 transition-colors">
                  Business
                </span>
              </div>

              {/* Enterprise Checkout */}
              <div className="flex items-baseline flex-wrap gap-3 sm:gap-4 group cursor-pointer">
                <span className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white group-hover:text-[#00D2FF] transition-colors">
                  Enterprise
                </span>
                <span className="text-sm sm:text-lg text-gray-400 font-normal group-hover:text-gray-200 transition-colors">
                  Checkout
                </span>
              </div>

              {/* Eden Project */}
              <div className="group cursor-pointer">
                <span className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white group-hover:text-[#00D2FF] transition-colors">
                  Eden Project
                </span>
              </div>
            </nav>
          </div>

          {/* Right Column: LEGAL & SUPPORT */}
          <div
            className={`lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 pt-6 lg:pt-14 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            {/* LEGAL Links */}
            <div className="flex flex-col">
              <span className="text-[12px] font-semibold tracking-widest text-gray-500 uppercase mb-4 block">
                LEGAL
              </span>
              <ul className="flex flex-col gap-2.5 text-[13px] text-gray-300">
                {[
                  "Cookie Policy",
                  "Information Security Policy",
                  "Privacy Policy",
                  "Regulatory Information",
                  "Licences",
                  "Corporate Governance Principles",
                  "Terms and Conditions",
                  "Key Legal Documents",
                  "AML",
                  "Acceptable Use Policy",
                  "Dispute a Payment",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="hover:text-white hover:underline transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* SUPPORT Links */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-[12px] font-semibold tracking-widest text-gray-500 uppercase mb-4 block">
                  SUPPORT
                </span>
                <ul className="flex flex-col gap-3 text-[17px] sm:text-[19px] font-medium text-white">
                  {["Contact", "Developer API", "Careers"].map((item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                        className="hover:text-[#00D2FF] transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 sm:mt-0 pt-6">
                <span className="text-[12px] text-gray-400">Made by Büro</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Footer Bottom Bar */}
        <div
          className={`relative z-10 w-full max-w-[1400px] mx-auto flex items-center justify-end pt-6 border-t border-white/10 transition-all duration-700 ease-out delay-300 ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <button
            type="button"
            className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-[13px] font-medium cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 stroke-[2]" />
            <span>Help</span>
          </button>
        </div>
      </div>
    </>
  );
}
