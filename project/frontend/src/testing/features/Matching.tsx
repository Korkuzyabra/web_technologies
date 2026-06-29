import { useMemo } from 'react';
import { Grid2 as Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import type { TaskItem } from './SortableList';
import SortableList from './SortableList';

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function Matching({ index, tasks }: { index: number; tasks: TaskItem[] }) {
  const answers = useMemo(
    () => shuffle(tasks.map((item) => item.answer)),
    [tasks],
  );

  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <List>
          {tasks.map((item) => (
            <ListItem key={item.question}>
              <ListItemButton sx={{ border: '1px solid gray', borderRadius: '5px', textAlign: 'right' }}>
                <ListItemText primary={item.question} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid size={6}>
        <SortableList index={index} answers={answers} />
      </Grid>
    </Grid>
  );
}

export default Matching;
