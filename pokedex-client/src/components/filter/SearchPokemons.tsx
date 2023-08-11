import {useRef} from 'react';
import CatchingPokemonRoundedIcon from '@mui/icons-material/CatchingPokemonRounded';

//Setters
type Props = {
    setIsDataLoading : any,
    setPage : any,
    setPokemons : any,
    setSearchQuery : any,
    searchQuery: string
}
/////////
export default function SearchPokemons({setIsDataLoading, setPage, setPokemons, searchQuery, setSearchQuery} : Props) {
    const inputElement = useRef<HTMLInputElement>(null);

    const search = () => {
        setIsDataLoading(true);
        setPage(0);
        setPokemons([]);
        setSearchQuery(inputElement.current?.value);
    }

    const handleSearch = (event : any) => {
        if (event.key === "Enter" && event.target.value !== searchQuery){
            search();
        }
    }

    return (
        <div className="search-container flex h-10 w-[max(50%,480px)]">
            <input ref={inputElement} className="h-full w-[100%] px-4 border border-r-0 rounded-md rounded-tr-none rounded-br-none outline-none" placeholder="Search for pokemons..."
                onKeyDown={handleSearch}
            />
            <div className="h-full w-14 flex justify-center border border-l-0 items-center rounded-tl-none rounded-bl-none bg-background text-sky-900 cursor-pointer"
                onClick={handleSearch}
            >
                <CatchingPokemonRoundedIcon fontSize='large'/>
            </div>
        </div>
    )
}
