import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { Helmet } from 'react-helmet';
import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { EmojiEvents, Event, Groups } from '@mui/icons-material';
import { SummaryItem } from '../components/summary-item';
import useEvents from '../hooks/events.hooks';
import EventsCalendar from '../components/events-calendar';

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const { events } = useEvents();

  useEffect(() => {
    const ongoingEvents = events.reduce((ongoing, event) => {
      const { start, end } = event;
      const hasStarted = DateTime.fromJSDate(start).diffNow().milliseconds < 0; // If is negative then it's an older date
      const hasFinished = DateTime.fromJSDate(end).diffNow().milliseconds < 0; // If is negative then it's an older date

      if (hasStarted && !hasFinished) ongoing.push(event)

      return ongoing;
    }, [])
    const nextEvent = events.reduce((nextEvent, event) => {
      const eventDateTime = DateTime.fromJSDate(event.start);
      const timeToStart = eventDateTime.diffNow().milliseconds;
      if (timeToStart < 0) return nextEvent; // if it's negative it has already started

      const isAtLaterDate = nextEvent && eventDateTime.diff(DateTime.fromJSDate(nextEvent.start)).milliseconds > 0;
      if (isAtLaterDate) return nextEvent;

      return event;
    }, null)

    const statsData = [
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
        content: nextEvent?.title,
        icon: Event,
        label: 'Proximo Evento',
      },
    ];
    setStats(statsData);
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
              <Card variant='outlined' sx={{ p: 2, '.fc-toolbar-title': { textTransform: 'capitalize' } }}>
                <EventsCalendar events={events} />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;