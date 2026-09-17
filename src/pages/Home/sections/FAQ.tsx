import { useState, useRef, useEffect } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "../../../components/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const FAQ_LIST: FAQItem[] = [
  {
    question: "What is Luma Pay and how does it work?",
    answer:
      "Luma Pay is a registered Money Services Business (FINTRAC) providing multi-currency accounts, foreign exchange, and cross-border payment services for businesses and individuals, with virtual currency conversion as an additional capability.",
  },
  {
    question: "Is Luma Pay open for business yet?",
    answer:
      "Luma Pay Inc. is registered with FINTRAC as a Money Services Business and is preparing for launch. We are not yet processing live client transactions. You are welcome to register your interest now, and we will contact you when onboarding opens.",
  },
  {
    question: "Who can use Luma Pay?",
    answer:
      "Luma Pay is designed for approved businesses and individuals in our supported corridors, subject to onboarding, eligibility and compliance checks.",
  },
  {
    question: "How long does account approval take?",
    answer:
      "Timing depends on how complete your application is and the KYC/AML checks required for your business. Expected timelines are confirmed with you during onboarding.",
  },
  {
    question: "How do you calculate exchange rates?",
    answer:
      "Live pricing is sourced from institutional liquidity providers and presented before execution.",
  },
  {
    question: "Is Luma Pay regulated?",
    answer:
      "Luma Pay Inc. is registered with FINTRAC as a Money Services Business (MSB No. N300000118) and applies KYC, AML and transaction-monitoring controls. Registration as an MSB is not an endorsement by FINTRAC and does not extend beyond the activities covered by that registration.",
  },
  {
    question: "Which countries do you serve?",
    answer:
      "Our planned corridors are Canada, the United Kingdom, the European Union (Germany, the Netherlands and Ireland), the United States and Australia. Additional markets will only be added once they have been formally assessed and approved under our compliance program.",
  },
  {
    question: "How long do cross-border payments take?",
    answer:
      "Timing varies by payment rail, banking cut-off and currency corridor. Your portal displays the latest status.",
  },
  {
    question: "How long do virtual currency conversions take?",
    answer:
      "Settlement time depends on the destination bank, local clearing system, network conditions and compliance review requirements.",
  },
  {
    question: "Which virtual currencies do you support?",
    answer:
      "Virtual currency conversion is an additional capability alongside our core fiat services. Supported assets include selected stablecoins and may vary by account, jurisdiction and network availability.",
  },
  {
    question: "Which blockchain networks do you support?",
    answer:
      "Available networks are shown inside the portal and can vary by asset and transaction type.",
  },
  {
    question: "My transaction is stuck or delayed. What do I do?",
    answer:
      "Contact support with the transaction reference so the team can review the payment status and next steps.",
  },
  {
    question: "Can I cancel a transaction?",
    answer:
      "Cancellation depends on whether the transaction has already been quoted, approved or executed.",
  },
  {
    question: "How can I contact support?",
    answer: (
      <span>
        Email{" "}
        <a
          href="mailto:support@luma-pay.io"
          className="text-[#00D2FF] hover:underline font-semibold"
        >
          support@luma-pay.io
        </a>{" "}
        or speak with your dedicated relationship manager.
      </span>
    ),
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // First item open by default matching `details open=""` in reference
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

    // Refresh ScrollTrigger positions after accordion animation expands or collapses
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 320);
  };

  // Sync GSAP ScrollTrigger with Lenis
  useEffect(() => {
    if (!lenis) return;
    const handleLenisScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleLenisScroll);
    return () => {
      lenis.off("scroll", handleLenisScroll);
    };
  }, [lenis]);

  // GSAP animations for FAQ items
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)",
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };
        const xDistance = isDesktop ? 70 : 35;

        const cards = faqListRef.current?.querySelectorAll(".faq-item");
        if (!cards || cards.length === 0) return;

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              x: xDistance,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.55,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                end: "bottom top",
                // onEnter: play (slides in from right)
                // onLeave: reverse (slides out to right if scrolled past)
                // onEnterBack: play (slides back in from right when scrolling down)
                // onLeaveBack: reverse (slides out to right when scrolling up past bottom threshold)
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section faq-section relative w-full bg-[#080F38] text-white py-20 sm:py-28 lg:py-36 px-4 sm:px-8 lg:px-14 border-t border-white/5"
      style={{ overflow: "clip" }}
      id="faqs"
      aria-labelledby="faq-title"
    >
      {/* Ambient glow backdrop accents contained inside absolute layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#00D2FF]/4 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-[#3805F6]/7 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-16 xl:gap-24">
        {/* Left Column: FAQ Intro (Sticky on desktop until the section is over) */}
        <div
          ref={leftColRef}
          className="w-full lg:w-5/12 lg:sticky lg:top-28 xl:top-32 lg:self-start"
        >
          <div className="faq-intro">
            {/* Pill label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF] text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-5 shadow-[0_0_15px_rgba(0,210,255,0.12)]">
              <HelpCircle className="w-3.5 h-3.5 text-[#00D2FF]" />
              <span className="pill-label">GOT QUESTIONS?</span>
            </div>

            {/* Heading */}
            <h2
              id="faq-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12] mb-5"
            >
              Frequently Asked Questions
            </h2>

            {/* Subtitle */}
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md mb-8">
              For anything else, reach out to our{" "}
              <a
                href="mailto:support@luma-pay.io"
                className="text-[#00D2FF] hover:underline font-medium transition-colors"
              >
                customer support team
              </a>{" "}
              for assistance.
            </p>


          </div>
        </div>

        {/* Right Column: FAQ Accordion List with GSAP ScrollTrigger */}
        <div
          ref={faqListRef}
          className="w-full lg:w-7/12 flex flex-col gap-3.5 sm:gap-4 faq-list"
        >
          {FAQ_LIST.map((item, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={idx}
                className={`faq-item rounded-2xl transition-all duration-300 overflow-hidden ${isOpen
                  ? "bg-[#0A101F] border border-[#00D2FF]/35 shadow-[0_12px_35px_rgba(0,0,0,0.45),0_0_20px_rgba(0,210,255,0.06)]"
                  : "bg-[#0A101F]/90 hover:bg-[#0A101F] border border-white/5 hover:border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer group select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00D2FF]"
                >
                  <span
                    className={`text-[15px] sm:text-[17px] font-semibold pr-4 leading-snug transition-colors ${isOpen
                      ? "text-white"
                      : "text-gray-200 group-hover:text-white"
                      }`}
                  >
                    {item.question}
                  </span>

                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen
                      ? "bg-[#00D2FF]/15 text-[#00D2FF] rotate-180 shadow-[0_0_10px_rgba(0,210,255,0.2)]"
                      : "bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white"
                      }`}
                  >
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </span>
                </button>

                {/* Animated Answer Tray */}
                <div
                  className={`grid transition-all duration-300 ease-out ${isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0 pointer-events-none"
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 text-sm sm:text-[15px] text-gray-300/90 leading-relaxed border-t border-white/5 mt-1 pt-3">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
