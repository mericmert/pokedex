import { UserUtil } from '@/lib/utils/UserUtil';
import { Tab, Tabs } from '@mui/material';
import Modal from './Modal';
import { Pokemon, User } from 'models';
import React, { useEffect, useState } from 'react'
import CreatePokemonForm from './pokemon/CreatePokemonForm';
import UsersTable from './datatable/UsersTable';
import { useAdmin } from '@/contexts/AdminContext';
import PokemonsTable from './datatable/PokemonsTable';
import { PokemonUtil } from '@/lib/utils/PokemonUtil';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import TypeForm from './TypeForm';

export default function AdminPanel() {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [typeModal, setTypeModal] = useState<boolean>(false);
    const [users, setUsers] = useState<User[]>([]);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [tab, setTab] = useState<number>(0);
    const { refreshUsers, refreshPokemons } = useAdmin();
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    const loadUsers = async () => {
        let users: User[] = await UserUtil.getUsers();
        setUsers(users);
    }

    const loadPokemons = async () => {
        let pokemons: Pokemon[] = await PokemonUtil.getPokemons();
        setPokemons(pokemons);
    }

    const handleOpen = () => setOpenCreateModal(true);
    const handleClose = () => setOpenCreateModal(false);

    const handleTypeModalOpen = () => setTypeModal(true);
    const handleTypeModalClose = () => setTypeModal(false);

    useEffect(() => {
        if (tab === 0) {
            loadUsers();
        } else if (tab === 1) {
            loadPokemons();
        }
    }, [refreshUsers, refreshPokemons, tab]);


    return (
        <>
            <div className="w-full h-12 bg-white header flex justify-between items-center mt-6 shadow-lg shadow-sky-900/[.1] pr-6">
                <Tabs value={tab} onChange={handleChange} centered>
                    <Tab label={<div className='flex items-center gap-x-2 capitalize'><PeopleAltIcon />Users</div>} />
                    <Tab label={<div className='flex items-center gap-x-2 capitalize'><CatchingPokemonIcon />Pokemons</div>} />
                </Tabs>
                <div>
                    <button className="w-28 h-8 bg-green-500 mr-2 rounded-md text-white text-xs outline-none" onClick={handleTypeModalOpen}>Create Type</button>
                    <button className="w-28 h-8 bg-red-500 rounded-md text-white text-xs outline-none" onClick={handleOpen}>Create Pokemon</button>
                </div>
            </div>
            <Modal open={openCreateModal} handleClose={handleClose}>
                <CreatePokemonForm handleClose={handleClose} />
            </Modal>
            <Modal open={typeModal} handleClose={handleTypeModalClose}>
                <TypeForm handleClose={handleTypeModalClose} />
            </Modal>
            <div className="w-full  bg-white shadow-lg shadow-sky-900/[.1] mt-6">
                <TabPanel value={tab} index={0}>
                    <UsersTable rows={users} setRows={setUsers} />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <PokemonsTable rows={pokemons} setRows={setPokemons} />
                </TabPanel>
            </div>
        </>
    )
}



const TabPanel = ({ children, value, index }: { children: React.ReactNode, value: number, index: number }) => {
    return (
        <>
            {index === value && children}
        </>
    )

}
