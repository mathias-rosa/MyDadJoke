import StyledSearchBar from "../components/StyledSearchBar";
import { useState } from "react";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1em;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-bottom: 100px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  padding: 1em;
  gap: 1rem;
  width: 100%;
  max-width: 1000px;
`;

export default function Index() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const theme = useTheme();

  function handleSearchInput(text: string) {
    setSearch(text);
  }

  function handleSubmit() {
    navigate(`/search?term=${search}`);
  }

  return (
    <Container>
      <img
        className="App-logo"
        src={`/my_dad_joke${theme.palette.mode === "dark" ? "_dark" : ""}.png`}
        alt="Joke"
      />
      <SearchBarContainer>
        <StyledSearchBar
          onInputChange={(_, value) => handleSearchInput(value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          placeholder="Search for a joke"
        />
        <Button
          type="submit"
          form="search-form"
          variant="outlined"
          onClick={handleSubmit}
          sx={{
            textWrap: "nowrap",
          }}
        >
          {search ? "Search" : "See all jokes"}
        </Button>
      </SearchBarContainer>
    </Container>
  );
}
