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
  CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';

// TODO: Change this to use Events from the DB
import { AutocompleteCheckbox } from '../../../autocomplete-checkbox/autocomplete-checkbox';
import { useEvents } from '../../../../hooks/events';
import { useEmployees } from '../../../../hooks/employees';

export const CreateEventsForm = ({ closeModal }) => {
  const { events, addEvent, isLoading: loadingEvents } = useEvents();
  const { employees, isLoading: loadingEmployees } = useEmployees();
  const { register, getValues, setValue, handleSubmit, watch } = useForm({
    defaultValues: {
      startDate: '',
      endDate: '',
      organization: '',
      status: '',
      type: '',
      name: '',
      overseers: [],
      goal: null,
      observations: null,
    },
  });

  const uniqueEventsType = [...new Set(events.map(event => event.type))];
  const handleEventTypeChange = e => {
    const inputEventTypeValue = getValues('type');
    const existsEventType = uniqueEventsType.find(
      type => type.toLowerCase() === inputEventTypeValue
    );

    if (existsEventType) setValue('type', existsEventType);
  };

  const onSubmit = (data, e) => addEvent(data);
  const onError = (errors, e) => console.error(errors, e);

  return (
    <>
      <Card
        variant='outlined'
        sx={{
          p: 3,
        }}
      >
        <Typography color='textPrimary' sx={{ mb: 3 }} variant='h4'>
          Registro de Eventos
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit(onSubmit, onError)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('startDate', {
                  required: true,
                  validate: value => !!Date.parse(value),
                })}
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
                {...register('endDate', {
                  required: true,
                  validate: value => !!Date.parse(value),
                })}
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
                {...register('organization', { required: true })}
                autoComplete='organization'
                fullWidth
                id='organization'
                label='Organizacion'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='status-label'>Estatus</InputLabel>
                <Select
                  {...register('status', { required: true })}
                  labelId='status-label'
                  id='status'
                  label='Estatus'
                  defaultValue='Pendiente'
                >
                  <MenuItem value='Completado'>Completado</MenuItem>
                  <MenuItem value='En Progreso'>En Progreso</MenuItem>
                  <MenuItem value='Pendiente'>Pendiente</MenuItem>
                  <MenuItem value='Cancelado'>Cancelado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id='event-type'
                freeSolo
                loading={loadingEvents}
                options={uniqueEventsType}
                onClose={handleEventTypeChange}
                renderInput={params => (
                  <TextField
                    {...params}
                    {...register('type', { required: true })}
                    label='Tipo de Evento'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingEvents ? (
                            <CircularProgress color='inherit' size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('name', { required: true })}
                fullWidth
                id='event-name'
                label='Nombre del Evento'
                autoComplete='name'
              />
            </Grid>
            <Grid item xs={12}>
              <AutocompleteCheckbox
                options={employees}
                onChange={(oldValue, newValue) =>
                  setValue('overseers', newValue)
                }
                loading={loadingEmployees}
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
