import React from 'react';
import styled from "styled-components";
import Fox from "../img/Logo.png";
import {Typography} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const ContainerLoading = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  background-color: #ffffff;
  z-index: 1000;
  text-align: center;
  display: flex;
  justify-content: space-around;

  img {
    max-width: 30%;
    position: absolute;
    z-index: 11000;
  }

  div {   
    bottom: 33%;
    position: absolute;
    z-index: 12000;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
const Loading = () => {
    return (
        <ContainerLoading>
            <img src={Fox} alt=""/>
            <div>
                <CircularProgress color="secondary"/>
                <Typography variant='h5' sx={{ ml:4, mr:5}}>Foxter он такой один!</Typography>
            </div>
        </ContainerLoading>
    )
}

export default Loading;