
import { useAdmin } from '@/contexts/AdminContext';
import { PokemonUtil } from '@/lib/utils/PokemonUtil';
import { AxiosError } from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import PokemonForm from './PokemonForm';
import { PokemonFormData } from 'models';


export default function CreatePokemonForm({ handleClose }: { handleClose: any }) {

    const [pokemonData, setPokemonData] = useState<PokemonFormData>({
        name: "",
        info: "",
        height: 0,
        weight: 0,
        hp: 0,
        attack: 0,
        defence: 0,
        speed: 0
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
            await PokemonUtil.savePokemon(fd);
            handleClose();
            setRefreshPokemons((prev: boolean) => !prev);
            toast.success("You have succesfully created a pokemon!");
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error("Pokemon couln't be created!");
            }
        }


    }
    return (
        <PokemonForm
            data={pokemonData}
            title={"Create New Pokemon"}
            button_label='Create'
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleFileChange={handleFileChange} />
    )
}
