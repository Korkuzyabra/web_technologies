import { Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useMemo } from 'react';
import { tTasks } from "../QuizData";
import SortableList from './SortableList'; // импортируем компонент

interface ComponentProps {
    tasks: tTasks;
}

function Matching({ tasks }: ComponentProps) {
    const shuffleArray = (array: string[]) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const shuffledAnswers = useMemo(() => {
        const answers = tasks.map(item => item.answer);
        return shuffleArray(answers);
    }, [tasks]);

    return (
        <Grid container spacing={2}>
            <Grid size={6}>
                <List>
                    {tasks.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemButton
                                sx={{
                                    border: '1px solid gray',
                                    borderRadius: '5px',
                                    textAlign: 'right',
                                }}>
                                <ListItemText primary={item.question} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Grid>

            <Grid size={6}>
                <SortableList answers={shuffledAnswers} />
            </Grid>
        </Grid>
    );
}

export default Matching;