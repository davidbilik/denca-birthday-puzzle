import { PUZZLES } from '@/data/puzzles';
import PuzzleClient from '@/components/PuzzleClient';

export function generateStaticParams() {
  return PUZZLES.map((puzzle) => ({
    id: puzzle.id.toString(),
  }));
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PuzzlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const puzzleId = parseInt(resolvedParams.id);
  return <PuzzleClient puzzleId={puzzleId} />;
} 