import { Outlet } from "react-router-dom";
import Stack from "@mui/material/Stack";

export default function Root() {

  return (

    <Stack
      sx={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <Outlet />
    </Stack>

  );
}
