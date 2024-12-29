'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ReactNode } from 'react';

type ImageContent = {
  src: string;
  alt: string;
};

type FloatingElement = {
  id: number;
  content: string | ImageContent;
  type: 'emoji' | 'image';
};

const isImageContent = (content: string | ImageContent): content is ImageContent => {
  return typeof content !== 'string';
};

// Base elements that we'll duplicate
const baseElements: Omit<FloatingElement, 'id'>[] = [
  // Emojis
  { content: '🎁', type: 'emoji' },
  { content: '🎈', type: 'emoji' },
  { content: '🎂', type: 'emoji' },
  { content: '✨', type: 'emoji' },
  { content: '🎊', type: 'emoji' },
  { content: '🎉', type: 'emoji' },
  { content: '🌟', type: 'emoji' },
  { content: '🎯', type: 'emoji' },
  { content: '🎪', type: 'emoji' },
  // Images
  { 
    content: { 
      src: '/images/bernie1.png', 
      alt: 'Gift Box' 
    }, 
    type: 'image' 
  },
  { 
    content: { 
      src: '/images/bernie2.png', 
      alt: 'Balloon' 
    }, 
    type: 'image' 
  }
];

// Generate multiple instances of each element
const generateFloatingElements = (instances: number = 2): FloatingElement[] => {
  let id = 1;
  return baseElements.flatMap(element => 
    Array.from({ length: instances }, () => ({
      ...element,
      id: id++
    }))
  );
};

const floatingElements = generateFloatingElements(3);

const FloatingElement = ({ element, index }: { element: FloatingElement; index: number }) => {
  let size = 0;
  if(element.type === 'image') {
    size = 64;
  }else {
    size = 16 + (index % 3) * 8;
  }
  const baseSpeed = 15 + (index % 5) * 5;
  const startX = (index * (100 / (floatingElements.length / 2))) % 100;

  const renderContent = (): ReactNode => {
    if (element.type === 'emoji' && typeof element.content === 'string') {
      return element.content;
    }
    if (isImageContent(element.content)) {
      return (
        <div className="relative w-full h-full">
          <Image
            src={element.content.src}
            alt={element.content.alt}
            fill
            className="object-contain"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      key={element.id}
      className="absolute pointer-events-none"
      style={{ 
        fontSize: element.type === 'emoji' ? size : undefined,
        width: element.type === 'image' ? size * 2 : undefined,
        height: element.type === 'image' ? size * 2 : undefined,
        top: '100%',
        left: `${startX}%`
      }}
      animate={{ 
        top: [
          '100%',
          '-10%',
          '-10%',
          '100%'
        ],
        rotate: [0, 360],
        x: [
          0,
          `${(Math.sin(index) * 20)}%`,
          0
        ]
      }}
      transition={{
        duration: baseSpeed,
        repeat: Infinity,
        times: [0, 0.4, 0.6, 1],
        ease: 'linear',
        delay: (index * 0.5) % 5,
        x: {
          duration: baseSpeed * 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        },
        rotate: {
          duration: baseSpeed * 0.8,
          repeat: Infinity,
          ease: 'linear'
        }
      }}
    >
      {renderContent()}
    </motion.div>
  );
};

export default function BackgroundElements() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    requestAnimationFrame(() => setMounted(true));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20">
      {mounted && floatingElements.map((element, index) => (
        <FloatingElement 
          key={element.id} 
          element={element} 
          index={index} 
        />
      ))}
    </div>
  );
} 