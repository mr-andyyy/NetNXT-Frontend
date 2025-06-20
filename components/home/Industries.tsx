'use client';

import { motion } from 'framer-motion';
import { Cloud, Shield, Globe, Users, TruckIcon } from 'lucide-react';

const industries = [
  {
    title: "SaaS",
    icon: <Cloud className="text-4xl" />,
  },
  {
    title: "Fintech",
    icon: <Shield className="text-4xl" />,
  },
  {
    title: "Ecommerce",
    icon: <Globe className="text-4xl" />,
  },
  {
    title: "Edtech",
    icon: <Users className="text-4xl" />,
  },
  {
    title: "Logistics & Supply Chain",
    icon: <TruckIcon className="text-4xl" />,
  },
];

const Industries = () => {
  return (
    <section className="bg-gray-50 py-20 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-12">Industries We Serve</h2>
        
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {industries.map((ind, i) => (
            <motion.div
              key={i}
              className="w-40 h-40 flex flex-col items-center justify-center bg-white shadow-md rounded-full hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="mb-2 text-green">{ind.icon}</div>
              <span className="text-[14px] font-semibold">{ind.title}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Industries;