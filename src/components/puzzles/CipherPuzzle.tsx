'use client';

type CipherPuzzleProps = {
  value: string;
};

export default function CipherPuzzle({ value }: CipherPuzzleProps) {
  return (
    <div className="space-y-4">
      <div className="font-mono text-lg bg-background/10 p-4 rounded-lg break-all">
        {value}
      </div>
    </div>
  );
} 