'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const LogoCTA = () => {
  return (
    <section className="py-20 text-center px-6 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo Image */}
        <div className="flex justify-center mb-4">
          <Image
            src="/Logos/logo.png"
            alt="NetNXT Logo"
            width={80}
            height={40}
            className="w-[60px] h-auto sm:w-[70px] md:w-[80px]"
            priority
          />
        </div>
        
        <h3 className="text-xl mb-4">
          Discover Seamless & Effective Security for Better Data Governance
          and Compliance.
        </h3>
        <div className="mb-6 text-xl">Share Your Insights in Our Survey!</div>
        <a 
					href="https://forms.gle/isrLgUXn2fV8PbBG9"
					target="_blank"
					rel="noopener noreferrer"
				>
        <motion.button 
          className="bg-green text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-colors duration-300 font-medium"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Take the Survey
        </motion.button>
        </a>
      </motion.div>
    </section>
  );
};

export default LogoCTA;