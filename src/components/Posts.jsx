import React, { useState, useEffect } from "react";
import ThreadCard from "./ThreadCard";
import { Box, TextField, Button, Grid } from "@mui/material/";
import { motion, useForceUpdate } from "framer-motion";

import postService from "../services/post.service";
import tagService from "../services/tags.service";
const Posts = (props) => {
  const [threadPosts, setThreadPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const [tagId, setTagId] = useState("");

  useEffect(() => {
    localStorage.setItem("CurrentThreadName", JSON.stringify(props.thread));

    props.setThreadName(props.thread);
    setLoading(true);
    console.log(props.thread.shortName);
    postService.getPostsByTag(props.thread.shortName, 0, 100).then((posts) => {
      setThreadPosts(posts);
    });
    tagService.getTagByShortName(props.thread.shortName).then((tag) => {
      setTagId(tag[0].id);
      setLoading(false);
    });
  }, []);
  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);

    fetch("http://176.124.193.22/api/Post/", {
      body: data,
      method: "POST",
      headers: {
        Accept: "text/plain",
      },
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error.response));
  };
  const handleOpenForm = (event) => {
    setOpenForm(!openForm);
  };
  return (
    <>
      {!loading ? (
        <>
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
              id="new_thread"
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <input
                    type="text"
                    value={tagId}
                    hidden
                    name="tagId"
                    id="tagId"
                  />
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
          {threadPosts.map((post, pos) => (
            <ThreadCard
              key={pos}
              title={post.heading}
              content={post.content}
              date={post.date}
              id={post.id}
            />
          ))}
        </>
      ) : (
        <div />
      )}
    </>
  );
};

export default Posts;
