import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { AddParticipantsForm } from './forms/add-participants-form';
import AddIcon from '@mui/icons-material/Add';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export default function AddParticipantsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        color='primary'
        size='large'
        variant='contained'
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Participante
      </Button>
      <Modal
        aria-labelledby='modal-title'
        aria-describedby='modal-body'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Container maxWidth='sm' sx={style}>
            <AddParticipantsForm />
          </Container>
        </Fade>
      </Modal>
    </div>
  );
}
