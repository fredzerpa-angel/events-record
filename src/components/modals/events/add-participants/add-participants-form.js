import {
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';
import { AutocompleteCheckboxes } from './autocomplete-checkboxes';

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
                getOptionLabel={option => option.project}
                renderInput={params => (
                  <TextField {...params} label='Eventos' />
                )}
              />
            </Grid>
            {/* Participants Input */}
            <Grid item xs={12}>
              <AutocompleteCheckboxes
                options={MOCKUP_STUDENTS.sort(
                  (a, b) => -b.grade.localeCompare(a.grade)
                )}
                getOptionLabel={option => option.fullname}
                groupBy={option => option.grade}
                label='fullname'
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
