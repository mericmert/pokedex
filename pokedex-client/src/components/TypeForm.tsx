import { TypeUtil } from '@/lib/utils/TypeUtil';
import { InputLabel, MenuItem, Select, Switch } from '@mui/material'
import React, { useState } from 'react'

type Props = {
    handleClose: any
}

export default function TypeForm({ handleClose }: Props) {

    const [name, setName] = useState<string>("");
    const [color, setColor] = useState<string>("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await TypeUtil.createType(name, color);
        handleClose();
    }

    const handleNameChange = (e: any) => {
        setName(e?.target.value)
    }

    const handleRoleChange = (e: any) => {
        setColor(e?.target.value)
    }

    return (
        <div className='flex flex-col text-sky-900 items-center'>
            <h1 className='text-xl font-semibold'>Create A Type</h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <label>Name</label>
                <input onChange={(e) => handleNameChange(e)} name='username' autoComplete='off' className='h-8 w-[256px] shadow-lg  border-[1px] border-sky-900 px-2 mb-3' />

                <div className='flex flex-col items-center'>
                    <InputLabel className='text-sky-900 text-sm' id="color-input">Color</InputLabel>
                    <Select
                        name='color'
                        className='w-64 h-8'
                        id='color-input'
                        label="Color"
                        onChange={(e) => handleRoleChange(e)}
                    >
                        <MenuItem value={"YELLOW"}>Yellow</MenuItem>
                        <MenuItem value={"BLUE"}>Blue</MenuItem>
                        <MenuItem value={"GREEN"}>Green</MenuItem>
                        <MenuItem value={"BLACK"}>Black</MenuItem>
                        <MenuItem value={"ORANGE"}>Orange</MenuItem>
                    </Select>
                </div>
                <button className='self-center rounded-md h-10 w-[100%] bg-gradient-to-r from-sky-600 to-pokeblue mt-4 text-white'>Create</button>
            </form>
        </div>
    )
}
