import {tGroup} from "../groupdata";
import {Container} from "@mui/material";
import {BarChart} from "@mui/x-charts";
import { useState} from "react";

type Props = {
     data: tGroup
}

const GroupChart = ({data} : Props) => {
  const chartSetting = {
    yAxis: [{ label: 'Высота (м)' }],
    height: 400,
  };

  const [series, setSeries] = useState({
    'Максимальная высота': true,
    'Средняя высота': false,
    'Минимальная высота': false,
  });

  return (
    <Container maxWidth="lg">
      <BarChart
        dataset={data}
        xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
        series={[
          { dataKey: 'Минимальная высота', label: 'Минимальная высота'},
          { dataKey: 'Средняя высота', label: 'Средняя высота'},
          { dataKey: 'Максимальная высота', label: 'Максимальная высота'},
        ]}
        slotProps={{
          legend: {
            position: { vertical: 'bottom', horizontal: 'center' },
          },
        }}
        {...chartSetting}
      />
    </Container>
  );
};

export default GroupChart