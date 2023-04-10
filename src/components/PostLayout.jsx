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
} from "@mui/material/";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import commentsService from "../services/comment.service";

import postService from "../services/post.service";
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
const PostLayout = (props) => {
  const { id } = useParams();
  const [postDate, setPostDate] = useState("");
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const threadName = props.threadName;
  useEffect(() => {
    console.log(props.threadName);
    
      // props.setThreadName(threadName);
    setLoading(true);
    postService.getPostById(id).then((post) => {
      setPost(post);
    });
    commentsService.getCommentsByPostID(id, 0, 100).then((comments) => {
      setComments(comments);
      setLoading(false);
    });
    setPostDate(formatDate(post.date));
   

  }, [post.date, id]);
  const RenderCard = () => {
    return (
      <Stack spacing={2}>
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
                    Аноним {postDate} №{id}
                  </Typography>
                </Typography>
              </Box>
            }
          />
          <Divider />
          <CardContent sx={{ textAlign: "justify" }}>
            <Typography variant="body1">{post.content}</Typography>
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
                minWidth: "100%",
              }}
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
                          Аноним {comment.date} №{comment.id}
                        </Typography>
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
      </Stack>
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
