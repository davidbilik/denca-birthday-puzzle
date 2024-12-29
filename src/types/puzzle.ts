export type PuzzleType = 'text' | 'morse' | 'cipher' | 'math' | 'image' | 'map' | 'image-choice';

export type CityTarget = {
  name: string;
  coordinates: [number, number];
  points: number;        // Maximum points for perfect guess
  maxDistance: number;   // Distance in km for minimum points
};

export type ImageChoice = {
  id: number;
  path: string;
  label: string;
  isCorrect?: boolean;
};

export type Puzzle = {
  id: number;
  type: PuzzleType;
  question: string;
  answer: string;
  hint?: string;
  nextLocationClue: string;
  additionalProps?: {
    shift?: number;     // For cipher puzzles
    imagePath?: string; // For image puzzles
    imageChoices?: ImageChoice[];  // For image-choice puzzles
    mapPuzzle?: {
      cities: CityTarget[];
      requiredPoints: number;
      attemptsPerCity: number;
    };
  };
};

export type PuzzleState = {
  currentPuzzleId: number;
  isComplete: boolean;
  solvedPuzzles: number[];
}; 