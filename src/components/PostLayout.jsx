import React, { useState, useEffect } from "react";
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
} from "@mui/material/";
import { Link, useParams, useLocation } from "react-router-dom";
import * as signalR from "@microsoft/signalr";
import { motion } from "framer-motion";
import commentsService from "../services/comment.service";

import postService from "../services/post.service";
import tagService from "../services/tags.service";
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
const hubConnection = new signalR.HubConnectionBuilder()
  .configureLogging(signalR.LogLevel.Debug)
  .withUrl("http://176.124.193.22/CommentHub", {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
  })
  .build();
hubConnection.start().then((a) => {});

const PostLayout = (props) => {
  const { id } = useParams();
  const [postDate, setPostDate] = useState("");
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const location = useLocation();
  const [currentTag, setCurrentTag] = useState(props.threadName);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    hubConnection.invoke(
      "SendComment",
      Number(id),
      data.get("content"),
      null,
      null
    );
    commentsService.getCommentsByPostID(id, 0, 100).then((comments) => {
      setComments(comments);
    });
    hubConnection.on("RecieveComment", (comment) => {
      let commentsCopy = comments;
      commentsCopy.push(comment);
      setComments(commentsCopy);
      setLoading(false);
    });
    handleOpenForm();
  };
  const handleOpenForm = () => {
    setOpenForm(!openForm);
  };
  useEffect(() => {
    hubConnection.invoke("AddToGroup", id);

    hubConnection.on("RecieveComment", (comment) => {
      let commentsCopy = comments;
      comment.commentDate = formatDate(comment.commentDate);
      commentsCopy.push(comment);
      setComments(commentsCopy);
    });
    const localTag = JSON.parse(localStorage.getItem("CurrentThreadName"));
    
    setLoading(true);
    postService.getPostById(id).then((post) => {
      setPost(post);
      props.setThread({
        shortName: post.tagShortName,
        name: post.tagName,
      });
    });
    
    commentsService.getCommentsByPostID(id, 0, 100).then((comments) => {
      setComments(comments);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    hubConnection.invoke("AddToGroup", id);
    commentsService.getCommentsByPostID(id, 0, 100).then((comments) => {
      setComments(comments);
      setLoading(false);
    });
    hubConnection.on("RecieveComment", (comment) => {
      let commentsCopy = comments;
      commentsCopy.push(comment);
      setComments(commentsCopy);
    });
  }, [id]);
  const RenderCard = () => {
    return (
      <Box className="post-layout-container" sx={{ width: "100%" }}>
        <a href="#add-form">
          <Button onClick={handleOpenForm} variant="contained">
            Ответить в тред
          </Button>
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
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
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
              </motion.div>
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
            width={"70%"}
            id="new_thread"
          >
            <Grid id="add-form" container spacing={2}>
              <Grid item xs={12}>
                <Typography xs={15} variant="h6">
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
              </Grid>
            </Grid>
            <Button
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
