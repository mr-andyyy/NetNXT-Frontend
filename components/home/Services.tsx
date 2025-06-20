'use client';

import { motion } from 'framer-motion';
import { Shield, Cloud, Users, Handshake, LineChart, FileCheck } from 'lucide-react';

const services = [
  {
    number: 1,
    title: "Unified Device Management",
    description:
      "Windows, Mac, Linux, Android, iOS and ChromeOS configuration and management, all on cloud.",
    icon: <Cloud className="w-6 h-6 text-green" />,
  },
  {
    number: 2,
    title: "Compliance Automation",
    description:
      "Elevate Security and adherence effortlessly. Streamline processes, eliminate risks, and embrace a worry-free future with advanced automation across your organisation.",
    icon: <FileCheck className="w-6 h-6 text-green" />,
  },
  {
    number: 3,
    title: "Identity and Access Management",
    description:
      "Implement and enforce SSO and Multi factor authentication (MFA) across all SAML and OIDC-based applications.",
    icon: <Users className="w-6 h-6 text-green" />,
  },
  {
    number: 4,
    title: "Network Monitoring System",
    description:
      "Monitor Networks, Server, iOT, Cloud Infra, Temp, Sensors and more. Alerts on email, SMS, ITSM tools etc.",
    icon: <LineChart className="w-6 h-6 text-green" />,
  },
  {
    number: 5,
    title: "EndPoint Security",
    description:
      "Robust protection, real-time threat detection, and advanced measures to keep your endpoints secure.",
    icon: <Shield className="w-6 h-6 text-green" />,
  },
  {
    number: 6,
    title: "VAPT & Risk Management",
    description:
      "Cyber threats evolve, and so should your security strategy. Stay ahead with our VAPT & Risk Management.",
    icon: <Handshake className="w-6 h-6 text-green" />,
  },
];

const Services = () => {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ number, title, description, icon }, index) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: number * 0.1 }}
              className={`${
                (index + 1) % 2 === 0 ? "bg-white" : "bg-lightGreen"
              } p-6 rounded-2xl shadow hover:shadow-lg transition-all`}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="text-green font-bold text-3xl">{number}</div>
                <div>{icon}</div>
              </div>
              <div className="text-2xl font-semibold mb-2">{title}</div>
              <p className="text-base text-darkGrey">{description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Services;