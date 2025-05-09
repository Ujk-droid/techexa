"use client"
import { cn } from "@/lib/utils"

export const GradientCard = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className="group relative p-[3px] rounded-xl transition-all duration-300 hover:scale-[1.02]">
      {/* Gradient border that's always visible but enhances on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#6EE7B7] via-[#52b0ea] to-[#3B82F6] opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Card content */}
      <div className={cn("relative bg-gray-900 rounded-xl p-4 h-full z-10", className)}>
        {children}
      </div>

      {/* Hover glow effect */}
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#6EE7B7] via-[#52b0ea] to-[#3B82F6] opacity-50 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
    </div>
  )
}