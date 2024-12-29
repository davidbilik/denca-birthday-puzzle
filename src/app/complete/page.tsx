'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { playSound } from '@/utils/sounds';
import PageTransition from '@/components/PageTransition';

const ReactConfetti = dynamic(() => import('react-confetti'), {
  ssr: false
});

export default function CompletePage() {
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    // Play completion sound when page loads
    playSound('complete');

    // Update window size
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden bg-gradient-to-b from-[#2A0F49] to-[#000000]">
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          colors={['#FFD700', '#7F0909', '#000000', '#2A623D', '#1A472A']}
          recycle={false}
        />
        
        <div className="max-w-2xl w-full space-y-12 text-center z-10">
          <h1 className="text-4xl sm:text-6xl font-bold text-[#FFD700] animate-bounce">
            ⚡ Mischief Managed, Denca! ⚡
          </h1>
          
          <div className="space-y-6 animate-fade-in">
            <p className="text-2xl text-[#FFD700]">
              Like the Golden Snitch, you&apos;ve caught all the clues and solved every puzzle!
            </p>
            
            <p className="text-xl text-white">
              Happy 30th Birthday! 🎂✨
            </p>
          </div>

          <button
            onClick={() => router.push('/')}
            className="px-8 py-4 bg-[#7F0909] text-[#FFD700] rounded-full 
                     hover:bg-opacity-90 transition-all transform hover:scale-105
                     shadow-lg animate-pulse"
          >
            Cast Again
          </button>
        </div>
      </div>
    </PageTransition>
  );
} 