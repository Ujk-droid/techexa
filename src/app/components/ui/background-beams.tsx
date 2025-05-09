"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function BackgroundBeams({
  className,
}: {
  className?: string
}) {
  const [, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Call initially and on resize
    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Animation variables
    let animationFrameId: number
    const maxBeams = 20
    const beams: Beam[] = []

    // Beam class
    class Beam {
      x: number
      y: number
      length: number
      opacity: number
      width: number
      direction: number
      speed: number
      color: string

      constructor(x: number, y: number, length: number, width: number, direction: number, speed: number) {
        this.x = x
        this.y = y
        this.length = length
        this.width = width
        this.opacity = Math.random() * 0.5 + 0.3
        this.direction = direction
        this.speed = speed
        this.color = `rgb(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(
          Math.random() * 50 + 50,
        )}, ${Math.floor(Math.random() * 100 + 155)})`
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath()
        context.moveTo(this.x, this.y)
        const endX = this.x + Math.cos(this.direction) * this.length
        const endY = this.y + Math.sin(this.direction) * this.length
        context.lineTo(endX, endY)
        context.strokeStyle = this.color
        context.globalAlpha = this.opacity
        context.lineWidth = this.width
        context.stroke()
      }

      update() {
        this.x += Math.cos(this.direction) * this.speed
        this.y += Math.sin(this.direction) * this.speed
        this.opacity -= 0.005
      }
    }

    // Create initial beams
    for (let i = 0; i < maxBeams / 2; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const length = Math.random() * 300 + 100
      const width = Math.random() * 4 + 1
      const direction = Math.random() * Math.PI * 2
      const speed = Math.random() * 2 + 0.5
      beams.push(new Beam(x, y, length, width, direction, speed))
    }

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })

      // Add new beam occasionally on mouse move
      if (Math.random() > 0.92 && beams.length < maxBeams) {
        const length = Math.random() * 300 + 100
        const width = Math.random() * 4 + 1
        const direction = Math.random() * Math.PI * 2
        const speed = Math.random() * 2 + 0.5
        beams.push(new Beam(event.clientX, event.clientY, length, width, direction, speed))
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw beams
      for (let i = 0; i < beams.length; i++) {
        beams[i].update()
        beams[i].draw(context)

        // Remove beams that are off screen or faded out
        if (
          beams[i].x < 0 ||
          beams[i].x > canvas.width ||
          beams[i].y < 0 ||
          beams[i].y > canvas.height ||
          beams[i].opacity <= 0
        ) {
          beams.splice(i, 1)
          i--
        }
      }

      // Add new beams randomly
      if (Math.random() > 0.97 && beams.length < maxBeams) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const length = Math.random() * 300 + 100
        const width = Math.random() * 4 + 1
        const direction = Math.random() * Math.PI * 2
        const speed = Math.random() * 2 + 0.5
        beams.push(new Beam(x, y, length, width, direction, speed))
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.div className={cn("fixed inset-0 z-0 opacity-40", className)}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}
