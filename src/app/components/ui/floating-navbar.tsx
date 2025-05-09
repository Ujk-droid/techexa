"use client"
import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string
    link: string
    icon?: React.ReactNode
  }[]
  className?: string
}) => {
  const { scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(true)

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined or null
    if (typeof current === "number") {
      // When scrolling down, hide the navbar
      const direction = current! - scrollYProgress.getPrevious()!

      if (scrollYProgress.get() < 0.05) {
        setVisible(true)
      } else {
        if (direction < 0) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      }
    }
  })

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full bg-black/50 backdrop-blur-md z-[5000] px-8 py-4",
          className,
        )}
      >
        <nav className="flex gap-6 items-center">
          {navItems.map((navItem, idx) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative text-white hover:text-red-500 transition-colors duration-300 flex items-center gap-1",
              )}
            >
              <span className="relative">
                {navItem.icon}
                <span>{navItem.name}</span>
              </span>
            </Link>
          ))}
        </nav>
      </motion.div>
    </AnimatePresence>
  )
}
