import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

interface ComponentProps {
    building: {
        img: string,
        title: string,
        description: string[],
    };
    cardNumber: number
}

const StyledTypography = styled(Typography)(({theme}) => ({
    color: theme.palette.text.secondary,
    alignItems: 'center',
    marginBottom: theme.spacing(2),
}))

function BuildCard({ building, cardNumber} : ComponentProps) {
    const isLeftColumn = cardNumber % 2 === 0;

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: isLeftColumn ? 'row-reverse' : 'row',
            }}
        >
            <CardMedia
                component="img"
                alt={ building.title }
                image={ building.img }
            />
            <Box>
                <CardContent>
                    <Typography gutterBottom variant="h5" >
                        { building.title }
                    </Typography>
                    { building.description.map((item, ind) => (
                        <StyledTypography key={ind} variant="body2">
                            { item }
                        </StyledTypography>
                    ))}
                </CardContent>
                <CardActions
                    sx={{
                        justifyContent: isLeftColumn ? 'flex-start' : 'flex-end',
                    }}
                >
                    <Button size="small">Подробнее</Button>
                </CardActions>
            </Box>
        </Card>
    )
}

export default BuildCard;