import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Spiner from './Spiner';
import Autocomplete from '@mui/material/Autocomplete';

type LightweightAutoCompleteProps = Omit<React.ComponentProps<typeof Autocomplete>, 'options' | 'renderInput'>;

type StyledSearchBarProps = {
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  placeholder?: string;
  options?: string[];
} & LightweightAutoCompleteProps;

export default function StyledSearchBar({isLoading=false, placeholder="Search", ...props} : StyledSearchBarProps) {
  return (
    <>
      <Autocomplete
        id="search-input"
        freeSolo
        options={props.options || []}
        fullWidth
        renderInput={(params) => {
          const { InputProps, ...otherParams } = params;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { startAdornment, ...otherInputProps } = InputProps;
          return (
          <TextField 
            placeholder={placeholder}
            label=""
            InputProps={{
              startAdornment : (
                <InputAdornment position="start">
                  {isLoading ? <Spiner /> : <SearchIcon />}
                </InputAdornment>
              ),
              ...otherInputProps
              }}
            {...otherParams} 
          />
      )}}
        {...props}
      />

      {/* <TextField
        {...props}
        id="outlined-basic"
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        InputProps={{
        startAdornment : (
          <InputAdornment position="start">
            {isLoading ? <Spiner /> : <SearchIcon />}
          </InputAdornment>
        )
        }}
      /> */}
      </>
  );
}