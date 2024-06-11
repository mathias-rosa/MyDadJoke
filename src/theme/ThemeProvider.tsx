import { PropsWithChildren, useMemo, } from 'react'
import { createTheme, ThemeProvider as MuiThemeProvider, useMediaQuery } from "@mui/material";
import themeColors from "./palette";

export default function ThemeProvider({ children }: PropsWithChildren) {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    console.log(prefersDarkMode);

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
                    MuiOutlinedInput: {
                        styleOverrides: {
                            root: {
                                borderRadius: 10,
                                borderColor: "blue",
                            },
                        },
                    },
                    MuiButton: {
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
        <MuiThemeProvider theme={theme}>
            {children}
        </MuiThemeProvider>
    )

}