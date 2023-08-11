import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Pokemon } from 'models';
import { useState } from 'react';
import Modal from '../Modal';
import { PokemonUtil } from '@/lib/utils/PokemonUtil';
import UpdatePokemonForm from '../pokemon/UpdatePokemonForm';

export default function PokemonsTable({ rows, setRows}: { rows: Pokemon[], setRows: any}) {

    const [selectionModel, setSelectionModel] = useState<any>([]);
    const [updateOpen, setUpdateOpen] = useState<boolean>(false);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

    const handleUpdateModalOpen = (pokemon : Pokemon) => {
        setSelectedPokemon(pokemon);
        setUpdateOpen(true);
    }

    const handleUpdateModalClose = () => {
        setUpdateOpen(false);
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'info', headerName: 'Desc', width: 100 },
        { field: 'hp', headerName: 'hp', width: 80 },
        { field: 'attack', headerName: 'attack', width: 80 },
        { field: 'defence', headerName: 'defence', width: 80 },
        { field: 'speed', headerName: 'speed', width: 80 },
        { field: 'height', headerName: 'Height', width: 80 },
        { field: 'weight', headerName: 'Weight', width: 80 },
        { field: 'createdAt', headerName: 'Created At', width: 85 },
        { field: 'updatedAt', headerName: 'Updated At', width: 85 },
        {
            field: 'update', headerName: "", width: 150, sortable: false, disableColumnMenu: true, 
            renderCell : (params) => {
                return <button onClick={() => handleUpdateModalOpen(params.row)} className='w-20 h-8 bg-sky-900 text-white rounded-md'>Edit</button>
            }
        },
        {
            field: 'delete', width: 50, sortable: false, disableColumnMenu: true,
            renderHeader: () => {
                return (
                    <IconButton onClick={async () => {
                        const selectedIds: any = new Set(selectionModel);
                        await PokemonUtil.removePokemons(selectionModel.join("|"));
                        setRows((prev: Pokemon[]) => prev.filter((row: Pokemon) => !selectedIds.has(row.id)));
                    }}>
                        <DeleteOutlinedIcon />
                    </IconButton>
                )
            }
        }
    ];

    return (
        <div style={{ height: 500, width: '100%' }}>
            <Modal open={updateOpen} handleClose={handleUpdateModalClose}>
                <UpdatePokemonForm handleClose={handleUpdateModalClose} pokemon={selectedPokemon} />
            </Modal>
            <DataGrid
                className='text-sky-900'
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                onRowSelectionModelChange={(ids) => {
                    setSelectionModel(ids);
                }}
                checkboxSelection
                disableRowSelectionOnClick

            />
        </div>
    )
}
