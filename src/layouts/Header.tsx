import { AppBar } from '@mui/material';
import StyledSearchBar from '../components/StyledSearchBar';
import {  Link, useNavigate } from "react-router-dom";

export function Header({ isLoading , search, setSearch } : { isLoading: boolean, search : string, setSearch: (text: string) => void } ) {

    const navigate = useNavigate();

    function handleSearch(text : string) {
        setSearch(text);
        navigate(`/search?term=${text}`);
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
            src="/my_dad_joke.png"
            alt="Joke"
          />
        </Link>
            <StyledSearchBar
            onChange={(e) => handleSearch(e.target.value)}
            isLoading={isLoading}
            placeholder="Search for a joke"
            name='term'
            value={search}
            />
        </AppBar>
    );
}