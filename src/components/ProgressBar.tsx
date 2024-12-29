'use client';

import { usePuzzleContext } from '@/context/PuzzleContext';
import { TOTAL_PUZZLES } from '@/data/puzzles';
import { useEffect, useState } from 'react';

export default function ProgressBar() {
  const { puzzleState } = usePuzzleContext();
  const [mounted, setMounted] = useState(false);
  const progress = (puzzleState.solvedPuzzles.length / TOTAL_PUZZLES) * 100;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-2 bg-background/20">
      <div 
        className="h-full bg-primary transition-all duration-500 ease-out"
        style={{ width: mounted ? `${progress}%` : '0%' }}
      />
    </div>
  );
} 