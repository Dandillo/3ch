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
  Stack,
} from "@mui/material/";
import { Link } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import commentsService from "../services/comment.service";
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
const ThreadCard = ({ title, content, date, id }) => {
    const url = "http://176.124.193.22";

  const [postDate, setPostDate] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setPostDate(formatDate(date));
    commentsService
      .getCommentsByPostID(id, 0, 1000)
      .then((comments) => setComments(comments));
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
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
                    <Link to={`post/${id}`}>{title}</Link>
                    <Typography
                      variant="body1"
                      component={"span"}
                      sx={{ paddingLeft: "10px" }}
                    >
                      Аноним {postDate} №{id}
                    </Typography>
                  </Box>
                  <Link to={`post/${id}`}>
                    <IconButton>
                      <ArrowForwardIosRoundedIcon />
                    </IconButton>
                  </Link>
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
              {content}
            </Typography>
          </CardContent>
        </Card>

        {comments.length > 0 ? (
          comments
            .slice(comments.length - 3, comments.length)
            .map((comment, i) => (
              <Card
                sx={{
                  borderRadius: "10px",
                  maxWidth: "70%",
                }}
                key={i}
              >
                <CardHeader
                  title={
                    <Box>
                      <Typography variant="h5" className="post-title">
                        <Typography
                          variant="body1"
                          component={"span"}
                          sx={{ paddingLeft: "10px" }}
                        >
                          Аноним №{comment.id}
                        </Typography>
                      </Typography>
                    </Box>
                  }
                />

                <Divider />
                <CardContent sx={{ textAlign: "justify" }}>
                  {comment.img ? <img src={`${url}${comment.img}`} alt="" /> : <></>}
                  <Typography variant="body1">{comment.comment}</Typography>
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
    </Box>
  );
};

export default ThreadCard;
