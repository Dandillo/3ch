import React, { useState, useEffect } from "react";
import ThreadCard from './ThreadCard'
import { motion } from "framer-motion";

import postService from "../services/post.service";
const Posts = (props) => {
    const [threadPosts, setThreadPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
      postService
        .getPostsByTag(props.thread.shortName, 0, 100)
          .then((posts) => {
              
              setThreadPosts(posts);
              setLoading(false);
          });
           

        props.setThreadName(props.thread);
    },[props]);
    
    return (
      <>
        {!loading ? (
          <>
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
}

export default Posts