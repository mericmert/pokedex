import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import { PokemonType } from "models";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type PageProps = {
    setIsDataLoading : any,
    setPage : any,
    setPokemons : any,
    types : PokemonType[],
    query : string[],
    setQuery : any
}
export default function TypeFilter({types, query, setQuery, setPokemons, setPage, setIsDataLoading} : PageProps) {

    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<typeof query>) => {
      const {target: { value }} = event;
      setIsDataLoading(true);
      setPage(0);
      setPokemons([]);
      setQuery((prev : string[]) => value);
    };
    return (
        <FormControl sx={{ m: 1, width: 200 }} size="small">
            <InputLabel id="type-select-label">Filter by Types</InputLabel>
            <Select
                labelId="type-select-label"
                id="type-select"
                multiple
                value={query}
                onChange={handleChange}
                input={<OutlinedInput id="type-select" label="Type" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value : string) => (
                            <Chip key={value} label={value} color="primary" />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {types && types.map((type) => (
                    <MenuItem
                        key={type.name}
                        value={type.name}
                    >
                        {type.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
