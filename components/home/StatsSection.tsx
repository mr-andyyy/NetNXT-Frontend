'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const StatsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [countStage, setCountStage] = useState(0);

  useEffect(() => {
    if (inView && countStage === 0) {
      setCountStage(1);
    }
  }, [inView, countStage]);

  return (
    <section 
      ref={ref} 
      className="py-20 bg-white text-center"
    >
      <motion.div 
        className="flex flex-col md:flex-row flex-wrap justify-center md:gap-24 gap-12 font-bold max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* === Custom 1M Count Up === */}
        <div className="w-full md:w-auto">
          <div className="text-4xl font-bold mb-2">
            {countStage === 1 && (
              <CountUp
                start={100}
                end={inView ? 999 : 0}
                duration={3}
                separator=","
                suffix="K"
                onEnd={() => {
                  setCountStage(2);
                }}
              />
            )}

            {countStage === 2 && <span>1M+</span>}
          </div>
          <span className="text-base font-normal text-darkGrey">Professional Hours</span>
        </div>

        {/* === Other Counts === */}
        <div className="w-full md:w-auto">
          <div className="text-4xl font-bold mb-2">
            <CountUp
              start={0}
              end={inView ? 20000 : 0}
              duration={2}
              separator=","
              suffix="+"
            />
          </div>
          <span className="text-base font-normal text-darkGrey">Active Business Users</span>
        </div>

        <div className="w-full md:w-auto">
          <div className="text-4xl font-bold mb-2">
            <CountUp
              start={0}
              end={inView ? 100 : 0}
              duration={3}
              suffix="TB"
            />
          </div>
          <span className="text-base font-normal text-darkGrey">
            Traffic Monitored Per Hour
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;