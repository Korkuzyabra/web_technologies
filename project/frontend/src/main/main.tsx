import { useEffect, useState } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import Navbar from '../components/Navbar';
import { getFeaturedBooks } from '../api/books';
import { mapHomeItem } from '../types';
import type { HomeItem } from '../types';
import HeroGallery from './components/HeroGallery';
import FeaturesRow from './components/FeaturesRow';
import MainContentSection from './components/MainContentSection';

function Main() {
  const [items, setItems] = useState<HomeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getFeaturedBooks()
      .then((books) => setItems(books.map((item, index) => mapHomeItem(item, index))))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Navbar active="1" />
      {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />}
      {error && <Alert severity="error" sx={{ m: 2 }}>Ошибка загрузки каталога книг. Запустите polina_API.</Alert>}
      {!loading && !error && (
        <>
          <HeroGallery items={items} />
          <FeaturesRow items={items} />
          <MainContentSection items={items} />
        </>
      )}
    </div>
  );
}

export default Main;
