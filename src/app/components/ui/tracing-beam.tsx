"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const contentRef = useRef<HTMLDivElement>(null)
  const [svgHeight, setSvgHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight)
    }
  }, [])

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
    stiffness: 500,
    damping: 90,
  })

  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]), {
    stiffness: 500,
    damping: 90,
  })

  return (
    <motion.div ref={ref} className={cn("relative w-full max-w-7xl mx-auto", className)}>
      <div className="absolute -left-4 md:-left-20 top-3">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow: scrollYProgress.get() > 0 ? "none" : "rgba(255,255,255, 0.15) 0px 0px 0px 2px",
            backgroundColor: scrollYProgress.get() > 0 ? "white" : "rgba(255, 0, 0, 0.5)",
            borderColor: scrollYProgress.get() > 0 ? "white" : "rgba(255, 0, 0, 0.5)",
          }}
          className="ml-[27px] h-4 w-4 rounded-full border border-neutral-200 bg-white"
        />
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 hidden md:block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0 V ${svgHeight}`}
            fill="none"
            stroke="#f43f5e"
            strokeOpacity="0.16"
            transition={{
              duration: 10,
            }}
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <motion.path
            d={`M 1 ${y1} L 1 ${y2}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            className="relative z-10"
          />
          <defs>
            <motion.linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={y1} y2={y2}>
              <stop stopColor="#f43f5e" />
              <stop offset="0.3" stopColor="#ef4444" />
              <stop offset="0.6" stopColor="#3b82f6" />
              <stop offset="0.9" stopColor="#8b5cf6" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  )
}
