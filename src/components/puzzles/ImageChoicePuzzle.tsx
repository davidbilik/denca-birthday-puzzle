'use client';

import Image from 'next/image';
import { ImageChoice } from '@/types/puzzle';

type ImageChoicePuzzleProps = {
  choices: ImageChoice[];
  onSelect: (isCorrect: boolean) => void;
  question: string;
};

export default function ImageChoicePuzzle({ choices, onSelect, question }: ImageChoicePuzzleProps) {
  return (
    <div className="space-y-6">
      <p className="text-xl mb-8">{question}</p>
      <div className="grid grid-cols-2 gap-4">
        {choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => onSelect(choice.isCorrect || false)}
            className="relative aspect-video rounded-lg overflow-hidden hover:ring-2 hover:ring-primary transition-all"
          >
            <Image
              src={choice.path}
              alt={choice.label}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
} 