import { Box, Button, Container, Typography, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { getQuizData } from '../../api/books';
import Matching from '../features/Matching';
import SingleAnswer from '../components/SingleAnswer';
import MultiAnswer from '../components/MultiAnswer';
import Sort from '../components/Sort';
import type { TaskItem } from '../features/SortableList';

interface ApiQuizItem {
  id: number;
  type: string;
  title: string;
  tasks: string;
}

interface QuizItem {
  id: number;
  type: string;
  title: string;
  tasks: TaskItem[];
}

function Quiz() {
  const [results, setResults] = useState<number[] | null>(null);
  const lists = useSelector((state: RootState) => state.lists.lists);
  const [quizData, setQuizData] = useState<QuizItem[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getQuizData()
      .then((data: ApiQuizItem[]) => {
        setQuizData(
          data.map((item) => ({
            ...item,
            tasks: JSON.parse(item.tasks) as TaskItem[],
          })),
        );
      })
      .catch((err: Error) => setError(err.message));
  }, []);

  const handleCheck = () => {
    const res = quizData.map((q, index) => {
      const userAnswers = lists[index] || [];
      const correctAnswers = q.tasks.map((t) => t.answer);
      return JSON.stringify(userAnswers) === JSON.stringify(correctAnswers) ? 1 : 0;
    });
    setResults(res);
  };

  if (error) {
    return <Alert severity="error" sx={{ m: 2 }}>Ошибка загрузки теста: {error}</Alert>;
  }

  return (
    <Container maxWidth="md">
      {quizData.map((item, index) => (
        <Box key={item.id} component="section" sx={{ m: 2, p: 2, border: '1px solid #eee', borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            {index + 1}. {item.title}
          </Typography>
          {item.type === 'M' && <Matching index={index} tasks={item.tasks} />}
          {item.type === 'O' && <SingleAnswer index={index} tasks={item.tasks} />}
          {item.type === 'O+' && <MultiAnswer index={index} tasks={item.tasks} />}
          {item.type === 'S' && <Sort index={index} tasks={item.tasks} />}
        </Box>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 4 }}>
        <Button variant="contained" onClick={handleCheck} disabled={quizData.length === 0}>
          Проверить
        </Button>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Начать снова
        </Button>
      </Box>
      {results && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h5" gutterBottom>Результаты тестирования:</Typography>
          {results.map((r, i) => (
            <Typography key={i}>
              Задание {i + 1}: {r ? 'верно' : 'неверно'}
            </Typography>
          ))}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Итого: {results.reduce((a, b) => a + b, 0)} из {results.length}
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Quiz;
