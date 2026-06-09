import {Box, Container, ImageList, ImageListItem, ImageListItemBar} from "@mui/material";
import structures from "../../data";
import {Link, useNavigate} from "react-router-dom";

const imgData=structures.slice(0, -1);

function Gallery() {

    const navigate = useNavigate();

    const handleCardClick = (index: number) => {
        navigate(`/building/${index}`);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ height: 585, overflowY: 'scroll', m: '20px auto'}}>
                <ImageList
                    variant="masonry"
                    sx={{
                        columnCount: {
                            xs: '1 !important',
                            sm: '2 !important',
                            md: '3 !important',
                            lg: '4 !important',
                        },
                    }}
                    gap={8}>
            {imgData.map((item, index) => (
                <ImageListItem key={ item.img }>
                    <img
                        srcSet={ item.img }
                        src={ item.img }
                        alt={ item.title }
                        loading="lazy"
                        onClick={() => handleCardClick(index)}
                    />
                    <ImageListItemBar position="bottom" title={ item.title } />
                </ImageListItem>
            ))}
                </ImageList>
            </Box>
        </Container>
    );
}

export default Gallery;