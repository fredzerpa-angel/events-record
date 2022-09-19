import { Helmet } from 'react-helmet';
import { Box, Card, CardHeader, Container, Divider, Grid, Typography } from '@mui/material';
import { EmojiEvents, Event, Groups } from '@mui/icons-material';
import { SummaryItem } from '../components/reports/summary-item';
import { EventsTable } from '../components/events-table';
import { MOCKUP_EVENTS } from '../__mocks__/events';

const stats = [
  {
    content: String(MOCKUP_EVENTS.length),
    icon: EmojiEvents,
    label: 'Eventos'
  },
  {
    content: String(MOCKUP_EVENTS.reduce((total, { participants }) => total + participants, 0)),
    icon: Groups,
    label: 'Participantes'
  },
  {
    content: MOCKUP_EVENTS.at(0).project,
    icon: Event,
    label: 'Ultimo Evento'
  }
];

export const Reports = () => (
  <>
    <Helmet>
      <title>Reports | Eventos ASOCOL</title>
    </Helmet>
    <Box
      sx={{
        pb: 3,
        pt: 8
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
          >
            <Typography
              color="textPrimary"
              variant="h4"
            >
              Reportes de Eventos
            </Typography>
          </Grid>
          {stats.map((item) => (
            <Grid
              item
              key={item.label}
              md={4}
              xs={12}
            >
              <SummaryItem
                content={item.content}
                icon={item.icon}
                label={item.label}
              />
            </Grid>
          ))}
          <Grid
            item
            xs={12}
          >
            <Card variant="outlined">
              <CardHeader title="Ultimos Eventos" />
              <Divider />
              <EventsTable data={MOCKUP_EVENTS.filter((event, i) => i < 5)} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);
