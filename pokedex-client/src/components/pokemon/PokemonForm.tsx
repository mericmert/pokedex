import { pokemonApi } from "@/lib/axios-auth"
import { PokemonUtil } from "@/lib/utils/PokemonUtil"
import { TypeUtil } from "@/lib/utils/TypeUtil"
import { AxiosResponse } from "axios"
import { Pokemon, PokemonFormData, PokemonType } from "models"
import { useEffect, useState } from "react"

type Props = {
    data : PokemonFormData
    handleSubmit : any,
    handleChange : any,
    handleFileChange : any,
    title : string,
    button_label : string
}

export default function PokemonForm({data, handleSubmit, handleChange, handleFileChange, title, button_label} : Props) {
    
    const [types, setTypes] = useState<PokemonType[]>();

    const fetchTypes = async () => {
        let pokemon_types: PokemonType[] = [];
        try {
            const response: AxiosResponse = await pokemonApi.get("/api/v1/types/");
            setTypes(response.data);
    
        } catch (err) {
            console.log(err);
        }
        return pokemon_types;
    }

    useEffect(() => {
       fetchTypes();
    }, []);


    return (
        <div className='flex flex-col text-sky-900'>
            <h1 className='text-xl font-semibold'>{title}</h1>
            <form onSubmit={handleSubmit} className='flex flex-col mt-3' encType='multipart/form-data'>
                <label>Pokemon Name</label>
                <input value={data.name} onChange={(e) => handleChange(e)} name='name' autoComplete='off' className='h-8 w-[50%] shadow-lg  border-[1px] border-sky-900 px-2 mb-3' />
                <label>Info</label>
                <input value={data.info} required={true} onChange={(e) => handleChange(e)} name='info' autoComplete='off' className='h-8 w-[90%] shadow-lg  border-[1px] border-sky-900 px-2 mb-3' />
                <div className='flex gap-x-4'>
                    <div className='flex flex-col items-center'>
                        <label>Height</label>
                        <input value={data.height} required={true} onChange={(e) => handleChange(e)} name='height' autoComplete='off' type='number' className='h-8 w-full shadow-lg border-[1px] border-sky-900 px-2' />
                    </div>
                    <div className='flex flex-col items-center'>
                        <label>Weight</label>
                        <input value={data.weight} required={true} onChange={(e) => handleChange(e)} name='weight' autoComplete='off' type='number' className='h-8 w-full shadow-lg border-[1px] border-sky-900 px-2' />
                    </div>
                </div>
                <div className='stats mt-3 flex items-center gap-x-4'>
                    <div className='flex flex-col items-center justify-center'>
                        <label>Hp</label>
                        <input value={data.hp} required={true} onChange={(e) => handleChange(e)} name='hp' autoComplete='off' type='number' className='h-8 w-full shadow-lg border-[1px] border-sky-900/[1] px-2 mb-3' />
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <label>Attack</label>
                        <input value={data.attack} required={true} onChange={(e) => handleChange(e)} name='attack' autoComplete='off' type='number' className='h-8 w-full shadow-lg border-[1px] border-sky-900/[1] px-2 mb-3' />
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <label>Defence</label>
                        <input value={data.defence} required={true} onChange={(e) => handleChange(e)} name='defence' autoComplete='off' type='number' className='h-8 w-full shadow-lg border-[1px] border-sky-900/[1] px-2 mb-3' />
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <label>Speed</label>
                        <input value={data.speed} required={true} onChange={(e) => handleChange(e)} name='speed' autoComplete='off' type='number' className='h-8 w-full shadow-lg  border-[1px] border-sky-900/[1] px-2 mb-3' />
                    </div>
                </div>
                <input name='image_file' type='file' onChange={(e) => handleFileChange(e)} />
                <select name="types" onChange={(e) => handleChange(e)} className="mt-2 h-10">
                    {types?.map((type) => <option key={type.name}>{type.name}</option> )} 
                </select>
                <button className='self-center rounded-md h-10 w-[100%] bg-gradient-to-r from-sky-600 to-pokeblue mt-4 text-white'>{button_label}</button>
            </form>
        </div>
    )
}
