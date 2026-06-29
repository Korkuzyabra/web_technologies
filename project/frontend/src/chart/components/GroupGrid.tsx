import { DataGrid, GridToolbar, type GridColDef, type GridRowsProp } from '@mui/x-data-grid';
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';
import type { ChartGroup } from '../groupdata';

function GroupGrid({ data }: { data: ChartGroup }) {
  const rows: GridRowsProp = data;
  const columns: GridColDef[] = [
    { field: 'id', headerName: '№', flex: 0.5 },
    { field: 'name', headerName: 'Группа', flex: 1 },
    { field: 'count', headerName: 'Количество', flex: 0.7 },
    { field: 'max_price', headerName: 'Макс. цена', flex: 0.8 },
    { field: 'min_price', headerName: 'Мин. цена', flex: 0.8 },
    { field: 'avg_price', headerName: 'Ср. цена', flex: 0.8 },
  ];

  return (
    <Container maxWidth="lg" sx={{ height: 700, mt: '20px', mb: 4 }}>
      <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        slots={{ toolbar: GridToolbar }}
        rows={rows}
        columns={columns}
      />
    </Container>
  );
}

export default GroupGrid;
