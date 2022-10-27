import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { AddParticipantsForm } from './add-participants-form';
import AddIcon from '@mui/icons-material/Add';
import ParticipantsAddIcon from '@mui/icons-material/Groups';
import { useMediaQuery, useTheme } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export default function AddParticipantsModal({addParticipants, ...props}) {
  const [open, setOpen] = React.useState(false);
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
        { isMobile ? <ParticipantsAddIcon /> : 'Participantes'}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Container maxWidth='sm' disableGutters sx={style}>
            <AddParticipantsForm addParticipants={addParticipants} closeModal={handleClose}/>
          </Container>
        </Fade>
      </Modal>
    </>
  );
}
