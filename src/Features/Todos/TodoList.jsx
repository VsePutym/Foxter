import {useDispatch, useSelector} from "react-redux";
import {deleteTodo, todosSelector, toggleTodo, toggleValue} from "./todosSlice";
import {
    Box,
    Button,
    Checkbox,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {ToastContainer, Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useLoadTodos} from "./useLoadTodos";
import CircularProgress from '@mui/material/CircularProgress';
import React from "react";





const TodoList = () => {

    useLoadTodos();

    const todos = useSelector(todosSelector.selectAll);
    const {error, status} = useSelector(state => state.todos);
    const dispatch = useDispatch()



    const handleUpdateTodo = (todo) => {
    new Promise((resolve) => {
            dispatch(toggleTodo(todo.id)).then((resolve) => {
                dispatch(toggleValue({...todo}))
            })
        })
    }


    return (
        <Box sx={{mb:'100px'}}>
            <ToastContainer theme='dark'  transition={Zoom} />
            {error && <Typography variant='h2'>error</Typography>}
            {status === 'idle'
                ? <List sx={{mt: 5, width: '100%', minWidth: 360, bgcolor: 'background.paper', borderRadius: 5}}>
                    <Typography variant='h5'>Todos: </Typography>
                    {todos.map((todo) => (
                        <ListItem key={todo.id}>
                            <ListItemIcon>
                                <FormGroup>
                                    <FormControlLabel control={
                                        <Checkbox checked={todo.completed}
                                                  onChange={() => handleUpdateTodo(todo)}
                                                  icon={<BookmarkBorderIcon/>}
                                                  checkedIcon={<BookmarkIcon/>}  label="Label"/> } />
                                </FormGroup>
                            </ListItemIcon>
                            <ListItemText>{todo.name.length > 13 ? todo.name.slice(0, 15) + '...' : todo.name}</ListItemText>
                            <ListItemText>{todo.value}</ListItemText>
                            <Button sx={{ml: 4}} variant="contained" endIcon={<DeleteIcon/>}
                                    onClick={() => dispatch(deleteTodo(todo.id))}> <Typography>Remove</Typography></Button>
                        </ListItem>
                    ))}

                </List> :

            <Box sx={{ display: 'flex', justifyContent: 'center', mt:7}}>
                <CircularProgress />
                <Typography sx={{mt:0.5, ml:2}} variant="h6" gutterBottom component="div">Loading data...</Typography>
            </Box>
            }
        </Box>
    );
};

export default TodoList;