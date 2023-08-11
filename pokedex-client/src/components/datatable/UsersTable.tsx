import { UserUtil } from '@/lib/utils/UserUtil';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { User } from 'models';
import { useState } from 'react';
import Modal from '../Modal';
import UpdateUserForm from '../user/UpdateUserForm';

export default function UsersTable({ rows, setRows}: { rows: User[], setRows: any}) {

    const [selectionModel, setSelectionModel] = useState<any>([]);
    const [updateOpen, setUpdateOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleUpdateModalOpen = (user : User) => {
        setSelectedUser(user);
        setUpdateOpen(true);
    }

    const handleUpdateModalClose = () => {
        setUpdateOpen(false);
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'username', headerName: 'Username', width: 130 },
        { field: 'email', headerName: 'Email', width: 180 },
        { field: 'role', headerName: 'Role', width: 130 },
        { field: 'enabled', headerName: 'Enabled', width: 130 },
        { field: 'createdAt', headerName: 'Created At', width: 150 },
        { field: 'updatedAt', headerName: 'Updated At', width: 150 },
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
                        await UserUtil.removeUsers(selectionModel.join("|"))
                        setRows((prev: User[]) => prev.filter((row: User) => !selectedIds.has(row.id)));
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
                <UpdateUserForm selectedUser={selectedUser} handleClose={handleUpdateModalClose}/>
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
