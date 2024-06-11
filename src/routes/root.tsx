import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

export default function Root() {

  return (

    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >
      <Outlet />
    </Box>

  );
}
