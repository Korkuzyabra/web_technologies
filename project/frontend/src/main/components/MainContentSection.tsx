import { Link } from 'react-router-dom';
import {
  Box, Button, Card, CardContent, CardMedia, Container, Grid2 as Grid, Typography,
} from '@mui/material';
import type { HomeItem } from '../../types';

function SidebarCard({ item, tall }: { item: HomeItem; tall?: boolean }) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'row', mb: 2, height: tall ? 190 : 150 }}>
      <CardContent sx={{ flex: 1, py: 1.5 }}>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom noWrap title={item.title}>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {item.description.join(' ')}
        </Typography>
        <Link to={`/book/${item.bookId}`}>
          <Button size="small" sx={{ mt: 1, p: 0, textTransform: 'none' }}>Подробнее»</Button>
        </Link>
      </CardContent>
      <CardMedia
        component="img"
        image={item.img}
        alt={item.title}
        sx={{ width: tall ? 100 : 85, objectFit: 'cover' }}
      />
    </Card>
  );
}

function MainContentSection({ items }: { items: HomeItem[] }) {
  const featured = items[11];
  const sidebar = items.slice(12, 14);

  if (!featured) return null;

  return (
    <Container maxWidth="lg" sx={{ pb: 4 }}>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h5" fontWeight={700} textAlign="center" gutterBottom>
            {featured.title}
          </Typography>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1.3fr 1fr' },
            gap: 2,
            alignItems: 'center',
            mt: 1,
          }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify' }}>
              {featured.description[0]}
            </Typography>
            <Box
              component={Link}
              to={`/book/${featured.bookId}`}
              sx={{
                display: 'block',
                backgroundImage: `url(${featured.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: { xs: 220, md: 290 },
                border: '1px solid #ccc',
              }}
            />
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify', mb: 2 }}>
                {featured.description[1]}
              </Typography>
              <Link to={`/book/${featured.bookId}`}>
                <Button variant="text" sx={{ color: '#b8860b', textTransform: 'none', p: 0 }}>Подробнее»</Button>
              </Link>
            </Box>
          </Box>
        </Grid>
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{
            borderLeft: { md: '1px solid #ddd' },
            pl: { md: 2 },
            alignSelf: 'flex-start',
          }}
        >
          {sidebar[0] && <SidebarCard item={sidebar[0]} />}
          {sidebar[1] && <SidebarCard item={sidebar[1]} tall />}
        </Grid>
      </Grid>
    </Container>
  );
}

export default MainContentSection;
