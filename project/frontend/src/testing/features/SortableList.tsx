import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import List from '@mui/material/List';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import type { RootState } from '../../store';
import { addList, setDraggedItems } from './quizSlice';
import SortableItem from '../components/SortableItem';

export type TaskItem = { question: string; answer: string };

function SortableList({ index, answers }: { index: number; answers: string[] }) {
  const dispatch = useDispatch();
  const arr = useSelector((state: RootState) => state.lists.lists[index]);
  const draggedItems = arr || answers;

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  useEffect(() => {
    dispatch(addList({ index, items: answers }));
  }, [answers, dispatch, index]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = draggedItems.indexOf(String(active.id));
    const newIndex = draggedItems.indexOf(String(over.id));
    if (oldIndex < 0 || newIndex < 0) return;
    dispatch(setDraggedItems({ index, items: arrayMove(draggedItems, oldIndex, newIndex) }));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={draggedItems} strategy={verticalListSortingStrategy}>
        <List>
          {draggedItems.map((item) => (
            <SortableItem key={item} item={item} />
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
}

export default SortableList;
