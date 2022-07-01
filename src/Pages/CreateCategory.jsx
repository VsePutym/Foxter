import React, {useEffect} from 'react';
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {useDispatch} from "react-redux";
import {createCategory} from "../Features/Category/categorySlice";
import InputTodos from "../Features/Todos/InputTodos";
import Create from "../img/Create2.png";
import styled from "styled-components";
import {toast, ToastContainer, Zoom} from "react-toastify";
import HandChapter from "../components/HandChapter";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";




export const InfoImage = styled.div`
  img {
    width: 300px;
    height: 280px;
    align-items: center;
    margin-bottom: 100px;
  }
`

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


        const dataCategory = {
            id: title, title: title, limit: limit, arrSpending: [], limitBalances: 0, lineProgress: 0
        }


        if (title) {
            const promise = dispatch(createCategory(dataCategory))
                .unwrap()
                .then(() => {
                    toast.success(' 🎉  Добавленна новая категория', {
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
        }
        e.target.title.value = '';
        e.target.limit.value = '';
    }

    const title = 'Создать новую категорию трат'
    return (
        <Box  sx={{textAlign: 'center'}}>
            <ToastContainer theme='dark' transition={Zoom}/>
            <Paper sx={{mt:3, textAlign: 'center', borderRadius: 5}} elevation={10} component='form' onSubmit={handleCreateCategory}>
                <HandChapter title={title} img={   <AutoGraphIcon color="white" sx={{fontSize: 50}}/>} />

               <Box   sx={{display: 'grid', justifyContent: 'center', justifyItems: 'start', p:2}}>
                   <TextField   name='title' sx={{width: '320px'}} id="standard-basic" label="Название категории"
                                variant="standard"/>
                   <Box sx={{display: 'flex', pt: 5, pb: 5, justifyContent: 'center'}}>
                       <TextField sx={{maxWidth: '150px'}} id="outlined-number" name='limit' label="Лимит" type="number"/>
                       <Button sx={{ml: 4, maxHeight: '60px'}} type="submit" variant="contained" endIcon={<SendIcon/>}>
                           <Typography>Отправить</Typography>
                       </Button>
                   </Box>
               </Box>

            </Paper>
            <InputTodos/>
            <InfoImage>
                <img src={Create} />
            </InfoImage>
        </Box>


    );
};

export default CreateCategory;