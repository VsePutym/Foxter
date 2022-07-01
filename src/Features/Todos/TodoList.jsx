import {useDispatch, useSelector} from "react-redux";
import {deleteMaineTodo, deleteTodo, loadTodos, todosSelector} from "./todosSlice";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    ListItem,
    ListItemText, Paper,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import React, {Component, useEffect} from "react";
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import styled from "styled-components";
import Divider from "@mui/material/Divider";


export const InfoImage80 = styled.div`
  img {
    width: 200px;
    height: 200px;
    margin: 10px;
    align-items: center;
  }
`

class ExpandMoreIcon extends Component {
    render() {
        return null;
    }
}

const TodoList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTodos())
    }, [])

    const todos = useSelector(todosSelector.selectAll);

    const {error, status} = useSelector(state => state.todos);

    const handleDeleteMaine = (todo) => {
        const data = {
            id: todo.id,
            label: todo.label
        }
        dispatch(deleteMaineTodo(data))
    }

    const handleDeleteTodo = (titleTodo, todo) => {
        const data = {
            titleTodo,
            todo
        }
        dispatch(deleteTodo(data))
    }


    return (
        <Box sx={{mb: '30px'}}>
            {error && <Typography variant='h2'>error</Typography>}
            {status === 'idle'
                ? <Paper sx={{backgroundColor: '#f5f5f5', borderRadius: 5, mt: 2,}}>
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
                        <StickyNote2Icon color="white" sx={{fontSize: 50}}/>
                        <Typography sx={{ml: 1}} variant='h5'>
                            Задачи
                        </Typography>
                    </Paper>
                    {todos.length > 0
                        ? <Paper elevation={5}>
                            {todos.map((todo) => (
                                <Accordion key={todo.id}  elevation={9}>

                                        <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content" id="panel1a-header">
                                            <Box  sx={{display: 'flex', width: "100%", justifyContent: 'space-between', alignItems: 'center'}}>
                                                <Typography variant='h5' sx={{ml: 1}}>{todo.label}</Typography>
                                                <Button onClick={() => handleDeleteMaine(todo)} variant="outlined">Удалить</Button>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {todo.arrTodos.length > 0
                                            ?  todo.arrTodos.map((item) => (
                                                        <ListItem key={item.id}>
                                                            <Box sx={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                width: '100%',
                                                                alignItems: 'center',
                                                                overflowWrap: 'anywhere'
                                                            }}>
                                                                <ListItemText>{item.name}</ListItemText>
                                                                <Button sx={{maxHeight: '32px', ml: 3}} variant="contained"
                                                                        color={"secondary"}
                                                                        endIcon={<DeleteIcon sx={{pr: 1}}/>}
                                                                        onClick={() => handleDeleteTodo(todo, item)}/>

                                                            </Box>
                                                        </ListItem>
                                                    ))
                                            : <Typography>Подзадачи отсутствуют</Typography>}
                                        </AccordionDetails>


                                <Divider/>
                                </Accordion>
                                ))}
                        </Paper>
                        : <Typography variant='h6' sx={{p: 5, textAlign: 'center'}}>Задачи отсутствуют</Typography>}

                </Paper> :

                <Paper elevation={9} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 7,
                    mb: '20px',
                    minWidth: 360,
                    backgroundColor: '#fafafa',
                    pt: 5,
                    pb: 5
                }}>
                    <CircularProgress/>
                    <Typography sx={{mt: 0.5, ml: 2}} variant="h6" gutterBottom component="div">Loading to do
                        data...</Typography>
                </Paper>
            }
        </Box>
                );
}
;

export default TodoList;