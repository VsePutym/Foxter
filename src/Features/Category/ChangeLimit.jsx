import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import {useDispatch} from "react-redux";
import {changeLimitCategory} from "./categorySlice";

const ChangeLimit = ({category}) => {
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSendLimit = (e) => {
        e.preventDefault();
        const newLimit = Number(e.target.limit.value);

       const dataNewLimit = {
           newLimit,
           title: category.title
       }
       dispatch(changeLimitCategory(dataNewLimit))
        e.target.limit.value = '';
        setOpen(false);
    };


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box  >
            <Button sx={{m: 1}} variant="outlined" onClick={handleClickOpen}>Редактировать лимит</Button>
            <Dialog component='form' onSubmit={handleSendLimit} open={open} onClose={handleClose}>
                <DialogTitle>Лимит</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Здесь вы можите отредактировать лимит для своей категории, введите ниже новый лимит
                    </DialogContentText>
                    <TextField id="standard-basic" variant="standard" name='limit' label="Новый лимит" type="number"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                    <Button type="submit" >Отправить</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ChangeLimit;