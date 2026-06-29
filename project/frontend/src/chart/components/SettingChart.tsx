import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

type SeriesState = {
  max_price: boolean;
  avg_price: boolean;
  min_price: boolean;
  count: boolean;
};

type SettingChartProps = {
  series: SeriesState;
  setSeries: React.Dispatch<React.SetStateAction<SeriesState>>;
  isBar: boolean;
  setIsBar: React.Dispatch<React.SetStateAction<boolean>>;
};

function SettingChart({ series, setSeries, isBar, setIsBar }: SettingChartProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeries({ ...series, [event.target.name]: event.target.checked });
  };

  return (
    <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2} sx={{ m: '20px 0' }}>
      <FormControl>
        <FormLabel>Тип диаграммы:</FormLabel>
        <RadioGroup name="group-radio" value={isBar ? 'bar' : 'dot'} onChange={(e) => setIsBar(e.target.value === 'bar')}>
          <FormControlLabel value="bar" control={<Radio />} label="Гистограмма" />
          <FormControlLabel value="dot" control={<Radio />} label="Линейная" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>На диаграмме показать:</FormLabel>
        <FormControlLabel control={<Checkbox checked={series.max_price} onChange={handleChange} name="max_price" />} label="Максимальная цена" />
        <FormControlLabel control={<Checkbox checked={series.avg_price} onChange={handleChange} name="avg_price" />} label="Средняя цена" />
        <FormControlLabel control={<Checkbox checked={series.min_price} onChange={handleChange} name="min_price" />} label="Минимальная цена" />
        <FormControlLabel control={<Checkbox checked={series.count} onChange={handleChange} name="count" />} label="Количество" />
      </FormControl>
    </Stack>
  );
}

export default SettingChart;
