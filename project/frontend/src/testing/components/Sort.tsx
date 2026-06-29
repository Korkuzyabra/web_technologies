import { useMemo } from 'react';
import SortableList from '../features/SortableList';
import type { TaskItem } from '../features/SortableList';

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function Sort({ index, tasks }: { index: number; tasks: TaskItem[] }) {
  const answers = useMemo(
    () => shuffle(tasks.map((item) => item.answer)),
    [tasks],
  );
  return <SortableList index={index} answers={answers} />;
}

export default Sort;
