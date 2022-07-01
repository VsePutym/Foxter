import React from 'react';
import {Box, Button, TextField} from "@mui/material";
import {addSpending} from "./categorySlice";
import {useDispatch} from "react-redux";

const AddSpending = ({hookNameCategory}) => {
const dispatch = useDispatch()

    const handleAddSpending = (e) => {
        e.preventDefault();
        const valuePlus = e.target.arrSpending.value;

        if (valuePlus) {
            const plusCategory = {
                name: hookNameCategory,
                value: e.target.arrSpending.value,
                id: new Date().toISOString(),
                limitBalances: valuePlus
            }
            dispatch(addSpending(plusCategory))
            e.target.arrSpending.value = ''
        }
    }

    return (
       <Box>
           <Box component='form' onSubmit={handleAddSpending} sx={{display: 'flex', m: 1}}>
               <TextField id="outlined-number" name='arrSpending' label="Траты" type="number"/>
               <Button sx={{ml: 2}} type="submit" variant="contained">
                   отправить
               </Button>
           </Box>
       </Box>
    );
};

export default AddSpending;