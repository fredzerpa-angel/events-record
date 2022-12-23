import Backdrop from '@mui/material/Backdrop';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import EventsForm from './events-form';
import { styled } from '@mui/material';
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

export default function UpdateEventModal({
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
              <EventsForm
                onAction={updateEvent}
                defaultEventData={eventData}
                closeModal={closeModal}
                actionButtonLabel='Actualizar'
              />
            </Scrollbar>
          </ModalContent>
        </Fade>
      </Modal>
    </>
  );
}
