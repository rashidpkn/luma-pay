import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

export default function OneApp() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particleCanvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const globeAreaRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const coinsRef = useRef<HTMLDivElement>(null)
  const embedRef = useRef<HTMLDivElement>(null)
  const blurRef = useRef<HTMLDivElement>(null)
  const widgetsRef = useRef<HTMLDivElement>(null)

  // Subtle ambient floating dust particles
  useEffect(() => {
    const canvas = particleCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1400)
    let height = (canvas.height = canvas.parentElement?.clientHeight || 1200)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }
    window.addEventListener("resize", handleResize)

    interface Particle {
      x: number
      y: number
      size: number
      alpha: number
      speedY: number
      speedX: number
    }

    const particles: Particle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.5 + 0.2,
      speedY: -Math.random() * 0.4 - 0.1,
      speedX: (Math.random() - 0.5) * 0.2,
    }))

    let isVisible = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0.01 }
    )
    observer.observe(canvas)

    const render = () => {
      animationFrameId = requestAnimationFrame(render)
      if (!isVisible) return

      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        p.y += p.speedY
        p.x += p.speedX

        if (p.y < 0) {
          p.y = height
          p.x = Math.random() * width
        }
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
      observer.disconnect()
    }
  }, [])

  // 3D Three.js Interactive Rotating Dotted Globe
  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    let scene: THREE.Scene
    let camera: THREE.OrthographicCamera
    let renderer: THREE.WebGLRenderer
    let controls: OrbitControls
    let globeMesh: THREE.Mesh
    let dotMesh: THREE.InstancedMesh
    let animationFrameId: number
    let isDisposed = false
    let globeObserver: IntersectionObserver | null = null

    const init = () => {
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
        })
      } catch (e) {
        console.warn("WebGL not available:", e)
        return
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      scene = new THREE.Scene()

      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 3)
      camera.position.z = 1.1

      controls = new OrbitControls(camera, canvas)
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      controls.enablePan = false
      controls.enableZoom = false
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.6
      controls.minPolarAngle = 0.4 * Math.PI
      controls.maxPolarAngle = 0.4 * Math.PI

      // Sphere geometry
      const geometry = new THREE.IcosahedronGeometry(1, 24)

      // Gradient shader material matching FacilPay
      const gradientMaterial = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 v_normal;
          void main() {
            v_normal = normalize(normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 v_normal;
          vec3 getGradient(float y) {
            float t = (y + 1.0) / 2.0;
            vec3 top = vec3(149.0/255.0, 211.0/255.0, 253.0/255.0);
            vec3 mid = vec3(27.0/255.0, 147.0/255.0, 247.0/255.0);
            vec3 bottom = vec3(97.0/255.0, 182.0/255.0, 250.0/255.0);
            if (t < 0.6) return mix(top, mid, t / 0.6);
            return mix(mid, bottom, (t - 0.6) / 0.4);
          }
          void main() {
            vec3 color = getGradient(v_normal.y);
            gl_FragColor = vec4(color, 1.0);
          }
        `,
        side: THREE.DoubleSide,
      })

      globeMesh = new THREE.Mesh(geometry, gradientMaterial)
      scene.add(globeMesh)

      // Earth Continent Landmask Dot Sampling
      const textureLoader = new THREE.TextureLoader()
      const maskPath = "/oneapp/earth-map-colored.png"

      textureLoader.load(
        maskPath,
        (mask) => {
          if (isDisposed) return
          const offscreen = document.createElement("canvas")
          const ctx = offscreen.getContext("2d")
          if (!ctx) return

          const w = mask.image.width
          const h = mask.image.height
          offscreen.width = w
          offscreen.height = h
          ctx.drawImage(mask.image, 0, 0)
          const pixels = ctx.getImageData(0, 0, w, h).data

          const points = geometry.attributes.position
          const count = points.count
          const instancePositions: THREE.Vector3[] = []

          for (let i = 0; i < count; i++) {
            const u = geometry.attributes.uv.getX(i)
            const v = geometry.attributes.uv.getY(i)
            const x = Math.floor(u * w)
            const y = Math.floor((1 - v) * h)
            const index = (y * w + x) * 4
            const r = pixels[index] / 255

            if (r > 0.2) {
              const pos = new THREE.Vector3()
                .fromBufferAttribute(points, i)
                .normalize()
                .multiplyScalar(1.012)
              instancePositions.push(pos)
            }
          }

          const instanceCount = instancePositions.length
          const dotGeo = new THREE.CircleGeometry(0.016, 24)
          const dotMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1.0,
          })

          dotMesh = new THREE.InstancedMesh(dotGeo, dotMat, instanceCount)
          const dummy = new THREE.Object3D()

          instancePositions.forEach((pos, i) => {
            dummy.position.copy(pos)
            dummy.lookAt(0, 0, 0)
            dummy.updateMatrix()
            dotMesh.setMatrixAt(i, dummy.matrix)
          })

          scene.add(dotMesh)
        },
        undefined,
        () => {
          // Fallback procedural dot grid if texture fails
          if (isDisposed) return
          const points = geometry.attributes.position
          const count = points.count
          const dotGeo = new THREE.CircleGeometry(0.012, 16)
          const dotMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
          })
          dotMesh = new THREE.InstancedMesh(dotGeo, dotMat, count)
          const dummy = new THREE.Object3D()
          for (let i = 0; i < count; i++) {
            const pos = new THREE.Vector3()
              .fromBufferAttribute(points, i)
              .normalize()
              .multiplyScalar(1.012)
            dummy.position.copy(pos)
            dummy.lookAt(0, 0, 0)
            dummy.updateMatrix()
            dotMesh.setMatrixAt(i, dummy.matrix)
          }
          scene.add(dotMesh)
        }
      )

      const resize = () => {
        if (!container || !renderer || isDisposed) return
        const size = Math.min(container.clientWidth, container.clientHeight)
        renderer.setSize(size, size, false)
      }

      resize()
      window.addEventListener("resize", resize)

      let isGlobeVisible = false
      globeObserver = new IntersectionObserver(
        ([entry]) => {
          isGlobeVisible = entry.isIntersecting
        },
        { threshold: 0.05 }
      )
      globeObserver.observe(container)

      const animate = () => {
        if (isDisposed) return
        animationFrameId = requestAnimationFrame(animate)
        if (!isGlobeVisible) return
        controls.update()
        renderer.render(scene, camera)
      }

      animate()
    }

    init()

    return () => {
      isDisposed = true
      cancelAnimationFrame(animationFrameId)
      globeObserver?.disconnect()
      controls?.dispose()
      renderer?.dispose()
    }
  }, [])

  // Exact FacilPay Two-Stage Scroll Animation Logic with Smooth, Ideal Pacing
  useEffect(() => {
    const area = globeAreaRef.current
    const wrapper = wrapperRef.current
    const coinsParent = coinsRef.current
    const embed = embedRef.current
    const blur = blurRef.current
    const widgetsParent = widgetsRef.current

    if (!area || !wrapper || !coinsParent || !embed || !widgetsParent) return

    const coinElements = Array.from(coinsParent.children) as HTMLElement[]
    const widgetElements = Array.from(widgetsParent.children) as HTMLElement[]

    let lastScrollY = window.scrollY
    const timeouts: ReturnType<typeof setTimeout>[] = []

    const clearAllTimeouts = () => {
      timeouts.forEach((id) => clearTimeout(id))
      timeouts.length = 0
    }

    const setManagedTimeout = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay)
      timeouts.push(id)
      return id
    }

    function getScrollDirection() {
      const currentY = window.scrollY
      const direction = currentY > lastScrollY ? "down" : "up"
      lastScrollY = currentY
      return direction
    }

    let isMoved = false

    function playForwardAnimation() {
      if (isMoved) return
      isMoved = true
      clearAllTimeouts()

      if (wrapper) wrapper.classList.add("move")

      // Stage 1: Coins smoothly glide inward with elegant 90ms stagger
      coinElements.forEach((el, i) => {
        setManagedTimeout(() => {
          el.classList.add("move")
        }, i * 90)
      })

      // Stage 2: After coins collapse gracefully inward (~850ms), scale down the globe
      setManagedTimeout(() => {
        if (embed) embed.classList.add("move")
        if (blur) blur.classList.add("move")
        if (widgetsParent) widgetsParent.classList.add("move")

        // Stage 3: As globe smoothly settles into compact scale (~600ms), blossom out the widgets
        setManagedTimeout(() => {
          widgetElements.forEach((el, i) => {
            setManagedTimeout(() => {
              el.classList.add("move")
            }, i * 110)
          })
        }, 600)
      }, 850)
    }

    function playReverseAnimation() {
      if (!isMoved) return
      isMoved = false
      clearAllTimeouts()

      // Step 1: Widgets smoothly glide back inward with 70ms stagger
      ;[...widgetElements].reverse().forEach((el, i) => {
        setManagedTimeout(() => {
          el.classList.remove("move")
        }, i * 70)
      })

      // Step 2: After widgets fold inward (~550ms), scale globe back to full size
      setManagedTimeout(() => {
        widgetsParent?.classList.remove("move")
        if (embed) embed.classList.remove("move")
        if (blur) blur?.classList.remove("move")

        // Step 3: As globe expands (~650ms), fan coins back out into the arc
        setManagedTimeout(() => {
          ;[...coinElements].reverse().forEach((el, i) => {
            setManagedTimeout(() => {
              el.classList.remove("move")
            }, i * 90)
          })
          wrapper?.classList.remove("move")
        }, 650)
      }, 550)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const direction = getScrollDirection()

        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          playForwardAnimation()
        } else if (entry.intersectionRatio < 0.15 && direction === "up") {
          playReverseAnimation()
        }
      },
      {
        threshold: [0.15, 0.25],
      }
    )

    // Initial state setup
    observer.observe(area)

    return () => {
      clearAllTimeouts()
      observer.disconnect()
    }
  }, [])

  return (
    <section
      id="oneapp"
      ref={sectionRef}
      className="oneapp-root relative bg-gradient-to-b from-[#e8f7ff] via-[#d4efff] to-[#bfe6ff] pt-14 pb-16 md:pt-20 md:pb-20 overflow-hidden select-none"
    >
      {/* Ambient background particles */}
      <div className="absolute inset-0 pointer-events-none opacity-70">
        <canvas ref={particleCanvasRef} className="w-full h-full" />
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Headline & Description - ALWAYS clearly visible */}
        <div className="text-center max-w-3xl mx-auto opacity-100 translate-y-0">
          <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold tracking-tight text-neutral-900 leading-[1.06] mb-4 sm:mb-5">
            One App. <br />
            <span className="text-[#1a73e8]">No Borders.</span>{" "}
            <span className="text-neutral-900">No Banks.</span>
          </h2>
          <p className="text-neutral-700 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
            Through our integration with{" "}
            <span className="text-[#1a73e8] font-medium">MoneyGram</span>, the{" "}
            <span className="font-medium text-neutral-900">Luma Pay</span> app
            allows users to perform cash-out transactions worldwide.
          </p>
        </div>

        {/* Exact FacilPay Globe Area */}
        <div ref={globeAreaRef} className="globe-area">
          <div ref={wrapperRef} className="globe-wrapper">
            {/* Glowing Backdrop Blur - Behind Canvas */}
            <div ref={blurRef} className="globe-blur" />

            {/* Embedded 3D Canvas */}
            <div ref={embedRef} className="globe-embed">
              <div
                id="globe-container"
                ref={containerRef}
                className="w-full h-full relative cursor-grab active:cursor-grabbing flex items-center justify-center"
              >
                <canvas
                  id="globe-canvas"
                  ref={canvasRef}
                  className="w-full h-full block touch-none"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>

            {/* Arc of 7 Coins (Initial State) */}
            <div ref={coinsRef} className="globe-coins">
              {/* Coin 1: BNB */}
              <div className="globe-coin s1">
                <img
                  src="/oneapp/globe-coin-2.png"
                  alt="BNB Coin"
                  className="w-full h-full object-contain pointer-events-auto cursor-pointer hover:scale-110 transition-transform"
                  loading="lazy"
                />
              </div>

              {/* Coin 2: ETH */}
              <div className="globe-coin s2">
                <img
                  src="/oneapp/globe-coin-3.png"
                  alt="ETH Coin"
                  className="w-full h-full object-contain pointer-events-auto cursor-pointer hover:scale-110 transition-transform"
                  loading="lazy"
                />
              </div>

              {/* Coin 3: XRP */}
              <div className="globe-coin s3">
                <img
                  src="/oneapp/globe-coin-4.png"
                  alt="XRP Coin"
                  className="w-full h-full object-contain pointer-events-auto cursor-pointer hover:scale-110 transition-transform"
                  loading="lazy"
                />
              </div>

              {/* Coin 4: Luma Center Arrow Logo */}
              <div className="globe-coin s4">
                <img
                  src="/oneapp/globe-coin-5.png"
                  alt="Luma Pay Coin"
                  className="w-full h-full object-contain pointer-events-auto cursor-pointer hover:scale-110 transition-transform drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)]"
                  loading="lazy"
                />
              </div>

              {/* Coin 5: USDC */}
              <div className="globe-coin s5">
                <img
                  src="/oneapp/globe-coin-6.png"
                  alt="USDC Coin"
                  className="w-full h-full object-contain pointer-events-auto cursor-pointer hover:scale-110 transition-transform"
                  loading="lazy"
                />
              </div>

              {/* Coin 6: BTC */}
              <div className="globe-coin s6">
                <img
                  src="/oneapp/globe-coin-7.png"
                  alt="BTC Coin"
                  className="w-full h-full object-contain pointer-events-auto cursor-pointer hover:scale-110 transition-transform"
                  loading="lazy"
                />
              </div>

              {/* Coin 7: Solana */}
              <div className="globe-coin s7">
                <img
                  src="/oneapp/globe-coin-1.png"
                  alt="Solana Coin"
                  className="w-full h-full object-contain pointer-events-auto cursor-pointer hover:scale-110 transition-transform"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Floating Widgets / Notifications (Moved State) */}
            <div ref={widgetsRef} className="globe-widgets">
              {/* Widget 1: Michael Johnson paid you ($75.00) */}
              <div className="globe-vidget s1">
                <img
                  src="/oneapp/globe-vidget-3.png"
                  alt="Michael Johnson paid you"
                  data-levitation="2"
                  className="w-full h-auto object-contain cursor-pointer hover:scale-105 transition-transform drop-shadow-2xl pointer-events-auto"
                  loading="lazy"
                />
              </div>

              {/* Widget 2: Request 900 SHIBA */}
              <div className="globe-vidget s2">
                <img
                  src="/oneapp/globe-vidget-1.png"
                  alt="Request 900 SHIBA"
                  data-levitation="1"
                  className="w-full h-auto object-contain cursor-pointer hover:scale-105 transition-transform drop-shadow-2xl pointer-events-auto"
                  loading="lazy"
                />
              </div>

              {/* Widget 3: Join our group chat! */}
              <div className="globe-vidget s3">
                <img
                  src="/oneapp/globe-vidget-4.png"
                  alt="Join our group chat"
                  data-levitation="2"
                  className="w-full h-auto object-contain cursor-pointer hover:scale-105 transition-transform drop-shadow-xl pointer-events-auto"
                  loading="lazy"
                />
              </div>

              {/* Widget 4: USDT 3D Coin */}
              <div className="globe-vidget s4">
                <img
                  src="/oneapp/globe-vidget-2.png"
                  alt="Tether USDT"
                  data-levitation="1"
                  className="w-full h-auto object-contain cursor-pointer hover:scale-115 transition-transform drop-shadow-2xl pointer-events-auto"
                  loading="lazy"
                />
              </div>

              {/* Widget 5: Helen Young (Thanks for covering tickets) */}
              <div className="globe-vidget s5">
                <img
                  src="/oneapp/globe-vidget-7.png"
                  alt="Helen Young message"
                  data-levitation="2"
                  className="w-full h-auto object-contain cursor-pointer hover:scale-105 transition-transform drop-shadow-2xl pointer-events-auto"
                  loading="lazy"
                />
              </div>

              {/* Widget 6: Paper Airplane Icon */}
              <div className="globe-vidget s6">
                <img
                  src="/oneapp/globe-vidget-5.png"
                  alt="Send Paper Plane"
                  data-levitation="1"
                  className="w-full h-auto object-contain cursor-pointer hover:scale-120 transition-transform drop-shadow-lg pointer-events-auto"
                  loading="lazy"
                />
              </div>

              {/* Widget 7: Received Confirmed! +245 XLM */}
              <div className="globe-vidget s7">
                <img
                  src="/oneapp/globe-vidget-6.png"
                  alt="Received Confirmed XLM"
                  data-levitation="2"
                  className="w-full h-auto object-contain cursor-pointer hover:scale-105 transition-transform drop-shadow-2xl pointer-events-auto"
                  loading="lazy"
                />
              </div>

              {/* Widget 8: XRP 3D Coin */}
              <div className="globe-vidget s8">
                <img
                  src="/oneapp/globe-vidget-8.png"
                  alt="XRP Coin"
                  data-levitation="1"
                  className="w-full h-auto object-contain cursor-pointer hover:scale-115 transition-transform drop-shadow-2xl pointer-events-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Statistics Info ("182 countries: Your wallet becomes...") */}
        <div
          className="mt-6 sm:mt-8 md:mt-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-baseline justify-center gap-4 sm:gap-6 md:gap-10 opacity-100 translate-y-0"
        >
          <div className="text-6xl sm:text-8xl md:text-[110px] lg:text-[120px] font-extrabold text-neutral-900 tracking-tighter leading-none font-sans">
            182
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-neutral-800 leading-snug md:leading-tight font-normal text-center md:text-left max-w-2xl">
            <span className="font-semibold text-neutral-900">countries:</span>{" "}
            Your wallet becomes a{" "}
            <span className="text-[#1a73e8] font-semibold">
              global crypto debit card
            </span>{" "}
            — accepted at partner merchants and{" "}
            <span className="text-[#1a73e8] font-semibold">
              locations worldwide.
            </span>
          </div>
        </div>
      </div>

      {/* Scoped CSS mirroring FacilPay exactly */}
      <style>{`
        .oneapp-root {
          --gu: clamp(3.6px, 1.1vw, 8.5px);
        }

        .globe-area {
          justify-content: center;
          align-items: center;
          display: flex;
          position: relative;
          width: 100%;
          margin-top: calc(18 * var(--gu));
          margin-bottom: 1.5rem;
        }

        .globe-wrapper {
          aspect-ratio: 1;
          justify-content: center;
          align-items: center;
          width: calc(70 * var(--gu));
          height: calc(70 * var(--gu));
          margin-left: auto;
          margin-right: auto;
          transition: transform 1.6s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          position: relative;
          transform: translate(0, 0);
        }

        .globe-wrapper.move {
          z-index: 10;
          transform: translate(0, 0);
        }

        .globe-embed {
          z-index: 10;
          justify-content: center;
          align-items: center;
          transition: transform 1.6s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          position: absolute;
          inset: 0%;
        }

        .globe-embed.move {
          transform: scale(0.52);
        }

        .globe-blur {
          z-index: 1;
          filter: blur(calc(1.1 * var(--gu)));
          background-image: linear-gradient(#d1f2ff, #1c93f7);
          border-radius: 50%;
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0%;
          pointer-events: none;
          transition: transform 1.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .globe-blur.move {
          transform: scale(0.52);
        }

        .globe-coins {
          aspect-ratio: 1;
          border: 4px solid rgba(255, 255, 255, 0.3);
          pointer-events: none;
          border-radius: 50%;
          justify-content: center;
          align-items: center;
          height: calc(90 * var(--gu));
          width: calc(90 * var(--gu));
          display: flex;
          position: absolute;
          transition: opacity 1.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .globe-coin {
          width: 12%;
          aspect-ratio: 1;
          transition: all 1.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: absolute;
          opacity: 1;
          transform: scale(1);
          will-change: transform, opacity;
        }

        /* Initial positions for the arc */
        .globe-coin.s1 { inset: 30% auto auto -4%; }
        .globe-coin.s2 { inset: 11% auto auto 6%; }
        .globe-coin.s3 { inset: -1% auto auto 23%; }
        .globe-coin.s4 { inset: -6% auto auto 43%; }
        .globe-coin.s5 { inset: -1% 23% auto auto; }
        .globe-coin.s6 { inset: 11% 6% auto auto; }
        .globe-coin.s7 { inset: 30% -4% auto auto; }

        /* Moved positions (collapsing into center) */
        .globe-coin.s1.move,
        .globe-coin.s2.move,
        .globe-coin.s3.move,
        .globe-coin.s4.move {
          top: 44%;
          left: 44%;
          opacity: 0;
          transform: scale(0.25);
          pointer-events: none;
        }

        .globe-coin.s5.move,
        .globe-coin.s6.move,
        .globe-coin.s7.move {
          top: 44%;
          right: 44%;
          opacity: 0;
          transform: scale(0.25);
          pointer-events: none;
        }

        /* Widgets container */
        .globe-widgets {
          aspect-ratio: 1;
          justify-content: center;
          align-items: center;
          height: calc(20 * var(--gu));
          width: calc(20 * var(--gu));
          transition: height 1.8s cubic-bezier(0.16, 1, 0.3, 1),
                      width 1.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 1.8s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          position: absolute;
          transform: scale(0.8);
          pointer-events: none;
          z-index: 20;
        }

        .globe-widgets.move {
          height: calc(60 * var(--gu));
          width: calc(60 * var(--gu));
          transform: scale(1);
          pointer-events: auto;
        }

        .globe-vidget {
          transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: absolute;
          opacity: 0;
          transform: scale(0.75);
          pointer-events: none;
          will-change: transform, opacity;
        }

        .globe-vidget.move {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
        }

        /* Initial positions (clustered in center) */
        .globe-vidget.s1 { width: calc(24 * var(--gu)); top: 40%; left: 30%; }
        .globe-vidget.s2 { width: calc(18 * var(--gu)); top: 40%; left: 30%; }
        .globe-vidget.s3 { width: calc(16.5 * var(--gu)); top: 40%; left: 35%; }
        .globe-vidget.s4 { width: calc(7.8 * var(--gu)); top: 35%; right: 40%; }
        .globe-vidget.s5 { width: calc(22 * var(--gu)); top: 45%; right: 30%; }
        .globe-vidget.s6 { width: calc(4 * var(--gu)); top: 50%; right: 50%; }
        .globe-vidget.s7 { width: calc(16.8 * var(--gu)); bottom: 40%; right: 35%; }
        .globe-vidget.s8 { width: calc(8 * var(--gu)); bottom: 40%; left: 40%; }

        /* Moved positions (flown out to flanks) */
        .globe-vidget.s1.move { inset: 50% auto auto -25%; }
        .globe-vidget.s2.move { top: 24%; left: -12%; }
        .globe-vidget.s3.move { top: 10%; left: 28%; }
        .globe-vidget.s4.move { top: 8%; right: 9%; }
        .globe-vidget.s5.move { top: 33%; right: -20%; }
        .globe-vidget.s6.move { top: 48%; right: -7%; }
        .globe-vidget.s7.move { bottom: 20%; right: -11%; }
        .globe-vidget.s8.move { bottom: 10%; left: 10%; }

        /* Levitation floating animations */
        [data-levitation="1"] {
          animation: levitateFirst 7.5s ease-in-out infinite;
        }

        @keyframes levitateFirst {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(calc(-0.45 * var(--gu)));
          }
        }

        [data-levitation="2"] {
          animation: levitateSecond 6.8s ease-in-out infinite;
        }

        @keyframes levitateSecond {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(calc(0.45 * var(--gu)));
          }
        }
      `}</style>
    </section>
  )
}
