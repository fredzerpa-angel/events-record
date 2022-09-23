import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

export const AutocompleteCheckboxes = ({ label, ...props}) => {
  return (
    <Autocomplete
      {...props}
      multiple
      // options={options}
      onChange={(event, newValue) => {
        console.log(newValue);
      }}
      disableCloseOnSelect
      // getOptionLabel={option => option[optionLabel]}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option[label]}
        </li>
      )}
      renderInput={params => <TextField {...params} label='Participantes' />}
    />
  );
};
