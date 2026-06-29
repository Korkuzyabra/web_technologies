import { Link } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import type { NestedBook } from '../../types';

function BookPage({ book, img }: { book: NestedBook; img: string }) {
  return (
    <Card elevation={0} sx={{ backgroundColor: 'transparent', boxShadow: 'none', px: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        <Link to="/">Главная</Link> &gt; {book.title}
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>{book.title}</Typography>
      <CardMedia component="img" image={img} alt={book.title} sx={{ width: '40%', margin: 'auto' }} />
      <CardContent sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr' }, gap: 2, mt: 2 }}>
        <Typography variant="body1" sx={{ textAlign: 'justify' }}>
          Автор: {book.author.name}. Жанр: {book.genre.name}. Язык: {book.language.code}.
          {book.publishing_year ? ` Год издания: ${book.publishing_year}.` : ''}
        </Typography>
        <Box>
          <Typography variant="body1">Цена: {book.sale_price ?? '—'}</Typography>
          <Typography variant="body1">Рейтинг: {book.average_rating ?? '—'} ({book.ratings_count ?? 0} оценок)</Typography>
          <Typography variant="body1">Издательство: {book.publisher.name}</Typography>
          <Typography variant="body1">Ранг продаж: {book.sales_rank ?? '—'}</Typography>
          <Typography variant="body1">Продано экземпляров: {book.units_sold ?? '—'}</Typography>
          <Typography variant="body1">Валовая выручка: {book.gross_sales ?? '—'}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default BookPage;
