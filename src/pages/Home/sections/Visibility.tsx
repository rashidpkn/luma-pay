import { useState } from "react";
import darkDashboardImg from "../../../assets/luma-dashboard-dark.jpg";
import lightDashboardImg from "../../../assets/luma-dashboard-light.jpg";

// Half-circle theme icon matching speedy.io design
const HalfCircleIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 23.5C5.7 23.5.5 18.3.5 12S5.7.5 12 .5 23.5 5.7 23.5 12 18.3 23.5 12 23.5zm0-21c-5.2 0-9.5 4.3-9.5 9.5s4.3 9.5 9.5 9.5 9.5-4.3 9.5-9.5-4.3-9.5-9.5-9.5zM6.8 17.2c2.9 2.9 7.6 2.9 10.5 0s2.9-7.6 0-10.5L6.8 17.2z" />
  </svg>
);

export default function Visibility() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  return (
    <section
      id="visibility"
      data-theme={theme}
      data-logo-color="white"
      className="relative w-full bg-[#080F38] text-white pt-24 sm:pt-32 pb-24 overflow-hidden border-t border-white/10"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#00D2FF]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="relative inline-block mx-auto">
            <h2 className="text-4xl sm:text-6xl lg:text-[76px] font-bold tracking-[-0.03em] leading-[1.12] text-white">
              Increase your{" "}
              visibility
              in
              <br />
              spendings.
            </h2>
          </div>

          {/* Theme Switcher Toggle */}
          <div className="flex items-center justify-center gap-8 sm:gap-10 mt-10 sm:mt-12">
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`flex items-center gap-2.5 text-base sm:text-lg font-medium transition-all duration-300 cursor-pointer ${theme === "dark"
                ? "text-white opacity-100"
                : "text-slate-500 hover:text-slate-300 opacity-60"
                }`}
            >
              <HalfCircleIcon className="w-5 h-5 text-white" />
              <span>Dark Theme</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`flex items-center gap-2.5 text-base sm:text-lg font-medium transition-all duration-300 cursor-pointer ${theme === "light"
                ? "text-white opacity-100"
                : "text-slate-500 hover:text-slate-300 opacity-60"
                }`}
            >
              <HalfCircleIcon className="w-5 h-5 text-white rotate-180" />
              <span>Light Theme</span>
            </button>
          </div>
        </div>

        {/* Dashboard Mockup Display */}
        <div className="mt-14 sm:mt-18 w-full max-w-[1240px] mx-auto">
          <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.85)] bg-[#121212]">
            {/* Aspect Ratio Container for Responsive High-Res Display */}
            <div className="relative w-full aspect-[3416/1920]">
              {/* Dark Dashboard Image */}
              <img
                src={darkDashboardImg}
                alt="Luma Pay Dark Dashboard"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-600 ease-in-out ${theme === "dark" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
              />

              {/* Light Dashboard Image */}
              <img
                src={lightDashboardImg}
                alt="Luma Pay Light Dashboard"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-600 ease-in-out ${theme === "light" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
              />
            </div>
          </div>


        </div>



        {/* Sign Up Large Pill Button */}
        <div className="flex justify-center mt-14 sm:mt-20">
          <a
            href="#signup"
            className="inline-block bg-white text-[#080F38] font-semibold text-xl sm:text-2xl lg:text-3xl px-12 sm:px-20 py-5 sm:py-7 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer text-center"
          >
            Sign up today, receive today.
          </a>
        </div>
      </div>
    </section>
  );
}
