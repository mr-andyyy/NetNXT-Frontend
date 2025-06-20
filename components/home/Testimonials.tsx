'use client';

import { useState, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote:
      "NetNXT helped us scale securely with ease. Their support is incredible!",
    client: "Tech Startup, USA",
    rating: 5,
  },
  {
    quote:
      "From compliance to endpoint security, NetNXT covers it all seamlessly.",
    client: "Fintech Client, India",
    rating: 4,
  },
  {
    quote:
      "The team's expertise in cybersecurity gave us confidence from day one.",
    client: "Ecommerce Platform, UK",
    rating: 5,
  },
  {
    quote:
      "Their timely communication and proactive security audits were game changers.",
    client: "Healthcare SaaS, Germany",
    rating: 4,
  },
  {
    quote:
      "Reliable, responsive, and always ahead of threats—NetNXT is our go-to.",
    client: "Logistics Company, Canada",
    rating: 5,
  },
  {
    quote:
      "We saw a dramatic drop in vulnerability reports thanks to their efforts.",
    client: "Edtech Firm, Australia",
    rating: 4,
  },
];

const Testimonials = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-20 px-4 text-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Clients Say
        </h2>

        {mounted && (
          <div className="w-full max-w-7xl mx-auto">
            <Splide
              options={{
                type: 'loop',
                autoplay: true,
                interval: 4000,
                pauseOnHover: true,
                perPage: 3,
                gap: '1.5rem',
                arrows: false,
                pagination: true,
                breakpoints: {
                  1024: {
                    perPage: 2,
                  },
                  640: {
                    perPage: 1,
                  },
                },
              }}
            >
              {testimonials.map((item, index) => (
                <SplideSlide key={index}>
                  <div className="bg-white border border-gray-200 p-8 rounded-3xl text-center transition-all duration-300 shadow-sm hover:shadow-md h-full flex flex-col">
                    {/* Quote */}
                    <p className="text-xl italic text-gray-700 mb-6 flex-grow">
                      &quot;{item.quote}&quot;
                    </p>

                    {/* Rating */}
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < item.rating ? "text-yellow-500" : "text-gray-300"
                          }
                        >
                          <Star fill={i < item.rating ? "currentColor" : "none"} />
                        </span>
                      ))}
                    </div>

                    {/* Client */}
                    <p className="text-lg font-semibold text-green">
                      – {item.client}
                    </p>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Testimonials;