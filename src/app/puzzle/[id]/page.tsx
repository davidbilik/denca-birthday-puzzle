'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPuzzle, isLastPuzzle } from '@/data/puzzles';
import { use } from 'react';
import { usePuzzleContext } from '@/context/PuzzleContext';
import { playSound } from '@/utils/sounds';
import MorsePuzzle from '@/components/puzzles/MorsePuzzle';
import CipherPuzzle from '@/components/puzzles/CipherPuzzle';
import ImagePuzzle from '@/components/puzzles/ImagePuzzle';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import MapPuzzle from '@/components/puzzles/MapPuzzle';
import ImageChoicePuzzle from '@/components/puzzles/ImageChoicePuzzle';
import BlurContainer from '@/components/BlurContainer';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function PuzzlePage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const puzzleId = parseInt(id);
  const puzzle = getPuzzle(puzzleId);
  
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { markPuzzleSolved } = usePuzzleContext();

  if (!puzzle) {
    router.push('/');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (answer.toLowerCase().trim() === puzzle.answer.toLowerCase()) {
      setSuccess(true);
      setError('');
      markPuzzleSolved(puzzleId);
      playSound('correct');
    } else {
      setError('Try again!');
      playSound('incorrect');
    }
  };

  const handleNext = () => {
    if (isLastPuzzle(puzzleId)) {
      playSound('complete');
      router.push('/complete');
    } else {
      router.push(`/puzzle/${puzzleId + 1}`);
    }
  };

  const handleShowHint = () => {
    setShowHint(true);
    playSound('hint');
  };

  const renderPuzzleContent = () => {
    switch (puzzle.type) {
      case 'morse':
        return (
          <MorsePuzzle
            value={puzzle.question}
            onCopy={() => {
              // Optional: Add any tracking or effects when morse code is copied
            }}
          />
        );
      case 'cipher':
        return (
          <CipherPuzzle
            value={puzzle.question}
          />
        );
      case 'image':
        return (
          <ImagePuzzle
            src={puzzle.additionalProps?.imagePath || puzzle.question}
            alt="Puzzle Image"
          />
        );
      case 'map':
        if (!puzzle.additionalProps?.mapPuzzle) {
          return <p>Map puzzle configuration missing</p>;
        }
        return (
          <MapPuzzle
            cities={puzzle.additionalProps.mapPuzzle.cities}
            requiredPoints={puzzle.additionalProps.mapPuzzle.requiredPoints}
            question={puzzle.question}
            onComplete={(success, points) => {
              if (success) {
                setSuccess(true);
                setError('');
                markPuzzleSolved(puzzleId);
                playSound('correct');
              } else {
                setError(`You scored ${points} points, but needed ${puzzle.additionalProps?.mapPuzzle?.requiredPoints}. Try again!`);
                playSound('incorrect');
              }
            }}
          />
        );
      case 'image-choice':
        if (!puzzle.additionalProps?.imageChoices) {
          return <p>Image choice puzzle configuration missing</p>;
        }
        return (
          <ImageChoicePuzzle
            choices={puzzle.additionalProps.imageChoices}
            question={puzzle.question}
            onSelect={(isCorrect) => {
              if (isCorrect) {
                setSuccess(true);
                setError('');
                markPuzzleSolved(puzzleId);
                playSound('correct');
              } else {
                setError('Try another dish!');
                playSound('incorrect');
              }
            }}
          />
        );
      default:
        return <p className="text-xl mb-8">{puzzle.question}</p>;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        {process.env.NODE_ENV === 'development' && (
          <button
            onClick={handleNext}
            className="fixed top-4 right-4 px-3 py-1 bg-red-500 text-white text-sm rounded-full 
                     hover:bg-opacity-90 transition-all"
          >
            Debug: Skip →
          </button>
        )}
        
        <div className="max-w-2xl w-full space-y-8 text-center">
          <h1 className="text-3xl font-bold text-primary">Puzzle {puzzleId}</h1>
          
          <BlurContainer>
            {renderPuzzleContent()}
            
            {!success && puzzle.type !== 'map' && puzzle.type !== 'image-choice' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-3 rounded-lg bg-black/30 border border-primary/30 
                           focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none
                           text-white placeholder:text-white/50"
                  placeholder="Enter your answer..."
                />
                
                {error && <p className="text-error">{error}</p>}
                
                <div className="space-x-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-full 
                             hover:bg-opacity-90 transition-all"
                  >
                    Submit
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleShowHint}
                    className="px-6 py-2 bg-secondary text-white rounded-full 
                             hover:bg-opacity-90 transition-all"
                  >
                    Need a Hint?
                  </button>
                </div>
                
                {showHint && (
                  <p className="text-secondary mt-4 italic">{puzzle.hint}</p>
                )}
              </form>
            )}

            {error && (puzzle.type === 'map' || puzzle.type === 'image-choice') && (
              <p className="text-error mt-4">{error}</p>
            )}
            
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <motion.p
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="text-success text-xl"
                >
                  🎉 Correct! 🎉
                </motion.p>
                <motion.p
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-accent font-bold"
                >
                  Next Clue: {puzzle.nextLocationClue}
                </motion.p>
                <motion.button
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={handleNext}
                  className="px-6 py-2 bg-primary text-white rounded-full 
                           hover:bg-opacity-90 transition-all"
                >
                  {isLastPuzzle(puzzleId) ? 'Finish Adventure!' : 'Next Puzzle'}
                </motion.button>
              </motion.div>
            )}
          </BlurContainer>
        </div>
      </div>
    </PageTransition>
  );
} 