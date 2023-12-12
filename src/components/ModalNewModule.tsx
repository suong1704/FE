import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { Box, Button, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import { IconPlus, IconX } from '@tabler/icons-react';

interface Props {
    open: boolean,
    handleClose: any
}

export default function ModalNewModule({ open, handleClose }: Props) {
    const modalStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: "5px"
    };

    const paperStyle = {
        width: '40%',
        maxHeight: '50%',
        overflowY: 'auto',
    };

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={modalStyle}
        >
            <Box sx={paperStyle}>
                <DashboardCard title="Create new module" action={<IconX onClick={handleClose} color='gray' width={24} />} >
                    <Box m={1} >
                        <TextField fullWidth label="Title" sx={{ mb: 2 }} />
                        <TextField fullWidth label="Description" id="fullWidth" />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }} ><Button startIcon={<IconPlus color='white' />} variant='contained'>Create</Button> </Box>
                    <CustomTextField/>
                    </Box>
                </DashboardCard>
            </Box>
        </Modal>
    );
}
