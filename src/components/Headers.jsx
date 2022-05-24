import React from 'react';
import logo from '../img/Logo.png'
import {AppBar, Container, IconButton, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';
import {Bar} from "./Bar";



const InfoImage = styled.div`
  img {
    width: 60px;
    height: 60px;
    margin: 10px;
  }
`;

const Headers = ({openMenu}) => {
    return (
        // <AppBar>
         <Bar position={"static"}>
            <Container  maxWidth="xl" sx={{alignItems: 'center', display: "flex", justifyContent:'center', }}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={openMenu}
                >
                    <MenuIcon />
                </IconButton>
                <InfoImage>
                    <img src={logo} alt=""/>
                </InfoImage>
                <Typography variant='h5' component="span">
                    Foxter
                </Typography>
            </Container>
         </Bar>
        // </AppBar>
    );
};

export default Headers;