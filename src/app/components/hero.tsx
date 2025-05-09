"use client"
import { motion } from "framer-motion"
import { TypewriterEffect } from "./ui/typewriter-effect"
import { BackgroundBeams } from "./ui/background-beams"
import Image from "next/image"

export default function Hero() {
  const words = [
    {
      text: "Building",
    },
    {
      text: "digital",
    },
    {
      text: "experiences",
    },
    {
      text: "that",
    },
    {
      text: "matter.",
      className: "text-red-500 dark:text-[#BB3E00]",
    },
  ]

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      <BackgroundBeams className="absolute inset-0 z-0" />

      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 3, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Image
            src="/logo1.jpg"
            alt="TechExa Vision Logo"
            width={200}
            height={200}
            className="mx-auto"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          <span className="bg-clip-text  text-transparent bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6]">
            TechExa Vision
          </span>
        </motion.h1>

        <div className="mb-8">
          <TypewriterEffect words={words} />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
        >
          We transform ideas into exceptional digital solutions with cutting-edge web design and full-stack development.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {/* <a
            href="#contact"
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-blue-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300"
          >
            Get Started
          </a> */}
        </motion.div>
      </div>
    </section>
  )
}
