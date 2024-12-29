'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { calculateDistance } from '@/utils/map';
import { CityTarget } from '@/types/puzzle';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="w-full aspect-[3/2] bg-background/10 animate-pulse rounded-lg" />
});

type MapPuzzleProps = {
  cities: CityTarget[];
  requiredPoints: number;
  onComplete: (success: boolean, points: number) => void;
  question: string;
};

type CityAttempt = {
  cityName: string;
  attempts: number;
  bestDistance: number;
  points: number;
  completed: boolean;
  lastDistance?: number;
  lastPoint?: [number, number];
};

export default function MapPuzzle({ cities, requiredPoints, onComplete, question }: MapPuzzleProps) {
  const [markers, setMarkers] = useState<Array<[number, number] | null>>(Array(cities.length).fill(null));
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [attempts, setAttempts] = useState<CityAttempt[]>(
    cities.map(city => ({
      cityName: city.name,
      attempts: 0,
      bestDistance: Infinity,
      points: 0,
      completed: false,
      lastDistance: undefined,
      lastPoint: undefined,
    }))
  );
  const [gameComplete, setGameComplete] = useState(false);

  const currentCity = cities[currentCityIndex];
  const currentAttempt = attempts[currentCityIndex];

  const calculatePoints = (distance: number, city: CityTarget) => {
    if (distance <= 10) return city.points;
    if (distance >= city.maxDistance) return 0;
    return Math.round((1 - (distance - 10) / (city.maxDistance - 10)) * city.points);
  };

  const handleMapClick = (lat: number, lng: number) => {
    if (gameComplete) return;

    const point: [number, number] = [lat, lng];
    
    // Update markers
    const newMarkers = [...markers];
    newMarkers[currentCityIndex] = point;
    setMarkers(newMarkers);
    
    const distance = calculateDistance(point, currentCity.coordinates);
    const points = calculatePoints(distance, currentCity);
    
    const newAttempts = attempts.map((attempt, index) => {
      if (index !== currentCityIndex) return attempt;
      
      return {
        ...attempt,
        attempts: attempt.attempts + 1,
        lastDistance: distance,
        lastPoint: point,
        bestDistance: points > attempt.points ? distance : attempt.bestDistance,
        points: points > attempt.points ? points : attempt.points,
        completed: true
      };
    });
    
    setAttempts(newAttempts);

    const totalPoints = newAttempts.reduce((sum, a) => sum + a.points, 0);

    if (currentCityIndex === cities.length - 1) {
      setGameComplete(true);
      onComplete(totalPoints >= requiredPoints, totalPoints);
    } else {
      setTimeout(() => {
        setCurrentCityIndex(prev => prev + 1);
      }, 1500);
    }
  };

  const totalPoints = attempts.reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="space-y-4">
      <p className="text-xl mb-8">{question}</p>
      
      <div className="w-full aspect-[3/2] rounded-lg overflow-hidden">
        <Map
          instanceId={`map-${currentCityIndex}`}
          onClick={handleMapClick}
          selectedPoint={markers[currentCityIndex]}
          bounds={[
            [35, -10],
            [70, 40]
          ]}
        />
      </div>
      
      <div className="space-y-2">
        <p className="text-lg font-bold">
          Find {currentCity.name}
        </p>
        {currentAttempt.lastDistance && (
          <p className="text-sm text-primary">
            Last guess was {Math.round(currentAttempt.lastDistance)}km away
            {currentAttempt.lastDistance === currentAttempt.bestDistance && " (Best attempt!)"}
          </p>
        )}
        <p className="text-sm">
          Current points: {totalPoints} / {requiredPoints} needed
        </p>
        
        {/* Progress display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
          {attempts.map((attempt, index) => (
            <div 
              key={index}
              className={`p-2 rounded ${
                attempt.completed 
                  ? attempt.points > 0 
                    ? 'bg-success/20' 
                    : 'bg-error/20'
                  : index === currentCityIndex
                    ? 'bg-primary/20'
                    : 'bg-secondary/20'
              }`}
            >
              <div className="space-y-1">
                <p className="font-medium">{cities[index].name}</p>
                {attempt.lastDistance && (
                  <p className="text-sm">
                    Distance: {Math.round(attempt.lastDistance)}km
                    {attempt.points > 0 && ` (${attempt.points} points)`}
                  </p>
                )}
                {attempt.completed && !attempt.lastDistance && (
                  <p className="text-sm italic">Not attempted yet</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 