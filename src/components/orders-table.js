import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Chip,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from './scrollbar';

export const OrdersTable = ({ data }) => {

  return (
    <div>
      <Scrollbar>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell variant='head' align='center'>
                Evento
              </TableCell>
              <TableCell variant='head' align='center'>
                Fecha
              </TableCell>
              <TableCell variant='head' align='center'>
                # Participantes
              </TableCell>
              <TableCell variant='head' align='center'>
                Estado
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((event, id) => {
              // TODO: Add status prop to Google Sheet Data
              return (
                <TableRow key={id} hover>
                  <TableCell variant='body' align='center'>
                    <Link
                      color="inherit"
                      component={RouterLink}
                      to="#"
                      underline="none"
                      variant="subtitle2"
                    >
                      {event.project}
                    </Link>
                  </TableCell>
                  <TableCell variant='body' align='center'>
                    <Box>
                      <Typography
                        color="inherit"
                        variant="inherit"
                      >
                        {event.date}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell variant='body' align='center'>
                    {event.participants}
                  </TableCell>
                  <TableCell variant='body' align='center'>
                    <Chip
                      label={event.status.toUpperCase()}
                      size='medium'
                      color={event.status === 'completed' ? 'success' : event.status === 'pending' ? 'warning' : 'error'}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
    </div>
  );
};

OrdersTable.propTypes = {
  data: PropTypes.array.isRequired
};
