import { cn } from '@/lib/tailwind'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Stat from './Stat';
import { Pokemon, PokemonType } from 'models';
import { SERVER_URL } from '@/lib/url';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import { IconButton } from '@mui/material'
import { useAuth } from '@/contexts/AuthContext';
import { TrainerUtil } from '@/lib/utils/TrainerUtil';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { useCollection } from '@/contexts/CollectionProvider';


type Props = {
  isActive: boolean,
  setActive: any,
  stats: Pokemon | undefined,
  userWishList: Pokemon[],
  setUserWishList: any,
  caughtList : Pokemon[],
  setCaughtList : any
}

export default function PokemonStats({ isActive, setActive, stats, userWishList, setUserWishList, caughtList, setCaughtList }: Props) {

  const { data: session } = useAuth();
  const {setCount} = useCollection();
  const [isWishListed, setIsWishListed] = useState<boolean>(false);
  const [isCaught, setIsCaught] = useState<boolean>(false);

  const addWishList = async () => {
    await TrainerUtil.wishPokemon(session?.user.id, stats?.id);
    setUserWishList((prev: any) => [...prev, stats]);
    setIsWishListed(true);
  }

  const removeWishList = async () => {
    await TrainerUtil.removeFromWishList(session?.user.id, String(stats?.id));
    setUserWishList((prev: any) => prev.filter((item: any) => item.id !== stats?.id));
    setIsWishListed(false);
  }

  const addCaughtList = async () => {
    await TrainerUtil.catchPokemon(session?.user.id, stats?.id);
    setCaughtList((prev: any) => [...prev, stats]);
    setIsCaught(true);
    setCount((prev: number) => prev + 1)

  }

  const removeCaughtList = async () => {
    await TrainerUtil.removeFromWishList(session?.user.id, String(stats?.id));
    setCaughtList((prev: any) => prev.filter((item: any) => item.id !== stats?.id));
    setIsCaught(false);
    setCount((prev: number) => prev - 1)

  }


  useEffect(() => {
    const filtered = userWishList.filter(pokemon => pokemon.id === stats?.id);
    setIsWishListed(filtered.length > 0);
  }, [userWishList, stats])

  useEffect(() => {
    const filtered = caughtList.filter(pokemon => pokemon.id === stats?.id);
    setIsCaught(filtered.length > 0);
  }, [caughtList, stats])



  return (
    <div className={cn('stats-container transition-all fixed top-0 bottom-0 bg-sky-900/[.9] w-[350px] z-20 text-white shadow-lg shadow-black', {
      "translate-x-[-350px]": !isActive
    })}>
      <button onClick={() => setActive((prev: boolean) => false)}>
        <CloseRoundedIcon fontSize='large' className='fixed left-[calc(350px-50px)] top-3' />
      </button>
      <div className='flex flex-col h-full w-full items-center justify-start pt-6 pb-12'>
        <h1>
          {stats?.image ? <Image
            className='pointer-events-none'
            src={`${SERVER_URL}/api/v1/pokemons/images/${stats.image.name}`}
            alt={"charmander"}
            height={180}
            width={180}
          /> : ""}

        </h1>
        <span>#{stats?.id}</span>
        <h1 className='text-3xl font-bold'>{stats?.name}</h1>
        <h1>{stats?.info}</h1>
        <div className='w-full flex flex-wrap justify-center gap-x-4 gap-y-3 mt-6'>
          {stats?.types?.map((type: PokemonType, idx: number) => (
            <div key={idx} className='w-20 h-8 rounded-3xl shadow-md bg-background shadow-sky-950 flex justify-center items-center' style={{ backgroundColor: type.color }}>
              {type.name}
            </div>
          ))}
        </div>

        <div className='w-full mt-6 flex flex-col items-center pb-6'>
          <span className='text-xl font-bold mb-4'>ABILITIES</span>
          <div className='flex gap-x-8'>
            <div className='flex flex-col items-center'>
              <span>Height</span>
              <div className='w-32 h-8 shadow-md shadow-sky-950 bg-white text-sky-900 rounded-3xl flex justify-center items-center'>{stats?.height} m</div>
            </div>
            <div className='flex flex-col items-center'>
              <span>Weight</span>
              <div className='w-32 h-8 shadow-md shadow-sky-950 bg-white rounded-3xl text-sky-900 flex justify-center items-center'>{stats?.weight} kg</div>
            </div>
          </div>
        </div>
        {!isWishListed ?
          <IconButton onClick={addWishList} className='text-white text-sm flex gap-x-2 rounded-md bg-sky-950 hover:bg-sky-900 p-3'>
            <BookmarkRoundedIcon fontSize='large' /> Add To Wish List
          </IconButton> :
          <IconButton onClick={removeWishList} className='text-white text-sm flex gap-x-2 rounded-md bg-sky-950 hover:bg-sky-900 p-3'>
            <BookmarkRoundedIcon className='text-pokeyellow' fontSize='large' /> Remove From Wish List
          </IconButton>}
          {!isCaught ?
          <IconButton onClick={addCaughtList} className='text-white text-sm flex gap-x-2 rounded-md bg-sky-950 hover:bg-sky-900 p-3 mt-3'>
            <BookmarkRoundedIcon fontSize='large' /> Collect the Pokeball
          </IconButton> :
          <IconButton onClick={removeCaughtList} className='text-white text-sm flex gap-x-2 rounded-md bg-sky-950 hover:bg-sky-900 p-3 mt-3'>
            <CatchingPokemonIcon fontSize='large' className='text-red-500'/> Drop the Pokeball
          </IconButton>}

        <div className='absolute bottom-0 stats w-full flex justify-center gap-x-4 bg-background min-h-[60px] mt-16 text-sky-900'>
          <Stat icon_type='health' value={stats?.hp ?? 0} />
          <Stat icon_type='attack' value={stats?.attack ?? 0} />
          <Stat icon_type='defence' value={stats?.defence ?? 0} />
          <Stat icon_type='speed' value={stats?.speed ?? 0} />
        </div>
      </div>
    </div>
  )
}
