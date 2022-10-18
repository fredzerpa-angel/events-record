import {
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';
import { AutocompleteCheckbox } from '../../../autocomplete-checkbox/autocomplete-checkbox';

// TODO: Change this to use Events from the DB
import { MOCKUP_EVENTS } from '../../../../__mocks__/events';
import { MOCKUP_STUDENTS } from '../../../../__mocks__/students';

export const AddParticipantsForm = ({closeModal}) => {
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
                options={MOCKUP_EVENTS}
                getOptionLabel={event => event.name}
                renderInput={params => (
                  <TextField {...params} label='Eventos' />
                )}
              />
            </Grid>
            {/* Participants Input */}
            <Grid item xs={12}>
              <AutocompleteCheckbox
                options={MOCKUP_STUDENTS.sort(
                  (a, b) => -b.grade.localeCompare(a.grade)
                )}
                getOptionLabel={student => student.fullname}
                groupBy={student => student.grade}
                label='Participants'
                optionsByLabel='fullname'
              />
            </Grid>
            <Grid item container xs={12} justifyContent='center'>
              <Grid item container justifyContent='center' xs={5}>
                <Button
                  size='large'
                  onClick={closeModal}
                  variant='text'
                >
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
