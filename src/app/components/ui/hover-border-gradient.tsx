"use client"
import { cn } from "@/lib/utils"
import type React from "react"

import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import type { MouseEvent, ReactNode } from "react"

export const HoverBorderGradient = ({
  children,
  containerClassName,
  className,
  as: Tag = "div",
  from = "rgba(255, 0, 0, 0.5)",
  to = "rgba(0, 0, 255, 0.5)",
  ...props
}: {
  children?: ReactNode
  containerClassName?: string
  className?: string
  as?: React.ElementType
  from?: string
  to?: string
  [key: string]: unknown
}) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div className={cn("relative rounded-xl", containerClassName)} onMouseMove={handleMouseMove}>
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              circle at ${mouseX}px ${mouseY}px,
              ${from},
              ${to} 80%,
              transparent
            )
          `,
        }}
      />
      <Tag className={cn("relative rounded-xl", className)} {...props}>
        {children}
      </Tag>
    </div>
  )
}