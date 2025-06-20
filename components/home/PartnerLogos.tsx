'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';

// Partner names only — logo path will be derived from name
const partners = [
  { name: 'jumpcloud' },
  { name: 'sentinelone' },
  { name: 'pingsafe' },
  { name: 'catonetworks' },
  { name: 'scrut' },
  { name: 'fortinet' },
  { name: 'ciscomeraki' },
  { name: 'twingate' },
];

const PartnerLogos = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 bg-gray-50 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Our Partners</h2>
      </motion.div>

      <div className="w-screen px-4 relative overflow-hidden" ref={marqueeRef}>
        {/* Left Gradient Mask */}
        <div
          className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(249, 250, 251, 1), rgba(249, 250, 251, 0))",
          }}
        />

        {/* Right Gradient Mask */}
        <div
          className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, rgba(249, 250, 251, 1), rgba(249, 250, 251, 0))",
          }}
        />

        {/* Marquee Content */}
        <Marquee
          gradient={false}
          speed={30}
          pauseOnHover={true}
          direction="right"
          className="overflow-hidden transition-all duration-700 ease-in-out"
        >
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex justify-center items-center mx-12 transition-transform duration-500 ease-in-out hover:scale-105"
            >
              <Image
                src={`/Logos/${partner.name}.png`}
                alt={`${partner.name} logo`}
                width={150}
                height={80}
                className="h-16 w-auto object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default PartnerLogos;
