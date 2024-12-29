'use client';

import Image from 'next/image';
import { getAssetPath } from '@/utils/assetPath';

type ImagePuzzleProps = {
  src: string;
  alt: string;
};

export default function ImagePuzzle({ src, alt }: ImagePuzzleProps) {
  return (
    <div className="space-y-4">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
        <Image
          src={getAssetPath(src)}
          alt={alt}
          fill
          className="object-cover blur-sm hover:blur-none transition-all duration-300"
        />
      </div>
      <p className="text-sm text-secondary italic">
        Hover over the image to see it more clearly
      </p>
    </div>
  );
} 