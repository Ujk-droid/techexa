"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Point {
  x: number
  y: number
  vx: number
  vy: number
  originX: number
  originY: number
  active?: boolean
}

interface Line {
  startIndex: number
  endIndex: number
  alpha: number
}

export const GithubGlobe = ({
  className,
  size = 400,
  pointCount = 40,
  lineCount = 15,
  pointColor = "#8a8f98",
  lineColor = "rgba(255, 255, 255, 0.2)",
  backgroundColor = "transparent",
  showAnimations = true,
  minRadius = 0.5,
  maxRadius = 1.2,
  minSpeed = 0.001,
  maxSpeed = 0.005,
}: {
  className?: string
  size?: number
  pointCount?: number
  lineCount?: number
  pointColor?: string
  lineColor?: string
  backgroundColor?: string
  showAnimations?: boolean
  minRadius?: number
  maxRadius?: number
  minSpeed?: number
  maxSpeed?: number
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<Point[]>([])
  const linesRef = useRef<Line[]>([])
  const animationFrameIdRef = useRef<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [dimensions] = useState({ width: size, height: size })

  // Initialize points and lines only once
  useEffect(() => {
    const center = size / 2
    const radius = center * 0.8

    // Initialize points
    const newPoints: Point[] = []
    for (let i = 0; i < pointCount; i++) {
      // Generate points on a sphere
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(2 * Math.random() - 1)

      const x = center + radius * Math.sin(phi) * Math.cos(theta)
      const y = center + radius * Math.sin(phi) * Math.sin(theta)

      // Random velocity
      const speed = minSpeed + Math.random() * (maxSpeed - minSpeed)
      const angle = Math.random() * 2 * Math.PI

      newPoints.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        originX: x,
        originY: y,
      })
    }
    pointsRef.current = newPoints

    // Initialize lines
    const newLines: Line[] = []
    for (let i = 0; i < lineCount; i++) {
      const startIndex = Math.floor(Math.random() * pointCount)
      let endIndex

      do {
        endIndex = Math.floor(Math.random() * pointCount)
      } while (endIndex === startIndex)

      newLines.push({
        startIndex,
        endIndex,
        alpha: 0.1 + Math.random() * 0.4,
      })
    }
    linesRef.current = newLines

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
    }
  }, [size, pointCount, lineCount, minSpeed, maxSpeed])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || !showAnimations) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Draw background
      if (backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, dimensions.width, dimensions.height)
      }

      // Update and draw points
      const points = pointsRef.current
      for (let i = 0; i < points.length; i++) {
        const point = points[i]

        // Update position
        point.x += point.vx * (isHovered ? 2 : 1)
        point.y += point.vy * (isHovered ? 2 : 1)

        // Boundary check and bounce
        if (point.x < 0 || point.x > dimensions.width) {
          point.vx = -point.vx
        }

        if (point.y < 0 || point.y > dimensions.height) {
          point.vy = -point.vy
        }

        // Draw point
        const radius = minRadius + Math.random() * (maxRadius - minRadius)
        ctx.beginPath()
        ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI)
        ctx.fillStyle = pointColor
        ctx.fill()
      }

      // Draw lines
      const lines = linesRef.current
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const startPoint = points[line.startIndex]
        const endPoint = points[line.endIndex]

        ctx.beginPath()
        ctx.moveTo(startPoint.x, startPoint.y)
        ctx.lineTo(endPoint.x, endPoint.y)
        ctx.strokeStyle = lineColor
        ctx.globalAlpha = line.alpha
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      animationFrameIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
    }
  }, [dimensions, showAnimations, backgroundColor, pointColor, lineColor, isHovered, minRadius, maxRadius])

  return (
    <motion.div
      className={cn("relative overflow-hidden rounded-full", className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} className="w-full h-full" />
    </motion.div>
  )
}
