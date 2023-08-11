import { CircularProgress } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Pokemon, PokemonType } from 'models';
import PokemonCard from '@/components/pokemon/PokemonCard';
import Head from 'next/head';
import NoPokemonFound from '@/components/error/NoPokemonFound';
import { PokemonUtil } from '@/lib/utils/PokemonUtil';
import PokedexLoader from '@/components/loaders/PokedexLoader';
import SearchPokemons from '@/components/filter/SearchPokemons';
import SortPokemons from '@/components/filter/SortPokemons';
import TypeFilter from '@/components/filter/TypeFilter';
import { axiosWithAuth, pokemonApi } from '@/lib/axios-auth';
import { AxiosResponse } from 'axios';
import PokemonStats from '@/components/pokemon/PokemonStats';
import { TrainerUtil } from '@/lib/utils/TrainerUtil';
import { useAuth } from '@/contexts/AuthContext';

const SIZE_PER_PAGE = 6;

export default function Explore({ pokemon_types }: { pokemon_types: PokemonType[] }) {
    const { data: session } = useAuth();
    const [page, setPage] = useState<number>(0);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [showLoadMore, setShowLoadMore] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortQuery, setSortQuery] = useState<string>("lowest_n");
    const [typeQuery, setTypeQuery] = useState<string[]>([]);
    const [openStats, setOpenStats] = useState<boolean>(false);
    const [stats, setStats] = useState<Pokemon | undefined>(undefined);
    const [userWishList, setUserWishList] = useState<Pokemon[]>([]);
    const [caughtList, setCaughtList] = useState<Pokemon[]>([]);

    useEffect(() => {
        loadPokemons();
    }, [page, searchQuery, sortQuery, typeQuery])

    const getWishList = useCallback(async () => {
        const user_wishlist = await TrainerUtil.getWishList(session?.user.id);
        setUserWishList(user_wishlist);
    }, [session]);

    const getCaughtList = useCallback(async () => {
        const user_catchs = await TrainerUtil.getCatchList(session?.user.id);
        setCaughtList(user_catchs);
    }, [session])

    useEffect(() => {
        getWishList();
        getCaughtList();
    }, [session]);

    const loadPokemons = useCallback(async () => {
        setIsLoading(true);
        let res: Pokemon[] = await PokemonUtil.getPokemons(page, SIZE_PER_PAGE, searchQuery, sortQuery, typeQuery.join('_'), true);
        if (res.length < SIZE_PER_PAGE) setShowLoadMore(false);
        else setShowLoadMore(true);
        setPokemons(prev => [...prev, ...res]);
        setIsDataLoading(prev => false);
        setIsLoading(false);

    }, [page, searchQuery, sortQuery, typeQuery]
    )

    const handleLoadMore = () => {
        setPage(prev => prev + 1);
    }

    return (
        <>
            <Head>
                <title>Explore</title>
            </Head>
            <PokemonStats
                isActive={openStats}
                setActive={setOpenStats}
                stats={stats}
                userWishList={userWishList} setUserWishList={setUserWishList}
                caughtList={caughtList} setCaughtList={setCaughtList}
            />
            <main className="relative w-[max(80%,450px)] pt-8 m-auto text-sky-90">
                <div className="min-h-[80px] w-full rounded-lg shadow-lg shadow-pokeblue/[.2] bg-white flex flex-wrap items-center justify-between px-2 md:px-10 py-4 lg:py-2">
                    <div className='flex items-center gap-x-[1vw]'>
                        <SortPokemons setIsDataLoading={setIsDataLoading} setPage={setPage} setPokemons={setPokemons} sortQuery={sortQuery} setSortQuery={setSortQuery} />
                        <TypeFilter query={typeQuery} setQuery={setTypeQuery} setIsDataLoading={setIsDataLoading} setPage={setPage} setPokemons={setPokemons} types={pokemon_types} />
                    </div>
                    <SearchPokemons setIsDataLoading={setIsDataLoading} setPage={setPage} setPokemons={setPokemons} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </div>
                <div className='pokedex-container w-full pt-6 pb-4 px-10 sm:px-32 flex justify-center md:justify-start flex-wrap gap-x-[2vw] gap-y-4'>

                    {isDataLoading ? <PokedexLoader /> : (pokemons.length > 0 ? pokemons.map((pokemon: Pokemon, idx: number) => <PokemonCard key={idx} pokemon={pokemon} setOpenStats={setOpenStats} stats={stats} setStats={setStats} />) : <NoPokemonFound />)}
                </div>
                <div className='flex justify-center w-full h-10'>
                    {showLoadMore &&
                        <button className='h-full flex justify-center items-center
                     bg-pokeblue w-32 text-white rounded-md'
                            onClick={handleLoadMore}
                        >
                            {isLoading ? <CircularProgress color="inherit" size={30} /> : <span>Load More</span>}
                        </button>
                    }
                </div>

            </main>


        </>
    )
}

export async function getServerSideProps() {
    let pokemon_types: PokemonType[] = [];
    try {
        const response: AxiosResponse = await pokemonApi.get("/api/v1/types/");
        pokemon_types = response.data;

    } catch (err) {
        console.log(err);
    }

    return {
        props: {
            pokemon_types
        },
    };
}