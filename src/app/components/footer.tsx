"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebookF } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <Image src="/logo1.jpg" alt="TechExa Vision Logo" width={50} height={50} />
              <span className="ml-3 text-xl font-bold">TechExa Vision</span>
            </div>
            <p className="text-gray-400 mb-4">
              Transforming ideas into exceptional digital solutions with cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="group relative p-2 rounded-full transition-all duration-300 hover:bg-blue-600/20">
                <FaFacebookF size={20} className="text-blue-500 group-hover:text-blue-400 transition-colors" />
                <span className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity" />
              </a>
              <a href="#" className="group relative p-2 rounded-full transition-all duration-300 hover:bg-sky-600/20">
                <FaTwitter size={20} className="text-sky-500 group-hover:text-sky-400 transition-colors" />
                <span className="absolute inset-0 rounded-full bg-sky-500 opacity-0 group-hover:opacity-10 transition-opacity" />
              </a>
              <a href="#" className="group relative p-2 rounded-full transition-all duration-300 hover:bg-pink-600/20">
                <FaInstagram size={20} className="text-pink-500 group-hover:text-pink-400 transition-colors" />
                <span className="absolute inset-0 rounded-full bg-pink-500 opacity-0 group-hover:opacity-10 transition-opacity" />
              </a>
              <a href="https://www.linkedin.com/in/uzma-khan-4818b42b4" target="_blank" rel="noopener noreferrer"
                 className="group relative p-2 rounded-full transition-all duration-300 hover:bg-blue-600/20">
                <FaLinkedin size={20} className="text-blue-500 group-hover:text-blue-400 transition-colors" />
                <span className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="group flex items-center text-gray-400 hover:text-white transition-colors">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                  Web Design
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center text-gray-400 hover:text-white transition-colors">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                  Full-Stack Development
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center text-gray-400 hover:text-white transition-colors">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                  Mobile Applications
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center text-gray-400 hover:text-white transition-colors">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                  UI/UX Design
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center text-gray-400 hover:text-white transition-colors">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                  E-Commerce Solutions
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="group flex items-center text-gray-400 hover:text-white transition-colors">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center text-gray-400 hover:text-white transition-colors">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center text-gray-400 hover:text-white transition-colors">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center text-gray-400 hover:text-white transition-colors">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center text-gray-400 hover:text-white transition-colors">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                gardeneast
              </li>
              <li className="flex items-center text-gray-400">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                karachi
              </li>
              <li className="flex items-center text-gray-400">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                Pakistan
              </li>
              <li className="flex items-center text-gray-400">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                03312436713aa@gmail.com
              </li>
              <li className="flex items-center text-gray-400">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                03312436713
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} TechExa Vision. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors hover:underline">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors hover:underline">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors hover:underline">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}