import { Link } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import type { HomeItem } from '../../types';

function HeroGallery({ items }: { items: HomeItem[] }) {
  const slots = items.slice(0, 6);
  const ImageBox = ({ item, sx }: { item: HomeItem; sx: object }) => (
    <Box
      component={Link}
      to={`/book/${item.bookId}`}
      sx={{
        display: 'block',
        backgroundImage: `url(${item.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: '1px solid #ccc',
        '&:hover': { opacity: 0.92 },
        ...sx,
      }}
    />
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 0.8fr 1fr' },
          gap: 1,
          alignItems: 'start',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {slots[0] && <ImageBox item={slots[0]} sx={{ height: { xs: 120, md: 175 } }} />}
          {slots[1] && <ImageBox item={slots[1]} sx={{ height: { xs: 120, md: 175 } }} />}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {slots[2] && <ImageBox item={slots[2]} sx={{ height: { xs: 90, md: 115 } }} />}
          {slots[3] && <ImageBox item={slots[3]} sx={{ height: { xs: 150, md: 235 } }} />}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {slots[4] && <ImageBox item={slots[4]} sx={{ height: { xs: 120, md: 175 } }} />}
          {slots[5] && <ImageBox item={slots[5]} sx={{ height: { xs: 120, md: 175 } }} />}
        </Box>
      </Box>
    </Container>
  );
}

export default HeroGallery;
