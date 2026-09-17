import { ChevronDown, Plus, HelpCircle, Trophy } from "lucide-react";
import { useLenis } from "../../../components/SmoothScroll";
import figure8Img from "../../../assets/sculpture-figure8.png";
import heroBgImg from "../../../assets/hero-bg.jpg";

// SVG Flags for crisp, authentic rendering
const USAFlag = () => (
  <svg viewBox="0 0 512 512" className="w-4 h-4 rounded-full inline-block shadow-xs flex-shrink-0">
    <circle cx="256" cy="256" r="256" fill="#f0f0f0" />
    <g fill="#d80027">
      <path d="M0 213.3h512v42.7H0zm0 85.4h512v42.7H0zm0 85.3h512v42.7H0zM0 426.7h512V470H0zM0 42.7h512v42.6H0zm0 85.3h512v42.7H0z" />
    </g>
    <path fill="#0052b4" d="M0 0h256v256H0z" />
    <g fill="#fff">
      <circle cx="48" cy="48" r="10" />
      <circle cx="128" cy="48" r="10" />
      <circle cx="208" cy="48" r="10" />
      <circle cx="88" cy="88" r="10" />
      <circle cx="168" cy="88" r="10" />
      <circle cx="48" cy="128" r="10" />
      <circle cx="128" cy="128" r="10" />
      <circle cx="208" cy="128" r="10" />
      <circle cx="88" cy="168" r="10" />
      <circle cx="168" cy="168" r="10" />
      <circle cx="48" cy="208" r="10" />
      <circle cx="128" cy="208" r="10" />
      <circle cx="208" cy="208" r="10" />
    </g>
  </svg>
);

const UAEFlag = () => (
  <svg viewBox="0 0 512 512" className="w-4 h-4 rounded-full inline-block shadow-xs flex-shrink-0">
    <path fill="#496e2d" d="M0 85.3h512v113.8H0z" />
    <path fill="#f0f0f0" d="M0 199.1h512v113.8H0z" />
    <path fill="#000" d="M0 312.9h512v113.8H0z" />
    <path fill="#d80027" d="M0 85.3h170.7v341.4H0z" />
  </svg>
);

const BrazilFlag = () => (
  <svg viewBox="0 0 512 512" className="w-4.5 h-4.5 rounded-full inline-block shadow-xs flex-shrink-0">
    <path fill="#6da544" d="M0 0h512v512H0z" />
    <path fill="#ffda44" d="M256 64 472 256 256 448 40 256z" />
    <circle cx="256" cy="256" r="112" fill="#0052b4" />
    <path
      fill="#f0f0f0"
      d="M152 272c20-60 120-100 208-40-10-8-110-44-190 28-6 6-12 8-18 12z"
    />
  </svg>
);

const EUFlag = () => (
  <svg viewBox="0 0 512 512" className="w-5 h-5 rounded-full inline-block shadow-xs flex-shrink-0">
    <circle cx="256" cy="256" r="256" fill="#003399" />
    <g fill="#ffcc00">
      <circle cx="256" cy="76" r="14" />
      <circle cx="256" cy="436" r="14" />
      <circle cx="76" cy="256" r="14" />
      <circle cx="436" cy="256" r="14" />
      <circle cx="128" cy="128" r="14" />
      <circle cx="384" cy="128" r="14" />
      <circle cx="128" cy="384" r="14" />
      <circle cx="384" cy="384" r="14" />
      <circle cx="184" cy="94" r="14" />
      <circle cx="328" cy="94" r="14" />
      <circle cx="94" cy="184" r="14" />
      <circle cx="418" cy="184" r="14" />
    </g>
  </svg>
);

export default function Hero() {
  const lenis = useLenis();

  return (
    <section id="hero" className="relative min-h-screen w-full bg-[#080F38] text-white overflow-hidden flex flex-col justify-between selection:bg-[#00D2FF]/30 pt-24 sm:pt-28 lg:pt-32">
      {/* Background 3D Wave & Glow Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Organic 3D dark ribbon wave backdrop */}
        <img
          src={heroBgImg}
          alt="Dark fluid background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
        />

        {/* Ambient Cyan glow reflections */}
        <div className="absolute top-[18%] right-[22%] w-[550px] h-[550px] bg-[#00D2FF]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] left-[8%] w-[450px] h-[450px] bg-[#00D2FF]/7 rounded-full blur-[160px]" />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080F38] via-transparent to-[#080F38]/30" />
      </div>

      {/* Left Docked Tab: Awards & Certifications */}
      <div className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 z-40">
        <button
          type="button"
          aria-label="Awards and Certifications"
          className="bg-white text-black py-4 px-2 rounded-r-lg shadow-2xl flex flex-col items-center gap-3 transition-transform duration-300 hover:translate-x-1 cursor-pointer border-t border-r border-b border-gray-200"
        >
          <span className="text-[11px] font-bold tracking-tight [writing-mode:vertical-rl] rotate-180 text-gray-900 py-1 select-none">
            Awards & Certifications
          </span>
          <div className="w-3.5 h-[1px] bg-gray-200" />
          <div className="w-5 h-5 flex items-center justify-center text-black">
            <Trophy className="w-4 h-4 stroke-[2.2]" />
          </div>
        </button>
      </div>



      {/* Main Hero Body */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex-1 flex flex-col lg:flex-row items-center justify-between py-6 lg:py-2">
        {/* Left Headline & Subtitle */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-left pt-6 lg:pt-0 lg:pl-4">
          <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-bold tracking-[-0.035em] leading-[1.04] drop-shadow-sm">
            Smart Payments.
            <br />
            <span className="text-white">Limitless Possibilities.</span>
          </h1>

          <p className="text-[#94A3B8] text-base sm:text-lg md:text-[19px] mt-6 sm:mt-8 font-normal leading-relaxed max-w-lg tracking-normal">
            Send, spend, and stay in control, all in one app.
          </p>
        </div>

        {/* Right Visual Composition */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end mt-12 lg:mt-0 relative pb-10 lg:pb-4">
          {/* Main Backdrop Card */}
          <div className="relative w-[310px] sm:w-[360px] md:w-[390px] h-[500px] sm:h-[550px] md:h-[580px] bg-white rounded-[36px] sm:rounded-[42px] p-8 sm:p-10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.65)] flex flex-col justify-between overflow-hidden border border-gray-100">
            {/* Top Typography Inside Card */}
            <div className="relative z-10">
              <h2 className="text-[#0f172a] text-[28px] sm:text-[32px] md:text-[36px] font-bold leading-[1.12] tracking-[-0.025em]">
                Your Money.
                <br />
                Any Currency
                <br />
                Anywhere.
              </h2>
            </div>

            {/* Central 3D Figure-8 Ribbed Sculpture */}
            <div className="relative z-10 w-full flex items-center justify-center my-auto pt-2">
              <img
                src={figure8Img}
                alt="Ribbed 3D figure-eight sculpture"
                className="w-[200px] sm:w-[240px] md:w-[265px] h-auto object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.18)] transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Floating Widget 1: "Deposit Received!" Pill (Mid Right) */}
          <div className="absolute top-[160px] sm:top-[175px] -right-3 sm:-right-8 md:-right-10 z-40 bg-white/95 backdrop-blur-md rounded-full py-2 sm:py-2.5 px-3.5 sm:px-4 shadow-[0_15px_35px_rgba(0,0,0,0.2)] border border-gray-100/90 flex items-center gap-3 transition-transform duration-300 hover:-translate-y-1">
            <div className="flex-shrink-0 flex items-center justify-center">
              <EUFlag />
            </div>

            <div className="flex flex-col text-left pr-1">
              <span className="text-[12px] sm:text-[13px] font-bold text-gray-900 leading-tight">
                Deposit Received!
              </span>
              <span className="text-[11px] sm:text-[12px] font-semibold text-emerald-600 leading-tight">
                + €120.00
              </span>
            </div>

            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-800 hover:border-gray-500 transition-colors cursor-pointer">
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            </div>
          </div>

          {/* Floating Widget 2: "Balance & Transactions" Card (Overlapping Left) */}
          <div className="absolute top-[190px] sm:top-[220px] -left-4 sm:-left-16 md:-left-24 lg:-left-28 z-30 w-[270px] sm:w-[320px] md:w-[335px] bg-white rounded-[24px] sm:rounded-[28px] p-4.5 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.25)] border border-gray-100 transition-transform duration-300 hover:-translate-y-1">
            {/* Top Row: Mini Sparkline Graph + Balance */}
            <div className="flex items-center justify-between mb-4">
              {/* Mini Sparkline Pill Container */}
              <div className="w-16 h-14 bg-[#EEF2FF] rounded-2xl p-1.5 flex flex-col justify-between relative overflow-hidden">
                <svg
                  viewBox="0 0 100 45"
                  className="w-full h-7 mt-1 text-[#3b82f6]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 35 C 20 35, 25 15, 45 22 C 65 30, 75 10, 100 12"
                    stroke="#3b82f6"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0 35 C 20 35, 25 15, 45 22 C 65 30, 75 10, 100 12 L 100 45 L 0 45 Z"
                    fill="url(#sparkline-grad)"
                    opacity="0.3"
                  />
                  <defs>
                    <linearGradient
                      id="sparkline-grad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Badge positioned bottom-right */}
                <div className="self-end bg-[#E0F2FE] text-[#0284c7] text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-2xs">
                  <span>↑</span> 16.9%
                </div>
              </div>

              {/* Balance Amount */}
              <div className="text-right">
                <span className="text-[11px] sm:text-[12px] text-gray-400 font-medium block">
                  Balance
                </span>
                <span className="text-[18px] sm:text-[22px] font-bold text-gray-900 tracking-tight block">
                  € 1235.00
                </span>
              </div>
            </div>

            {/* Transactions Mini Table */}
            <div className="w-full text-left">
              <div className="grid grid-cols-4 text-[9px] sm:text-[10px] font-semibold text-gray-400 pb-1.5 border-b border-gray-100">
                <span>Recipient</span>
                <span>Currency</span>
                <span>Date</span>
                <span className="text-right">Amount</span>
              </div>

              {/* Row 1: Michael */}
              <div className="grid grid-cols-4 items-center text-[10px] sm:text-[11px] py-2 border-b border-gray-50 text-gray-800 font-medium">
                <span className="truncate">Michael</span>
                <span className="flex items-center gap-1">
                  <USAFlag />
                  <span className="text-[10px] text-gray-600">USA</span>
                </span>
                <span className="text-gray-500 text-[10px]">09/02/2021</span>
                <span className="text-right font-bold text-gray-900">$ 890.00</span>
              </div>

              {/* Row 2: Omar */}
              <div className="grid grid-cols-4 items-center text-[10px] sm:text-[11px] py-2 text-gray-800 font-medium">
                <span className="truncate">Omar</span>
                <span className="flex items-center gap-1">
                  <UAEFlag />
                  <span className="text-[10px] text-gray-600">UAE</span>
                </span>
                <span className="text-gray-500 text-[10px]">04/02/2021</span>
                <span className="text-right font-bold text-gray-900">€ 120.00</span>
              </div>
            </div>

            {/* Bottom 3 Dots Indicator */}
            <div className="flex items-center justify-center gap-1.5 mt-3">
              <span className="w-3.5 h-1 rounded-full bg-[#00D2FF]" />
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="w-1 h-1 rounded-full bg-gray-300" />
            </div>
          </div>

          {/* Floating Widget 3: Currency Converter (Bottom Right) */}
          <div className="absolute bottom-6 sm:bottom-10 -right-2 sm:-right-8 md:-right-10 z-30 w-[145px] sm:w-[155px] flex flex-col gap-1 transition-transform duration-300 hover:-translate-y-1">
            {/* Top Card: Amount */}
            <div className="bg-white rounded-2xl p-3 shadow-[0_10px_25px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center justify-between">
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-gray-400 font-medium">
                  Amount
                </span>
                <span className="text-[17px] sm:text-[18px] font-bold text-gray-900 leading-tight mt-0.5">
                  $150
                </span>
              </div>
              <USAFlag />
            </div>

            {/* Switch Arrow Connector */}
            <div className="relative -my-2.5 z-40 self-center">
              <div className="w-6 h-6 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center text-gray-700">
                <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </div>

            {/* Bottom Card: To (Dark Theme) */}
            <div className="bg-[#182234] rounded-2xl p-3 shadow-[0_15px_30px_rgba(0,0,0,0.35)] border border-slate-700/50 flex flex-col text-left">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-medium">To</span>
                  <span className="text-[17px] sm:text-[18px] font-bold text-white leading-tight mt-0.5">
                    R$802
                  </span>
                </div>
                <BrazilFlag />
              </div>

              <div className="mt-2 pt-1 border-t border-slate-700/40">
                <span className="text-[8px] text-gray-400 leading-tight block">
                  Exchange Rate
                  <br />1 USD = 5.35 BRL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Scroll Indicator & Help Link */}
      <footer className="relative z-30 w-full px-6 sm:px-10 lg:px-14 py-6 flex items-center justify-between">
        {/* Scroll Indicator */}
        <button
          type="button"
          onClick={() => {
            const nextEl = document.getElementById("steps");
            if (nextEl && lenis) {
              lenis.scrollTo(nextEl, { offset: -80, duration: 1.2 });
            } else {
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors cursor-pointer group focus:outline-none"
          aria-label="Scroll to next section"
        >
          <div className="w-4 h-6 rounded-full border-[1.5px] border-white/60 group-hover:border-[#00D2FF] flex items-start justify-center pt-1 transition-colors">
            <span className="w-1 h-1.5 bg-white group-hover:bg-[#00D2FF] rounded-full animate-bounce" />
          </div>
          <span className="text-[12px] font-medium tracking-wide">Scroll</span>
        </button>

        {/* Help Link */}
        <button
          type="button"
          className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-[12px] font-medium cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 stroke-[2]" />
          <span>Help</span>
        </button>
      </footer>
    </section>
  );
}
