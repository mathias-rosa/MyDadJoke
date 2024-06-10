import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SearchResultRoute from "./routes/searchResultsRoute";
import Index from "./pages/Index";
import { createTheme, ThemeProvider } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>404 Not Found</div>,
    children: [
      { index: true, element: <Index /> },
      {
        path: "search",
        element: <SearchResultRoute />,
      },
    ],
  },
]);

const themeColors = {
  primary: {
    main: "#ffc300",
  },
  secondary: {
    main: "#000000",
  },
  surface: {
    main: "#ffffff",
    dark: "#f0f0f0",
  },
};

const theme = createTheme({
  palette: {
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
          gap: "2em",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 0,
          position: "static",
          backgroundColor: themeColors.surface.main,
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

  },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
