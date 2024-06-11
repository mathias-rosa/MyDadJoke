import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SearchResultRoute from "./routes/searchResultsRoute";
import Index from "./pages/Index";
import Box from "@mui/material/Box";

document.title = "My Dad Joke";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Box>404 Not Found</Box>,
    children: [
      { index: true, element: <Index /> },
      {
        path: "search",
        element: <SearchResultRoute />,
      },
    ],
  },
]);


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  </React.StrictMode>
);
