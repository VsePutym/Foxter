import React from 'react';
import {Paper, Typography} from "@mui/material";

const HandChapter = (props) => {
    return (
            <Paper elevation={3} sx={{
                display: 'flex',
                p: 2,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                textAlign: 'center',
                backgroundColor: '#0097a7',
                color: 'white'
            }}>
                {props.img}
                <Typography sx={{ml: 1}} variant='h5'>{props.title}</Typography>
            </Paper>
    );
};

export default HandChapter;