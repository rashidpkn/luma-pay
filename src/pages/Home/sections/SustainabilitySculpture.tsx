import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { Loader2 } from "lucide-react"

interface SustainabilitySculptureProps {
  className?: string
}

export default function SustainabilitySculpture({ className = "" }: SustainabilitySculptureProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    let animationFrameId: number
    let isDisposed = false
    let isVisible = true

    // 1. Renderer Setup
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      })
    } catch (e) {
      console.warn("WebGL not supported:", e)
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight, false)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.35
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const scene = new THREE.Scene()

    // 2. Camera Setup - framed comfortably for the Ceiba Pentandra tree
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100
    )
    camera.position.set(0, 0.2, 5.2)

    // 3. Studio Lighting: Natural sunlight + balanced ambient foliage illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2)
    scene.add(ambientLight)

    // Main Sunlight Key Light
    const sunLight = new THREE.DirectionalLight(0xfff6e5, 3.4)
    sunLight.position.set(4.0, 6.0, 4.0)
    scene.add(sunLight)

    // Secondary Fill Light with soft nature emerald bounce
    const fillLight = new THREE.DirectionalLight(0x43f558, 1.2)
    fillLight.position.set(-4.0, 2.0, 2.0)
    scene.add(fillLight)

    // Backlight / Rim Light to highlight tree branches and canopy
    const rimLight = new THREE.DirectionalLight(0x00d2ff, 1.8)
    rimLight.position.set(-2.0, 4.0, -4.0)
    scene.add(rimLight)

    // Ground bounce light
    const groundBounceLight = new THREE.DirectionalLight(0x10b981, 0.8)
    groundBounceLight.position.set(0, -3.0, 2.0)
    scene.add(groundBounceLight)

    // 4. Model Hierarchy
    const masterGroup = new THREE.Group()
    scene.add(masterGroup)

    const spinnerGroup = new THREE.Group()
    masterGroup.add(spinnerGroup)

    // 5. Load GLB Model: /3d/tree/ceiba-pentandra.glb
    const loader = new GLTFLoader()

    // Optional legacy extension fallback
    loader.register((parser) => ({
      name: "KHR_materials_pbrSpecularGlossiness",
      getMaterialType: () => THREE.MeshStandardMaterial,
      extendMaterialParams: async (materialIndex: number, materialParams: any) => {
        const materialDef = parser.json.materials[materialIndex]
        if (!materialDef.extensions || !materialDef.extensions.KHR_materials_pbrSpecularGlossiness) return
        const ext = materialDef.extensions.KHR_materials_pbrSpecularGlossiness
        if (ext.diffuseTexture) {
          materialParams.map = await parser.getDependency("texture", ext.diffuseTexture.index)
        }
        if (ext.diffuseFactor) {
          materialParams.color = new THREE.Color().fromArray(ext.diffuseFactor)
          materialParams.opacity = ext.diffuseFactor[3] !== undefined ? ext.diffuseFactor[3] : 1
        }
        materialParams.roughness = ext.glossinessFactor !== undefined ? Math.max(0.1, 1.0 - ext.glossinessFactor) : 0.85
        materialParams.metalness = 0.05
      },
    }))

    loader.load(
      "/3d/tree/ceiba-pentandra.glb",
      (gltf) => {
        if (isDisposed) return

        const treeModel = gltf.scene

        // Configure double-sided materials and leaf transparency
        treeModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh
            mesh.castShadow = true
            mesh.receiveShadow = true
            if (mesh.material) {
              const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
              mats.forEach((mat) => {
                mat.side = THREE.DoubleSide
                if (mat.name && mat.name.toLowerCase().includes("leaf")) {
                  mat.transparent = true
                  mat.alphaTest = 0.12
                }
                mat.needsUpdate = true
              })
            }
          }
        })

        // Measure bounding box to center and scale accurately
        const box = new THREE.Box3().setFromObject(treeModel)
        const size = new THREE.Vector3()
        box.getSize(size)
        const center = new THREE.Vector3()
        box.getCenter(center)

        // Center model at origin
        treeModel.position.set(-center.x, -center.y, -center.z)

        // Scale to fit nicely inside view
        const maxDim = Math.max(size.x, size.y, size.z)
        const targetSize = 3.3
        const scale = targetSize / maxDim

        const pivotGroup = new THREE.Group()
        pivotGroup.add(treeModel)
        pivotGroup.scale.set(scale, scale, scale)

        // Slight downward offset to rest naturally
        pivotGroup.position.set(0, -0.2, 0)

        spinnerGroup.add(pivotGroup)
        setLoading(false)
      },
      (xhr) => {
        if (xhr.total > 0) {
          const pct = Math.round((xhr.loaded / xhr.total) * 100)
          setProgress(pct)
        }
      },
      (error) => {
        console.error("Error loading Ceiba Pentandra tree model:", error)
        setLoading(false)
      }
    )

    // 6. Responsive Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / Math.max(height, 1)
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    // 7. Viewport Intersection Observer (pause rendering when scrolled out of view)
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0.1 }
    )
    intersectionObserver.observe(container)

    // 8. Automatic Spinner Animation Loop (No mouse or scroll interaction needed)
    const startTime = performance.now()
    const spinSpeed = 0.006 // Slow, graceful continuous auto-spin (~0.38 RPM)

    const animate = () => {
      if (isDisposed) return
      animationFrameId = requestAnimationFrame(animate)

      if (!isVisible) return

      const elapsedTime = (performance.now() - startTime) * 0.001

      // Continuous automatic rotation like a spinner
      spinnerGroup.rotation.y += spinSpeed

      // Subtle organic floating bob
      const floatingBob = Math.sin(elapsedTime * 0.9) * 0.035
      masterGroup.position.y = floatingBob

      renderer.render(scene, camera)
    }

    animate()

    // 9. Cleanup
    return () => {
      isDisposed = true
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose()
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose())
          } else {
            obj.material?.dispose()
          }
        }
      })
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square max-w-[540px] mx-auto select-none pointer-events-none ${className}`}
    >
      {/* Loading Indicator */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#43f558] shadow-[0_0_30px_rgba(67,245,88,0.2)]">
            <Loader2 className="w-6 h-6 animate-spin text-[#43f558]" />
          </div>
          {progress > 0 && (
            <div className="text-xs text-neutral-300 font-mono tracking-wider">
              {progress}%
            </div>
          )}
        </div>
      )}

      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)]"
      />
    </div>
  )
}
