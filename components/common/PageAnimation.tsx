'use client';

import { motion, TargetAndTransition } from 'framer-motion';
import React from 'react';

interface AnimationWrapperProps {
  children: React.ReactNode;
  initial?: any;
  animate?: any;
  transition?: object;
  className?: string;
}

const AnimationWrapper = ({
  children,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.5 },
  className = "",
}: AnimationWrapperProps) => {
  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;
