"use client"
import { cn } from "@/lib/utils"
import type React from "react"

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
  animate?: boolean
}) => {
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0 rounded-lg bg-gradient-to-r from-red-500 via-blue-500 to-red-500 opacity-70 group-hover:opacity-100 blur-sm transition duration-500",
          animate && "animate-gradient",
          className,
        )}
      />
      <div className="relative">{children}</div>
    </div>
  )
}