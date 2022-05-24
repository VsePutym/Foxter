import React from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {useDispatch} from "react-redux";
import {createCategory} from "../Features/Category/categorySlice";

const CreateCategory = () => {
    const dispatch = useDispatch();

    const handleCreateCategory = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        let limit;
        if (e.target.limit.value === '') {
            limit = 0;
        } else {
            limit = Number(e.target.limit.value)
        }
        const dataCategory = {id: title, title: title, limit: limit, arrSpending : [], limitBalances: 0, lineProgress: 0}

        if(title){
            dispatch(createCategory(dataCategory))
        }
    }


    return (
        <Box component='form' onSubmit={handleCreateCategory}>
            <Typography>Test Create category</Typography>
            <TextField fullWidth name='title'  sx={{mt:3, mb:3}} id="standard-basic" label="New Category" variant="standard" />
            <Box sx={{display: 'flex'}}>
                <TextField id="outlined-number" name='limit' label="Price limit" type="number"/>
                <Button sx={{ml:5}} type="submit"  variant="contained" endIcon={<SendIcon />} >
                    <Typography>Send</Typography>
                </Button>
            </Box>
        </Box>
    );
};

export default CreateCategory;