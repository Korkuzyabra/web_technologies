import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { addList } from '../features/quizSlice';
import type { TaskItem } from '../features/SortableList';

function MultiAnswer({ index, tasks }: { index: number; tasks: TaskItem[] }) {
  const dispatch = useDispatch();
  const currentFlags = useSelector((state: RootState) => state.lists.lists[index]) || tasks.map(() => '0');

  const handleChange = (clickedIndex: number) => {
    const newFlags = [...currentFlags];
    newFlags[clickedIndex] = newFlags[clickedIndex] === '1' ? '0' : '1';
    dispatch(addList({ index, items: newFlags }));
  };

  return (
    <FormGroup>
      {tasks.map((task, i) => (
        <FormControlLabel
          key={task.question}
          control={<Checkbox checked={currentFlags[i] === '1'} onChange={() => handleChange(i)} />}
          label={task.question}
        />
      ))}
    </FormGroup>
  );
}

export default MultiAnswer;
