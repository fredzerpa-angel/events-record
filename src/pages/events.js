import { Helmet } from 'react-helmet';
import { Box, Card, Container, Typography } from '@mui/material';
import CreateEventModal from '../components/modals/events/create-event-modal';
import EventsTable from '../components/events-table/events-table';
import useEvents from '../hooks/events.hooks';

const Events = () => {
  const { events, createEvent, updateEvent, isLoading } = useEvents();

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
              <CreateEventModal createEvent={createEvent} />
            </Box>
          </Box>
          <Card>
            <EventsTable
              loading={isLoading}
              updateEvent={updateEvent}
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

export default Events;
