import {
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  Box,
  Autocomplete,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { useForm } from 'react-hook-form';

// TODO: Change this to use Events from the DB
import { MOCKUP_TEACHERS } from '../../../../__mocks__/teachers';
import { MOCKUP_EVENTS } from '../../../../__mocks__/events';
import { AutocompleteCheckbox } from '../../../autocomplete-checkbox/autocomplete-checkbox';

export const CreateEventsForm = ({ closeModal }) => {
  const { register, setValue, handleSubmit } = useForm({
    defaultValues: {
      startDate: '',
      endDate: '',
      organization: '',
      status: '',
      eventType: '',
      eventName: '',
      overseers: [],
      goal: null,
      observations: null,
    },
  });

  const onSubmit = data => {
    console.log(data);

    // TODO: Add new event to DB

    // Get previous events value
    const events = JSON.parse(window.localStorage.getItem('events'));
    events.push(data)
    
    window.localStorage.setItem('events', JSON.stringify(events));
  };

  return (
    <>
      <Card
        variant='outlined'
        sx={{
          p: 3,
        }}
      >
        <Typography color='textPrimary' sx={{ mb: 3 }} variant='h4'>
          Registro de participante
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('startDate', {required: true})}
                autoComplete='startDate'
                fullWidth
                type='date'
                InputLabelProps={{ shrink: true }}
                id='startDate'
                label='Fecha de Inicio'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('endDate', {required: true})}
                fullWidth
                type='date'
                InputLabelProps={{ shrink: true }}
                id='endDate'
                label='Fecha de Culminacion'
                autoComplete='endDate'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('organization', {required: true})}
                autoComplete='organization'
                fullWidth
                id='organization'
                label='Organizacion'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='status-label'>Status</InputLabel>
                <Select
                  {...register('status', {required: true})}
                  labelId='status-label'
                  id='status'
                  label='Status'
                  defaultValue='pending'
                >
                  <MenuItem value='completed'>Completado</MenuItem>
                  <MenuItem value='ongoing'>En Progreso</MenuItem>
                  <MenuItem value='pending'>Pendiente</MenuItem>
                  <MenuItem value='canceled'>Cancelado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id='event-type'
                freeSolo
                options={[...new Set(MOCKUP_EVENTS.map(event => event.type))]}
                renderInput={params => (
                  <TextField
                    {...params}
                    {...register('eventType', {required: true})}
                    label='Tipo de Evento'
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('eventName', {required: true})}
                fullWidth
                id='event-name'
                label='Nombre del Evento'
                autoComplete='eventName'
              />
            </Grid>
            <Grid item xs={12}>
              <AutocompleteCheckbox
                options={MOCKUP_TEACHERS}
                onChange={(oldValue, newValue) => setValue('overseers', newValue)}
                getOptionLabel={teacher => teacher.fullname}
                optionsByLabel='fullname'
                label='Responsables'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('goal')}
                fullWidth
                label='Objetivo'
                multiline
                rows={4}
                id='goal'
                autoComplete='goal'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('observations')}
                fullWidth
                label='Observaciones'
                multiline
                rows={4}
                id='observations'
                autoComplete='observations'
              />
            </Grid>

            {/* Buttons */}
            <Grid item container xs={12} justifyContent='center'>
              <Grid item container justifyContent='center' xs={5}>
                <Button size='large' onClick={closeModal} variant='text'>
                  Cancelar
                </Button>
              </Grid>
              <Grid item container justifyContent='center' xs={5}>
                <Button
                  color='primary'
                  size='large'
                  type='submit'
                  variant='contained'
                >
                  Crear Evento
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};
