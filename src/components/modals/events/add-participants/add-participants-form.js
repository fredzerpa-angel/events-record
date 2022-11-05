import { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AutocompleteCheckbox } from '../../../autocomplete-checkbox/autocomplete-checkbox';
import useEvents from '../../../../hooks/useEvents';
import useStudents from '../../../../hooks/useStudents';
import { useForm } from 'react-hook-form';

export const AddParticipantsForm = ({ addParticipants, closeModal }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { events, isLoading: loadingEvents } = useEvents();
  const { students, isLoading: loadingStudents } = useStudents();
  const { setValue, handleSubmit } = useForm({
    defaultValues: {
      event: '',
      participants: [],
    },
  });

  const onSubmit = async ({ event, participants }, e) => {
    setIsSubmitting(true);
    const response = await addParticipants(event, participants);
    setIsSubmitting(false);
    closeModal();
  };

  const onError = (errors, e) => console.error(errors, e);

  return (
    <>
      <Card variant='outlined' sx={{ p: 3 }}>
        <Typography color='textPrimary' sx={{ mb: 3 }} variant='h4'>
          Registro de participante
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit(onSubmit, onError)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            {/* Events Input */}
            <Grid item xs={12}>
              <Autocomplete
                autoComplete
                onChange={(oldValue, newValue) => setValue('event', newValue)}
                noOptionsText={'Evento no encontrado'}
                options={events}
                loading={loadingEvents}
                getOptionLabel={event => event.name}
                renderOption={(props, event) => {
                  return (
                    <li {...props} key={event.id}>
                      {event.name} ({event.startDate} - {event.endDate})
                    </li>
                  );
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='Eventos'
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
            {/* Participants Input */}
            <Grid item xs={12}>
              <AutocompleteCheckbox
                options={students.sort(
                  (a, b) =>
                    -b.gradeLevelAttended.localeCompare(a.gradeLevelAttended)
                )}
                getOptionLabel={student => student.fullname}
                groupBy={student => student.gradeLevelAttended}
                label='Participantes'
                optionsByLabel='fullname'
                onChange={(oldValue, newValue) => {
                  setValue('participants', newValue);
                }}
                loading={loadingStudents}
              />
            </Grid>
            <Grid item container xs={12} justifyContent='center'>
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
                  loading={isSubmitting}
                  color='primary'
                  size='large'
                  type='submit'
                  variant='contained'
                >
                  Agregar
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};
