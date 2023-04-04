import React, { useEffect, useState } from "react";
import { useLocation, useNavigation, useParams, Link } from "react-router-dom";
import {
  Typography,
  Box,
  TextField,
  Stack,
  Button,
  Container,
  Grid,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  CssBaseline,
  AppBar,
  IconButton,
  Skeleton,
} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import { width } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signalR } from "@microsoft/signalr";
import ThreadCard from "./ThreadCard";
import tagService from "../services/tags.service";
import postService from "../services/post.service";
import Logo from "../assets/svg/3ch@1x.svg";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#15202b",
      default: "#15202b",
    },
    primary: {
      main: "#ffcb29",
    },
  },
});
const drawerWidth = 240;
const ThreadLayout = (props) => {
  const { threadName } = useParams();
  const [tags, setTags] = useState([]);
  const location = useLocation();
  const [thread, setThread] = useState(props.thread);
  const [Posts, SetPosts] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    fetch("http://176.124.193.22/api/Post/CreatePost", {
      body: data,
      method: "POST",
      headers: {
        Accept: "text/plain",
      },
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error.response));
  };
  useEffect(() => {
    setLoading(true);
    tagService.getTags(0, 100).then((tags) => setTags(tags));
    setThread(props.thread);
    postService
      .getPostsByTag(props.thread.shortName, 0, 100)
      .then((posts) => SetPosts(posts));
    setLoading(false);
  }, [props.thread, thread]);
  //  useEffect(() => {

  //  }, []);
  const handleOpenForm = (event) => {
    setOpenForm(!openForm);
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <Box sx={{ textAlign: "center" }}>
        <Link to="/">
          <img src={Logo} alt="" style={{ width: "150px", height: "57px" }} />
        </Link>
      </Box>
      <Divider />
      <List>
        {tags.map((tag, index) => (
          <Link
            key={index}
            to={tag.shortName}
            style={{ textDecoration: "none", color: "#FFFF" }}
          >
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemText
                  component={Link}
                  primary={`${tag.shortName} - ${tag.name}`}
                />
              </ListItemButton>{" "}
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              align="center"
              variant="h4"
              gutterBottom
              sx={{ color: "#cccccc" }}
            >
              {thread.shortName} - {thread.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="tags"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Container sx={{ alignItems: "center", mt: "50px" }}>
          <Stack pt={5} justifyItems="center" alignItems="center" spacing={5}>
            <Button onClick={handleOpenForm} variant="contained">
              Создать тред
            </Button>
            {openForm ? (
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
                width={"70%"}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="heading"
                      label="Тема"
                      name="heading"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      multiline
                      rows={10}
                      fullWidth
                      id="content"
                      label="Комментарий"
                      name="content"
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
            ) : (
              <></>
            )}
            {loading ? (
              <>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  sx={{ borderRadius: "10px" }}
                >
                  <div style={{ paddingTop: "20%", mt: "20px" }} />
                </Skeleton>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  sx={{ borderRadius: "10px" }}
                >
                  <div style={{ paddingTop: "20%", mt: "20px" }} />
                </Skeleton>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  sx={{ borderRadius: "10px" }}
                >
                  <div style={{ paddingTop: "20%", mt: "20px" }} />
                </Skeleton>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  sx={{ borderRadius: "10px" }}
                >
                  <div style={{ paddingTop: "20%", mt: "20px" }} />
                </Skeleton>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  sx={{ borderRadius: "10px" }}
                >
                  <div style={{ paddingTop: "20%", mt: "20px" }} />
                </Skeleton>
              </>
            ) : (
              Posts.map((post, pos) => (
                <ThreadCard title={post.heading} content={post.content} />
              ))
            )}
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

// return (
//   <ThemeProvider theme={darkTheme}>
//
//   </ThemeProvider>
// );
export { ThreadLayout };
