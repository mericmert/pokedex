import React from 'react'
import Image from 'next/image';

export default function Stat({ icon_type, value }: { icon_type: "health" | "attack" | "defence" | "speed", value: number }) {
  return (
    <div className='relative stat-container flex gap-x-1 items-center'>
      <div className='stat-info hidden absolute -bottom-6 -left-6 w-16 h-6 bg-black/[.6] rounded'>
        <h1 className='text-center text-sm font-medium text-white'>{icon_type}</h1>
      </div>
      <Image
        src={`/${icon_type}.svg`}
        alt='healt-icon'
        width={20}
        height={20}
      />
      {value}
    </div>
  )
}
