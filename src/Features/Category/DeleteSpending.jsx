import React from 'react';
import {Box, Button, ListItemText, Typography} from "@mui/material";
import {deleteSpending} from "./categorySlice";
import {useDispatch} from "react-redux";


const DeleteSpending = ({category, hookNameCategory}) => {

    const dispatch = useDispatch();

    const handleDeleteSpending = (item) => {
        const dataDeletePlus = {
            name: hookNameCategory,
            value: item.value,
            id: item.id,
            limitBalances: item.value
        }
        dispatch(deleteSpending(dataDeletePlus));
    }

    return (
        <Box>
            <ListItemText >
                <Typography sx={{m: 1}} variant='h6'>Траты</Typography>
                <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                    {category.arrSpending.map((item) => (
                            <Button className='anime' variant="outlined" sx={{m: 1}}
                                    onClick={() => handleDeleteSpending(item)}
                                    key={item.id}>{item.value}</Button>
                    ))}
                </Box>
            </ListItemText>
        </Box>
    );
};

export default DeleteSpending;