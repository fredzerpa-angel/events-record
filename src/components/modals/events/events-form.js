import { useState } from 'react';
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
  FormHelperText,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

// TODO: Change this to use Events from the DB
import { AutocompleteCheckbox } from '../../autocomplete-checkbox';
import useEvents from '../../../hooks/events.hooks';
import useEmployees from '../../../hooks/employees.hooks';
import { LoadingButton } from '@mui/lab';
import useStudents from '../../../hooks/students.hooks';
import { DateTime } from 'luxon';

const DEFAULT_EVENT_DATA = {
  start: '',
  end: '',
  organization: '',
  status: '',
  type: '',
  title: '',
  overseers: [],
  participants: [],
  goal: null,
  observations: null,
}

// This function is solely on the reason of because the fetched events comes in JS Date format ...
// ... which said format is not usable in Date Inputs
const formatEventsData = (event) => {
  const formattedEvents = {
    ...event,
    start: DateTime.fromJSDate(event.start).toISODate(),
    end: DateTime.fromJSDate(event.end).toISODate(),
  }

  return formattedEvents;
}

const EventsForm = ({ title = 'Evento', onAction = () => new Promise(), defaultEventData = DEFAULT_EVENT_DATA, closeModal, actionButtonLabel = 'Continuar', showActionButtons = true, readOnly = false }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { events, isLoading: loadingEvents } = useEvents();
  const { students, isLoading: loadingStudents } = useStudents();
  const { employees, isLoading: loadingEmployees } = useEmployees();
  const { register, getValues, setValue, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formatEventsData(defaultEventData),
  });

  const uniqueEventsType = [...new Set(events.map(event => event.type))];
  const handleEventTypeChange = e => {
    const inputEventTypeValue = getValues('type');
    const existsEventType = uniqueEventsType.find(
      type => type.toLowerCase() === inputEventTypeValue?.toLowerCase()
    );
    if (existsEventType) setValue('type', existsEventType);
  };

  const onSubmit = async (data, e) => {
    if (readOnly) return;

    setIsSubmitting(true);
    await onAction(data);
    setIsSubmitting(false);
    closeModal();
  };

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
          {title}
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
                {...register('start', {
                  required: 'Este campo es obligatorio',
                  validate: {
                    isDate: value => !!Date.parse(value),
                  },
                  setValueAs: value => DateTime.fromISO(value).toJSDate()
                })}
                error={!!errors?.start}
                helperText={errors?.start?.message}
                autoComplete='start'
                fullWidth
                type='date'
                InputLabelProps={{ shrink: true }}
                id='start'
                inputProps={{
                  readOnly,
                }}
                label='Fecha de Inicio'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('end', {
                  required: 'Este campo es obligatorio',
                  validate: {
                    isDate: value => !!Date.parse(value),
                  },
                  setValueAs: value => DateTime.fromISO(value).toJSDate()
                })}
                error={!!errors?.end}
                helperText={errors?.end?.message}
                fullWidth
                type='date'
                InputLabelProps={{ shrink: true }}
                id='end'
                inputProps={{
                  readOnly,
                }}
                label='Fecha de Culminacion'
                autoComplete='end'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('organization', { required: 'Este campo es obligatorio' })}
                error={!!errors?.organization}
                helperText={errors?.organization?.message}
                autoComplete='organization'
                fullWidth
                id='organization'
                inputProps={{
                  readOnly,
                }}
                label='Organizacion'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='status-label'>Estatus</InputLabel>
                <Select
                  {...register('status', { required: 'Este campo es obligatorio' })}
                  error={!!errors?.status}
                  labelId='status-label'
                  id='status'
                  inputProps={{
                    readOnly,
                  }}
                  label='Estatus'
                  defaultValue='Pendiente'
                >
                  <MenuItem value='Pendiente'>Pendiente</MenuItem>
                  <MenuItem value='Completado'>Completado</MenuItem>
                  <MenuItem value='Cancelado'>Cancelado</MenuItem>
                </Select>
                <FormHelperText error={!!errors?.status}>{errors?.status?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name='type'
                rules={{ required: 'Este campo es obligatorio' }}
                render={({ field: { onChange, ...fieldProps } }) => (
                  <Autocomplete
                    {...fieldProps}
                    readOnly={readOnly}
                    onChange={(e, value) => onChange(value)}
                    id='event-type'
                    freeSolo
                    autoComplete
                    autoSelect
                    loading={loadingEvents}
                    options={uniqueEventsType}
                    onClose={handleEventTypeChange}
                    renderInput={params => (
                      <TextField
                        {...params}
                        error={!!errors?.type}
                        helperText={errors?.type?.message}
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
                    )
                    }
                  />
                )}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('title', { required: 'Este campo es obligatorio' })}
                error={!!errors?.title}
                helperText={errors?.title?.message}
                fullWidth
                id='event-title'
                inputProps={{
                  readOnly,
                }}
                label='Nombre del Evento'
                autoComplete='title'
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                render={({ field: { ref, ...fieldProps } }) => (
                  <AutocompleteCheckbox
                    {...fieldProps}
                    readOnly={readOnly}
                    options={employees.sort(
                      (a, b) => -b.status.localeCompare(a.status)
                    )}
                    groupBy={employee => employee.status}
                    loading={loadingEmployees}
                    onChange={(oldValue, newValue) =>
                      setValue('overseers', newValue)
                    }
                    getOptionLabel={teacher =>
                      `${teacher.names} ${teacher.lastnames}`
                    }
                    displayOptionLabel={teacher =>
                      `${teacher.names} ${teacher.lastnames}`
                    }
                    label='Responsables'
                    isOptionEqualToValue={(option, value) =>
                      option.documentId.number === value.documentId.number
                    }
                  />
                )}
                control={control}
                name='overseers'
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                render={({ field: { ref, ...fieldProps } }) => (
                  <AutocompleteCheckbox
                    {...fieldProps}
                    readOnly={readOnly}
                    options={students.sort(
                      (a, b) =>
                        -b.gradeLevelAttended.localeCompare(
                          a.gradeLevelAttended
                        )
                    )}
                    groupBy={student => student.gradeLevelAttended}
                    loading={loadingStudents}
                    onChange={(oldValue, newValue) =>
                      setValue('participants', newValue)
                    }
                    getOptionLabel={student =>
                      `${student.names} ${student.lastnames}`
                    }
                    displayOptionLabel={student =>
                      `${student.names} ${student.lastnames}`
                    }
                    label='Participantes'
                    isOptionEqualToValue={(option, value) =>
                      option.fullname === value.fullname
                    }
                  />
                )}
                control={control}
                name='participants'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('goal')}
                fullWidth
                inputProps={{
                  readOnly,
                }}
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
                inputProps={{
                  readOnly,
                }}
                label='Observaciones'
                multiline
                rows={4}
                id='observations'
                autoComplete='observations'
              />
            </Grid>
            {/* Buttons */}
            <Grid item container xs={12} justifyContent='center' sx={{ display: showActionButtons ? 'flex' : 'none' }}>
              <Grid item container justifyContent='center' xs={5}>
                <Button
                  size='large'
                  onClick={closeModal}
                  variant='text'
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
              </Grid>
              <Grid item container justifyContent='center' xs={5}>
                <LoadingButton
                  color='primary'
                  size='large'
                  type='submit'
                  variant='contained'
                  loading={isSubmitting}
                >
                  {actionButtonLabel}
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default EventsForm;
