import { Pokemon } from 'models'
import PokemonCard from './pokemon/PokemonCard';
import { Checkbox } from '@mui/material';

export default function WishList({ pokemons, enabledIds, setEnabledIds }: { pokemons: Pokemon[], enabledIds : any, setEnabledIds : any }) {

    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        if (e.target.checked){
            setEnabledIds((prev : number[]) => ([...prev, id ]));
        }
        else{
            setEnabledIds((prev : number[]) => {
                return enabledIds?.filter((item : any) => item !== id);
            })
        }
    }

    return (
        <main className='relative w-[85%] m-auto flex gap-x-4 gap-y-4 flex-wrap mt-8'>
            {pokemons.map((pokemon, idx) =>
                <div key={idx} className='relative'>
                    <Checkbox key={idx} onChange={(e) => handleSwitchChange(e, pokemon.id)} style={{position : "absolute", zIndex : 1}}/>
                    <PokemonCard key={pokemon.name} pokemon={pokemon}/>
                </div>
            )}
        </main>
    )
}
