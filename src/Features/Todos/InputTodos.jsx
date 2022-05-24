import React from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {createTodo} from "./todosSlice";
import SendIcon from '@mui/icons-material/Send';


const InputTodos = () => {
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const idTodos = new Date().toISOString()
        const text = event.target.title.value;
        const priceValue = Number(event.target.price.value);

        if (text) {
            const dataTodos = {name: text, id: idTodos, value: priceValue,  completed: false, initialValue: priceValue}
            dispatch(createTodo(dataTodos))
            event.target.reset();
        }
    }

    return (
       <>
           <Box component="form" onSubmit={handleSubmit} >
               <TextField fullWidth name='title'  sx={{mt:3, mb:3}} id="standard-basic" label="New Todo" variant="standard" />
               <Box sx={{display: 'flex'}}>
                   <TextField id="outlined-number" name='price' label="Price" type="number"/>
                   <Button sx={{ml:5}} type="submit"  variant="contained" endIcon={<SendIcon />} >
                       <Typography>Send</Typography>
                   </Button>
               </Box>
           </Box>

       </>
    );
};

export default InputTodos;