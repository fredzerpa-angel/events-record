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

// TODO: Change this to use Events from the DB
import { MOCKUP_TEACHERS } from '../../../../__mocks__/teachers';
import { MOCKUP_EVENTS } from '../../../../__mocks__/events';
import { AutocompleteCheckbox } from '../../../autocomplete-checkbox/autocomplete-checkbox';

export const CreateEventsForm = ({ closeModal }) => {  
  const handleSubmit = e => {
    e.preventDefault();
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
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='startDate'
                name='startDate'
                required
                fullWidth
                type='date'
                InputLabelProps={{ shrink: true }}
                id='startDate'
                label='Fecha de Inicio'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type='date'
                InputLabelProps={{ shrink: true }}
                id='endDate'
                label='Fecha de Culminacion'
                name='endDate'
                autoComplete='endDate'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='organization'
                name='organization'
                required
                fullWidth
                id='organization'
                label='Organizacion'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl required fullWidth>
                <InputLabel id='status-label'>Status</InputLabel>
                <Select
                  labelId='status-label'
                  id='status'
                  label='Status'
                  name='status'
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
                  <TextField required {...params} label='Tipo de Evento' />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='event-name'
                label='Nombre del Evento'
                name='event-name'
                autoComplete='event-name'
              />
            </Grid>
            <Grid item xs={12}>
              <AutocompleteCheckbox
                required
                options={MOCKUP_TEACHERS}
                getOptionLabel={teacher => teacher.fullname}
                optionsByLabel='fullname'
                label='Responsables'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='goal'
                label='Objetivo'
                multiline
                rows={4}                
                id='goal'
                autoComplete='goal'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name='observations'
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
