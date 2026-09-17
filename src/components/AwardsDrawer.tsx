import { useEffect } from "react";
import { X } from "lucide-react";
import { useLenis } from "./SmoothScroll";

interface AwardsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// IAS Accredited Management Systems Certification Body Badge
function IASBadge({ className = "h-11 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 125"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="IAS Accredited MSCB-108"
    >
      <rect
        x="3"
        y="3"
        width="94"
        height="119"
        rx="4"
        stroke="white"
        strokeWidth="3.5"
        fill="#0A101F"
      />
      <text
        x="50"
        y="36"
        textAnchor="middle"
        fill="white"
        fontSize="27"
        fontWeight="900"
        fontFamily="sans-serif"
        letterSpacing="1"
      >
        IAS
      </text>
      <rect x="8" y="46" width="84" height="19" fill="white" rx="2" />
      <text
        x="50"
        y="60"
        textAnchor="middle"
        fill="#0A101F"
        fontSize="10.5"
        fontWeight="900"
        fontFamily="sans-serif"
        letterSpacing="1.2"
      >
        ACCREDITED
      </text>
      <text
        x="50"
        y="78"
        textAnchor="middle"
        fill="white"
        fontSize="6.8"
        fontWeight="600"
        fontFamily="sans-serif"
      >
        Management Systems
      </text>
      <text
        x="50"
        y="89"
        textAnchor="middle"
        fill="white"
        fontSize="6.8"
        fontWeight="600"
        fontFamily="sans-serif"
      >
        Certification Body
      </text>
      <line
        x1="18"
        y1="97"
        x2="82"
        y2="97"
        stroke="white"
        strokeWidth="1.2"
        opacity="0.6"
      />
      <text
        x="50"
        y="110"
        textAnchor="middle"
        fill="white"
        fontSize="8.5"
        fontWeight="800"
        fontFamily="sans-serif"
      >
        MSCB-108
      </text>
    </svg>
  );
}

// ISO/IEC Circular Certified Checkmark Badge
function ISOBadge({
  code = "27001",
  className = "h-11 w-auto",
}: {
  code?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 110 110"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`ISO/IEC ${code} Certified`}
    >
      <circle cx="55" cy="55" r="51" stroke="white" strokeWidth="3.5" />
      <circle
        cx="55"
        cy="55"
        r="44"
        stroke="white"
        strokeWidth="1.6"
        strokeDasharray="4 3"
      />
      <path
        d="M37 54 L49 67 L74 41"
        stroke="white"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="55"
        y="89"
        textAnchor="middle"
        fill="white"
        fontSize="9"
        fontWeight="800"
        fontFamily="sans-serif"
        letterSpacing="0.6"
      >
        ISO/IEC {code}
      </text>
    </svg>
  );
}

// PCI DSS COMPLIANT Logo
function PCIDSSBadge({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 70"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PCI DSS Compliant"
    >
      {/* Shield with lock cutout */}
      <path
        d="M30 8 L54 16 V38 C54 53 40 65 30 69 C20 65 6 53 6 38 V16 Z"
        fill="white"
      />
      <rect x="23" y="35" width="14" height="12" rx="2" fill="#0A101F" />
      <path
        d="M26 35 V29 C26 26.8 27.8 25 30 25 C32.2 25 34 26.8 34 29 V35"
        stroke="#0A101F"
        strokeWidth="2.5"
      />

      {/* Stylized PCI DSS letters */}
      <text
        x="66"
        y="41"
        fill="white"
        fontSize="34"
        fontWeight="900"
        fontFamily="sans-serif"
        fontStyle="italic"
        letterSpacing="-1.5"
      >
        PCI
      </text>
      <text
        x="134"
        y="41"
        fill="white"
        fontSize="30"
        fontWeight="800"
        fontFamily="sans-serif"
        letterSpacing="0"
      >
        DSS
      </text>
      <text
        x="66"
        y="58"
        fill="white"
        fontSize="11"
        fontWeight="800"
        fontFamily="sans-serif"
        letterSpacing="4"
      >
        COMPLIANT
      </text>
    </svg>
  );
}

// Official Partner of the Norwegian Football Association (NFF) Logo
function NFFLogo({ className = "w-11 h-11" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Norwegian Football Association Crest"
    >
      <circle cx="50" cy="50" r="46" stroke="white" strokeWidth="4" />
      {/* Stylized interlocking NFF Monogram */}
      <g fill="white">
        {/* N on the left */}
        <rect x="24" y="24" width="7" height="52" rx="1.5" />
        <path d="M28 26 L52 74 H44 L24 34 Z" />
        <rect x="47" y="24" width="7" height="52" rx="1.5" />
        {/* F horizontal arms */}
        <rect x="47" y="24" width="28" height="7" rx="1.5" />
        <rect x="47" y="44" width="22" height="6.5" rx="1.5" />
        {/* Secondary F */}
        <rect x="69" y="32" width="7" height="44" rx="1.5" />
        <rect x="69" y="58" width="16" height="6" rx="1.5" />
      </g>
    </svg>
  );
}

// Official Partner of Legia Warsaw Crest
function LegiaWarsawLogo({ className = "w-10 h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Legia Warsaw Crest"
    >
      <defs>
        <clipPath id="legiaShieldClip">
          <path d="M6 10 C6 10, 40 4, 40 4 C40 4, 74 10, 74 10 C74 54, 52 82, 40 94 C28 82, 6 54, 6 10 Z" />
        </clipPath>
      </defs>
      {/* Shield Outline */}
      <path
        d="M6 10 C6 10, 40 4, 40 4 C40 4, 74 10, 74 10 C74 54, 52 82, 40 94 C28 82, 6 54, 6 10 Z"
        fill="#111113"
        stroke="white"
        strokeWidth="3.5"
      />
      {/* 3 Diagonal Stripes */}
      <g clipPath="url(#legiaShieldClip)">
        {/* Green diagonal stripe */}
        <polygon points="0,0 48,0 0,96" fill="#008754" />
        {/* White middle diagonal stripe */}
        <polygon points="38,0 84,0 0,120 0,82" fill="#ffffff" />
        {/* Red bottom-right diagonal stripe */}
        <polygon points="70,0 100,0 100,100 0,135" fill="#d80027" />
        {/* Thin black separation line */}
        <line x1="28" y1="0" x2="0" y2="56" stroke="#000" strokeWidth="3" />
      </g>
      {/* (L) Emblem Circle */}
      <circle
        cx="47"
        cy="38"
        r="14"
        fill="white"
        stroke="#111"
        strokeWidth="3"
      />
      <text
        x="47"
        y="44"
        textAnchor="middle"
        fontSize="17"
        fontWeight="900"
        fontFamily="sans-serif"
        fill="#111"
      >
        L
      </text>
    </svg>
  );
}

const AWARDS_DATA = [
  {
    award: "Gold in Services Websites",
    contest: "Lovie Awards",
    date: "2022",
  },
  {
    award: "Silver in Digital Branding",
    contest: "European Design Awards",
    date: "2022",
  },
  {
    award: "Bronze in Digital, Promotional Site",
    contest: "European Design Awards",
    date: "2022",
  },
  {
    award: "Website of the Day",
    contest: "CSS Design Awards",
    date: "Jan 03, 2022",
  },
  {
    award: "Website of the Day",
    contest: "Awwwards",
    date: "Nov 02, 2021",
  },
  {
    award: "Developer Award",
    contest: "Awwwards",
    date: "Nov 02, 2021",
  },
  {
    award: "Mobile Excellence",
    contest: "Awwwards",
    date: "Oct 07, 2021",
  },
  {
    award: "Mobile of the Week",
    contest: "Awwwards",
    date: "Oct 07, 2021",
  },
];

export default function AwardsDrawer({ isOpen, onClose }: AwardsDrawerProps) {
  const lenis = useLenis();

  // Escape key listener & Lenis scroll pause
  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        lenis?.start();
        document.body.style.overflow = "";
      };
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
  }, [isOpen, lenis, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 animate-in fade-in duration-200 select-none">
      {/* Backdrop Dimmer */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity cursor-pointer"
      />

      {/* Top Right Circular Close Button matching reference exactly */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close modal"
        className="fixed top-5 right-5 sm:top-7 sm:right-9 z-[110] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0A101F] hover:bg-[#141e38] border border-white/15 text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xl active:scale-90"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
      </button>

      {/* Centered Modal Card */}
      <div
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-label="Awards & Certifications"
        className="relative z-10 w-full max-w-[940px] bg-[#0A101F] text-white rounded-[22px] sm:rounded-[28px] p-6 sm:p-10 md:p-12 lg:p-14 shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_80px_rgba(0,210,255,0.06)] border border-white/10 my-auto max-h-[92vh] overflow-y-auto"
      >
        {/* SECTION 1: AWARDS */}
        <section>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6 sm:mb-8 font-sans">
            Awards
          </h2>

          {/* Table Header */}
          <div className="grid grid-cols-12 text-[12px] sm:text-[13px] text-neutral-400 font-normal mb-3 sm:mb-4 px-0.5">
            <div className="col-span-6 sm:col-span-5">Award</div>
            <div className="col-span-3 sm:col-span-4">Contest</div>
            <div className="col-span-3 sm:col-span-3">Date</div>
          </div>

          {/* Table Rows */}
          <div className="space-y-2 sm:space-y-2.5">
            {AWARDS_DATA.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 text-[13px] sm:text-[14.5px] leading-relaxed px-0.5"
              >
                <div className="col-span-6 sm:col-span-5 text-neutral-100 font-normal pr-2">
                  {item.award}
                </div>
                <div className="col-span-3 sm:col-span-4 text-neutral-300 font-normal pr-2">
                  {item.contest}
                </div>
                <div className="col-span-3 sm:col-span-3 text-neutral-400 font-normal">
                  {item.date}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: CERTIFICATIONS */}
        <section className="mt-10 sm:mt-14 pt-4 sm:pt-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8 mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-sans">
              Certifications
            </h2>

            {/* Sports & Official Partnerships */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-10">
              {/* Norwegian Football Association */}
              <div className="flex items-center gap-3">
                <NFFLogo className="w-10 h-10 sm:w-11 sm:h-11 shrink-0" />
                <div className="text-[11.5px] sm:text-[12.5px] text-white/95 leading-tight font-sans">
                  <span>Official Partner</span>
                  <br />
                  <span>of the Norwegian Football</span>
                  <br />
                  <span>Association</span>
                </div>
              </div>

              {/* Legia Warsaw */}
              <div className="flex items-center gap-3">
                <LegiaWarsawLogo className="w-9 h-11 sm:w-10 sm:h-12 shrink-0" />
                <div className="text-[12px] sm:text-[13px] text-white/95 leading-tight font-sans">
                  <span className="text-neutral-400 text-[11px] block">
                    Official Partner of
                  </span>
                  <span className="font-semibold text-white">Legia Warsaw</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Official Compliance Badges */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
            <IASBadge className="h-10 sm:h-12 w-auto" />
            <ISOBadge code="27001" className="h-10 sm:h-12 w-auto" />
            <ISOBadge code="27701" className="h-10 sm:h-12 w-auto" />
            <PCIDSSBadge className="h-7 sm:h-8 w-auto" />
          </div>
        </section>
      </div>
    </div>
  );
}
