"use client"
import { cn } from "@/lib/utils"
import Image from "next/image"

export const CssGlobe = ({
  className,
  size = 400,
}: {
  className?: string
  size?: number
}) => {
  return (
    <div className={cn("relative overflow-hidden rounded-full", className)} style={{ width: size, height: size }}>
      {/* Enhanced glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-blue-500/30 rounded-full blur-xl"></div>

      <div className="w-full h-full relative rounded-full overflow-hidden">
        <div className="absolute inset-0 animate-spin-slow">
          <Image
            src="https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg"
            alt="Earth"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Add a gradient overlay that enhances the colors */}
        <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 via-transparent to-blue-500/10 mix-blend-overlay"></div>
      </div>

      {/* Add a pulsing glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
    </div>
  )
}
