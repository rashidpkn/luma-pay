import { useState, useEffect, useRef } from "react";
import { useLenis } from "../../../components/SmoothScroll";
import {
  FileCheck,
  Send,
  ArrowLeftRight,
  CreditCard,
  Check,
  TrendingUp,
} from "lucide-react";
import sphereImg from "../../../assets/ribbed-sphere.png";

// SVG Flags for crisp resolution
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

const UKFlag = () => (
  <svg viewBox="0 0 512 512" className="w-4 h-4 rounded-full inline-block shadow-xs flex-shrink-0">
    <path fill="#00247d" d="M0 0h512v512H0z" />
    <path fill="#fff" d="M0 0l512 512m0-512L0 512" stroke="#fff" strokeWidth="60" />
    <path fill="#cf142b" d="M0 0l512 512m0-512L0 512" stroke="#cf142b" strokeWidth="35" />
    <path fill="#fff" d="M256 0v512M0 256h512" stroke="#fff" strokeWidth="100" />
    <path fill="#cf142b" d="M256 0v512M0 256h512" stroke="#cf142b" strokeWidth="60" />
  </svg>
);

const EUFlag = () => (
  <svg viewBox="0 0 512 512" className="w-4 h-4 rounded-full inline-block shadow-xs flex-shrink-0">
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
    </g>
  </svg>
);

const BrazilFlag = () => (
  <svg viewBox="0 0 512 512" className="w-4 h-4 rounded-full inline-block shadow-xs flex-shrink-0">
    <path fill="#6da544" d="M0 0h512v512H0z" />
    <path fill="#ffda44" d="M256 64 472 256 256 448 40 256z" />
    <circle cx="256" cy="256" r="112" fill="#0052b4" />
  </svg>
);

const UAEDirhamFlag = () => (
  <svg viewBox="0 0 512 512" className="w-4 h-4 rounded-full inline-block shadow-xs flex-shrink-0">
    <path fill="#496e2d" d="M0 85.3h512v113.8H0z" />
    <path fill="#f0f0f0" d="M0 199.1h512v113.8H0z" />
    <path fill="#000" d="M0 312.9h512v113.8H0z" />
    <path fill="#d80027" d="M0 85.3h170.7v341.4H0z" />
  </svg>
);

// Theme Cyan & White Inline Title SVGs matching speedy.io exactly
const SvgWalletSeconds = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block w-8 h-8 sm:w-11 sm:h-11 lg:w-13 lg:h-13 mx-1.5 sm:mx-2 align-middle transition-transform duration-300 hover:scale-110 drop-shadow-[0_0_12px_rgba(0,210,255,0.4)]"
  >
    <path
      d="M25.6667 50.1669H35C41.5987 50.1669 44.9003 50.1669 46.949 48.1159C49 46.0672 49 42.7655 49 36.1669V33.8335C49 27.2349 49 23.9332 46.949 21.8845C44.9003 19.8335 41.5987 19.8335 35 19.8335H7.00001M7.00001 19.8335V31.5002M7.00001 19.8335C6.99858 19.2304 7.16416 18.6387 7.4784 18.1239C7.79263 17.609 8.24326 17.1913 8.78034 16.9169L29.5237 6.24887C30.0964 5.95396 30.7354 5.81131 31.3792 5.83461C32.023 5.85792 32.65 6.0464 33.2 6.38194C33.7499 6.71749 34.2044 7.18882 34.5196 7.75066C34.8348 8.3125 35.0002 8.94597 35 9.5902V19.8289"
      stroke="#00D2FF"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M40.8333 36.1666C41.1428 36.1666 41.4395 36.0437 41.6583 35.8249C41.8771 35.6061 42 35.3093 42 34.9999C42 34.6905 41.8771 34.3938 41.6583 34.175C41.4395 33.9562 41.1428 33.8333 40.8333 33.8333M40.8333 36.1666C40.5239 36.1666 40.2272 36.0437 40.0084 35.8249C39.7896 35.6061 39.6667 35.3093 39.6667 34.9999C39.6667 34.6905 39.7896 34.3938 40.0084 34.175C40.2272 33.9562 40.5239 33.8333 40.8333 33.8333M40.8333 36.1666V33.8333M23.3333 41.9999H15.1667M15.1667 41.9999H7M15.1667 41.9999V33.8333M15.1667 41.9999V50.1666"
      stroke="#00D2FF"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SvgReceiptOverview = () => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-1.5 sm:mx-2 align-middle transition-transform duration-300 hover:scale-110 drop-shadow-[0_0_12px_rgba(0,210,255,0.4)]"
  >
    <path
      d="M9.10461 36.9966L5.09615 33.3685V2.10333H33.2841V7.56831V8.15614V19.9679H35.3894V9.67164H40.8413L37.6235 0H3V34.3054L9.11382 39.8439L14.1152 35.2974L18.804 40L20.2934 38.5121L14.1795 32.3949L9.10461 36.9966ZM37.9361 7.56831H35.3986V2.10333H36.1157L37.9361 7.56831Z"
      fill="#00D2FF"
    />
    <path d="M28.0336 7.56836H10.3633V9.67169H28.0336V7.56836Z" fill="#00D2FF" />
    <path d="M22.9862 17.6533H10.3633V19.7567H22.9862V17.6533Z" fill="#00D2FF" />
    <path d="M20.458 12.6108H10.3633V14.7142H20.458V12.6108Z" fill="#00D2FF" />
    <path
      d="M30.0573 22.6958C25.3041 22.6958 21.4336 26.5626 21.4336 31.3112C21.4336 36.0598 25.3041 39.9266 30.0573 39.9266C34.8104 39.9266 38.681 36.0598 38.681 31.3112C38.681 26.5626 34.8196 22.6958 30.0573 22.6958ZM30.0573 37.8324C26.4625 37.8324 23.5389 34.9116 23.5389 31.3204C23.5389 27.7291 26.4625 24.8083 30.0573 24.8083C33.652 24.8083 36.5756 27.7291 36.5756 31.3204C36.5756 34.9116 33.652 37.8324 30.0573 37.8324Z"
      fill="#00D2FF"
    />
    <path
      d="M29.1833 31.8805L27.6755 30.3833L26.1953 31.8713L29.1833 34.8472L33.964 30.0802L32.4746 28.5923L29.1833 31.8805Z"
      fill="#00D2FF"
    />
  </svg>
);

const SvgSendAnywhere = () => (
  <svg
    width="57"
    height="57"
    viewBox="0 0 57 57"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block w-8 h-8 sm:w-11 sm:h-11 lg:w-13 lg:h-13 mx-1.5 sm:mx-2 align-middle transition-transform duration-300 hover:scale-110 drop-shadow-[0_0_12px_rgba(0,210,255,0.4)]"
  >
    <path
      d="M5.3877 41.5136C10.521 41.5136 14.6814 45.6693 14.6814 50.8026M42.6814 50.805V50.5903C42.6814 49.3983 42.9161 48.218 43.3723 47.1168C43.8284 46.0156 44.497 45.015 45.3399 44.1721C46.1827 43.3293 47.1833 42.6607 48.2845 42.2046C49.3858 41.7484 50.5661 41.5136 51.758 41.5136M14.6814 18.22C14.6814 23.3533 10.521 27.5113 5.3877 27.5113M42.6814 18.22C42.6814 23.3066 46.809 27.439 51.8794 27.5113"
      stroke="#00D2FF"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M40.3477 18.1825C45.4227 18.2105 48.1713 18.4368 49.9633 20.2288C52.0143 22.2798 52.0143 25.5792 52.0143 32.1778V36.8445C52.0143 43.4455 52.0143 46.7448 49.9633 48.7958C47.9147 50.8445 44.613 50.8445 38.0143 50.8445H19.3477C12.749 50.8445 9.44732 50.8445 7.39866 48.7958C5.34766 46.7402 5.34766 43.4455 5.34766 36.8445V32.1778C5.34766 25.5792 5.34766 22.2798 7.39866 20.2288C9.19066 18.4368 11.9393 18.2105 17.0143 18.1802"
      stroke="#00D2FF"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.8473 12.3492C22.8473 12.3492 27.0473 6.51587 28.6807 6.51587C30.314 6.51587 34.514 12.3492 34.514 12.3492M28.6807 19.3492V7.68254M35.6807 34.5135C35.6807 36.3701 34.9432 38.1505 33.6304 39.4633C32.3177 40.776 30.5372 41.5135 28.6807 41.5135C26.8241 41.5135 25.0437 40.776 23.7309 39.4633C22.4182 38.1505 21.6807 36.3701 21.6807 34.5135C21.6807 32.657 22.4182 30.8765 23.7309 29.5638C25.0437 28.251 26.8241 27.5135 28.6807 27.5135C30.5372 27.5135 32.3177 28.251 33.6304 29.5638C34.9432 30.8765 35.6807 32.657 35.6807 34.5135Z"
      stroke="#00D2FF"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SvgConvertConfidence = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block w-8 h-8 sm:w-11 sm:h-11 lg:w-13 lg:h-13 mx-1.5 sm:mx-2 align-middle transition-transform duration-300 hover:scale-110 drop-shadow-[0_0_12px_rgba(0,210,255,0.4)]"
  >
    <path
      d="M7 28C7 20.2603 13.2603 14 21 14L18.6667 18.6667M49 28C49 35.7397 42.7397 42 35 42L37.3333 37.3333M42 21H35C31.7007 21 30.051 21 29.0267 19.9733C28 18.9513 28 17.3017 28 14C28 10.6983 28 9.051 29.0267 8.02667C30.0487 7 31.6983 7 35 7H42C45.2993 7 46.949 7 47.9733 8.02667C49 9.04867 49 10.6983 49 14C49 17.3017 49 18.949 47.9733 19.9733C46.9513 21 45.3017 21 42 21ZM21 49H14C10.7007 49 9.051 49 8.02667 47.9733C7 46.9513 7 45.3017 7 42C7 38.6983 7 37.051 8.02667 36.0267C9.04867 35 10.6983 35 14 35H21C24.2993 35 25.949 35 26.9733 36.0267C28 37.051 28 38.7007 28 42C28 45.2993 28 46.949 26.9733 47.9733C25.9513 49 24.3017 49 21 49Z"
      stroke="#00D2FF"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M38.5 14H38.521M17.5 42H17.521" stroke="#00D2FF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SvgSpendCard = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block w-8 h-8 sm:w-11 sm:h-11 lg:w-13 lg:h-13 mx-1.5 sm:mx-2 align-middle transition-transform duration-300 hover:scale-110 drop-shadow-[0_0_12px_rgba(0,210,255,0.4)]"
  >
    <rect x="7" y="13" width="42" height="30" rx="6" stroke="#00D2FF" strokeWidth="2.4" />
    <line x1="7" y1="23" x2="49" y2="23" stroke="#00D2FF" strokeWidth="2.4" />
    <rect x="13" y="29" width="8" height="6" rx="1.5" fill="#00D2FF" />
    <circle cx="35" cy="32" r="4.5" stroke="#00D2FF" strokeWidth="2.2" />
    <circle cx="41" cy="32" r="4.5" stroke="#00D2FF" strokeWidth="2.2" />
  </svg>
);

interface StepItem {
  id: number;
  navLabel: string;
  renderTitle: () => React.ReactNode;
  subtitle: string;
}

const stepsConfig: StepItem[] = [
  {
    id: 0,
    navLabel: "Deposit Money",
    renderTitle: () => (
      <>
        <span>Add funds in</span>
        <SvgWalletSeconds />
        <span>seconds</span>
      </>
    ),
    subtitle:
      "Top up easily using your card or bank account. No delays, no complications your money, ready to go.",
  },
  {
    id: 1,
    navLabel: "Get an Overview",
    renderTitle: () => (
      <>
        <span>Get an</span>
        <SvgReceiptOverview />
        <span>Overview</span>
      </>
    ),
    subtitle:
      "See all your balances in one place. Track every incoming and outgoing value with real-time updates and effortless control.",
  },
  {
    id: 2,
    navLabel: "Send Money",
    renderTitle: () => (
      <>
        <span>Send money,</span>
        <SvgSendAnywhere />
        <span>anywhere</span>
      </>
    ),
    subtitle:
      "Pay friends, family, or suppliers locally or abroad. Fast and secure transfers with just a few taps.",
  },
  {
    id: 3,
    navLabel: "Exchange Money",
    renderTitle: () => (
      <>
        <span>Convert with</span>
        <SvgConvertConfidence />
        <span>confidence</span>
      </>
    ),
    subtitle:
      "Swap currencies at great rates, instantly. No hidden fees. Just seamless conversions.",
  },
  {
    id: 4,
    navLabel: "Spend Money",
    renderTitle: () => (
      <>
        <span>Spend money</span>
        <SvgSpendCard />
        <span>globally</span>
      </>
    ),
    subtitle:
      "Pay globally with physical and virtual Luma Pay cards. Zero foreign exchange markup, accepted in 170+ countries.",
  },
];

export default function Steps() {
  const lenis = useLenis();
  const containerRef = useRef<HTMLDivElement>(null);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isDepositing, setIsDepositing] = useState(false);

  // Monitor scroll position in direct sync with smooth Lenis momentum
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const rawProg = Math.min(1, Math.max(0, currentScroll / totalScrollable));
      setSmoothProgress(rawProg);

      // 5 steps: 0, 1, 2, 3, 4 with comfortable landing zones
      const stepIdx = Math.min(4, Math.max(0, Math.round(rawProg * 4)));
      setActiveStep(stepIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    if (lenis) {
      lenis.on("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (lenis) {
        lenis.off("scroll", handleScroll);
      }
    };
  }, [lenis]);

  // Smooth-scroll directly to target step when clicking timeline dot or CTA
  const scrollToStep = (stepIdx: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

    // Step 0: 0%, Step 1: 25%, Step 2: 50%, Step 3: 75%, Step 4: 100%
    const targetRatio = stepIdx / 4;
    const targetY = containerTop + targetRatio * totalScrollable;

    if (lenis) {
      lenis.scrollTo(targetY, {
        duration: 1.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
    }
  };

  const handleDepositAction = () => {
    setIsDepositing(true);
    setTimeout(() => {
      setIsDepositing(false);
      scrollToStep(1);
    }, 700);
  };

  return (
    <section
      id="steps"
      ref={containerRef}
      data-logo-color="white"
      className="relative w-full h-[320vh] bg-[#080F38] text-white"
    >
      {/* Sticky Pinned Viewport Stage */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 pb-4 sm:pb-8 px-4 sm:px-8 lg:px-16 border-t border-white/10 select-none">
        {/* Subtle Ambient Cyan Theme Glows */}
        <div className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-[#00D2FF]/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-[#00D2FF]/6 rounded-full blur-[150px] pointer-events-none" />

        {/* Main Content Row: Left Timeline & Titles + Right Morphing Cards */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto flex-1 flex flex-col lg:flex-row items-center justify-between my-auto">
          {/* Left Column: Timeline + Heading & Paragraph Stack */}
          <div className="w-full lg:w-1/2 flex items-start gap-4 sm:gap-10 lg:gap-16">
            {/* Vertical Timeline Step Tracker: Perfectly Centered & Smoothed */}
            <div className="relative flex flex-col items-start gap-6 sm:gap-8 pt-2 shrink-0">
              {/* Dedicated Column for Vertical Track Line (Centered at 12px) */}
              <div className="absolute left-0 top-2 bottom-0 w-6 pointer-events-none flex justify-center">
                {/* Connecting Track Line: starts at dot 1 center (top: 12px) and ends at dot 5 center (bottom: 12px) */}
                <div className="relative w-[2px] h-[calc(100%-24px)] mt-[12px] bg-slate-800 rounded-full overflow-hidden">
                  {/* Smooth Dynamic Cyan Progress Line */}
                  <div
                    className="absolute top-0 left-0 w-full bg-[#00D2FF] shadow-[0_0_10px_#00D2FF] rounded-full"
                    style={{
                      height: `${Math.min(100, Math.max(0, smoothProgress * 100))}%`,
                    }}
                  />
                </div>
              </div>

              {stepsConfig.map((step, idx) => {
                const isActive = activeStep === idx;
                const isPast = activeStep > idx;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => scrollToStep(idx)}
                    className="group flex items-center gap-4 text-left focus:outline-none cursor-pointer transition-all z-10"
                  >
                    {/* Step Dot Anchor: Fixed 24x24 box guarantees exact 12px center */}
                    <div className="relative flex items-center justify-center w-6 h-6 flex-shrink-0">
                      <div
                        className={`rounded-full transition-all duration-500 ease-out flex items-center justify-center ${isActive
                            ? "w-3.5 h-3.5 bg-[#00D2FF] ring-4 ring-[#00D2FF]/30 shadow-[0_0_12px_#00D2FF]"
                            : isPast
                              ? "w-2.5 h-2.5 bg-[#00D2FF]"
                              : "w-2.5 h-2.5 bg-slate-700 group-hover:bg-slate-500 group-hover:scale-110"
                          }`}
                      />
                    </div>
                    {/* Step Label (Hidden on small screens, keeping glowing 5-dot track) */}
                    <span
                      className={`text-[12px] sm:text-[13px] tracking-tight transition-all duration-500 hidden sm:inline ${isActive
                          ? "text-white font-semibold translate-x-1"
                          : "text-slate-400 group-hover:text-slate-200"
                        }`}
                    >
                      {step.navLabel}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Left Animated Text Container (Speedy.io Title & Text Wrapper) */}
            <div className="flex-1 min-w-0 max-w-md pt-2">
              {/* Stacked Titles (Grid Overlay for Zero Layout Shift) */}
              <div className="grid grid-cols-1 grid-rows-1 mb-2 sm:mb-4 min-h-[72px] sm:min-h-[140px] items-center">
                {stepsConfig.map((step, idx) => {
                  const isCurrent = activeStep === idx;
                  const isPast = activeStep > idx;

                  return (
                    <h2
                      key={`title-${step.id}`}
                      className="col-start-1 row-start-1 text-2xl xs:text-3xl sm:text-4xl lg:text-[50px] font-bold tracking-[-0.03em] leading-[1.12] text-white"
                      style={{
                        transform: isCurrent
                          ? "translate3d(0px, 0px, 0px)"
                          : isPast
                            ? "translate3d(0px, -14px, 0px)"
                            : "translate3d(0px, 14px, 0px)",
                        opacity: isCurrent ? 1 : 0,
                        visibility: isCurrent ? "inherit" : "hidden",
                        pointerEvents: isCurrent ? "auto" : "none",
                        transition:
                          "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
                        willChange: "transform, opacity",
                      }}
                    >
                      {step.renderTitle()}
                    </h2>
                  );
                })}
              </div>

              {/* Stacked Subtitles (Grid Overlay for Smooth Crossfade) */}
              <div className="grid grid-cols-1 grid-rows-1 min-h-[46px] sm:min-h-[80px]">
                {stepsConfig.map((step, idx) => {
                  const isCurrent = activeStep === idx;
                  const isPast = activeStep > idx;

                  return (
                    <p
                      key={`sub-${step.id}`}
                      className="col-start-1 row-start-1 text-[#94A3B8] text-xs sm:text-base lg:text-[17px] font-normal leading-relaxed"
                      style={{
                        transform: isCurrent
                          ? "translate3d(0px, 0px, 0px)"
                          : isPast
                            ? "translate3d(0px, -10px, 0px)"
                            : "translate3d(0px, 10px, 0px)",
                        opacity: isCurrent ? 1 : 0,
                        visibility: isCurrent ? "inherit" : "hidden",
                        pointerEvents: isCurrent ? "auto" : "none",
                        transition:
                          "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
                        willChange: "transform, opacity",
                      }}
                    >
                      {step.subtitle}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Morphing Interactive Theme Cards Stage */}
          <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end mt-1 sm:mt-6 lg:mt-0 relative min-h-[360px] sm:min-h-[500px] lg:min-h-[540px]">
            <div className="relative w-full max-w-[420px] grid grid-cols-1 grid-rows-1 items-center justify-items-center transform scale-[0.66] xs:scale-[0.76] sm:scale-90 lg:scale-100 origin-top">
              {/* STEP 0: DEPOSIT MONEY (Ribbed Sphere Card + Floating Deposit Pills) */}
              <div
                className="col-start-1 row-start-1 w-full flex items-center justify-center"
                style={{
                  opacity: activeStep === 0 ? 1 : 0,
                  transform:
                    activeStep === 0
                      ? "translate3d(0, 0, 0) scale(1)"
                      : activeStep > 0
                        ? "translate3d(0, -18px, 0) scale(0.96)"
                        : "translate3d(0, 18px, 0) scale(0.96)",
                  pointerEvents: activeStep === 0 ? "auto" : "none",
                  visibility: activeStep === 0 ? "visible" : "hidden",
                  transition:
                    "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
                  willChange: "transform, opacity",
                }}
              >
                {/* Main Dark Theme Card with 3D Ribbed Sphere */}
                <div className="relative w-[340px] sm:w-[380px] h-[500px] bg-[#0B132B]/90 backdrop-blur-2xl rounded-[38px] p-8 shadow-[0_30px_70px_rgba(0,0,0,0.7)] border border-white/10 flex flex-col justify-between overflow-hidden">
                  <div className="flex justify-end">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-right">
                      Deposit
                      <br />
                      Money
                    </h3>
                  </div>

                  {/* Centered Ribbed Sphere */}
                  <div className="relative w-full flex items-center justify-center my-auto">
                    <img
                      src={sphereImg}
                      alt="3D Ribbed Sphere"
                      className="w-[230px] sm:w-[260px] h-auto object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.6)] transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  {/* Bottom Status Pill */}
                  <div className="self-center">
                    <span className="text-[12px] text-slate-400 font-medium bg-slate-900/80 px-4 py-1.5 rounded-full border border-white/10 shadow-inner">
                      {isDepositing ? "Depositing Money..." : "Select account to deposit"}
                    </span>
                  </div>
                </div>

                {/* Floating Deposit Pill 1 (USD NY Account, Top Left) */}
                <div className="absolute top-14 -left-3 sm:-left-7 z-20 bg-[#0f172a]/95 text-white backdrop-blur-md rounded-2xl p-3 shadow-[0_12px_30px_rgba(0,0,0,0.5)] border border-white/15 w-[140px] flex flex-col text-left transition-transform hover:-translate-y-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <USAFlag />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-white leading-tight">
                        USD
                      </span>
                      <span className="text-[8px] text-slate-400 leading-tight">
                        NY Account
                      </span>
                    </div>
                  </div>
                  <span className="text-base font-bold text-white my-1">
                    £1,250
                  </span>
                  <button
                    type="button"
                    onClick={handleDepositAction}
                    className="w-full text-center py-1 text-[11px] font-semibold text-white bg-white/10 border border-white/15 rounded-full hover:bg-[#00D2FF] hover:text-[#080F38] hover:border-[#00D2FF] transition-colors cursor-pointer mt-1"
                  >
                    Deposit
                  </button>
                </div>

                {/* Floating Deposit Pill 2 (EUR Paris Account, Center Sphere) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-[#0f172a]/95 text-white backdrop-blur-md rounded-2xl p-3.5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-[#00D2FF]/30 w-[150px] flex flex-col text-left transition-all hover:scale-105">
                  <div className="flex items-center gap-1.5 mb-1">
                    <EUFlag />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-white leading-tight">
                        EUR
                      </span>
                      <span className="text-[8px] text-slate-400 leading-tight">
                        Paris Account
                      </span>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-white my-1">
                    $150
                  </span>
                  <button
                    type="button"
                    onClick={handleDepositAction}
                    className="w-full text-center py-1.5 text-[11px] font-bold text-[#080F38] bg-[#00D2FF] rounded-full hover:bg-[#38bdf8] transition-colors shadow-[0_0_12px_rgba(0,210,255,0.4)] cursor-pointer mt-1"
                  >
                    {isDepositing ? "Processing..." : "Deposit"}
                  </button>
                </div>

                {/* Floating Deposit Pill 3 (GBP London Account, Bottom Left) */}
                <div className="absolute bottom-10 -left-1 sm:-left-5 z-20 bg-[#0f172a]/95 text-white backdrop-blur-md rounded-2xl p-3 shadow-[0_12px_30px_rgba(0,0,0,0.5)] border border-white/15 w-[140px] flex flex-col text-left transition-transform hover:-translate-y-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <UKFlag />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-white leading-tight">
                        GBP
                      </span>
                      <span className="text-[8px] text-slate-400 leading-tight">
                        London Account
                      </span>
                    </div>
                  </div>
                  <span className="text-base font-bold text-white my-1">
                    £1,250
                  </span>
                  <button
                    type="button"
                    onClick={handleDepositAction}
                    className="w-full text-center py-1 text-[11px] font-semibold text-white bg-white/10 border border-white/15 rounded-full hover:bg-[#00D2FF] hover:text-[#080F38] hover:border-[#00D2FF] transition-colors cursor-pointer mt-1"
                  >
                    Deposit
                  </button>
                </div>
              </div>

              {/* STEP 1: GET AN OVERVIEW (Overview Card + Slide-in Deposit Completed Pill) */}
              <div
                className="col-start-1 row-start-1 w-full flex items-center justify-center"
                style={{
                  opacity: activeStep === 1 ? 1 : 0,
                  transform:
                    activeStep === 1
                      ? "translate3d(0, 0, 0) scale(1)"
                      : activeStep > 1
                        ? "translate3d(0, -18px, 0) scale(0.96)"
                        : "translate3d(0, 18px, 0) scale(0.96)",
                  pointerEvents: activeStep === 1 ? "auto" : "none",
                  visibility: activeStep === 1 ? "visible" : "hidden",
                  transition:
                    "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
                  willChange: "transform, opacity",
                }}
              >
                {/* Floating Notification Pill: Deposit Completed */}
                <div className="absolute -top-5 -right-3 z-30 bg-[#0f172a]/95 text-white backdrop-blur-md rounded-2xl p-3 shadow-[0_15px_35px_rgba(0,0,0,0.6)] border border-[#00D2FF]/40 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#00D2FF] flex items-center justify-center text-[#080F38] flex-shrink-0 shadow-sm">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div className="flex flex-col text-left pr-2">
                    <span className="text-[11px] font-bold text-white">
                      Deposit Completed
                    </span>
                    <span className="text-[10px] text-[#00D2FF] font-medium">
                      +$150.00 EUR from Paris Account
                    </span>
                  </div>
                </div>

                {/* Main Overview Card */}
                <div className="relative w-[340px] sm:w-[380px] bg-[#0B132B]/90 backdrop-blur-2xl text-white rounded-[38px] p-7 shadow-[0_30px_70px_rgba(0,0,0,0.7)] border border-white/10 flex flex-col justify-between min-h-[500px]">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <span className="text-[11px] text-slate-400 font-medium tracking-wider uppercase block">
                          Total Balance
                        </span>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-3xl font-bold tracking-tight text-white">
                            €24,850.40
                          </span>
                          <span className="text-[11px] font-semibold text-[#00D2FF] flex items-center">
                            <TrendingUp className="w-3 h-3 mr-0.5" /> +12.4%
                          </span>
                        </div>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                        <FileCheck className="w-4 h-4 text-[#00D2FF]" />
                      </div>
                    </div>

                    {/* Account Balances Row */}
                    <div className="grid grid-cols-3 gap-2 mb-5">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-left">
                        <div className="flex items-center gap-1 mb-1">
                          <EUFlag />
                          <span className="text-[10px] text-slate-400 font-semibold">EUR</span>
                        </div>
                        <span className="text-xs font-bold text-white block">€14,200</span>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-left">
                        <div className="flex items-center gap-1 mb-1">
                          <USAFlag />
                          <span className="text-[10px] text-slate-400 font-semibold">USD</span>
                        </div>
                        <span className="text-xs font-bold text-white block">$8,450</span>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-left">
                        <div className="flex items-center gap-1 mb-1">
                          <UKFlag />
                          <span className="text-[10px] text-slate-400 font-semibold">GBP</span>
                        </div>
                        <span className="text-xs font-bold text-white block">£2,200</span>
                      </div>
                    </div>

                    {/* Recent Activity List */}
                    <div className="space-y-2 text-left">
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                        Recent Activity
                      </span>
                      {[
                        {
                          title: "Paris Account Deposit",
                          time: "Just now • Online",
                          amt: "+$150.00",
                          color: "text-[#00D2FF]",
                        },
                        {
                          title: "Michael Turner Transfer",
                          time: "Today • Instant SEPA",
                          amt: "-€120.00",
                          color: "text-white",
                        },
                        {
                          title: "Currency Swap (USD/EUR)",
                          time: "Yesterday • Zero Fee",
                          amt: "+€520.00",
                          color: "text-[#00D2FF]",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="bg-white/5 border border-white/5 rounded-xl p-2.5 flex items-center justify-between hover:bg-white/10 transition-colors"
                        >
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-white">{item.title}</span>
                            <span className="text-[10px] text-slate-400">{item.time}</span>
                          </div>
                          <span className={`text-xs font-bold ${item.color}`}>{item.amt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <button
                    type="button"
                    onClick={() => scrollToStep(2)}
                    className="w-full mt-5 py-3 rounded-2xl bg-[#00D2FF] text-[#080F38] font-bold text-sm hover:bg-[#38bdf8] transition-colors cursor-pointer shadow-[0_4px_20px_rgba(0,210,255,0.3)] tracking-tight flex items-center justify-center gap-2"
                  >
                    <span>Send Money</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* STEP 2: SEND MONEY (Transfer Details Card) */}
              <div
                className="col-start-1 row-start-1 w-full flex items-center justify-center"
                style={{
                  opacity: activeStep === 2 ? 1 : 0,
                  transform:
                    activeStep === 2
                      ? "translate3d(0, 0, 0) scale(1)"
                      : activeStep > 2
                        ? "translate3d(0, -18px, 0) scale(0.96)"
                        : "translate3d(0, 18px, 0) scale(0.96)",
                  pointerEvents: activeStep === 2 ? "auto" : "none",
                  visibility: activeStep === 2 ? "visible" : "hidden",
                  transition:
                    "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
                  willChange: "transform, opacity",
                }}
              >
                {/* Floating "Sent!" Badge */}
                <div className="absolute -top-4 -right-2 z-30 bg-[#00D2FF] text-[#080F38] rounded-full px-4 py-1.5 text-xs font-bold shadow-xl border border-white/20 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#080F38] animate-pulse" />
                  <span>Instant Transfer</span>
                </div>

                {/* Main Send Money Card */}
                <div className="relative w-[340px] sm:w-[380px] bg-[#0B132B]/90 backdrop-blur-2xl text-white rounded-[38px] p-7 shadow-[0_30px_70px_rgba(0,0,0,0.7)] border border-white/10 flex flex-col justify-between min-h-[500px]">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white text-left mb-5">
                      Send Money
                    </h3>

                    {/* Sender -> Recipient Visual Box */}
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/10 shadow-xs mb-4 text-left">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#00D2FF] text-[#080F38] font-bold text-xs flex items-center justify-center">
                            MT
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-white">Michael Turner</span>
                            <span className="text-[10px] text-slate-400">Main Account • EUR</span>
                          </div>
                        </div>
                        <EUFlag />
                      </div>

                      <div className="flex items-center justify-center my-2">
                        <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
                          <Send className="w-3.5 h-3.5 text-[#00D2FF]" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-sky-500 text-white font-bold text-xs flex items-center justify-center">
                            JC
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-white">Jane Cooper</span>
                            <span className="text-[10px] text-slate-400">UK Account • Instant</span>
                          </div>
                        </div>
                        <UKFlag />
                      </div>
                    </div>

                    {/* Amount Input Display */}
                    <div className="bg-slate-900/90 text-white rounded-2xl p-4 text-left border border-white/10 shadow-inner">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                        Transfer Amount
                      </span>
                      <div className="flex items-baseline justify-between">
                        <span className="text-3xl font-bold text-white">€120.00</span>
                        <span className="text-xs font-semibold text-[#00D2FF]">Zero Fee</span>
                      </div>
                      <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between border-t border-white/10 pt-2">
                        <span>Delivery time</span>
                        <span className="text-white font-medium">Under 2 seconds</span>
                      </div>
                    </div>
                  </div>

                  {/* Advance to Step 3 */}
                  <button
                    type="button"
                    onClick={() => scrollToStep(3)}
                    className="w-full mt-5 py-3 rounded-2xl bg-[#00D2FF] text-[#080F38] font-bold text-sm hover:bg-[#38bdf8] transition-colors cursor-pointer shadow-[0_4px_20px_rgba(0,210,255,0.3)] tracking-tight flex items-center justify-center gap-2"
                  >
                    <span>Exchange Currency</span>
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* STEP 3: CONVERT CURRENCY (Exchange Rates Matrix) */}
              <div
                className="col-start-1 row-start-1 w-full flex items-center justify-center"
                style={{
                  opacity: activeStep === 3 ? 1 : 0,
                  transform:
                    activeStep === 3
                      ? "translate3d(0, 0, 0) scale(1)"
                      : activeStep > 3
                        ? "translate3d(0, -18px, 0) scale(0.96)"
                        : "translate3d(0, 18px, 0) scale(0.96)",
                  pointerEvents: activeStep === 3 ? "auto" : "none",
                  visibility: activeStep === 3 ? "visible" : "hidden",
                  transition:
                    "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
                  willChange: "transform, opacity",
                }}
              >
                <div className="relative w-[340px] sm:w-[380px] bg-[#0B132B]/90 backdrop-blur-2xl text-white rounded-[38px] p-7 shadow-[0_30px_70px_rgba(0,0,0,0.7)] border border-white/10 flex flex-col justify-between min-h-[500px]">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold tracking-tight text-white text-left">
                        Convert Currency
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <ArrowLeftRight className="w-4 h-4 text-[#00D2FF]" />
                      </div>
                    </div>

                    {/* From Amount Box */}
                    <div className="bg-slate-900/90 rounded-2xl p-3.5 border border-white/10 text-left mb-3">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>You convert</span>
                        <span>Balance: $8,450.00</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-white">$150.00</span>
                        <div className="flex items-center gap-1.5 bg-black/50 px-2.5 py-1 rounded-full border border-gray-700">
                          <USAFlag />
                          <span className="text-xs font-bold text-white">USD</span>
                        </div>
                      </div>
                    </div>

                    {/* Live Multi-currency Conversions */}
                    <div className="text-left">
                      <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                        Instant Live Conversions
                      </span>
                      <div className="space-y-1.5">
                        {[
                          {
                            name: "BRL",
                            full: "Brazilian Real",
                            result: "R$ 785.40",
                            rate: "1 USD = 5.236 BRL",
                            flag: BrazilFlag,
                          },
                          {
                            name: "EUR",
                            full: "Euro",
                            result: "€138.20",
                            rate: "1 USD = 0.921 EUR",
                            flag: EUFlag,
                          },
                          {
                            name: "GBP",
                            full: "British Pound",
                            result: "£118.50",
                            rate: "1 USD = 0.790 GBP",
                            flag: UKFlag,
                          },
                          {
                            name: "AED",
                            full: "UAE Dirham",
                            result: "د.إ 550.80",
                            rate: "1 USD = 3.672 AED",
                            flag: UAEDirhamFlag,
                          },
                        ].map((curr, i) => {
                          const Flag = curr.flag;
                          return (
                            <div
                              key={i}
                              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-2.5 flex items-center justify-between transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <Flag />
                                <div className="flex flex-col">
                                  <span className="text-xs font-bold text-white">{curr.name}</span>
                                  <span className="text-[9px] text-slate-400">{curr.full}</span>
                                </div>
                              </div>
                              <div className="flex flex-col text-right">
                                <span className="text-xs font-bold text-[#00D2FF]">{curr.result}</span>
                                <span className="text-[8px] text-slate-400">{curr.rate}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Advance to Step 4 */}
                  <button
                    type="button"
                    onClick={() => scrollToStep(4)}
                    className="w-full mt-4 py-3 rounded-2xl bg-[#00D2FF] text-[#080F38] font-bold text-sm hover:bg-[#38bdf8] transition-colors cursor-pointer shadow-[0_4px_20px_rgba(0,210,255,0.3)] tracking-tight flex items-center justify-center gap-2"
                  >
                    <span>Spend Worldwide</span>
                    <CreditCard className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* STEP 4: SPEND MONEY (Luma Pay Metallic Card) */}
              <div
                className="col-start-1 row-start-1 w-full flex items-center justify-center"
                style={{
                  opacity: activeStep === 4 ? 1 : 0,
                  transform:
                    activeStep === 4
                      ? "translate3d(0, 0, 0) scale(1)"
                      : "translate3d(0, 18px, 0) scale(0.96)",
                  pointerEvents: activeStep === 4 ? "auto" : "none",
                  visibility: activeStep === 4 ? "visible" : "hidden",
                  transition:
                    "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
                  willChange: "transform, opacity",
                }}
              >
                <div className="relative w-[340px] sm:w-[380px] bg-[#0B132B]/90 backdrop-blur-2xl text-white rounded-[38px] p-7 shadow-[0_30px_70px_rgba(0,0,0,0.7)] border border-white/10 flex flex-col justify-between min-h-[500px]">
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-white mb-5 text-left">
                      Spend
                      <br />
                      Worldwide
                    </h3>

                    {/* Sleek Luma Pay Metallic Card */}
                    <div className="relative w-full h-[200px] rounded-2xl p-5 bg-gradient-to-tr from-[#080F38] via-[#0f172a] to-[#0284c7]/40 border border-[#00D2FF]/30 shadow-2xl overflow-hidden flex flex-col justify-between group transition-transform duration-500 hover:scale-[1.02]">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D2FF]/20 rounded-full blur-2xl pointer-events-none" />

                      {/* Card Top Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src="/favicon.png" alt="LP" className="w-6 h-6 rounded-md object-contain" />
                          <span className="text-xs font-bold tracking-widest text-white uppercase">
                            Luma Pay
                          </span>
                        </div>
                        {/* Contactless Wave */}
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8.5 16.5a5 5 0 0 1 0-9M12 19a8.5 8.5 0 0 0 0-14M15.5 21.5a12 12 0 0 0 0-19" />
                        </svg>
                      </div>

                      {/* EMV Chip */}
                      <div className="w-9 h-7 rounded-md bg-amber-200/80 border border-amber-300/60 shadow-inner flex items-center justify-center my-1.5">
                        <div className="w-7 h-5 border border-amber-500/40 rounded-xs" />
                      </div>

                      {/* Card Bottom Row */}
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="text-[13px] font-mono tracking-widest text-white/90 block">
                            •••• •••• •••• 4829
                          </span>
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-0.5">
                            Jane Cooper
                          </span>
                        </div>
                        <span className="text-lg font-bold italic tracking-tighter text-white">
                          VISA
                        </span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="mt-5 flex flex-col gap-2 text-left">
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-[#00D2FF]/20 text-[#00D2FF] flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </div>
                        <span>Instant Apple Pay & Google Wallet sync</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-[#00D2FF]/20 text-[#00D2FF] flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </div>
                        <span>Zero foreign transaction fees globally</span>
                      </div>
                    </div>
                  </div>

                  {/* Restart Loop Button */}
                  <button
                    type="button"
                    onClick={() => scrollToStep(0)}
                    className="w-full mt-5 py-3 rounded-2xl bg-[#00D2FF] text-[#080F38] font-bold text-sm hover:bg-[#38bdf8] transition-colors cursor-pointer shadow-[0_4px_20px_rgba(0,210,255,0.3)] tracking-tight"
                  >
                    Start from Step 1
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status & Help Bar */}

      </div>
    </section>
  );
}
