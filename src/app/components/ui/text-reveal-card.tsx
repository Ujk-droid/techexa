"use client"
import { cn } from "@/lib/utils"
import type React from "react"

import { useMotionValue, useTransform, motion } from "framer-motion"
import { useEffect, useState } from "react"

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
}: {
  text?: string
  revealText?: string
  children?: React.ReactNode
  className?: string
}) => {
  const [IsMounted, setIsMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isPhone, setIsPhone] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const checkIfPhone = () => {
      setIsPhone(window.innerWidth <= 768)
    }
    checkIfPhone()
    window.addEventListener("resize", checkIfPhone)
    return () => {
      window.removeEventListener("resize", checkIfPhone)
    }
  }, [])

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXPosition = useTransform(x, (latest) => {
    if (isPhone) return 0
    return latest / 20
  })
  const mouseYPosition = useTransform(y, (latest) => {
    if (isPhone) return 0
    return latest / 20
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPhone) return
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: mouseXPosition,
        y: mouseYPosition,
      }}
      whileHover="hover"
      className={cn("relative w-auto h-auto py-4 mx-auto", className)}
    >
      {children ? (
        children
      ) : (
        <div>
          <div className="relative z-10 text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
            {text}
          </div>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute inset-0 z-0 flex items-center justify-center text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-red-500 to-blue-500"
          >
            {revealText || text}
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
