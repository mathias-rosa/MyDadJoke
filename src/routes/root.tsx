import styled from "styled-components";
import { Outlet } from "react-router-dom";

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  overflow-y: auto;
`;

export default function Root() { 
  return (
    <StyledRoot>
        <Outlet />
    </StyledRoot>
  );
}
