'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type TalkingHeadProps = {
  isVisible: boolean;
};

// Define mouth position constants
const MOUTH_POSITION = {
  bottom: 15,
  left: 48,
  width: 20
};

export default function TalkingHead({ isVisible }: TalkingHeadProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-4 right-4 w-48 h-48 sm:w-64 sm:h-64"
        >
          <div className="relative w-full h-full">
            {/* Face Image */}
            <Image
              src="/images/face.png"
              alt="Face"
              fill
              sizes="(max-width: 768px) 192px, 256px"
              className="object-contain"
              priority
            />

            {/* Animated Mouth Overlay */}
            <motion.div 
              className="absolute -translate-x-1/2 bg-black"
              style={{
                bottom: `${MOUTH_POSITION.bottom}%`,
                left: `${MOUTH_POSITION.left}%`,
                width: `${MOUTH_POSITION.width}%`,
                height: '30px',
                borderRadius: '50%' // Makes it an oval
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 1, 0, 0]
              }}
              transition={{
                repeat: Infinity,
                times: [0, 0.2, 0.5, 0.7, 1],
                ease: "linear",
                duration: 0.4
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 