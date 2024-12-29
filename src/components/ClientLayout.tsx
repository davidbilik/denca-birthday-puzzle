'use client';

import { useEffect } from 'react';
import { PuzzleProvider } from "@/context/PuzzleContext";
import ProgressBar from "./ProgressBar";
import BackgroundElements from "./BackgroundElements";
import { setTalkingCallbacks } from '@/utils/sounds';
import { useTalkingHead } from '@/context/TalkingHeadContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { startTalking, stopTalking } = useTalkingHead();

  useEffect(() => {
    setTalkingCallbacks({
      start: startTalking,
      stop: stopTalking
    });
  }, [startTalking, stopTalking]);

  return (
    <PuzzleProvider>
      <BackgroundElements />
      <ProgressBar />
      {children}
    </PuzzleProvider>
  );
} 