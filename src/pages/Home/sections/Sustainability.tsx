import { useEffect, useRef, useState } from "react"
import { ArrowRight, Leaf } from "lucide-react"
import SustainabilitySculpture from "./SustainabilitySculpture"

export default function Sustainability() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [treeCount, setTreeCount] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // Animate tree count when visible
  useEffect(() => {
    if (!isVisible) return

    let start = 0
    const end = 56
    const duration = 1600
    const stepTime = Math.abs(Math.floor(duration / end))

    const timer = setInterval(() => {
      start += 1
      setTreeCount(start)
      if (start >= end) {
        clearInterval(timer)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [isVisible])


  return (
    <section
      id="sustainability"
      ref={sectionRef}
      className="sustainability-section relative bg-[#080F38] text-white py-16 sm:py-28 lg:py-40 overflow-hidden select-none border-t border-white/10"
    >
      {/* Subtle deep ambient glow behind the sculpture */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#43f558]/12 via-[#00D2FF]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/4 bottom-0 w-[500px] h-[300px] bg-[#00D2FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Typography & Content */}
          <div
            className={`lg:col-span-7 xl:col-span-7 transition-all duration-1000 transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[62px] font-normal tracking-tight text-white leading-[1.12] sm:leading-[1.12] mb-6 sm:mb-8 font-sans">
              We care about our{" "}
              <span className="text-[#43f558] font-normal drop-shadow-[0_0_24px_rgba(67,245,88,0.35)]">
                Mother Earth
              </span>{" "}
              as well as we care about your business. You can just make the
              world greener by planting a tree. We do it for you with every money
              you spend with us.
            </h2>

            <p className="text-neutral-400 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-10">
              You can make the world greener by planting a tree. We do it for you
              with every transaction you make with us.
            </p>

            <div>
              <a
                href="#sustainability"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-white/25 hover:border-white text-white text-base font-medium tracking-wide transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] group"
              >
                <span>Read more</span>
                <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column: 3D Rainbow Cone Sculpture */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end relative">
            <div
              ref={imageRef}
              className={`relative w-full max-w-[540px] transition-all duration-1200 ease-out will-change-transform ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              {/* Floating Planted Trees Impact Badge */}
              <div className="absolute top-2 left-2 sm:top-4 sm:-left-6 z-20 flex items-center gap-2.5 sm:gap-3 bg-white/[0.07] backdrop-blur-xl border border-white/15 rounded-2xl px-3.5 py-2 sm:px-5 sm:py-3 shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:bg-white/[0.1] transition-all group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#43f558]/20 border border-[#43f558]/30 flex items-center justify-center text-[#43f558]">
                  <Leaf className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-baseline gap-1">
                    <span>{treeCount}</span>
                    <span className="text-xs text-[#43f558] font-medium">+</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-neutral-300 font-medium">
                    Planted Trees
                  </div>
                </div>
              </div>

              {/* Interactive 3D Sculpture */}
              <div className="relative z-10">
                <SustainabilitySculpture />
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
