'use client';

import { useState } from 'react';

type MorsePuzzleProps = {
  value: string;
  onCopy: (text: string) => void;
};

export default function MorsePuzzle({ value, onCopy }: MorsePuzzleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    onCopy(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="font-mono text-lg bg-background/10 p-4 rounded-lg break-all">
        {value}
      </div>
      <button
        onClick={handleCopy}
        className="px-4 py-2 bg-secondary text-white rounded-full 
                 hover:bg-opacity-90 transition-all text-sm"
      >
        {copied ? 'Copied!' : 'Copy Morse Code'}
      </button>
    </div>
  );
} 