import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import type { HomeItem } from '../../types';

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'justify',
  marginBottom: theme.spacing(1),
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}));

function BuildCard({ item, right, withImage }: { item: HomeItem; right: boolean; withImage: boolean }) {
  return (
    <Card sx={{ display: 'flex', flexDirection: !right ? 'row' : 'row-reverse', height: '100%' }}>
      {withImage && <CardMedia component="img" alt={item.title} image={item.img} sx={{ width: '40%', objectFit: 'cover' }} />}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="subtitle1" fontWeight={700}>{item.title}</Typography>
          {item.description.map((line, idx) => (
            <StyledTypography key={idx} variant="body2">{line}</StyledTypography>
          ))}
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
          <Link to={`/book/${item.bookId}`}>
            <Button size="small" variant="contained">Подробнее</Button>
          </Link>
        </CardActions>
      </Box>
    </Card>
  );
}

export default BuildCard;
