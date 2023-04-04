import React from "react";
import { Outlet } from "react-router-dom";
import { Divider, Grid, Container, Typography } from "@mui/material";
import MainContainer from "./utils/MainContainer";
const Layout = (props) => {
  return (
    <div className="App">
      <Container
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Outlet />
      </Container>
      <Divider />

      <footer className="footer">
        <Grid
          container
          sx={{ justifyContent: "space-between", alignItems: "flex-end" }}
          columnSpacing={6}
        >
          <Grid item xs={3}>
            <Typography
              align="center"
              variant="body1"
              gutterBottom
              sx={{ color: "#ffcb29" }}
            >
              3ch.
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography
              align="center"
              variant="body1"
              gutterBottom
              sx={{ color: "#cccccc" }}
            >
              &copy; {new Date().getUTCFullYear()} WEBIS
            </Typography>
          </Grid>
        </Grid>
      </footer>
    </div>
  );
};
export { Layout };
