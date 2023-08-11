import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

//Setters
type Props = {
    sortQuery: string,
    setSortQuery: any,
    setIsDataLoading: any,
    setPage: any,
    setPokemons : any
}
/////////

export default function SortPokemons({ setSortQuery, sortQuery, setIsDataLoading, setPage, setPokemons}: Props) {

    const sort = (value : string) => {
        setIsDataLoading(true);
        setPage(0);
        setPokemons([]);
        setSortQuery(value);
    }


    const handleChange = (event: SelectChangeEvent) => {
        sort(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 170 }} size='small'>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select autoWidth={true}
                labelId="sort-select-label"
                id="sort-select"
                value={sortQuery}
                label="Sort By"
                onChange={handleChange}
            >
                <MenuItem value={"lowest_n"}>Lowest Number (First)</MenuItem>
                <MenuItem value={"lowest_hp"}>Lowest HP (First)</MenuItem>
                <MenuItem value={"lowest_at"}>Lowest Attack (First)</MenuItem>
                <MenuItem value={"lowest_def"}>Lowest Defence (First)</MenuItem>
                <MenuItem value={"lowest_speed"}>Lowest Speed (First)</MenuItem>
                <MenuItem value={"highest_n"}>Highest Number (First)</MenuItem>
                <MenuItem value={"highest_hp"}>Highest HP (First)</MenuItem>
                <MenuItem value={"highest_at"}>Highest Attack (First)</MenuItem>
                <MenuItem value={"highest_def"}>Highest Defence (First)</MenuItem>
                <MenuItem value={"highest_speed"}>Highest Speed (First)</MenuItem>
            </Select>
        </FormControl>
    )
}
