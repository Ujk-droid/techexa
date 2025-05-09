"use client"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export const SparklesCore = ({
  id,
  background,
  minSize,
  maxSize,
  particleDensity,
  className,
  particleColor,
  particleOpacity,
}: {
  id?: string
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  className?: string
  particleColor?: string
  particleOpacity?: number
}) => {
  const [particles, setParticles] = useState<
    {
      x: number
      y: number
      size: number
      delay: number
    }[]
  >([])

  useEffect(() => {
    const particleCount = particleDensity || 50
    const minSizeValue = minSize || 1
    const maxSizeValue = maxSize || 3

    const newParticles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSizeValue - minSizeValue) + minSizeValue,
      delay: Math.random() * 1000,
    }))

    setParticles(newParticles)
  }, [minSize, maxSize, particleDensity])

  return (
    <div
      id={id}
      className={cn("fixed inset-0 w-full h-full", className)}
      style={{
        background: background || "transparent",
      }}
    >
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, particleOpacity || 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: particle.delay / 1000,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 3 + 1,
          }}
          style={{
            position: "absolute",
            top: `${particle.y}%`,
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: "50%",
            backgroundColor: particleColor || "#ffffff",
          }}
        />
      ))}
    </div>
  )
}
