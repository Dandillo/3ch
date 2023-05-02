import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Divider,
  Box,
  CircularProgress,
  Stack,
  TextField,
  Button,
  Grid,
  AppBar,
  Toolbar,
  Dialog,
  Slide,
} from "@mui/material/";
import LoadingButton from '@mui/lab/LoadingButton';

import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { Link, useParams, useLocation } from "react-router-dom";
import * as signalR from "@microsoft/signalr";
import { motion } from "framer-motion";
import commentsService from "../services/comment.service";

import postService from "../services/post.service";
import tagService from "../services/tags.service";
import mediaService from "../services/media.service";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const formatDate = (dateUTC) => {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "Asia/Yekaterinburg",
  };

  let date = new Date(dateUTC);
  return date.toLocaleDateString("ru-RU", options);
};
let connected = false;
const hubConnection = new signalR.HubConnectionBuilder()
  .configureLogging(signalR.LogLevel.Debug)
  .withUrl("http://176.124.193.22/CommentHub", {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
  })
  .build();
hubConnection.start().then((connected = true));
const useMountEffect = (fun) => useEffect(fun, []);

const PostLayout = (props) => {
  const { id } = useParams();
  const [postDate, setPostDate] = useState("");
  const [post, setPost] = useState([]);
  const lastRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [fileLoading, setFileLoading] = useState(false);
  const [mediaID, setMediaID] = useState(0);
  const location = useLocation();
  const [currentTag, setCurrentTag] = useState(props.threadName);
  hubConnection.invoke("AddToGroup", id);
  const executeScroll = () =>
    lastRef.current.scrollIntoView({ behavior: "smooth" });
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    let formFile = new FormData();
    formFile.append('file',file);
    setFileLoading(true);
    mediaService.SendImg(formFile).then((response) => {
      setFileLoading(false);
      setMediaID(response.mediaID)
    });
  };
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    if (connected)
      hubConnection.invoke(
        "SendComment",
        Number(id),
        data.get("content"),
        mediaID !== 0 ? mediaID : null,
        null
      );
    setOpenForm(!openForm);
  };

  useEffect(() => {
    const localTag = JSON.parse(localStorage.getItem("CurrentThreadName"));

    setLoading(true);
    postService.getPostById(id).then((post) => {
      setPost(post);
      props.setThread({
        shortName: post.tagShortName,
        name: post.tagName,
      });
    });

    hubConnection.on("RecieveComment", (comment) => {
      let copy = comments;
      copy.push(comment);
      setComments(copy);
    });
    commentsService.getCommentsByPostID(id, 0, 100).then((comments) => {
      setComments(comments);
      setLoading(false);
    });
  }, [openForm]);
  useEffect(() => {
    executeScroll();
  }, [comments]);
  const RenderCard = () => {
    const url = "http://176.124.193.22";
    return (
      <Box className="post-layout-container" sx={{ width: "100%" }}>
        <a href="#add-form">
          <Button variant="contained">Ответить в тред</Button>
        </a>

        <Stack spacing={2} sx={{ minWidth: "100%" }}>
          <Card sx={{ borderRadius: "10px", minWidth: "100%" }}>
            <CardHeader
              title={
                <Box>
                  <Typography variant="h5">
                    <span className="postLayout_heading"> {post.heading}</span>

                    <Typography
                      variant="body1"
                      component={"span"}
                      sx={{ paddingLeft: "10px" }}
                    >
                      Аноним {formatDate(post.date)} №{id}
                    </Typography>
                  </Typography>
                </Box>
              }
            />
            <Divider />
            <CardContent sx={{ textAlign: "justify" }}>
              <Typography
                variant="body1"
                sx={{
                  wordBreak: "break-all",
                }}
              >
                {post.content}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <IconButton></IconButton>
            </CardActions>
          </Card>
          {comments.length > 0 ? (
            comments.map((comment, i) => (
              <Card
                sx={{
                  borderRadius: "10px",
                  maxWidth: "80%",
                }}
                key={comment.id}
              >
                <CardHeader
                  title={
                    <Box>
                      <Typography variant="h5" className="post-title">
                        <Box>
                          <Typography
                            variant="body1"
                            component={"span"}
                            sx={{ paddingLeft: "10px" }}
                          >
                            Аноним {formatDate(comment.commentDate)} №
                            {comment.id}
                          </Typography>
                          <Divider />
                          <CardContent sx={{ textAlign: "justify" }}>
                            {comment.img ? (
                              <>
                                <Box
                                  sx={{
                                    background: `url(${url}${comment.img}) center center / contain no-repeat`,
                                    cursor: "pointer",
                                  }}
                                  width={"300px"}
                                  height={"500px"}
                                  alt="commentLogo"
                                  onClick={() => {
                                    setOpen(!open);
                                  }}
                                />
                                <Dialog
                                  fullScreen
                                  open={open}
                                  onClose={handleClose}
                                  TransitionComponent={Transition}
                                >
                                  <AppBar sx={{ position: "relative" }}>
                                    <Toolbar>
                                      <IconButton
                                        edge="start"
                                        color="inherit"
                                        onClick={handleClose}
                                        aria-label="close"
                                      >
                                        <CloseIcon />
                                      </IconButton>
                                    </Toolbar>
                                  </AppBar>
                                  <Box
                                    sx={{
                                      background: `url(${url}${comment.img}) center center / contain no-repeat`,
                                    }}
                                    width={"100%"}
                                    height={"100%"}
                                    alt="commentLogo"
                                    onClick={() => {
                                      setOpen(!open);
                                    }}
                                  />
                                </Dialog>
                              </>
                            ) : (
                              <></>
                            )}

                            <Typography variant="body1">
                              {comment.comment}
                            </Typography>
                          </CardContent>
                        </Box>
                      </Typography>
                    </Box>
                  }
                />

                <Divider />
                <CardContent sx={{ textAlign: "justify" }}>
                  <Typography variant="body1">{comment.content}</Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card
              sx={{
                borderRadius: "10px",
                width: "30%",
                height: "50px",
                display: "flex",
                placeItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body3">Еще никто не ответил</Typography>
            </Card>
          )}

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
            width={"80%"}
            id="new_thread"
          >
            <Grid id="add-form" container spacing={2}>
              <Grid item xs={12}>
                <Typography xs={12} variant="h6">
                  Ответить в тред
                </Typography>
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  id="content"
                  label="Комментарий"
                  name="content"
                />
                <LoadingButton
                  variant="contained"
                  component="label"
                  sx={{ marginTop: "20px" }}
                  loading={fileLoading}
                >
                  Загрузить
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    id="img"
                    onChange={handleFileChange}
                  />
                </LoadingButton>
              </Grid>
            </Grid>
            <Button
              ref={lastRef}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ответить в тред
            </Button>
          </Box>
        </Stack>
      </Box>
    );
  };
  return (
    <>
      {!loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
          }}
          style={{ width: "100%" }}
        >
          <RenderCard />
        </motion.div>
      ) : (
        <div />
      )}
    </>
  );
};

export default PostLayout;
