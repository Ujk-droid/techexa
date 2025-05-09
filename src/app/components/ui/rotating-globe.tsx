"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

export const RotatingGlobe = ({
  className,
  size = 400,
  autoRotate = true,
  rotationSpeed = 0.005,
  enableZoom = false,
  enablePan = false,
}: {
  className?: string
  size: number
  autoRotate?: boolean
  rotationSpeed?: number
  enableZoom?: boolean
  enablePan?: boolean
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const globeRef = useRef<THREE.Mesh | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const frameIdRef = useRef<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Initialize scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    camera.position.z = 3
    cameraRef.current = camera

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(size, size)
    renderer.setClearColor(0x000000, 0)
    if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement)
    }
    rendererRef.current = renderer

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
    scene.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0)
    directionalLight.position.set(5, 3, 5)
    scene.add(directionalLight)

    // Create earth globe
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64)

    // Create a temporary colored sphere while texture loads
    const tempMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 })
    const tempSphere = new THREE.Mesh(earthGeometry, tempMaterial)
    scene.add(tempSphere)

    // Load earth texture - using a direct URL to ensure it loads
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg", // Reliable texture URL
        (texture) => {
            // Remove the temporary sphere
            scene.remove(tempSphere)

            // Create the earth material with loaded texture
            const earthMaterial = new THREE.MeshPhongMaterial({
                map: texture,
                bumpScale: 0.05,
                specular: new THREE.Color(0x333333),
                shininess: 5,
            })

            const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial)
            scene.add(earthMesh)
            globeRef.current = earthMesh
            setIsLoaded(true)

            // Add clouds layer
            textureLoader.load(
                "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
                (cloudsTexture) => {
                    const cloudsGeometry = new THREE.SphereGeometry(1.02, 64, 64)
                    const cloudsMaterial = new THREE.MeshPhongMaterial({
                        map: cloudsTexture,
                        transparent: true,
                        opacity: 0.4,
                    })
                    const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial)
                    scene.add(cloudsMesh)

                    // Make clouds rotate slightly faster than the earth
                    const animateClouds = () => {
                        if (autoRotate) {
                            cloudsMesh.rotation.y += rotationSpeed * 1.1
                        }
                        requestAnimationFrame(animateClouds)
                    }
                    animateClouds()
                },
            )

            // Add glow effect
            const glowGeometry = new THREE.SphereGeometry(1.1, 64, 64)
            const glowMaterial = new THREE.MeshPhongMaterial({
                color: 0x0077ff,
                transparent: true,
                opacity: 0.1,
                side: THREE.BackSide,
            })
            const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial)
            scene.add(glowMesh)
        },
        // Progress callback
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
        },
        // Error callback
        (error) => {
            console.error("An error happened while loading texture:", error)
            // If texture fails, use a colored material instead
            const fallbackMaterial = new THREE.MeshPhongMaterial({
                color: 0x2233ff,
                emissive: 0x112244,
                specular: 0x333333,
                shininess: 25,
            })
            const earthMesh = new THREE.Mesh(earthGeometry, fallbackMaterial)
            scene.add(earthMesh)
            globeRef.current = earthMesh
            setIsLoaded(true)
        },
    )

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = enableZoom
    controls.enablePan = enablePan
    controls.rotateSpeed = 0.5
    controlsRef.current = controls

    // Animation loop
    const animate = () => {
        if (globeRef.current && autoRotate) {
            globeRef.current.rotation.y += rotationSpeed * (isHovered ? 0.5 : 1)
        }

        if (controlsRef.current) {
            controlsRef.current.update()
        }

        if (rendererRef.current && sceneRef.current && cameraRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current)
        }

        frameIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
        if (!containerRef.current || !cameraRef.current || !rendererRef.current) return

        const width = containerRef.current.clientWidth
        const height = containerRef.current.clientHeight

        cameraRef.current.aspect = width / height
        cameraRef.current.updateProjectionMatrix()

        rendererRef.current.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Cleanup
    return () => {
        if (frameIdRef.current) {
            cancelAnimationFrame(frameIdRef.current)
        }
        if (rendererRef.current && rendererRef.current.domElement && container) {
            container.removeChild(rendererRef.current.domElement)
        }

        window.removeEventListener("resize", handleResize)
    }
}, [size, autoRotate, rotationSpeed, enableZoom, enablePan, isHovered])

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-full", className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: size, height: size }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </motion.div>
  )
}
