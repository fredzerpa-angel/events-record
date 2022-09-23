import { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Card,
  Container,
  Divider,
  TablePagination,
  Typography,
} from '@mui/material';
import { EventsFilter } from '../components/events/events-filter';
import { EventsTable } from '../components/events-table';
import { orders } from '../__mocks__/orders';
import AddParticipantsModal from '../components/modals/add-participants-modal';

export const Events = () => {
  const [mode, setMode] = useState('table');
  const [query, setQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleModeChange = (event, newMode) => {
    if (newMode) {
      setMode(newMode);
    }
  };

  const handleQueryChange = newQuery => {
    setQuery(newQuery);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          <Card variant='outlined'>
            <EventsFilter
              mode={mode}
              onModeChange={handleModeChange}
              onQueryChange={handleQueryChange}
              query={query}
            />
            <Divider />
            {/* TODO: Use Events Mock-up data */}
            <EventsTable orders={orders} />
            <Divider />
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};
