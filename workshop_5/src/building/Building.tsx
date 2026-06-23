import {Link, useParams} from "react-router-dom";
import structures from "../data";
import {Box, Breadcrumbs, Container, Grid, Stack, Typography} from "@mui/material";
import {Image} from "@mui/icons-material";


const Building = () => {

    const {id} = useParams();

    if (!id) return null;

    const buildingIndex = Number(id)

    const building = structures[buildingIndex];

    return (
        <Container maxWidth="xl">
            <Breadcrumbs
                separator="›"
                aria-label="breadcrumb"
                sx={{ mt: 2, mb: 3, ml: 1 }}
            >
                    <Link
                        to="/"
                        style={{
                            textDecoration: 'none',
                            color: '#66acf4',
                            fontSize: '14px'
                        }}
                    >
                        ГЛАВНАЯ
                    </Link>
                    <Typography sx={{ color: '#333', fontSize: '14px', fontWeight: 500 }}>
                        {building.title}
                    </Typography>
            </Breadcrumbs>

            <Stack spacing={2} sx={{ alignItems:"center" , width: '100%' }}>
                <Typography variant="h4" color='textSecondary'>{building.title}</Typography>
                <Box
                    component="img"
                    src={building.img}
                    sx={{
                        width: {
                            sm: '100%',
                            md: '500px',
                            lg: '500px'
                        },
                        height: {
                            xs: 'auto',
                            sm: '500px'
                        },
                    }}
                />

                <Grid container spacing={3} sx={{ mt: 2 }}>
                    {building.description.map((paragraph, idx) => (
                        <Grid size={{ xs: 12, md: 6 }} key={idx}>
                            <Typography
                                variant="body2"
                                sx={{
                                    textAlign: 'justify',
                                    lineHeight: 1.3
                                }}
                            >
                                {paragraph}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Stack>

        </Container>
    )
}

export default Building;