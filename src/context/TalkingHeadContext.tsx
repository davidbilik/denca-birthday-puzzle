'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import TalkingHead from '@/components/TalkingHead';

type TalkingHeadContextType = {
  startTalking: () => void;
  stopTalking: () => void;
};

const TalkingHeadContext = createContext<TalkingHeadContextType | undefined>(undefined);

export function TalkingHeadProvider({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

  const startTalking = useCallback(() => {
    setIsVisible(true);
  }, []);

  const stopTalking = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <TalkingHeadContext.Provider value={{ startTalking, stopTalking }}>
      {children}
      <TalkingHead isVisible={isVisible} />
    </TalkingHeadContext.Provider>
  );
}

export function useTalkingHead() {
  const context = useContext(TalkingHeadContext);
  if (context === undefined) {
    throw new Error('useTalkingHead must be used within a TalkingHeadProvider');
  }
  return context;
} 