"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CursorFollow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", mouseMove)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [])

  useEffect(() => {
    const handleMouseOver = () => setCursorVariant("hover")
    const handleMouseOut = () => setCursorVariant("default")

    // Add event listeners to all links and buttons
    const interactiveElements = document.querySelectorAll("a, button")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseover", handleMouseOver)
      el.addEventListener("mouseout", handleMouseOut)
    })

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseover", handleMouseOver)
        el.removeEventListener("mouseout", handleMouseOut)
      })
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(255, 0, 0, 0.2)",
      mixBlendMode: "difference" as const,
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: "rgba(255, 0, 0, 0)",
      border: "2px solid rgba(255, 0, 0, 0.5)",
      mixBlendMode: "difference" as const,
    },
  }

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:block"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  )
}
