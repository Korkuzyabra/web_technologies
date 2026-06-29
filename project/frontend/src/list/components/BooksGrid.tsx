import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { DataGrid, type GridColDef, type GridPaginationModel, type GridRowsProp, type GridSortModel } from '@mui/x-data-grid';
import { ruRU } from '@mui/x-data-grid/locales';
import { Alert, Box, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { fetchBooks, getMeta } from '../../api/books';
import { mapBookRow } from '../../types';

const PAGE_SIZE = 25;

const sortFieldMap: Record<string, string> = {
  title: 'title',
  author: 'title',
  publisher: 'publisher',
  genre: 'genre',
  sale_price: 'sale_price',
  average_rating: 'rating',
  sales_rank: 'sales_rank',
  units_sold: 'units_sold',
};

function BooksGrid() {
  const [searchParams] = useSearchParams();
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: PAGE_SIZE });
  const [sortModel, setSortModel] = useState<GridSortModel>([{ field: 'sales_rank', sort: 'asc' }]);
  const [search, setSearch] = useState('');
  const [publisherId, setPublisherId] = useState<number | ''>('');
  const [genreId, setGenreId] = useState<number | ''>('');
  const [publishers, setPublishers] = useState<{ id: number; name: string }[]>([]);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const q = searchParams.get('search');
    if (q) setSearch(q);
  }, [searchParams]);

  useEffect(() => {
    getMeta().then((meta) => {
      setPublishers(meta.publishers);
      setGenres(meta.genres);
    }).catch((err: Error) => setError(err.message));
  }, []);

  const loadRows = useCallback(async () => {
    setLoading(true);
    try {
      const sort = sortModel[0];
      const data = await fetchBooks({
        limit: paginationModel.pageSize,
        offset: paginationModel.page * paginationModel.pageSize,
        sort_by: sort ? sortFieldMap[sort.field] || 'sales_rank' : 'sales_rank',
        sort_order: sort?.sort === 'asc' ? 'asc' : 'desc',
        search: search.trim() || undefined,
        publisher_id: publisherId === '' ? undefined : publisherId,
        genre_id: genreId === '' ? undefined : genreId,
      });
      setRows(data.books.map(mapBookRow));
      setRowCount(data.total);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  }, [paginationModel, sortModel, search, publisherId, genreId]);

  useEffect(() => { loadRows(); }, [loadRows]);

  const columns: GridColDef[] = [
    {
      field: 'image', headerName: 'Обложка', width: 70, sortable: false, filterable: false,
      renderCell: (params) => (
        <Box component={Link} to={`/book/${params.row.id}`} sx={{
          width: 48, height: 48, backgroundImage: `url(${params.value})`, backgroundSize: 'cover', borderRadius: 1, border: '1px solid #ddd',
        }} />
      ),
    },
    { field: 'title', headerName: 'Название', flex: 1.2, renderCell: (p) => <Link to={`/book/${p.row.id}`}>{p.value}</Link> },
    { field: 'author', headerName: 'Автор', flex: 1 },
    { field: 'publisher', headerName: 'Издательство', flex: 1 },
    { field: 'genre', headerName: 'Жанр', flex: 0.8 },
    { field: 'sale_price', headerName: 'Цена', flex: 0.5, type: 'number' },
    { field: 'average_rating', headerName: 'Рейтинг', flex: 0.5, type: 'number' },
    { field: 'sales_rank', headerName: 'Ранг', flex: 0.5, type: 'number' },
    { field: 'units_sold', headerName: 'Продано', flex: 0.5, type: 'number' },
  ];

  return (
    <Container maxWidth="lg" sx={{ height: 780, mt: '20px' }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <TextField label="Поиск по названию" size="small" value={search} onChange={(e) => { setSearch(e.target.value); setPaginationModel((p) => ({ ...p, page: 0 })); }} sx={{ minWidth: 220 }} />
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Издательство</InputLabel>
          <Select label="Издательство" value={publisherId} onChange={(e) => { setPublisherId(e.target.value === '' ? '' : Number(e.target.value)); setPaginationModel((p) => ({ ...p, page: 0 })); }}>
            <MenuItem value="">Все</MenuItem>
            {publishers.map((p) => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Жанр</InputLabel>
          <Select label="Жанр" value={genreId} onChange={(e) => { setGenreId(e.target.value === '' ? '' : Number(e.target.value)); setPaginationModel((p) => ({ ...p, page: 0 })); }}>
            <MenuItem value="">Все</MenuItem>
            {genres.map((g) => <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
      {error && <Alert severity="warning" sx={{ mb: 1 }}>{error}</Alert>}
      <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        loading={loading} rows={rows} columns={columns} rowCount={rowCount}
        paginationMode="server" sortingMode="server" filterMode="server"
        paginationModel={paginationModel} onPaginationModelChange={setPaginationModel}
        sortModel={sortModel} onSortModelChange={(m) => { setSortModel(m); setPaginationModel((p) => ({ ...p, page: 0 })); }}
        pageSizeOptions={[25, 50, 100]}
      />
    </Container>
  );
}

export default BooksGrid;
