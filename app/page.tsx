'use client';

import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar';
import VariableText from '@/components/VariableText';
import TypewriterText from '@/components/TypewriterText';
import SplitTextOnScroll from '@/components/SplitTextOnScroll';
import { FaCheckCircle } from 'react-icons/fa';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { motion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { developers } from '@/lib/developers';
import AnimatedComingSoon from '@/components/AnimatedComingSoon';
import ComingSoonModal from '@/components/ComingSoonModal';
import CountdownTimer from '@/components/CountdownTimer';

type Developer = {
  id: string
  name: string
  role: string
  image_url: string
  github_url: string | null
  linkedin_url: string | null
  instagram_url: string | null
  college_name: string | null
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <main className="flex min-h-screen flex-col items-center w-full overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <motion.section 
        className="pt-24 pb-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: isMobile ? 0.3 : 0.6 }}
          >
            <VariableText
              text="Welcome to BtechNode"
              className={`${
                isMobile 
                  ? 'text-2xl sm:text-3xl font-bold mb-4' 
                  : 'text-2xl sm:text-4xl md:text-6xl font-bold mb-6'
              } text-white whitespace-nowrap`}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0.2 : 0.4 }}
          >
            {isMobile ? (
              <TypewriterText
                text="Your one-stop platform for B.Tech education. Access curated YouTube playlists, organized by subject and chapter, to enhance your engineering journey."
                className="text-sm sm:text-base text-gray-300 mb-6 max-w-3xl mx-auto"
                delay={40}
              />
            ) : (
              <SplitTextOnScroll
                text="Your one-stop platform for B.Tech education. Access curated YouTube playlists, organized by subject and chapter, to enhance your engineering journey."
                className="text-sm sm:text-base md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
              />
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0.4 : 0.6 }}
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className={`
                inline-block bg-primary hover:bg-primary/80 text-white font-bold 
                ${isMobile ? 'py-2 px-6 text-sm' : 'py-3 px-8'} 
                rounded-lg transition-colors
              `}
            >
              Start Learning
            </button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Coming Soon Section */}
      <section className="pt-12 pb-32 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto text-center text-4xl sm:text-5xl md:text-7xl">
          <AnimatedComingSoon />
        </div>
        <CountdownTimer />
      </section>

      {/* Our Developers Section */}
      <section 
        id="developers"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-light/10 w-full overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {developers.map((dev, index) => (
              <div
                key={dev.id}
                className="instruction-card bg-black/30 p-6 rounded-xl border border-white/10"
              >
                <div className="flex flex-col items-center">
                  {/* Profile Image */}
                  <div className="w-24 h-24 mb-4 overflow-hidden rounded-full">
                    <Image
                      src={dev.image_url}
                      alt={dev.name}
                      width={96}
                      height={96}
                      className="rounded-full object-cover border-2 border-primary/20"
                    />
                  </div>
                  
                  {/* Name with glow effect */}
                  <div className="flex items-center gap-1 mb-2 w-full justify-center">
                    <div className="flex items-center gap-2">
                      <h3 className="developer-text text-xl font-semibold">
                        {dev.name}
                      </h3>
                      <FaCheckCircle className="text-[#1d9bf0] text-lg" />
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-center mb-4 text-sm">
                    {dev.role}
                  </p>
                  
                  {/* Social links */}
                  <div className="flex justify-center space-x-4 mb-4">
                    {dev.github_url && (
                      <a
                        href={dev.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <FaGithub className="text-xl" />
                      </a>
                    )}
                    {dev.linkedin_url && (
                      <a
                        href={dev.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#0077b5] transition-colors"
                      >
                        <FaLinkedin className="text-xl" />
                      </a>
                    )}
                    {dev.instagram_url && (
                      <a
                        href={dev.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#E1306C] transition-colors"
                      >
                        <FaInstagram className="text-xl" />
                      </a>
                    )}
                  </div>
                  
                  {dev.college_name && (
                    <p className="text-gray-400 text-center text-sm font-mono border-t border-gray-700/50 pt-4">
                      {dev.college_name}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-dark">
        <div className="max-w-6xl mx-auto">
          {/* Copyright */}
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} BtechNode. All rights reserved.
          </p>
        </div>
      </footer>

      <ComingSoonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
