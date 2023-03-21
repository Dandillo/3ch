import React, { Component } from "react";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const MainScreen = function () {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
  return (
    <>
            <Grid  spacing={2}>
    <Grid xs={6} md={8}>
        <Item>xs=6 md=8</Item>
    </Grid>
    <Grid xs={6} md={4}>
        <Item>xs=6 md=4</Item>
    </Grid>
    <Grid xs={6} md={4}>
        <Item>xs=6 md=4</Item>
    </Grid>
    <Grid xs={6} md={8}>
        <Item>xs=6 md=8</Item>
    </Grid>
    </Grid>
    </>
  );
};

export default MainScreen;
