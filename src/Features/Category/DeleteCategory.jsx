import React from 'react';
import { Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteCategory} from "./categorySlice";
import {useDispatch} from "react-redux";

const DeleteCategory = ({id}) => {
    const dispatch = useDispatch()

    const handleDelete = (id) => {
        dispatch(deleteCategory(id))
    }

    return <Button color={'secondary'} onClick={() => handleDelete(id)} elevation={3} sx={{m: 1}} variant="contained" startIcon={<DeleteIcon/>}>Удалить категорию</Button>
};

export default DeleteCategory;