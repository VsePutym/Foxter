import React, {Component, useState} from 'react';
import {AccordionDetails, AccordionSummary, Box, List, ListItem, ListItemText, Typography} from "@mui/material";
import LinearProgressWithLabel from "./LinearProgress";
import DeleteCategory from "./DeleteCategory";
import DeleteSpending from "./DeleteSpending";
import AddSpending from "./AddSpending";
import {useSelector} from "react-redux";
import {categorySelector} from "./categorySlice";

class ExpandMoreIcon extends Component {
    render() {
        return null;
    }
}

const AccordionCategory = () => {

    const categories = useSelector(categorySelector.selectAll);

    const [hookNameCategory, setNameCategory] = useState('');

    const handleAccordion = (name) => {
        setNameCategory(name)
    }

    return (
        <Box>
            {categories.map((category) => (
                <AccordionCategory key={category.id} onClick={() => handleAccordion(category.title)} elevation={9}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content"
                                      id="panel1a-header">

                        <ListItem>
                            <ListItemText>
                                <Typography
                                    variant='h6'>{category.title.length > 13 ? category.title.slice(0, 30) + '...' : category.title}</Typography>
                                <Box sx={{mt: 1, display: 'flex'}}>
                                    <Typography> Осталось потратить</Typography><Typography variant='span' sx={{
                                    ml: 1,
                                    display: 'flex'
                                }}>{category.limit - category.limitBalances}p <Typography sx={{ml: 1}}
                                                                                          variant='span'>из</Typography>
                                    <Typography sx={{ml: 1}}>{category.limit}p</Typography></Typography>
                                </Box>
                            </ListItemText>
                        </ListItem>

                    </AccordionSummary>

                    <AccordionDetails>
                        <LinearProgressWithLabel sx={{m: 1, mt: 3}} value={category.lineProgress}/>
                        <DeleteCategory id={category.id}/>
                        <DeleteSpending category={category} hookNameCategory={hookNameCategory}/>
                        <AddSpending hookNameCategory={hookNameCategory}/>
                    </AccordionDetails>

                </AccordionCategory>
            ))}
        </Box>
    );
};

// export default AccordionCategory;