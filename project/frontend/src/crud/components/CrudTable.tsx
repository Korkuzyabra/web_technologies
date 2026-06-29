import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
  type GridRowId,
  type GridRowsProp,
} from '@mui/x-data-grid';
import { ruRU } from '@mui/x-data-grid/locales';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Alert, Autocomplete, Box, Button, Container, Dialog, DialogActions, DialogContent,
  DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import { useEffect, useState, type FormEvent } from 'react';
import { API_BASE, authHeader } from '../../api/config';
import { getMeta, invalidateBooksCache } from '../../api/books';
import { booksApi } from '../../api/booksApi';

interface BookRow {
  id: number;
  csv_index: number;
  title: string;
  publishing_year: number | null;
  genre_id: number;
  publisher_id: number;
  author_id: number;
  language_id: number;
  sale_price: number | null;
  average_rating: number | null;
  ratings_count: number | null;
  gross_sales: number | null;
  publisher_revenue: number | null;
  sales_rank: number | null;
  units_sold: number | null;
  genre_name?: string;
  language_name?: string;
}

interface AuthorOption {
  id: number;
  name: string;
}

const emptyForm = {
  csv_index: '',
  title: '',
  publishing_year: '',
  genre_id: '',
  publisher_id: '',
  author_id: '',
  language_id: '',
  sale_price: '',
  average_rating: '',
  ratings_count: '',
  gross_sales: '',
  publisher_revenue: '',
  sales_rank: '',
  units_sold: '',
};

function CrudTable() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [publishers, setPublishers] = useState<{ id: number; name: string }[]>([]);
  const [languages, setLanguages] = useState<{ id: number; code: string }[]>([]);
  const [authors, setAuthors] = useState<AuthorOption[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const mapRows = (
    books: BookRow[],
    genreList: { id: number; name: string }[],
    languageList: { id: number; code: string }[],
  ) => {
    const genreMap = Object.fromEntries(genreList.map((g) => [g.id, g.name]));
    const langMap = Object.fromEntries(languageList.map((l) => [l.id, l.code]));
    return books.map((book) => ({
      ...book,
      genre_name: genreMap[book.genre_id] || '—',
      language_name: langMap[book.language_id] || '—',
    }));
  };

  const fetchData = async () => {
    const [listRes, meta] = await Promise.all([
      booksApi.get('/', { params: { limit: 100, offset: 0 } }),
      getMeta(),
    ]);
    const genreList = meta.genres || [];
    const languageList = meta.languages || [];
    setGenres(genreList);
    setPublishers(meta.publishers || []);
    setLanguages(languageList);
    setAuthors(meta.authors || []);
    setRows(mapRows(listRes.data.books || [], genreList, languageList));
  };

  useEffect(() => { fetchData().catch((err: Error) => setError(err.message)); }, []);

  const nextCsvIndex = () => {
    const maxIndex = rows.reduce((max, row) => Math.max(max, (row as BookRow).csv_index || 0), -1);
    return String(maxIndex + 1);
  };

  const openCreateDialog = () => {
    setForm({
      ...emptyForm,
      csv_index: nextCsvIndex(),
      language_id: languages[0] ? String(languages[0].id) : '',
      genre_id: genres[0] ? String(genres[0].id) : '',
      publisher_id: publishers[0] ? String(publishers[0].id) : '',
    });
    setOpenCreate(true);
  };

  const selectedAuthor = authors.find((a) => String(a.id) === form.author_id) || null;

  const numOrNull = (value: string) => (value.trim() === '' ? null : Number(value));

  const payload = () => ({
    csv_index: Number(form.csv_index),
    title: form.title.trim(),
    publishing_year: numOrNull(form.publishing_year),
    genre_id: Number(form.genre_id),
    publisher_id: Number(form.publisher_id),
    author_id: Number(form.author_id),
    language_id: Number(form.language_id),
    sale_price: numOrNull(form.sale_price),
    average_rating: numOrNull(form.average_rating),
    ratings_count: numOrNull(form.ratings_count),
    gross_sales: numOrNull(form.gross_sales),
    publisher_revenue: numOrNull(form.publisher_revenue),
    sales_rank: numOrNull(form.sales_rank),
    units_sold: numOrNull(form.units_sold),
  });

  const handleDelete = (id: GridRowId) => async () => {
    if (!window.confirm('Удалить книгу?')) return;
    await booksApi.delete(`/${id}`);
    invalidateBooksCache();
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleEdit = (id: GridRowId) => () => {
    const row = rows.find((item) => item.id === id) as BookRow;
    if (!row) return;
    setForm({
      csv_index: String(row.csv_index),
      title: row.title,
      publishing_year: row.publishing_year != null ? String(row.publishing_year) : '',
      genre_id: String(row.genre_id),
      publisher_id: String(row.publisher_id),
      author_id: String(row.author_id),
      language_id: String(row.language_id),
      sale_price: row.sale_price != null ? String(row.sale_price) : '',
      average_rating: row.average_rating != null ? String(row.average_rating) : '',
      ratings_count: row.ratings_count != null ? String(row.ratings_count) : '',
      gross_sales: row.gross_sales != null ? String(row.gross_sales) : '',
      publisher_revenue: row.publisher_revenue != null ? String(row.publisher_revenue) : '',
      sales_rank: row.sales_rank != null ? String(row.sales_rank) : '',
      units_sold: row.units_sold != null ? String(row.units_sold) : '',
    });
    setEditingId(Number(id));
    setOpenEdit(true);
  };

  const submitCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.language_id || !form.author_id || !form.genre_id || !form.publisher_id) {
      setError('Заполните жанр, язык, издательство и автора');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/v1/books/`, {
        method: 'POST',
        headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(payload()),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.errors ? JSON.stringify(data.errors) : data.error || 'Ошибка создания');
      }
      invalidateBooksCache();
      await fetchData();
      setOpenCreate(false);
      setForm(emptyForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка');
    } finally {
      setLoading(false);
    }
  };

  const submitUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setLoading(true);
    setError('');
    try {
      await booksApi.put(`/${editingId}`, payload());
      invalidateBooksCache();
      await fetchData();
      setOpenEdit(false);
      setEditingId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка');
    } finally {
      setLoading(false);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Название', flex: 1.2 },
    { field: 'sale_price', headerName: 'Цена', flex: 0.5 },
    { field: 'average_rating', headerName: 'Рейтинг', flex: 0.5 },
    { field: 'genre_name', headerName: 'Жанр', flex: 0.8 },
    { field: 'language_name', headerName: 'Язык', flex: 0.6 },
    {
      field: 'actions', type: 'actions', headerName: 'Действия', width: 120,
      getActions: ({ id }) => [
        <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={handleEdit(id)} />,
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDelete(id)} />,
      ],
    },
  ];

  const formFields = (
    <>
      <TextField label="Индекс CSV" type="number" required fullWidth value={form.csv_index} onChange={(e) => setForm({ ...form, csv_index: e.target.value })} disabled={!!editingId || loading} />
      <TextField label="Название" required fullWidth value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} disabled={loading} />
      <TextField label="Год издания" type="number" fullWidth value={form.publishing_year} onChange={(e) => setForm({ ...form, publishing_year: e.target.value })} disabled={loading} />
      <TextField label="Цена" type="number" fullWidth value={form.sale_price} onChange={(e) => setForm({ ...form, sale_price: e.target.value })} disabled={loading} />
      <TextField label="Рейтинг" type="number" inputProps={{ step: 0.01, min: 0, max: 5 }} fullWidth value={form.average_rating} onChange={(e) => setForm({ ...form, average_rating: e.target.value })} disabled={loading} />
      <TextField label="Число оценок" type="number" fullWidth value={form.ratings_count} onChange={(e) => setForm({ ...form, ratings_count: e.target.value })} disabled={loading} />
      <TextField label="Валовая выручка" type="number" fullWidth value={form.gross_sales} onChange={(e) => setForm({ ...form, gross_sales: e.target.value })} disabled={loading} />
      <TextField label="Доход издателя" type="number" fullWidth value={form.publisher_revenue} onChange={(e) => setForm({ ...form, publisher_revenue: e.target.value })} disabled={loading} />
      <TextField label="Ранг продаж" type="number" fullWidth value={form.sales_rank} onChange={(e) => setForm({ ...form, sales_rank: e.target.value })} disabled={loading} />
      <TextField label="Продано экз." type="number" fullWidth value={form.units_sold} onChange={(e) => setForm({ ...form, units_sold: e.target.value })} disabled={loading} />
      <FormControl fullWidth required>
        <InputLabel>Жанр</InputLabel>
        <Select label="Жанр" value={form.genre_id} onChange={(e) => setForm({ ...form, genre_id: String(e.target.value) })}>
          {genres.map((g) => <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl fullWidth required>
        <InputLabel>Издательство</InputLabel>
        <Select label="Издательство" value={form.publisher_id} onChange={(e) => setForm({ ...form, publisher_id: String(e.target.value) })}>
          {publishers.map((p) => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl fullWidth required>
        <InputLabel>Язык</InputLabel>
        <Select label="Язык" value={form.language_id} onChange={(e) => setForm({ ...form, language_id: String(e.target.value) })}>
          {languages.map((l) => <MenuItem key={l.id} value={l.id}>{l.code}</MenuItem>)}
        </Select>
      </FormControl>
      <Autocomplete
        options={authors}
        value={selectedAuthor}
        onChange={(_, value) => setForm({ ...form, author_id: value ? String(value.id) : '' })}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => <TextField {...params} label="Автор" required />}
        disabled={loading}
        fullWidth
      />
    </>
  );

  return (
    <Container maxWidth="lg" sx={{ height: 750, mt: '20px' }}>
      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreateDialog}>Добавить книгу</Button>
      </Box>
      <DataGrid localeText={ruRU.components.MuiDataGrid.defaultProps.localeText} rows={rows} columns={columns} />
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} maxWidth="sm" fullWidth>
        <form onSubmit={submitCreate}>
          <DialogTitle>Новая книга</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>{formFields}</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCreate(false)}>Отмена</Button>
            <Button type="submit" variant="contained" disabled={loading}>Создать</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
        <form onSubmit={submitUpdate}>
          <DialogTitle>Редактировать книгу</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>{formFields}</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEdit(false)}>Отмена</Button>
            <Button type="submit" variant="contained" disabled={loading}>Сохранить</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}

export default CrudTable;
