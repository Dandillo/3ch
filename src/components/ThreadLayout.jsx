import React from "react";
import { Outlet } from "react-router-dom";
import {
  Typography,
  Box,
  TextField,
  Stack,
  Button,
  Container,
  Grid,
} from "@mui/material/";
import { width } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const ThreadLayout = (props) => {
   const handleSubmit = (event) => {
     event.preventDefault();
     const data = new FormData(event.currentTarget);
     console.log({
       email: data.get("email"),
       password: data.get("password"),
     });
   };
  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ alignItems: "center" }}>
        <Stack pt={5} justifyItems="center" alignItems="center" spacing={10}>
          <Typography
            align="center"
            variant="body1"
            gutterBottom
            sx={{ color: "#cccccc" }}
          >
            Название треда
          </Typography>
          <Button variant="contained">Создать тред</Button>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Имя"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="subject"
                  label="Тема"
                  name="subject"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={10}
                  fullWidth
                  id="commentary"
                  label="Комментарий"
                  name="commentary"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Создать тред
            </Button>
          </Box>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};
export { ThreadLayout };
