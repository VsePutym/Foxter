import React, {Component, useState} from 'react';
import {useLoadCategory} from "./useLoadCategory";
import {useSelector} from "react-redux";
import {categorySelector} from "./categorySlice";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box, Fab,
    IconButton,
    List,
    ListItem,
    ListItemText, Paper,
    Typography
} from "@mui/material";
import {ToastContainer, Zoom} from "react-toastify";
import {InfoImage80} from "../Todos/TodoList";
import {Tooltip, Title, ArcElement, Legend, Chart as ChartJs} from "chart.js";
import {Pie} from 'react-chartjs-2';
import DeleteCategory from "./DeleteCategory";
import AddSpending from "./AddSpending";
import LinearProgressWithLabel from "./LinearProgress";
import DeleteSpending from "./DeleteSpending";
import ChangeLimit from "./ChangeLimit";
import Divider from "@mui/material/Divider";
import Idea from "../../img/Idea.png";
import Loading from "../../components/Loading";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import EditIcon from '@mui/icons-material/Edit';
import HandChapter from "../../components/HandChapter";


ChartJs.register(
    Tooltip, Title, ArcElement, Legend
)


class ExpandMoreIcon extends Component {
    render() {
        return null;
    }
}


const Category = () => {

   useLoadCategory();


    const categories = useSelector(categorySelector.selectAll);
    const {error, status} = useSelector(state => state.category);

    const [hookNameCategory, setNameCategory] = useState('');

    const handleAccordion = (name) => {
        setNameCategory(name)
    }


    const titleCategory = [];
    const limitBCalances = [];

    categories.forEach((item) => {
        titleCategory.push(item.title);
        limitBCalances.push(item.limitBalances)
    })

    const data = {
        labels: titleCategory,
        datasets: [{
            label: 'Category',
            data: limitBCalances,
            backgroundColor: [
                '#9c27b0',
                '#e91e63',
                '#1e88e5',
                '#00897b',
                '#ffc107',
                '#6d4c41',
                '#607d8b',
                '#00e676',
                '#5e35b1',
                '#c0ca33',
            ],
            hoverOffset: 24,
        }]
    };

const  title = 'Траты'
    return (
        <Box sx={{mb: '100px'}}>
            <ToastContainer theme='dark' transition={Zoom}/>
            <HandChapter title={title} img={   <AutoGraphIcon color="white" sx={{fontSize: 50}}/>} />
            {status === 'idle'
            ?  <Box>
                    {categories.length > 0
                  ?  <Box>
                            <List sx={{pt:0}}>
                              <Paper sx={{backgroundColor: '#e0f7fa', borderRadius: 5}}>

                                {categories.map((category) => (
                                <Accordion key={category.id} onClick={() => handleAccordion(category.title)} elevation={9}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content" id="panel1a-header">
                                        <Box  sx={{display: 'flex', width: "100%", justifyContent: 'space-between', alignItems: 'center'}}>
                                            <Typography variant={'h6'} sx={{ml:1}}>{category.title.length > 13 ? category.title.slice(0, 30) + '...' : category.title}</Typography>
                                            <Fab color="secondary" aria-label="edit">
                                                <EditIcon />
                                            </Fab>
                                        </Box>
                                    </AccordionSummary>

                                    <AccordionDetails>
                                        <Divider  sx={{maxWidth: '70%', ml:1}} />
                                        <ListItem>
                                            <ListItemText>

                                                <Box sx={{display: 'flex', mt:4}}>
                                                    <Typography> Осталось потратить</Typography><Typography variant='span' sx={{
                                                    ml: 1,
                                                    display: 'flex'
                                                }}>{category.limit - category.limitBalances}p <Typography sx={{ml: 1}}
                                                                                                          variant='span'>из</Typography>
                                                    <Typography sx={{ml: 1}}>{category.limit}p</Typography></Typography>
                                                </Box>
                                            </ListItemText>
                                        </ListItem>
                                        <LinearProgressWithLabel sx={{m: 1, mt: 4}} value={category.lineProgress}/>
                                        <ChangeLimit category={category} />
                                        <DeleteCategory id={category.id}/>
                                        <DeleteSpending category={category} hookNameCategory={hookNameCategory}/>
                                        <AddSpending hookNameCategory={hookNameCategory}/>
                                    </AccordionDetails>

                                </Accordion>
                            ))}
                              </Paper>
                            </List>
                            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                <Pie data={data} className='infographic'/>
                            </Box>
                        </Box>

                        : <Paper elevation={9}  sx={{textAlign: 'center', p:5, backgroundColor: '#fafafa'}}>
                            <InfoImage80><IconButton><img src={Idea} alt=""/></IconButton></InfoImage80>
                            <Typography variant='h6'>Пока в "категориях трат" данных нет</Typography>
                        </Paper>}
               </Box>
                :   <Loading />}
        </Box>
    );
};

export default Category;