import { useAdmin } from '@/contexts/AdminContext';
import { AxiosError } from 'axios';
import { Pokemon } from 'models';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import PokemonForm from './PokemonForm';
import { PokemonUtil } from '@/lib/utils/PokemonUtil';

export default function UpdatePokemonForm({ pokemon, handleClose }: { pokemon: Pokemon | null, handleClose: any }) {
    const [pokemonData, setPokemonData] = useState<any>({
        name: pokemon?.name,
        info: pokemon?.info,
        height: pokemon?.height,
        weight: pokemon?.weight,
        hp: pokemon?.hp,
        attack: pokemon?.attack,
        defence: pokemon?.defence,
        speed: pokemon?.speed,
        types : pokemon?.types
    });

    const [image, setImage] = useState<any>(null);
    const { setRefreshPokemons } = useAdmin();

    const handleChange = (event: any) => {
        setPokemonData((prev: any) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const handleFileChange = (event: any) => {
        setImage(event.target.files[0]);
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const fd = new FormData();
        for (let key in pokemonData) {
            fd.append(key, pokemonData[key]);
        }
        fd.append("image_file", image);

        try {
            if (pokemon?.id) {
                await PokemonUtil.updatePokemon(pokemon.id, fd);
                handleClose();
                setRefreshPokemons((prev: boolean) => !prev);
                toast.success("You have succesfully updated a pokemon!");
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error("Pokemon couln't be updated!");
            }
        }
    }

    return (
        <PokemonForm
            data={pokemonData}
            title={"Update Pokemon"}
            button_label='Update'
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleFileChange={handleFileChange} />
    )
}
