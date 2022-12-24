import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
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

export const Reports = () => {
  const [stats, setStats] = useState([]);
  const { events, updateEvent, isLoading } = useEvents();

  useEffect(() => {
    const ongoingEvents = events.reduce((ongoing, event) => {
      const { startDate, endDate } = event;
      const hasStarted = DateTime.fromISO(startDate).diffNow().milliseconds < 0; // If is negative then it's an older date
      const hasFinished = DateTime.fromISO(endDate).diffNow().milliseconds < 0; // If is negative then it's an older date

      if (hasStarted && !hasFinished) ongoing.push(event)

      return ongoing;
    }, [])
    const sortedEvents = events.sort((a, b) => DateTime.fromISO(a.startDate).diff(DateTime.fromISO(b.startDate)).milliseconds);
    const nextEvent = events.reduce((next, event) => {
      const eventDateTime = DateTime.fromISO(event.startDate);
      const timeToStart = eventDateTime.diffNow().milliseconds;
      if (timeToStart < 0) return next; // if it's negative it has already started

      const isAtLaterDate = next && eventDateTime.diff(DateTime.fromISO(next.startDate)).milliseconds > 0;
      if (isAtLaterDate) return next;

      return event;
    }, null)

    const stats = [
      {
        content: String(ongoingEvents.length),
        icon: EmojiEvents,
        label: 'Eventos en curso',
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
        content: nextEvent?.name,
        icon: Event,
        label: 'Proximo Evento',
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
                  updateEvent={updateEvent}
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
