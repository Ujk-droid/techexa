
"use client";
import { motion } from "framer-motion";
import { GradientCard } from "./ui/gradient-card";
import Image from "next/image";

export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-featured online store with payment integration and inventory management.",
      image: "/p.png",
      width: 600,
      height: 800,
      tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    },
    {
      title: "Healthcare Dashboard",
      description:
        "An intuitive analytics dashboard for healthcare providers to monitor patient data.",
      image: "/p.png",
      width: 600,
      height: 800,
      tags: ["React", "Express", "PostgreSQL", "D3.js"],
    },
    {
      title: "Real Estate App",
      description:
        "Mobile application for property listings with virtual tours and agent chat.",
      image: "/p.png",
      width: 600,
      height: 800,
      tags: ["React Native", "Firebase", "Google Maps API"],
    },
  ];

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] bg-clip-text">
            Our Projects
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
            Explore our portfolio of successful projects that showcase our
            expertise and creativity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <GradientCard>
                <div className="flex flex-col h-full">
                  <div className="w-full h-60 rounded-xl overflow-hidden mb-4 group-hover:shadow-lg group-hover:shadow-red-500/30 transition-all duration-300">
                    <Image
                      src={project.image}
                      height={project.height}
                      width={project.width}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt={project.title}
                    />
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#F4631E] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-800 text-xs rounded-full text-gray-300 transition-colors duration-300 hover:bg-red-300 hover:text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </GradientCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}