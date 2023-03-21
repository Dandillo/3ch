import React from "react";
import { Outlet } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Container  from "@mui/material/Container";

const Layout = (props) => {
  return (
    <Container maxWidth="sm">
        <Outlet />
    </Container>
  );
};
export { Layout };
