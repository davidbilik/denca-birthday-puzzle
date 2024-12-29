'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type BlurContainerProps = {
  children: ReactNode;
};

export default function BlurContainer({ children }: BlurContainerProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-xl"
    >
      {children}
    </motion.div>
  );
} 