'use client';

import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section className="py-16 px-4 bg-lightGreen">
      <motion.div 
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          We are a Managed IT & Security
          <br />
          Services Provider
        </h2>
        <p className="text-xl text-center leading-relaxed">
          At NetNXT, we specialize in customized solutions. As a premier
          Managed IT & Security Service Provider, we are dedicated to
          understanding your business inside out. Our hyper-personalized
          approach sets us apart, delivering bespoke IT solutions designed to
          propel your business forward.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutUs;