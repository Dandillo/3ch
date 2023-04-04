import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";

import { Layout } from "./components/Layout";
import { ThreadLayout } from "./components/ThreadLayout";
import tagService from "./services/tags.service";

require("./index.css");
function App() {
  const [tags, setTags] = useState([]);

  let location = useLocation();
  useEffect(() => {
    tagService.getTags(0, 100).then((tags) => setTags(tags));
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
        </Route>
        {tags.map((tag,pos) => (
          <Route key={pos} path={tag.shortName} element={<ThreadLayout thread={tag} />} />
        ))}
      </Routes>
    </>
  );
}

export default App;
