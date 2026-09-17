import { useState, useEffect, type ReactNode } from "react";
import { ChevronDown, Plus, HelpCircle, Trophy } from "lucide-react";
import { useLenis } from "../../../components/SmoothScroll";
import { usePreloader } from "../../../context/PreloaderContext";
import AwardsDrawer from "../../../components/AwardsDrawer";
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

const UKFlag = () => (
  <svg viewBox="0 0 512 512" className="w-4 h-4 rounded-full inline-block shadow-xs flex-shrink-0">
    <circle cx="256" cy="256" r="256" fill="#00247d" />
    <path d="M0 0l512 512m0-512L0 512" stroke="#fff" strokeWidth="60" />
    <path d="M0 0l512 512m0-512L0 512" stroke="#cf142b" strokeWidth="36" />
    <path d="M256 0v512M0 256h512" stroke="#fff" strokeWidth="100" />
    <path d="M256 0v512M0 256h512" stroke="#cf142b" strokeWidth="60" />
  </svg>
);

interface TransactionItem {
  recipient: string;
  country: string;
  flag: ReactNode;
  date: string;
  amount: string;
}

interface BalanceSlide {
  balance: string;
  growth: string;
  sparklineStroke: string;
  sparklineGradId: string;
  sparklinePath: string;
  sparklineFillPath: string;
  sparklineBg: string;
  badgeBg: string;
  badgeText: string;
  transactions: TransactionItem[];
}

const BALANCE_SLIDES: BalanceSlide[] = [
  {
    balance: "€ 1235.00",
    growth: "16.9%",
    sparklineStroke: "#3b82f6",
    sparklineGradId: "sparkline-grad-0",
    sparklinePath: "M0 35 C 20 35, 25 15, 45 22 C 65 30, 75 10, 100 12",
    sparklineFillPath: "M0 35 C 20 35, 25 15, 45 22 C 65 30, 75 10, 100 12 L 100 45 L 0 45 Z",
    sparklineBg: "#EEF2FF",
    badgeBg: "#E0F2FE",
    badgeText: "#0284c7",
    transactions: [
      {
        recipient: "Michael",
        country: "USA",
        flag: <USAFlag />,
        date: "09/02/2021",
        amount: "$ 890.00",
      },
      {
        recipient: "Omar",
        country: "UAE",
        flag: <UAEFlag />,
        date: "04/02/2021",
        amount: "€ 120.00",
      },
    ],
  },
  {
    balance: "$ 4850.20",
    growth: "24.5%",
    sparklineStroke: "#00c49f",
    sparklineGradId: "sparkline-grad-1",
    sparklinePath: "M0 38 C 22 36, 35 22, 55 18 C 70 14, 85 8, 100 5",
    sparklineFillPath: "M0 38 C 22 36, 35 22, 55 18 C 70 14, 85 8, 100 5 L 100 45 L 0 45 Z",
    sparklineBg: "#ECFDF5",
    badgeBg: "#D1FAE5",
    badgeText: "#059669",
    transactions: [
      {
        recipient: "Carlos",
        country: "BRA",
        flag: <BrazilFlag />,
        date: "14/02/2021",
        amount: "R$ 3,250.00",
      },
      {
        recipient: "Elena",
        country: "EUR",
        flag: <EUFlag />,
        date: "11/02/2021",
        amount: "€ 540.00",
      },
    ],
  },
  {
    balance: "£ 3120.00",
    growth: "19.2%",
    sparklineStroke: "#6366f1",
    sparklineGradId: "sparkline-grad-2",
    sparklinePath: "M0 28 C 22 34, 42 12, 60 22 C 75 30, 88 12, 100 8",
    sparklineFillPath: "M0 28 C 22 34, 42 12, 60 22 C 75 30, 88 12, 100 8 L 100 45 L 0 45 Z",
    sparklineBg: "#EEF2FF",
    badgeBg: "#E0E7FF",
    badgeText: "#4f46e5",
    transactions: [
      {
        recipient: "Oliver",
        country: "UK",
        flag: <UKFlag />,
        date: "18/02/2021",
        amount: "£ 850.00",
      },
      {
        recipient: "Michael",
        country: "USA",
        flag: <USAFlag />,
        date: "16/02/2021",
        amount: "$ 410.00",
      },
    ],
  },
];

export default function Hero() {
  const lenis = useLenis();
  const { isLoaded } = usePreloader();
  const [isAwardsOpen, setIsAwardsOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSlidePaused, setIsSlidePaused] = useState(false);

  useEffect(() => {
    if (isSlidePaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % BALANCE_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isSlidePaused]);

  return (
    <section id="hero" className="relative min-h-screen w-full bg-[#080F38] text-white overflow-hidden flex flex-col justify-between selection:bg-[#00D2FF]/30 pt-24 sm:pt-28 lg:pt-32">
      {/* Background 3D Wave & Glow Layers */}
      <div
        className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-1200 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
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
      <div
        className={`hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] delay-750 ${
          isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsAwardsOpen(true)}
          aria-label="Awards and Certifications"
          className="group relative bg-white text-black py-4 px-2.5 rounded-r-xl shadow-[0_10px_35px_rgba(0,0,0,0.35)] hover:shadow-[0_15px_45px_rgba(0,210,255,0.3)] flex flex-col items-center gap-3 transition-all duration-300 hover:translate-x-1.5 active:scale-90 cursor-pointer border-t border-r border-b border-gray-200 overflow-hidden"
        >
          {/* Subtle animated shimmer streak */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          {/* Vertical Text */}
          <span className="text-[11px] font-bold tracking-tight [writing-mode:vertical-rl] rotate-180 text-gray-900 group-hover:text-blue-600 transition-colors py-1 select-none">
            Awards & Certifications
          </span>

          {/* Divider line */}
          <div className="w-3.5 h-[1px] bg-gray-200 group-hover:bg-blue-400 transition-colors" />

          {/* Trophy with hover & click wiggle animation */}
          <div className="relative w-6 h-6 flex items-center justify-center text-black group-hover:text-amber-500 transition-colors">
            <Trophy className="w-4 h-4 stroke-[2.2] transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 group-active:rotate-[-12deg]" />
            {/* Glowing beacon dot */}
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
          </div>
        </button>
      </div>

      {/* Slide-out Awards & Certifications Drawer */}
      <AwardsDrawer
        isOpen={isAwardsOpen}
        onClose={() => setIsAwardsOpen(false)}
      />



      {/* Main Hero Body */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 flex-1 flex flex-col lg:flex-row items-center justify-between py-4 sm:py-6 lg:py-2">
        {/* Left Headline & Subtitle */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-left pt-4 sm:pt-6 lg:pt-0 lg:pl-4">
          <h1 className="text-white text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-bold tracking-[-0.035em] leading-[1.04] drop-shadow-sm">
            <span
              className={`block transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Smart Payments.
            </span>
            <span
              className={`block text-white transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] delay-350 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Limitless Possibilities.
            </span>
          </h1>

          <p
            className={`text-[#94A3B8] text-base sm:text-lg md:text-[19px] mt-4 sm:mt-8 font-normal leading-relaxed max-w-lg tracking-normal transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Send, spend, and stay in control, all in one app.
          </p>
        </div>

        {/* Right Visual Composition */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end mt-8 sm:mt-12 lg:mt-0 relative pb-6 sm:pb-10 lg:pb-4">
          <div className="relative transform scale-[0.78] xs:scale-[0.85] sm:scale-95 md:scale-100 origin-center -my-8 xs:-my-4 sm:my-0">
          {/* Main Backdrop Card */}
          <div
            className={`relative w-[310px] sm:w-[360px] md:w-[390px] h-[500px] sm:h-[550px] md:h-[580px] bg-white rounded-[36px] sm:rounded-[42px] p-8 sm:p-10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.65)] flex flex-col justify-between overflow-hidden border border-gray-100 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300 ${
              isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-[0.96]"
            }`}
          >
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

            {/* Central Luma Pay Brand Logo Emblem */}
            <div className="relative z-10 w-full flex items-center justify-center my-auto pt-2 sm:pt-4">
              {/* Soft ambient branding glow */}
              <div className="absolute w-52 sm:w-64 h-52 sm:h-64 bg-gradient-to-tr from-[#3805F6]/15 via-[#00D2FF]/25 to-transparent rounded-full blur-2xl pointer-events-none" />

              <div className="relative group cursor-default transform transition-all duration-700 hover:scale-105 hover:-translate-y-1">
                <img
                  src="/preloader/icon.svg"
                  alt="Luma Pay logo"
                  className="w-[200px] sm:w-[230px] md:w-[255px] h-auto object-contain drop-shadow-[0_22px_35px_rgba(0,210,255,0.3)] drop-shadow-[0_10px_20px_rgba(56,5,246,0.25)] select-none"
                />
              </div>
            </div>
          </div>

          {/* Floating Widget 1: "Deposit Received!" Pill (Mid Right) */}
          <div
            className={`absolute top-[150px] sm:top-[165px] -right-3 sm:-right-8 md:-right-10 z-40 bg-white/95 backdrop-blur-md rounded-full py-2 sm:py-2.5 px-3.5 sm:px-4 shadow-[0_15px_35px_rgba(0,0,0,0.2)] border border-gray-100/90 flex items-center gap-3 transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] delay-550 hover:-translate-y-1 ${
              isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90"
            }`}
          >
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

          {/* Floating Widget 2: "Balance & Transactions" Card (Moved Left for Full Logo Visibility) */}
          <div
            onMouseEnter={() => setIsSlidePaused(true)}
            onMouseLeave={() => setIsSlidePaused(false)}
            className={`absolute top-[195px] sm:top-[225px] -left-10 xs:-left-16 sm:-left-36 md:-left-44 lg:-left-56 xl:-left-60 z-30 w-[265px] sm:w-[290px] md:w-[300px] bg-white rounded-[24px] sm:rounded-[28px] p-4 sm:p-4.5 shadow-[0_25px_60px_rgba(0,0,0,0.25)] border border-gray-100 transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] delay-700 hover:-translate-y-1 ${
              isLoaded ? "opacity-100 translate-x-0 translate-y-0 scale-100" : "opacity-0 -translate-x-8 translate-y-6 scale-90"
            }`}
          >
            {/* Animated Slide Content Area */}
            <div key={activeSlide} className="animate-slide-fade">
              {/* Top Row: Mini Sparkline Graph + Balance */}
              <div className="flex items-center justify-between mb-4">
                {/* Mini Sparkline Pill Container */}
                <div
                  className="w-16 h-14 rounded-2xl p-1.5 flex flex-col justify-between relative overflow-hidden transition-colors duration-300"
                  style={{ backgroundColor: BALANCE_SLIDES[activeSlide].sparklineBg }}
                >
                  <svg
                    viewBox="0 0 100 45"
                    className="w-full h-7 mt-1"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d={BALANCE_SLIDES[activeSlide].sparklinePath}
                      stroke={BALANCE_SLIDES[activeSlide].sparklineStroke}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <path
                      d={BALANCE_SLIDES[activeSlide].sparklineFillPath}
                      fill={`url(#${BALANCE_SLIDES[activeSlide].sparklineGradId})`}
                      opacity="0.3"
                    />
                    <defs>
                      <linearGradient
                        id={BALANCE_SLIDES[activeSlide].sparklineGradId}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor={BALANCE_SLIDES[activeSlide].sparklineStroke} />
                        <stop
                          offset="100%"
                          stopColor={BALANCE_SLIDES[activeSlide].sparklineStroke}
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Badge positioned bottom-right */}
                  <div
                    className="self-end text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-2xs transition-colors duration-300"
                    style={{
                      backgroundColor: BALANCE_SLIDES[activeSlide].badgeBg,
                      color: BALANCE_SLIDES[activeSlide].badgeText,
                    }}
                  >
                    <span>↑</span> {BALANCE_SLIDES[activeSlide].growth}
                  </div>
                </div>

                {/* Balance Amount */}
                <div className="text-right">
                  <span className="text-[11px] sm:text-[12px] text-gray-400 font-medium block">
                    Balance
                  </span>
                  <span className="text-[18px] sm:text-[22px] font-bold text-gray-900 tracking-tight block">
                    {BALANCE_SLIDES[activeSlide].balance}
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

                {BALANCE_SLIDES[activeSlide].transactions.map((tx, txIdx) => (
                  <div
                    key={txIdx}
                    className={`grid grid-cols-4 items-center text-[10px] sm:text-[11px] py-2 text-gray-800 font-medium ${
                      txIdx === 0 ? "border-b border-gray-50" : ""
                    }`}
                  >
                    <span className="truncate">{tx.recipient}</span>
                    <span className="flex items-center gap-1">
                      {tx.flag}
                      <span className="text-[10px] text-gray-600">{tx.country}</span>
                    </span>
                    <span className="text-gray-500 text-[10px]">{tx.date}</span>
                    <span className="text-right font-bold text-gray-900">{tx.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom 3 Dots Indicator - Functional Pagination */}
            <div
              className="flex items-center justify-center gap-1.5 mt-3"
              role="tablist"
              aria-label="Transaction slides"
            >
              {BALANCE_SLIDES.map((_, idx) => {
                const isActive = activeSlide === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`View transaction slide ${idx + 1}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSlide(idx);
                    }}
                    className="p-1 -m-0.5 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00D2FF] group cursor-pointer"
                  >
                    <span
                      className={`h-1 rounded-full transition-all duration-300 ease-out ${
                        isActive
                          ? "w-3.5 bg-[#00D2FF] shadow-[0_0_8px_rgba(0,210,255,0.6)]"
                          : "w-1 bg-gray-300 group-hover:bg-gray-400"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Floating Widget 3: Currency Converter (Bottom Right) */}
          <div
            className={`absolute bottom-6 sm:bottom-10 -right-2 sm:-right-8 md:-right-10 z-30 w-[145px] sm:w-[155px] flex flex-col gap-1 transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] delay-850 hover:-translate-y-1 ${
              isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90"
            }`}
          >
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
      </div>

      {/* Bottom Bar: Scroll Indicator & Help Link */}
      <footer
        className={`relative z-30 w-full px-4 sm:px-8 lg:px-14 py-4 sm:py-6 flex items-center justify-between transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] delay-900 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
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
