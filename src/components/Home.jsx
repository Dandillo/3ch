import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainContainer from "./utils/MainContainer";
import {
  Grid,
  Typography,
  Box,
  Stack,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Logo from "../assets/svg/3ch@1x.svg";
import tagService from "../services/tags.service";
const Home = function () {
  const [tags, setTags] = useState([]);
  const [isHover, setIsHover] = useState(false);
  const boxStyle = {
    textDecoration: "none",
    backgroundColor: isHover ? "lightblue" : "rgb(0, 191, 255)",
  };
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  useEffect(() => {
    tagService.getTags(0, 100).then((tags) => setTags(tags));
  }, []);
  return (
    <>
      <header className="header-home">
        <MainContainer>
          <img src={Logo} alt="" />
          <Typography
            align="center"
            variant="body1"
            gutterBottom
            sx={{ color: "#a3a3a3" }}
          >
            Оставайся дома. Снова.
          </Typography>
        </MainContainer>
      </header>
      <Stack spacing={3}>
        <MainContainer>
          <Typography
            align="center"
            variant="body1"
            gutterBottom
            sx={{ color: "#cccccc" }}
          >
            <strong>Три.ч</strong> - это система форумов, где можно общаться
            быстро и свободно, где любая точка зрения имеет право на жизнь.
            Здесь нет регистрации и подписываться не нужно, хотя это не
            избавляет вас от необходимости соблюдать правила. Все форумы (кроме
            /Б/реда), а их список находится снизу, имеют собственную чётко
            ограниченную тематику. Словом, всё, что не запрещено правилами
            отдельно взятого форума и относится к его тематике, на этом форуме
            разрешено.
          </Typography>
        </MainContainer>
        <MainContainer>
          <img className="w-100" src="./assets/img/anon.jpg" alt="" />
        </MainContainer>
        <MainContainer>
          <Typography
            align="center"
            paragraph
            gutterBottom
            sx={{ color: "#FFFF" }}
          >
            Тематика
          </Typography>
          <Grid container>
            {tags.map((tag, pos) => (
              <Grid item key={pos} className="w-100">
                <Link
                  to={'/threads'+tag.shortName}
                  style={({ textDecoration: "none" }, boxStyle)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Typography paragraph gutterBottom sx={{ color: "#ffcb29" }}>
                    {tag.name}
                  </Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
        </MainContainer>
      </Stack>
    </>
  );
};

export default Home;
