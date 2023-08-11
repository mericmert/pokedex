import React from 'react'
import { CircularProgress } from '@mui/material'

export default function PokedexLoader() {
  return (
    <div className='w-full h-[60vh] flex justify-center items-center'>
        <CircularProgress color="primary" size={120} />
    </div>
  )
}
