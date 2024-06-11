import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Spiner from './Spiner';
import { Autocomplete } from '@mui/material';

type LightweightAutoCompleteProps = Omit<React.ComponentProps<typeof Autocomplete>, 'options' | 'renderInput'>;

type StyledSearchBarProps = {
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  placeholder?: string;
  options?: string[];
} & LightweightAutoCompleteProps;

export default function StyledSearchBar({isLoading=false, placeholder="Search", ...rest} : StyledSearchBarProps) {
  return (
    <>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={[]}
        fullWidth
        renderInput={(params) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { InputProps, ...otherParams } = params;
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
              }}
            {...otherParams} 
          />
      )}}
        {...rest}
      />

      {/* <TextField
        {...rest}
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