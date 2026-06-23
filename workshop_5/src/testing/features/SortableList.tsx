import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import List from '@mui/material/List';
import {SortableItem} from '../components/SortableItem'

interface ComponentProps {
    answers: string[];
}

function SortableList({ answers }: ComponentProps ) {
    const [draggedItems, setDraggedItems] = useState(answers);

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setDraggedItems((draggedItems) => {
                const oldIndex = draggedItems.indexOf(active.id);
                const newIndex = draggedItems.indexOf(over.id);
                return arrayMove(draggedItems, oldIndex, newIndex);
            });
        }
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={ draggedItems }
                             strategy={verticalListSortingStrategy}>
                <List>
                    {draggedItems.map((item) => (
                        <SortableItem item={item} />
                    ))}
                </List>
            </SortableContext>
        </DndContext>
    );
}

export default SortableList;