import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

function SortableItem({ item }: { item: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <ListItem ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ListItemButton sx={{ border: '1px solid gray', borderRadius: '5px', cursor: 'grab' }}>
        <ListItemIcon sx={{ minWidth: 36 }}>
          <DragIndicatorIcon />
        </ListItemIcon>
        <ListItemText primary={item} />
      </ListItemButton>
    </ListItem>
  );
}

export default SortableItem;
