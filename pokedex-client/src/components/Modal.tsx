import { Box } from '@mui/material'
import {Modal as MUIModal} from '@mui/material'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 480,
    bgcolor: 'background.paper',
    boxShadow: 12,
    p: 4,
  };


export default function Modal({children, open, handleClose} : {children : React.ReactNode, open : boolean, handleClose : any}) {
    
    
    return (
        <>
            <MUIModal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {children}
                </Box>
            </MUIModal>
        </>
    )
}
