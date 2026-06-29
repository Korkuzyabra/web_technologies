import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addList } from '../features/quizSlice';
import type { TaskItem } from '../features/SortableList';

function SingleAnswer({ index, tasks }: { index: number; tasks: TaskItem[] }) {
  const dispatch = useDispatch();

  const handleChange = (targetQuestion: string) => {
    dispatch(addList({ index, items: tasks.map((t) => (t.question === targetQuestion ? '1' : '0')) }));
  };

  return (
    <RadioGroup onChange={(e) => handleChange(e.target.value)}>
      {tasks.map((task) => (
        <FormControlLabel key={task.question} value={task.question} control={<Radio />} label={task.question} />
      ))}
    </RadioGroup>
  );
}

export default SingleAnswer;
