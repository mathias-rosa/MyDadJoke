import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import { useMemo } from "react";


const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  overflow-y: auto;
`;


const themeColors = {
  primary: {
    main: "#ffc300",
  },
  secondary: {
    main: "#000000",
  },
  surface: {
    main: "#ffffff",
    dark: "#242424",
  },
};


export default function Root() { 
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: themeColors.primary,
          secondary: themeColors.secondary,
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                padding: "1.25em",
                borderRadius: 10,
              },
            },
            defaultProps: {
              variant: "outlined",
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                display: "flex",
                flexDirection: "row",
                padding: "1.5em",
                gap: "2rem",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 0,
                position: "static",
                backgroundColor: prefersDarkMode ? themeColors.surface.dark : themeColors.surface.main,
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                borderRadius: 10,
              },
            },
          },
          MuiStack: {
            styleOverrides: {
              root: {
                gap: "1rem",
              },
            },
          },
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>

    <StyledRoot>
        <Outlet />
    </StyledRoot>
    </ThemeProvider>

  );
}
