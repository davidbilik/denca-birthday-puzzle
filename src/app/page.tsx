'use client';

import { useRouter } from 'next/navigation';
import { playSound } from '@/utils/sounds';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import BlurContainer from '@/components/BlurContainer';

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    playSound('start');
    router.push('/puzzle/1');
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative">
        <main className="max-w-2xl relative">
          <BlurContainer>
            <motion.h1 
              className="text-4xl sm:text-6xl font-bold mb-8 text-primary"
              animate={{ 
                scale: [1, 1.02, 1],
                rotate: [-1, 1, -1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Welcome to Denca&apos;s 30th Birthday Adventure!
            </motion.h1>
            
            <p className="text-xl mb-12 text-foreground/80">
              Get ready for an exciting treasure hunt filled with puzzles and surprises!
            </p>

            <motion.button
              onClick={handleStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-xl bg-primary text-white rounded-full 
                       hover:bg-opacity-90 transition-all transform
                       shadow-lg relative overflow-hidden group"
            >
              <span className="relative z-10">Start Adventure</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          </BlurContainer>
        </main>
      </div>
    </PageTransition>
  );
}
