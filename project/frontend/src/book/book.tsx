import { useEffect, useState } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getBookById, getFeaturedBooks } from '../api/books';
import type { NestedBook } from '../types';
import { listingImageSlot, slotImagePath } from '../utils/images';
import BookPage from './components/BookPage';

function Book() {
  const { id = '' } = useParams();
  const bookId = Number(id);
  const [book, setBook] = useState<NestedBook | null>(null);
  const [imageSlot, setImageSlot] = useState(() => listingImageSlot(id));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!bookId) { setError('Неверный идентификатор'); setLoading(false); return; }
    setLoading(true);
    Promise.all([getBookById(bookId), getFeaturedBooks()])
      .then(([item, featured]) => {
        const idx = featured.findIndex((row) => row.id === bookId);
        setBook(item);
        setImageSlot(idx >= 0 ? idx : listingImageSlot(id));
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [bookId, id]);

  return (
    <div>
      <Navbar active="1" />
      {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />}
      {error && <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>}
      {book && <BookPage book={book} img={slotImagePath(imageSlot)} />}
    </div>
  );
}

export default Book;
