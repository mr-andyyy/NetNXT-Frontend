'use client';

import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

const offices = [
  {
    title: "Registered Office",
    address: [
      "NETNXT Network Pvt Ltd",
      "Level 2, Regus Elegance Tower, Jasola,",
      "South East Delhi, New Delhi – 110025"
    ]
  },
  {
    title: "Bengaluru Office",
    address: [
      "NetNXT Network Pvt Ltd",
      "9th Floor, Wework Manyata Redwood,",
      "BLOCK D3,",
      "Redwood Building, Manyata Tech Park,",
      "Thanisandra",
      "Bengaluru, Karnataka 560045"
    ]
  },
  {
    title: "Gurugram Office",
    address: [
      "NetNXT Network Pvt Ltd",
      "4th Floor, Landmark Cyberpark, Prajapati",
      "Rd, Sector 67, Gurugram, Haryana 122018"
    ]
  },
  {
    title: "USA Office",
    address: [
      "NetNXT LLC",
      "1942 Broadway St Ste, Boulder, CO 80302"
    ]
  }
];

const OfficeLocations = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Global Presence</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            With offices strategically located across the globe, we're positioned to serve our clients wherever they are
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {offices.map((office, index) => (
            <motion.div
              key={office.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-green/10 rounded-full mb-4 mx-auto">
                <Building2 className="w-6 h-6 text-green" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">{office.title}</h3>
              <div className="space-y-1">
                {office.address.map((line, i) => (
                  <p key={i} className="text-gray-600 text-center text-sm">
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfficeLocations;