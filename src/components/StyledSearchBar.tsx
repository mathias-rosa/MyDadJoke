import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Spiner from './Spiner';

type StyledSearchBarProps = {
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  placeholder?: string;
} & React.ComponentProps<typeof TextField>;

export default function StyledSearchBar({isLoading=false, placeholder="Search", ...rest} : StyledSearchBarProps) {
  return (
      <TextField
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
      />
  );
}