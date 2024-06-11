import { AppBar, useTheme } from '@mui/material';
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
            style={{
              width: "100%",
              maxWidth: "96px",
              margin: "0 auto",
            }}
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