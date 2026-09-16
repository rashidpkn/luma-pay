import { ArrowRight, ShieldCheck, Zap, Globe2 } from "lucide-react";

export default function Steps() {
  const steps = [
    {
      step: "01",
      title: "Open Your Global Account",
      desc: "Register in under 2 minutes with automated verification. Get local account details for USD, EUR, GBP, and 25+ currencies instantly.",
      icon: Globe2,
    },
    {
      step: "02",
      title: "Convert at Live Interbank Rates",
      desc: "Exchange funds seamlessly with zero hidden markups. Lock in guaranteed rates and automate conversions with scheduled orders.",
      icon: Zap,
    },
    {
      step: "03",
      title: "Send & Settle Everywhere",
      desc: "Payout directly to bank accounts, mobile wallets, or issue multi-currency cards with end-to-end institutional-grade encryption.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="relative w-full bg-[#020817] text-white py-24 sm:py-32 px-6 sm:px-10 lg:px-14 border-t border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#00D2FF]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-16 sm:mb-20">
          <span className="text-xs font-semibold tracking-widest text-[#00D2FF] uppercase mb-3 block">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Seamless payments in three simple steps.
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-4 font-normal">
            Effortless global financial infrastructure designed for fast-moving businesses.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative bg-[#091124]/70 hover:bg-[#0c1630] border border-white/10 hover:border-[#00D2FF]/40 rounded-[28px] p-8 sm:p-10 transition-all duration-300 hover:-translate-y-1.5 shadow-xl"
              >
                {/* Step badge & icon */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-3xl font-bold text-gray-600 group-hover:text-[#00D2FF] transition-colors font-mono">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#00D2FF]/10 border border-[#00D2FF]/20 flex items-center justify-center text-[#00D2FF] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-sm text-[#00D2FF] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
