import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import Container from '@mui/material/Container';
import { useState } from 'react';
import SettingChart from './SettingChart';
import type { ChartGroup } from '../groupdata';

const labels: Record<string, string> = {
  max_price: 'Макс. цена',
  avg_price: 'Ср. цена',
  min_price: 'Мин. цена',
  count: 'Количество',
};

function GroupChart({ data }: { data: ChartGroup }) {
  const [series, setSeries] = useState({
    max_price: true,
    avg_price: true,
    min_price: false,
    count: false,
  });
  const [isBar, setIsBar] = useState(true);

  const seriesY = Object.entries(series)
    .filter(([, enabled]) => enabled)
    .map(([key]) => ({ dataKey: key, label: labels[key] }));

  const chartProps = {
    dataset: data.slice(0, 15),
    xAxis: [{ scaleType: 'band' as const, dataKey: 'name' }],
    series: seriesY,
    height: 400,
    yAxis: [{ label: 'Цена / количество' }],
  };

  return (
    <Container maxWidth="lg">
      {isBar ? <BarChart {...chartProps} /> : <LineChart {...chartProps} />}
      <SettingChart series={series} setSeries={setSeries} isBar={isBar} setIsBar={setIsBar} />
    </Container>
  );
}

export default GroupChart;
