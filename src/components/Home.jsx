import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import MainContainer from './utils/MainContainer'
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import Logo from '../assets/svg/3ch@1x.svg';
const MainScreen = function () {

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
      </Stack>
    </>
  );
};

export default MainScreen;
