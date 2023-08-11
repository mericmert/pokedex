import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export default function PokedexAdvancedFilter() {
    return (
        <>
            <FormControl variant="outlined" size='small' sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">Filter By Category</InputLabel>
                <Select
                    sx={{ color: "blue-900" }}
                    labelId="filter-category"
                    id="filter-category"
                    label="Filter By Category"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Nature</MenuItem>
                    <MenuItem value={10}>Fire</MenuItem>
                    <MenuItem value={10}>Wild</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="outlined" size='small' sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">Filter By Weakness</InputLabel>
                <Select
                    sx={{ color: "blue-900" }}
                    labelId="filter-category"
                    id="filter-category"
                    label="Filter By Category"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Nature</MenuItem>
                    <MenuItem value={10}>Fire</MenuItem>
                    <MenuItem value={10}>Wild</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="outlined" size='small' sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">Filter By strongness</InputLabel>
                <Select
                    sx={{ color: "blue-900" }}
                    labelId="filter-category"
                    id="filter-category"
                    label="Filter By Category"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Nature</MenuItem>
                    <MenuItem value={10}>Fire</MenuItem>
                    <MenuItem value={10}>Wild</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}
