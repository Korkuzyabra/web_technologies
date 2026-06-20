import {DataGrid, GridColDef, GridRowsProp} from "@mui/x-data-grid";
import {Container} from "@mui/material";
import {tGroup} from "../groupdata";
import {ruRU} from "@mui/x-data-grid/locales";

type Props = {
    data: tGroup
}

const GroupGrid = ({data} : Props) => {
    const rows: GridRowsProp = data;
      const columns: GridColDef[] = [
        { field: 'Группа'},
        { field: 'Минимальная высота'},
        { field: 'Максимальная высота'},
        { field: 'Средняя высота',}
    ];

    return (
        <Container maxWidth="lg" sx={{height: '700px', mt: '20px'}}>
            <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                rows={rows}
                columns={columns}
                showToolbar={true}
            />
        </Container>
    );
}

export default GroupGrid