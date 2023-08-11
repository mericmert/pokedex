import { Pokemon, PokemonType } from 'models'
import Image from 'next/image'
import React from 'react'
import TypeLabel from './TypeLabel'
import Stat from './Stat'
import { SERVER_URL } from '@/lib/url'
import { useAuth } from '@/contexts/AuthContext'
import { TrainerUtil } from '@/lib/utils/TrainerUtil'
import { toast } from 'react-toastify'



export default function PokemonCard({ pokemon, setOpenStats, setStats, stats }: { pokemon: Pokemon, setOpenStats?: any, setStats?: any, stats?: Pokemon | undefined }) {

  const { data: session } = useAuth();
  const openStats = async () => {
    setOpenStats((prev: boolean) => false);
    setStats(pokemon);
    await new Promise(res => setTimeout(res, 300));
    setOpenStats((prev: boolean) => true);
  }

  return (
    <div className='relative w-72 shadow-lg shadow-pokeblue/[.1] bg-white flex  rounded-md items-center p-3 cursor-pointer'>
     
      <div className='w-full flex flex-col items-center'>
        <div className='w-full min-h-[48px] flex flex-wrap justify-center items-center gap-x-2 gap-y-2 p-3'>
          {pokemon.types?.map((type: PokemonType, idx: number) => <TypeLabel key={idx} type={type} />)}
        </div>
        <div className='w-[95%] h-48 bg-background flex justify-center items-center border-[2px] border-background'>
          {pokemon.image ? <Image onClick={setOpenStats ? openStats : () => {return}}
            src={`${SERVER_URL}/api/v1/pokemons/images/${pokemon.image.name}`}
            alt='bulbasaur'
            width={150}
            height={150}
          /> : "No image!"}

        </div>
        <div className='w-full min-h-[30px] p-2 text-center'>
          <div className='flex justify-between'>
            <span className='font-bold break-words'>{pokemon.name}
              <span className='ml-1 text-blue-900/[.8]'>#{pokemon.id}</span>
            </span>
            <button>
              <Image
                src={"/favicon.ico"}
                alt='pokeball'
                width={28}
                height={28}
              />
            </button>
          </div>

        </div>
        <div className='stats w-full font-bold flex flex-wrap gap-x-2 justify-center'>
          <Stat icon_type='health' value={pokemon.hp} />
          <Stat icon_type='attack' value={pokemon.attack} />
          <Stat icon_type='defence' value={pokemon.defence} />
          <Stat icon_type='speed' value={pokemon.speed} />
        </div>
      </div>
    </div>
  )
}
