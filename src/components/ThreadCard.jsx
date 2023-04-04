import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Divider,
} from "@mui/material/";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
const ThreadCard = ({ title, content }) => {
  return (
    <Card sx={{ borderRadius: "10px", minWidth:"100%"}}>
      <CardHeader title={<Typography variant="h3">{title}</Typography>} />
      <Divider />
      <CardContent sx={{ textAlign: "justify" }}>
        <Typography variant="body1">{content}</Typography>
      </CardContent>
      <CardActions sx={{justifyContent:"flex-end"}}>
        <IconButton>
          <ArrowForwardIosRoundedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ThreadCard;