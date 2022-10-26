import {
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import { AutocompleteCheckbox } from '../../../autocomplete-checkbox/autocomplete-checkbox';
import useEvents from '../../../../hooks/useEvents';
import useStudents from '../../../../hooks/useStudents';

export const AddParticipantsForm = ({ closeModal }) => {
  const { events, isLoading: loadingEvents } = useEvents();
  const { students, isLoading: loadingStudents } = useStudents();

  return (
    <>
      <Card variant='outlined' sx={{ p: 3 }}>
        <Typography color='textPrimary' sx={{ mb: 3 }} variant='h4'>
          Registro de participante
        </Typography>
        <form>
          <Grid container spacing={2}>
            {/* Events Input */}
            <Grid item xs={12}>
              <Autocomplete
                disablePortal
                options={events}
                loading={loadingEvents}
                getOptionLabel={event => event.name}
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
                  (a, b) => -b.grade.localeCompare(a.grade)
                )}
                getOptionLabel={student => student.fullname}
                groupBy={student => student.grade}
                label='Participantes'
                optionsByLabel='fullname'
                loading={loadingStudents}
              />
            </Grid>
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
                  Agregar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Card>
    </>
  );
};
