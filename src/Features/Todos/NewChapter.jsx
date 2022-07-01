import React from 'react';
import {Box, Button,TextField,} from "@mui/material";
import {useDispatch} from "react-redux";
import {createTodo} from "./todosSlice";
import SendIcon from "@mui/icons-material/Send";

const NewChapter = () => {
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const id = new Date().toISOString()
        const nameChapter = event.target.title.value;
        const dataChapterTodo = {label: nameChapter, id: id, arrTodos : []}
        dispatch(createTodo(dataChapterTodo));
        event.target.title.value = '';
    }

    return (
        <Box component='form' onSubmit={handleSubmit} sx={{ mb: 2 }}>
                <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                    <TextField   name='title' id="standard-basic" label="Создать новую задачу" variant="outlined" />
                    <Button sx={{ml:3, pr:2, pl:2}} variant="contained" type='submit' size="large"  endIcon={<SendIcon />}>
                        Создать
                    </Button>
                </Box>
        </Box>
    );
};

export default NewChapter;