import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-20 w-full bg-[#020817] text-white border-t border-white/10 overflow-hidden">
      {/* Subtle Top Glow Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#00D2FF]/60 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[80px] bg-[#00D2FF]/5 rounded-full blur-[70px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col justify-between pr-4">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center relative overflow-hidden bg-[#020817] shadow-sm">
                  <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#020817]" />
                  <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  Speedy Global
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                The next-generation cross-border payment platform. Send, spend,
                and stay in control of global currencies with zero hidden fees.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-gray-400 font-medium">
                Systems fully operational
              </span>
            </div>
          </div>

          {/* Nav Col 1: Products */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Products
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-300">
              {["Global Accounts", "Multi-Currency Cards", "Enterprise API", "High-Volume Transfers", "Treasury Management"].map((item) => (
                <li key={item}>
                  <a
                    href="#products"
                    className="hover:text-[#00D2FF] transition-colors flex items-center gap-1 group"
                  >
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Col 2: Solutions */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Solutions
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-300">
              {["E-Commerce", "SaaS & Tech", "Exporters & Importers", "Freelancers", "Startups"].map((item) => (
                <li key={item}>
                  <a
                    href="#solutions"
                    className="hover:text-[#00D2FF] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Col 3: Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-300">
              {["About Us", "Eden Project", "Careers", "Press & Media", "Security & Compliance"].map((item) => (
                <li key={item}>
                  <a
                    href="#company"
                    className="hover:text-[#00D2FF] transition-colors flex items-center gap-1 group"
                  >
                    <span>{item}</span>
                    {item === "Careers" && (
                      <span className="text-[10px] bg-[#00D2FF]/20 text-[#00D2FF] px-1.5 py-0.5 rounded-full font-medium">
                        Hiring
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-400" />
            <span>English (US)</span>
            <span className="mx-2">•</span>
            <span>© 2026 Speedy Global Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#cookies" className="hover:text-white transition-colors">
              Cookies Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
