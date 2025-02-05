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

const InfoEventModal = ({
  eventData,
  open,
  closeModal,
  ...props
}) => (
  <Modal
    {...props}
    open={open}
    onClose={closeModal}
    components={{
      Backdrop,
    }}
    componentsProps={{
      backdrop: { timeout: 500 }
    }}
  >
    <Fade in={open}>
      <ModalContent maxWidth='sm' disableGutters>
        {
          eventData ?
            (
              <Scrollbar style={{ maxHeight: '90vh' }}>
                <EventsForm
                  title='Informacion del Evento'
                  defaultEventData={eventData}
                  closeModal={closeModal}
                  showActionButtons={false}
                  readOnly
                />
              </Scrollbar>
            ) : null
        }
      </ModalContent>
    </Fade>
  </Modal>
);

export default InfoEventModal;