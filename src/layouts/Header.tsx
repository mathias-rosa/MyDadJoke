import { useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import StyledSearchBar from '../components/StyledSearchBar';
import {  Link, useNavigate } from "react-router-dom";

export function Header({ isLoading , search, setSearch } : { isLoading: boolean, search : string, setSearch: (text: string) => void } ) {

    const navigate = useNavigate();
    const theme = useTheme();

    function handleSearch(text : string) {
        setSearch(text);
        navigate(`/search?term=${encodeURIComponent(text)}`);
    }
    return (
    <AppBar>
        <Link to="/">
          <img
            className="header-logo"
            src={`/my_dad_joke${theme.palette.mode === 'dark' ? '_dark' : ''}.png`}
            alt="Joke"
          />
        </Link>
            <StyledSearchBar
            onInputChange={(_, value) => handleSearch(value)}
            isLoading={isLoading}
            placeholder="Search for a joke"
            value={search}
            />
        </AppBar>
    );
}