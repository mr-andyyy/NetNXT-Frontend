'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type HeroProps = {
  onLearnMore?: () => void;
};

const Hero = ({ onLearnMore }: HeroProps) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setShowVideo(true); // Only show video on client
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bannerRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = bannerRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      // Subtle parallax effect
      const moveX = 10 * (0.5 - x);
      const moveY = 10 * (0.5 - y);
      
      bannerRef.current.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Add this handler if not passed as prop
  const handleLearnMore = () => {
    const section = document.getElementById('expertise');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    if (onLearnMore) onLearnMore();
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      
      {/* Banner video without parallax effect */}
      <div className="absolute inset-0 w-full h-full z-0 scale-[1.05] overflow-hidden">
        {showVideo && (
          <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
          >
        <source src="/videos/Homepage-video copy.mp4" type="video/mp4" />
        Your browser does not support the video tag.
          </video>
        )}
      </div>
      
      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
            TRUST THE PROFESSIONALS
          </h1>
          <p className="text-white text-xl mb-8">
            Trusted Security Partner for Digital Native Companies across the
            Globe
          </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://book.netnxt.com/#/4521459000000035054"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
              "bg-green text-white px-8 py-3 rounded-full font-medium",
              "hover:bg-green/90 transition-colors duration-300",
              "flex items-center justify-center"
              )}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.a>
            <button 
              onClick={handleLearnMore}
              className={cn(
                "border border-white text-white px-8 py-3 rounded-full font-medium",
                "hover:bg-white/10 transition-colors duration-300"
              )}
            >
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
