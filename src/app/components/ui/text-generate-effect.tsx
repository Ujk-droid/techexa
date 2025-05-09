"use client"
import { cn } from "@/lib/utils"
import { motion, stagger, useAnimate, useInView } from "framer-motion"
import { useEffect } from "react"

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string
  className?: string
}) => {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          opacity: 1,
        },
        {
          duration: 0.1,
          delay: stagger(0.02),
        },
      )
    }
  }, [isInView, animate])

  const wordsArray = words.split(" ")

  return (
    <motion.div ref={scope} className={cn("font-normal", className)}>
      {wordsArray.map((word, idx) => {
        return (
          <span key={`${word}-${idx}`} className="inline-block">
            {word.split("").map((char, index) => (
              <motion.span initial={{ opacity: 0 }} key={`${char}-${index}`} className="inline-block opacity-0">
                {char}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </span>
        )
      })}
    </motion.div>
  )
}
