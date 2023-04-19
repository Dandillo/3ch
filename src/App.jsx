import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";

import { Layout } from "./components/Layout";
import { ThreadLayout } from "./components/ThreadLayout";
import tagService from "./services/tags.service";

import PostLayout from "./components/PostLayout";
import Posts from "./components/Posts";
require("./index.css");
function App() {
  const [tags, setTags] = useState([]);
  const [thread, setThread] = useState({
    name: "thread",
    shortName: "thread",
  });

 
  let location = useLocation();
  useEffect(() => {
    tagService.getTags(0, 100).then((tags) => setTags(tags));
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route
          path="/threads"
          element={
            <ThreadLayout
              thread={`/${
                thread.shortName.charAt(0).toUpperCase() +
                thread.shortName.slice(1)
              }/ - ${thread.name}`}
            />
          }
        >
          {tags.map((tag, pos) => (
            <Route key={pos}>
              <Route
                key={pos}
                path={`${tag.shortName}`}
                element={<Posts thread={tag} setThreadName={setThread} />}
              />

              <Route
                path={`${tag.shortName}/post/:id`}
                element={
                  <PostLayout setThread={setThread} />
                }
              />
            </Route>
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
