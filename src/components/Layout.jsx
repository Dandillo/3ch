import React from "react";
import { Outlet } from "react-router-dom";
import Container  from "@mui/material/Container";

const Layout = (props) => {
  return (
    <Container sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <Outlet />
    </Container>
  );
};
export { Layout };
