import { Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import {useEffect, useMemo} from 'react';
import { tTasks } from "../QuizData";
import SortableList from './SortableList';
import {useDispatch} from "react-redux";
import {addList} from "./quizSlice"; // импортируем компонент

interface ComponentProps {
    index: number,
    tasks: tTasks
}

function Matching({ tasks, index }: ComponentProps) {
    const dispatch = useDispatch();
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

    useEffect(() => {
        dispatch(addList({ index, items: shuffledAnswers }));
    }, []);

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
                <SortableList index={index} answers={shuffledAnswers}/>
            </Grid>
        </Grid>
    );
}

export default Matching;