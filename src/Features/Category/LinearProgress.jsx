import {Box, LinearProgress, Typography} from "@mui/material";
import React from "react";

const LinearProgressWithLabel = (props) => {
    let lineProgress = props.value;
    if (lineProgress > 100) {
        lineProgress = 100
    }
    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{width: '100%', mr: 1}}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{minWidth: 35}}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    `${lineProgress}`
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

export default LinearProgressWithLabel;