import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Card, Container, Typography } from '@mui/material';
import AddParticipantsModal from '../components/modals/events/add-participants/add-participants-modal';
import EventsTable from '../components/events/events-table';
import { MOCKUP_EVENTS } from '../__mocks__/events';

export const Events = () => {
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {

    // TODO: Load Events
    setTableRows(MOCKUP_EVENTS);
  }, []);

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
              alignItems: 'center',
              display: 'flex',
              mb: 3,
            }}
          >
            <Typography color='textPrimary' variant='h4'>
              Eventos
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <AddParticipantsModal />
          </Box>
          <Card>
            <EventsTable
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
              rows={tableRows}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};
