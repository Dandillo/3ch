import React from "react";
import { Box } from "@mui/system";
const MainContainer = function (props) {

  return (
    
    <Box sx={{maxWidth:'940px'}}>
        {props.children}
  
      </Box>
    
  );
};

export default MainContainer;
