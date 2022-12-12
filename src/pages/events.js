import { Helmet } from 'react-helmet';
import { Box, Card, Container, Typography } from '@mui/material';
import CreateEventsModal from '../components/modals/events/create-events/create-events-modal';
import AddParticipantsModal from '../components/modals/events/add-participants/add-participants-modal';
import EventsTable from '../components/events-table/events-table';
import useEvents from '../hooks/useEvents';

export const Events = () => {
  const { events, createEvent, addParticipants, isLoading } = useEvents();
  
  return (
    <>
      <Helmet>
        <title>Eventos | ASOCOL</title>
      </Helmet>
      <Box
        sx={{
          pb: 3,
          pt: 8,
        }}
      >
        <Container maxWidth='lg'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexFlow: 'row wrap',
              mb: 2,
            }}
          >
            <Typography color='textPrimary' variant='h4'>
              Eventos
            </Typography>
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <CreateEventsModal createEvent={createEvent} />
              <AddParticipantsModal sx={{ ml: 2 }} addParticipants={addParticipants} />
            </Box>
          </Box>
          <Card>
            <EventsTable
              loading={isLoading}
              visibleFields={[
                'type',
                'name',
                'organization',
                'overseers',
                'goal',
                'participants',
                'startDate',
                'endDate',
                'observations',
                'status',
              ]}
              rows={events}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};
