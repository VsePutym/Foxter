import React, {Component, useState} from 'react';
import {useLoadCategory} from "./useLoadCategory";
import {useDispatch, useSelector} from "react-redux";
import {
    categorySelector, deleteSpending, addSpending, categorySpending, reportSelectors, deleteCategory
} from "./categorySlice";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button, LinearProgress,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import {ToastContainer, Zoom} from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';



class ExpandMoreIcon extends Component {
    render() {
        return null;
    }
}



const Category = () => {
    const [progress , setProgress ] = useState(0);
    useLoadCategory();
    const dispatch = useDispatch()
    const categories = useSelector(categorySelector.selectAll);

    const [hookNameCategory, setNameCategory] = useState('')


    const handleAccordion = (name) => {
        setNameCategory(name)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const valuePlus = e.target.arrSpending.value;

        if(valuePlus){
            const plusCategory = {
                name: hookNameCategory,
                value: e.target.arrSpending.value,
                id: new Date().toISOString(),
                limitBalances: valuePlus
            }
            dispatch(addSpending(plusCategory))
        }
    }


    const handleDeleteSpending = (item) => {
        const dataDeletePlus = {
            name: hookNameCategory,
            value: item.value,
            id: item.id,
            limitBalances: item.value
        }
        dispatch(deleteSpending(dataDeletePlus));
    }


    const LinearProgressWithLabel = (props) => {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        `${props.value}`
                    )}%`}</Typography>
                </Box>
            </Box>
        );
    }

    const handleDelete = (id) => {
       dispatch(deleteCategory(id))
    }


    return (
        <Box sx={{mb: '100px'}}>
            <ToastContainer theme='dark' transition={Zoom}/>

            <List sx={{mt: 5, width: '100%', minWidth: 360, borderRadius: 5}}>
                <Typography variant='h5'>Categories:</Typography>
                {categories.map((category) => (
                    <Accordion key={category.id} component='form' onSubmit={handleSubmit}
                               onClick={() => handleAccordion(category.title)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content"
                                          id="panel1a-header">
                            <ListItem>
                                <ListItemText><Typography>Name Category</Typography>{category.title.length > 13 ? category.title.slice(0, 15) + '...' : category.title}</ListItemText>
                            </ListItem>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ width: '100%' }}>
                                <LinearProgressWithLabel value={category.lineProgress} />
                            </Box>
                            <Box>
                                <Button onClick={() => handleDelete(category.id)} sx={{m:1}} variant="outlined" startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                                <ListItemText>
                                    <Typography>Spending:</Typography>
                                   <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                                       {category.arrSpending.map((item) => (
                                           <Button variant="outlined" sx={{m: 1}} onClick={() => handleDeleteSpending(item)} key={item.id}>{item.value}</Button>
                                       ))}
                                   </Box>
                                </ListItemText>
                            </Box>
                            <Box>
                                <Box sx={{display: 'flex', mt: 1}}>
                                    <TextField id="outlined-number" name='arrSpending' label="Spending" type="number"/>
                                    <Button sx={{ml: 2}} type="submit" variant="contained">
                                        <Typography>Send Spending</Typography>
                                    </Button>
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </List>
        </Box>
    );
};

export default Category;