import { Container, Grid2 as Grid } from '@mui/material';
import type { HomeItem } from '../../types';
import BuildCard from './BuildCard';

const imagePattern = [true, true, false, true, false, true, false, false, true];
const rightPattern = [false, true, false, true, false, true, false, false, false];

function ArticlesGrid({ items }: { items: HomeItem[] }) {
  const cards = items.slice(0, 9);

  return (
    <Container maxWidth="lg" sx={{ pb: 4 }}>
      <Grid container spacing={2}>
        {cards.map((item, index) => (
          <Grid key={item.bookId} size={{ xs: 12, md: 4 }}>
            <BuildCard
              item={item}
              right={rightPattern[index] ?? false}
              withImage={imagePattern[index] ?? false}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ArticlesGrid;
