import {tGroup} from "../groupdata";
import {Container} from "@mui/material";
import {BarChart, LineChart} from "@mui/x-charts";
import { useState} from "react";
import SettingChart from "./SettingChart";

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

  const [isBar, setIsBar] = useState(true);

  let seriesY = Object.entries(series)
      .filter(item => item[1] == true)
      .map(item => {
          return {
              "dataKey": item[0], "label": item[0],
              ...(Object.values(series).filter(Boolean).length === 1 && {
                  barLabel: "value" as const
              })
          };
      });

  return (
    <Container maxWidth="lg">
        {isBar ? (<BarChart
        dataset={data}
        xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
        series={ seriesY }
        slotProps={{
          legend: {
            position: { vertical: 'bottom', horizontal: 'center' },
          },
        }}
        {...chartSetting}
      />) : (
        <LineChart
            dataset={ data }
            xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
            series={ seriesY}
            slotProps={{
                legend: {
                    position: { vertical: 'bottom', horizontal: 'center' },
                },
            }}
            {...chartSetting}
        />)}
        <SettingChart series={ series } setSeries={ setSeries } isBar={isBar} setIsBar={setIsBar} />
    </Container>
  );
};

export default GroupChart