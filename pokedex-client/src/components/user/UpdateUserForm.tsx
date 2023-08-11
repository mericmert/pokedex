
import { useAdmin } from '@/contexts/AdminContext';
import { UserUtil } from '@/lib/utils/UserUtil';
import { InputLabel, MenuItem, Select, Switch } from '@mui/material';
import { AxiosError } from 'axios';
import { User } from 'models';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

export default function UpdateUserForm({ handleClose, selectedUser }: { handleClose: any, selectedUser: User | null }) {

    const {setRefreshUsers} = useAdmin();

    const [userFormData, setUserFormData] = useState({
        username: selectedUser?.username,
        email: selectedUser?.email,
        role: selectedUser?.role,
        isEnabled: selectedUser?.enabled,
    });

    const handleChange = (event: any) => {
        setUserFormData((prev: any) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const handleSwitchChange = (event : any) => {
        setUserFormData(prev => ({
            ...prev,
            isEnabled : !prev.isEnabled
        }))
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            if (selectedUser?.id) {
                await UserUtil.updateUser(selectedUser?.id, userFormData);
                setRefreshUsers((prev : boolean) => !prev);
                handleClose();
                toast.success("You have succesfully updated a user!");
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error("Pokemon couln't be created!");
            }
        }


    }
    
    return (
        <div className='flex flex-col text-sky-900'>
            <h1 className='text-xl font-semibold'>Update User</h1>
            <form onSubmit={handleSubmit} className='flex flex-col mt-3' encType='multipart/form-data'>
                <label className=''>User name</label>
                <input value={userFormData.username} onChange={(e) => handleChange(e)} name='username' autoComplete='off' className='h-8 w-[50%] shadow-lg  border-[1px] border-sky-900 px-2 mb-3' />
                <label>Password</label>
                <input value={selectedUser?.password} disabled={true} name='username' autoComplete='off' className='cursor-not-allowed opacity-30 h-8 w-[80%] shadow-lg  border-[1px] border-sky-900 px-2 mb-3' />
                <label>Email</label>
                <input value={userFormData.email} required={true} onChange={(e) => handleChange(e)} name='email' autoComplete='off' className='h-8 w-[80%] shadow-lg  border-[1px] border-sky-900 px-2 mb-3' />
                <div className='flex gap-x-4 justify-between'>
                    <div className='flex flex-col items-center'>
                        <InputLabel className='text-sky-900 text-sm' id="role-input">Role</InputLabel>
                        <Select
                            name='role'
                            className='w-32 h-8'
                            value={userFormData.role}
                            id='role-input'
                            label="Role"
                            onChange={(e) => handleChange(e)}
                        >
                            <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                            <MenuItem value={"TRAINER"}>TRAINER</MenuItem>
                        </Select>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <label className='text-sm'>Enabled</label>
                        <Switch checked={userFormData.isEnabled == true} onChange={(e) => handleSwitchChange(e)} />
                    </div>
                </div>
                <button className='self-center rounded-md h-10 w-[100%] bg-gradient-to-r from-sky-600 to-pokeblue mt-4 text-white'>Update</button>
            </form>
        </div>
    )
}
