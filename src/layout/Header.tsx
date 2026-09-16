import { useState, useEffect } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

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

  // Prevent body scrolling when menu is open
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
      {/* Fixed Header Bar with Morphing Hamburger/Close Button */}
      <header
        className={`fixed top-0 left-0 right-0 z-[70] w-full px-6 sm:px-10 lg:px-14 flex items-center justify-between transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? "bg-transparent py-6 border-b border-transparent"
            : isScrolled
            ? "bg-[#020817]/85 backdrop-blur-xl py-4 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-6 sm:py-7 border-b border-transparent"
        }`}
      >
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          {/* Logo icon (split black/white circle) + dropdown chevron */}
          <button
            type="button"
            className="group flex items-center gap-1 focus:outline-none cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center relative overflow-hidden bg-[#020817] transition-transform group-hover:scale-105 shadow-sm">
              <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#020817]" />
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-white" />
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-white/80 group-hover:text-white transition-colors ml-0.5" />
          </button>

          {/* Subtitle text smoothly hidden when menu is open */}
          <div
            className={`flex flex-col text-left transition-all duration-300 ${
              isMenuOpen
                ? "opacity-0 -translate-x-3 pointer-events-none"
                : "opacity-100 translate-x-0"
            }`}
          >
            <span className="text-white text-[14px] sm:text-[15px] font-medium leading-tight">
              <strong className="font-semibold text-white">Speedy Global</strong>
              , welcome!
            </span>
            <span className="text-[#94A3B8] text-[11px] sm:text-[12px] leading-tight mt-0.5 font-normal">
              All your business needs in one platform.
            </span>
          </div>
        </div>

        {/* Center: Interactive Hamburger morphing smoothly to Close (X) */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close Menu" : "Open Navigation Menu"}
            className="relative w-10 h-10 flex flex-col items-center justify-center gap-1 group cursor-pointer focus:outline-none"
          >
            {/* Top Bar */}
            <span
              className={`h-[2px] bg-white rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isMenuOpen
                  ? "w-6 rotate-45 translate-y-[3px] bg-[#00D2FF]"
                  : "w-7 -translate-y-0.5 group-hover:w-9 group-hover:bg-[#00D2FF]"
              }`}
            />
            {/* Bottom Bar */}
            <span
              className={`h-[2px] bg-white rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isMenuOpen
                  ? "w-6 -rotate-45 -translate-y-[3px] bg-[#00D2FF]"
                  : "w-7 translate-y-0.5 group-hover:w-9 group-hover:bg-[#00D2FF]"
              }`}
            />
          </button>
        </div>

        {/* Right: "Get the app" CTA Button */}
        <div>
          <button
            type="button"
            className="bg-white text-[#020817] text-[13px] sm:text-[14px] font-semibold px-5 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-slate-100 hover:shadow-[0_0_25px_rgba(255,255,255,0.45)] transition-all duration-200 active:scale-95 cursor-pointer shadow-md tracking-tight"
          >
            Get the app
          </button>
        </div>
      </header>

      {/* Full-Screen Menu Overlay with Smooth Entrance Animations */}
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
              {/* Speedy Business */}
              <div className="flex items-baseline flex-wrap gap-3 group cursor-pointer">
                <span className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  Speedy
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
