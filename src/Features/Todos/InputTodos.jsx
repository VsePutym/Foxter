import React from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addTodoInChapter, todosSelector} from "./todosSlice";
import SendIcon from '@mui/icons-material/Send';
import {toast} from "react-toastify";
import NewChapter from "./NewChapter";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import HandChapter from "../../components/HandChapter";



const InputTodos = () => {
    const dispatch = useDispatch();

    const todos = useSelector(todosSelector.selectAll);

    const handleSubmit = (event) => {

        event.preventDefault();
        const idTodos = new Date().toISOString()
        const text = event.target.text.value;
        const title = event.target.title.value;
        const selectTitle = event.target.selectTitle.value;
        let idForSelector;
        todos.forEach((item) => {
            if(item.label === selectTitle){
                idForSelector =  item.id
            }
        })
        const sendDataTodo = (thank) => {
            const dataTodos = {name: text, id: idTodos,  completed: false, selectTitle: selectTitle, idSelector: idForSelector};

            const promise = dispatch(thank(dataTodos))
                .unwrap()
                .then(() => {
                    toast.success(' 🎉  Добавлена новая задача', {
                        position: "top-left",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
                .catch((err) => {
                    toast.error(() => {
                        console.log(err)
                    })
                })
            event.target.reset();
        }


        if(text && selectTitle && title){
            console.log('fix bag')
        } else if(text && selectTitle) {
            sendDataTodo(addTodoInChapter)
        }
    }

    const title = 'Создать новую задачу'


    return (
       <Box sx={{mt:3, borderRadius: 5 }}>
           <Paper elevation={10} sx={{borderRadius: 5}} >
             <HandChapter title={title} img={   <StickyNote2Icon color="white" sx={{fontSize: 50}}/>} />
              <Box sx={{display: 'grid', justifyContent: 'center', justifyItems: 'start', p:2}}>
                  <NewChapter  />
                  <Box component="form" onSubmit={handleSubmit} sx={{textAlign: '-webkit-center'}}>

                      <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={todos}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          sx={{pb: 2}}
                          renderInput={(params) => <TextField {...params} name='selectTitle' label="Мои задачи" />}/>
                      <Box sx={{display: 'flex', justifyContent: 'center', pb:5}}>
                          <TextField sx={{pr: 0}}   name='text' id="standard-basic" label="Добавить к задаче" variant="outlined" />
                          <Button sx={{ml:2, maxHeight: '60px', pr: 2}}  type="submit"  variant="contained" endIcon={<SendIcon />} >
                              <Typography>Отправить</Typography>
                          </Button>
                      </Box>
                  </Box>
              </Box>
           </Paper>
       </Box>
    );
};

export default InputTodos;