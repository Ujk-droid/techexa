"use client"
import type React from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export function LampContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = containerRef.current?.getBoundingClientRect() || {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      }

      const x = e.clientX - left
      const y = e.clientY - top

      mouseX.current = x / width
      mouseY.current = y / height
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className={cn("relative w-full overflow-hidden bg-black", className)}>
      <div className="pointer-events-none absolute inset-0 z-10 h-full w-full">
        <div
          className="absolute inset-0 z-10 opacity-[0.4]"
          style={{
            background: `radial-gradient(circle at ${mouseX.current * 100}% ${mouseY.current * 100}%, rgba(255, 0, 0, 0.3), transparent 25%)`,
          }}
        />
        <div
          className="absolute inset-0 z-10 opacity-[0.4]"
          style={{
            background: `radial-gradient(circle at ${mouseX.current * 100}% ${mouseY.current * 100}%, rgba(0, 0, 255, 0.3), transparent 25%)`,
          }}
        />
      </div>
      {children}
    </div>
  )
}
