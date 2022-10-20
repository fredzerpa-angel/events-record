  import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';
import { AutocompleteCheckbox } from '../../../autocomplete-checkbox/autocomplete-checkbox';

export const AddParticipantsForm = ({closeModal}) => {
  const [events, setEvents] = useState([]); 
  const [students, setStudents] = useState([]); 

  useEffect(() => {
    const events = JSON.parse(window.localStorage.getItem('events'));
    const students = JSON.parse(window.localStorage.getItem('students'));
    
    setEvents(events);
    setStudents(students);
  }, [])
  
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
                getOptionLabel={event => event.name}
                renderInput={params => (
                  <TextField {...params} label='Eventos' />
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
