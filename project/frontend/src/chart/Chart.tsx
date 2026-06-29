import Navbar from '../components/Navbar';
import GroupGrid from './components/GroupGrid';
import GroupChart from './components/GroupChart';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Alert, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { getChartsData } from '../api/books';
import { mapChartStat } from '../types';
import type { ChartGroup } from './groupdata';

type GroupSelect = 'publisher' | 'genre' | 'language';

const labels: Record<GroupSelect, string> = {
  publisher: 'Издательство',
  genre: 'Жанр',
  language: 'Язык',
};

function Chart() {
  const [data, setData] = useState<Record<GroupSelect, ChartGroup> | null>(null);
  const [group, setGroup] = useState<GroupSelect>('publisher');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getChartsData()
      .then((res) => {
        setData({
          publisher: res.publisher.map(mapChartStat),
          genre: res.genre.map(mapChartStat),
          language: res.language.map(mapChartStat),
        });
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error || !data) return <Alert severity="error" sx={{ m: 2 }}>{error || 'Нет данных'}</Alert>;

  return (
    <div>
      <Navbar active="3" />
      <Box sx={{ width: 220, m: 'auto', mt: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Группировать по</InputLabel>
          <Select value={group} label="Группировать по" onChange={(e: SelectChangeEvent) => setGroup(e.target.value as GroupSelect)}>
            {(Object.keys(labels) as GroupSelect[]).map((key) => (
              <MenuItem key={key} value={key}>{labels[key]}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <GroupChart data={data[group]} />
      <GroupGrid data={data[group]} />
    </div>
  );
}

export default Chart;
