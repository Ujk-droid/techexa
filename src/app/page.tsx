import Navbar from "./components/navbar"
import Hero from "./components/hero"
import Services from "./components/services"
import About from "./components/about"
import Projects from "./components/projects"
import Contact from "./components/contact"
import Footer from "./components/footer"
import ImageSlider from "./components/image-slider"

export default function Home() {
  // Sample images for the slider
  const sliderImages = [
    {
      src: "/placeholder.svg?height=600&width=1200",
      alt: "Web Design Project",
      title: "E-Commerce Website Redesign",
      description: "A complete overhaul of an online store with improved UX and conversion rate optimization.",
    },
    {
      src: "/placeholder.svg?height=600&width=1200",
      alt: "Mobile App Development",
      title: "Healthcare Mobile Application",
      description: "A patient-centered mobile app for scheduling appointments and accessing medical records.",
    },
    {
      src: "/placeholder.svg?height=600&width=1200",
      alt: "Dashboard Interface",
      title: "Analytics Dashboard",
      description: "A comprehensive dashboard for monitoring business metrics and performance indicators.",
    },
    {
      src: "/placeholder.svg?height=600&width=1200",
      alt: "Web Application",
      title: "Property Management System",
      description: "A full-stack solution for real estate agencies to manage listings and client interactions.",
    },
  ]

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <Hero />
      <section className="py-10 container mx-auto px-4 ">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center ">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6]">
            Featured Projects
          </span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] mx-auto mb-10"></div>
        <ImageSlider images={sliderImages} className="w-full h-[300px] md:h-[400px] lg:h-[500px] mx-auto" />
      </section>
      <Services />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
