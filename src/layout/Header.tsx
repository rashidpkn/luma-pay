import { useState, useEffect } from "react";
import { HelpCircle } from "lucide-react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when full-screen menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Fixed Header Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-[70] w-full px-6 sm:px-10 lg:px-14 flex items-center justify-between transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? "bg-transparent py-6 border-b border-transparent"
            : isScrolled
            ? "bg-[#020817]/85 backdrop-blur-xl py-4 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-6 sm:py-7 border-b border-transparent"
        }`}
      >
        {/* Left: Luma Pay Brand Identity */}
        <div className="flex items-center gap-2.5 z-10">
          <button
            type="button"
            className="group flex items-center gap-2 focus:outline-none cursor-pointer"
          >
            {/* Luma Pay Official Logo Glyph */}
            <img
              src="/favicon.png"
              alt="Luma Pay logo"
              className="w-8 h-8 rounded-lg object-contain shadow-sm transition-transform group-hover:scale-105"
            />
            <ChevronIcon className="w-2.5 h-2 text-white/80 group-hover:text-white transition-colors" />
          </button>

          {/* Subtitle text: visible when closed, cleanly hidden when menu is open */}
          <div
            className={`flex flex-col text-left ml-1 transition-all duration-300 ${
              isMenuOpen
                ? "opacity-0 -translate-x-3 pointer-events-none hidden sm:flex"
                : "opacity-100 translate-x-0"
            }`}
          >
            <span className="text-white text-[15px] sm:text-[16px] leading-tight">
              <strong className="font-bold text-white">Luma Pay</strong>
              <span className="font-normal text-white">, welcome!</span>
            </span>
            <span className="text-[#94A3B8] text-[12px] sm:text-[13px] leading-tight mt-0.5 font-normal">
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
            className="relative w-12 h-12 flex items-center justify-center group cursor-pointer focus:outline-none transition-transform active:scale-95"
          >
            {isMenuOpen ? (
              /* Image 4: Crisp white X with smooth entrance */
              <div className="text-white hover:text-[#00D2FF] transition-colors flex items-center justify-center animate-fadeIn">
                <CloseIcon className="w-7 h-7 hover:rotate-90 transition-transform duration-300" />
              </div>
            ) : (
              /* Two crisp horizontal bars */
              <div className="flex flex-col items-center justify-center gap-[6px] w-8 h-8">
                <span className="w-8 h-[2px] bg-white rounded-full transition-all group-hover:w-10 group-hover:bg-[#00D2FF]" />
                <span className="w-8 h-[2px] bg-white rounded-full transition-all group-hover:w-10 group-hover:bg-[#00D2FF]" />
              </div>
            )}
          </button>
        </div>

        {/* Right: "Get the app" CTA Button */}
        <div className="z-10">
          <button
            type="button"
            className="bg-white text-[#020817] text-[13px] sm:text-[14px] font-semibold px-5 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-slate-100 hover:shadow-[0_0_25px_rgba(255,255,255,0.45)] transition-all duration-200 active:scale-95 cursor-pointer shadow-md tracking-tight"
          >
            Get the app
          </button>
        </div>
      </header>

      {/* Full-Screen Menu Overlay with Smooth Animations */}
      <div
        className={`fixed inset-0 z-[60] bg-[#020817] text-white flex flex-col justify-between px-6 sm:px-12 lg:px-20 pt-28 pb-10 overflow-y-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
                <span className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  Luma
                </span>
                <span className="text-base sm:text-lg text-gray-400 font-normal group-hover:text-gray-200 transition-colors">
                  Business
                </span>
              </div>

              {/* Enterprise Checkout */}
              <div className="flex items-baseline flex-wrap gap-4 group cursor-pointer">
                <span className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white group-hover:text-[#00D2FF] transition-colors">
                  Enterprise
                </span>
                <span className="text-base sm:text-lg text-gray-400 font-normal group-hover:text-gray-200 transition-colors">
                  Checkout
                </span>
              </div>

              {/* Eden Project */}
              <div className="group cursor-pointer">
                <span className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white group-hover:text-[#00D2FF] transition-colors">
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
