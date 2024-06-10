import StyledSearchBar from "../components/StyledSearchBar";
import React, { useState } from "react";
import { Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function Index() {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const theme = useTheme();

    function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
      setSearch(e.target.value);
      }
      
      function handleSubmit() {
        navigate(`/search?term=${search}`);
      console.log(search);
      }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          padding: "1em",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          marginBottom: 100,
        }}
      >
        <img style={{
            width: "100%",
            maxWidth: "200px",
            margin: "0 auto",
          }} src={`/my_dad_joke${theme.palette.mode === 'dark' ? '_dark' : ''}.png`} alt="Joke" />
        <div
        style={{
          display: "flex",
          padding: "1em",
          gap: "1em",
          width: "100%",
          maxWidth: "1000px",
        }}
      >

          <StyledSearchBar
            onChange={handleSearchInput}
            onKeyPress={
                (e) => {
                    if (e.key === "Enter") {
                    handleSubmit();
                    }
                }
            }
            placeholder="Search for a joke"
          />
          <Button type="submit" form="search-form" variant="outlined" onClick={handleSubmit} sx={{
            textWrap: "nowrap",
          }}>
            { search ? "Search" : "See all jokes"}
          </Button>
      </div>
      </div>
    );
}