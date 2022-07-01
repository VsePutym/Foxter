import React from 'react';
import {Box} from "@mui/material";
import InputTodos from "../Features/Todos/InputTodos";
import TodoList from "../Features/Todos/TodoList";
import Category from "../Features/Category/Category";



const Home = () => {

    return (
        <Box>
            <TodoList />
            <Category />
        </Box>
    );
};

export default Home;