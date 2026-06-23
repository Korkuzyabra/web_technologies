import { Box, Button, Container, Typography } from '@mui/material';
import {quiz} from "../QuizData";
import Matching from "./Matching";

function Quiz() {

    return (
        <Container maxWidth="md">
            {quiz.map((item, index) => (
                <Box key={item.id} component="section" sx={{ m: 2, p:2 }}>
                    <Typography variant="h5" gutterBottom>
                        {index + 1}. { item.title }
                    </Typography>
                    <Matching index={index} tasks={ item.tasks }/>
                </Box>
            ))}
            <Box sx={{ display: 'flex', justifyContent:'space-around' }}>
                <Button variant="contained">Проверить</Button>
                <Button variant="contained">Начать снова</Button>
            </Box>
        </Container>
    );
}

export default Quiz