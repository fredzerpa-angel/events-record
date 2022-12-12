import { Helmet } from 'react-helmet';
import {
  Box,
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { EmojiEvents, Event, Groups } from '@mui/icons-material';
import { SummaryItem } from '../components/reports/summary-item';
import EventsTable from '../components/events-table/events-table';
import useEvents from '../hooks/useEvents';
import { useState, useEffect } from 'react';

export const Reports = () => {
  const [stats, setStats] = useState([]);
  const { events, isLoading } = useEvents();

  useEffect(() => {
    const stats = [
      {
        content: String(events?.length),
        icon: EmojiEvents,
        label: 'Eventos',
      },
      {
        content: String(
          events.reduce(
            (total, { participants }) => total + participants?.length,
            0
          )
        ),
        icon: Groups,
        label: 'Participantes',
      },
      {
        content: events.at(-1)?.name,
        icon: Event,
        label: 'Ultimo Evento',
      },
    ];
    setStats(stats);
  }, [events]);

  return (
    <>
      <Helmet>
        <title>Reports | Eventos ASOCOL</title>
      </Helmet>
      <Box
        sx={{
          pb: 3,
          pt: 8,
        }}
      >
        <Container maxWidth='lg'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography color='textPrimary' variant='h4'>
                Reportes de Eventos
              </Typography>
            </Grid>
            {stats.map(item => (
              <Grid item key={item.label} md={4} xs={12}>
                <SummaryItem
                  content={item.content}
                  icon={item.icon}
                  label={item.label}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Card variant='outlined'>
                <CardHeader title='Ultimos Eventos' />
                <Divider />
                <EventsTable
                  loading={isLoading}
                  visibleFields={[
                    'name',
                    'organization',
                    'overseers',
                    'participants',
                    'startDate',
                    'endDate',
                    'status',
                  ]}
                  rows={events.filter((event, i) => i < 5)}
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
