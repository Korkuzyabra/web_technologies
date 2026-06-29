import { Link } from 'react-router-dom';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import type { HomeItem } from '../../types';

function FeaturesRow({ items }: { items: HomeItem[] }) {
  const features = items.slice(6, 11);

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 3, md: 5 },
          justifyContent: 'flex-start',
        }}
      >
        {features.map((item) => (
          <Box key={item.bookId} sx={{ width: 150, textAlign: 'center' }}>
            <Avatar
              src={item.img}
              alt={item.title}
              sx={{ width: 80, height: 80, mx: 'auto', mb: 1.5, border: '2px solid #ddd' }}
            />
            <Typography variant="subtitle2" fontWeight={700} gutterBottom noWrap title={item.title}>
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, minHeight: 40 }}>
              {item.description[0]}
            </Typography>
            <Link to={`/book/${item.bookId}`}>
              <Button size="small" variant="contained">Подробнее»</Button>
            </Link>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default FeaturesRow;
