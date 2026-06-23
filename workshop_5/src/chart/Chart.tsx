import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import GroupGrid from "./components/GroupGrid";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import { useState} from "react";
import {years, countries, types } from "./groupdata";
import GroupChart from "./components/GroupChart";

type tSelect = 'Страна'|'Год'|'Тип'

const allData = {
    Страна: countries,
    Год: years,
    Тип: types
};

const Chart = () => {
    const [group, setGroup] = useState<tSelect>("Страна")
    const [groupData, setGroupData] = useState(countries)

    const handleChange = (event: SelectChangeEvent) => {
        const newGroup = event.target.value as tSelect;
        setGroup(newGroup);
        setGroupData(allData[newGroup])
  }

    return (
        <div >
            <NavBar active="3"/>
            <Box sx={{ width:"200px", m:"auto" }}>
                <FormControl fullWidth>
                    <InputLabel> Группировать по </InputLabel>
                        <Select id="select-group" value={group} label="Группировать по" onChange={handleChange}>
                            <MenuItem value="Страна"> Стране </MenuItem>
                            <MenuItem value="Год"> Году </MenuItem>
                            <MenuItem value="Тип"> Типу </MenuItem>
                        </Select>
                </FormControl>
            </Box>
            <GroupChart data = {groupData}/>
            <GroupGrid data ={groupData}/>
            <Footer/>
        </div>
    );
}

export default Chart