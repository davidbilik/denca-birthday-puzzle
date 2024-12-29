'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { PuzzleState } from '@/types/puzzle';
import { TOTAL_PUZZLES } from '@/data/puzzles';

type PuzzleContextType = {
  puzzleState: PuzzleState;
  markPuzzleSolved: (puzzleId: number) => void;
  resetProgress: () => void;
};

const initialState: PuzzleState = {
  currentPuzzleId: 1,
  isComplete: false,
  solvedPuzzles: [],
};

const PuzzleContext = createContext<PuzzleContextType | undefined>(undefined);

export function PuzzleProvider({ children }: { children: React.ReactNode }) {
  const [puzzleState, setPuzzleState] = useState<PuzzleState>(() => {
    // Try to load saved progress from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('puzzleProgress');
      return saved ? JSON.parse(saved) : initialState;
    }
    return initialState;
  });

  useEffect(() => {
    // Save progress to localStorage whenever it changes
    localStorage.setItem('puzzleProgress', JSON.stringify(puzzleState));
  }, [puzzleState]);

  const markPuzzleSolved = (puzzleId: number) => {
    setPuzzleState(prev => {
      const newSolved = [...new Set([...prev.solvedPuzzles, puzzleId])];
      return {
        currentPuzzleId: puzzleId + 1,
        isComplete: newSolved.length === TOTAL_PUZZLES,
        solvedPuzzles: newSolved,
      };
    });
  };

  const resetProgress = () => {
    setPuzzleState(initialState);
  };

  return (
    <PuzzleContext.Provider value={{ puzzleState, markPuzzleSolved, resetProgress }}>
      {children}
    </PuzzleContext.Provider>
  );
}

export function usePuzzleContext() {
  const context = useContext(PuzzleContext);
  if (context === undefined) {
    throw new Error('usePuzzleContext must be used within a PuzzleProvider');
  }
  return context;
} 