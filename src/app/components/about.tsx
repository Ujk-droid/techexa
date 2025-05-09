"use client"
import { motion } from "framer-motion"
import { SparklesCore } from "./ui/sparkles"

export default function About() {
  return (
    <section id="about" className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={70}
          className="w-full h-full"
          particleColor="#ff0000"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About TechExa Vision</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] mb-6"></div>
            <p className="text-gray-300 mb-6">
              TechExa Vision is a forward-thinking software house dedicated to pushing the boundaries of digital
              innovation. We combine technical expertise with creative thinking to deliver solutions that not only meet
              but exceed our clients expectations.
            </p>
            <p className="text-gray-300 mb-6">
              Our team of skilled developers, designers, and strategists work collaboratively to transform complex
              challenges into elegant, user-friendly digital experiences that drive business growth.
            </p>
            <p className="text-gray-300">
              With a focus on cutting-edge technologies and best practices, we ensure that every project we undertake is
              built to the highest standards of quality, performance, and security.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-[#FE7743] to-transparent p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                <p className="text-gray-300">
                  To empower businesses through innovative digital solutions that drive growth and success.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#547792] to-transparent p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                <p className="text-gray-300">
                  To be the leading force in digital transformation, setting new standards of excellence.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#A2B9A7] to-transparent p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Our Values</h3>
                <p className="text-gray-300">
                  Innovation, integrity, collaboration, and a relentless pursuit of excellence.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#B2C6D5] to-transparent p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Our Approach</h3>
                <p className="text-gray-300">
                  User-centered, data-driven, and focused on delivering measurable results.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
