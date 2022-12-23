import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Today';
import EventsForm from './events-form';
import { styled, useMediaQuery, useTheme } from '@mui/material';
import { Scrollbar } from '../../scrollbar';

const ModalContent = styled(Container)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  [theme.breakpoints.down('sm')]: {
    maxHeight: '100vh',
    overflow: 'auto',
  },
}));

export default function CreateEventModal({ createEvent, ...props }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Button
        {...props}
        color='primary'
        size='large'
        variant='contained'
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        {isMobile ? <EventIcon /> : 'Eventos'}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <ModalContent maxWidth='sm' disableGutters>
            <Scrollbar style={{ maxHeight: '90vh' }}>
              <EventsForm onAction={createEvent} closeModal={handleClose} actionButtonLabel='Crear Evento' />
            </Scrollbar>
          </ModalContent>
        </Fade>
      </Modal>
    </>
  );
}
