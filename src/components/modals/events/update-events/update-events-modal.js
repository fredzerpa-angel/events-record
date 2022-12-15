import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import UpdateEventsForm from './update-events-form';
import { styled } from '@mui/material';
import { Scrollbar } from '../../../scrollbar';

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

export default function UpdateEventsModal({
  updateEvent,
  eventData,
  open,
  closeModal,
  ...props
}) {
  return (
    <>
      <Modal
        // {...props}
        open={open}
        onClose={closeModal}
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <ModalContent maxWidth='sm' disableGutters>
            <Scrollbar style={{ maxHeight: '90vh' }}>
              <UpdateEventsForm
                updateEvent={updateEvent}
                eventData={eventData}
                closeModal={closeModal}
              />
            </Scrollbar>
          </ModalContent>
        </Fade>
      </Modal>
    </>
  );
}
