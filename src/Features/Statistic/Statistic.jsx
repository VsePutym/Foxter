import React, {useEffect} from 'react';
import {Accordion, AccordionSummary, Box, Button, Fab, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {categorySelector, loadCategory, resetCategory} from "../Category/categorySlice";
import {addReport, deleteReport, selectorReport} from "../Report/reportSlice";
import {useLoadReport} from "../Report/useLoadReport";
import {addNewReport} from "../../Functions/reports";
import Diagramma from "./Diagramma";
import {ToastContainer, Zoom} from "react-toastify";
import Divider from '@mui/material/Divider';


import AddIcon from '@mui/icons-material/Add';
import {Pie} from "react-chartjs-2";


const Statistic = () => {
    const dispatch = useDispatch();
    useLoadReport()
    useEffect(() => {
        dispatch(loadCategory())
    },[])


    const reports = useSelector(selectorReport.selectAll);
    const categories = useSelector(categorySelector.selectAll);

    const handleReport = () => {
       const data = addNewReport(categories, reports);
        if(data !== null){
            new Promise((resolve) => {
                dispatch(addReport(data)).then(() => {
                    dispatch(resetCategory(categories))
                })
            })
        }

    }


    return (
        <Box sx={{mb: '100px',textAlign: 'center'}}>
            <ToastContainer theme='dark' transition={Zoom}/>
            {reports.map((report) => (
                    <Accordion elevation={9} key={report.id} sx={{textAlign: 'center', mt: 5, pt:1, pb:1, width: '100%', minWidth: 360, bgcolor: 'background.paper'}} >

                        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                          <Box sx={{display: 'flex', width: "100%", justifyContent: 'space-between', alignItems: 'center'}}>
                              <Typography variant='h5'>Дата: <span>{report.month}</span> <span>{report.year}</span></Typography>
                              <Fab color="secondary" aria-label="add">
                                  <AddIcon />
                              </Fab>
                          </Box>
                        </AccordionSummary>
                        <Box sx={{display: 'flex', justifyContent: 'center', margin: 'auto', maxWidth: '500px'}}>
                            <Diagramma  report={report} />
                        </Box>

                        {report.categories.map((item) => (
                         <Box key={item.id} sx={{pt:3}}>
                             <Divider />
                             <Typography  sx={{pt: 5, pl:5, pr:5, display: 'flex', justifyContent: 'space-between'}}>Категория трат <Typography variant='span'>{item.title} </Typography></Typography>
                             <Typography  sx={{pt: 3, pl:5, pr:5, display: 'flex', justifyContent: 'space-between'}}>Потрачено за месяц <span>{item.limitBalances}</span></Typography>
                             <Typography  sx={{pt: 3, pl:5, pr:5, display: 'flex', justifyContent: 'space-between'}}>Осталось потратить  <span>{item.limit - item.limitBalances}</span></Typography>
                             <Typography  sx={{pt: 3, pl:5, pr:5, display: 'flex', justifyContent: 'space-between', pb:3}}>Лимит <span>{item.limit}</span></Typography>
                         </Box>
                            ))}
                        <Button sx={{mb:1}} onClick={() => dispatch(deleteReport(report.title))} variant='contained'>Удалить месячный отчёт</Button>
                    </Accordion>
                ))}
            <Button onClick={() => handleReport()} sx={{m:5}} variant="contained">Получить отчёт за месяц</Button>
        </Box>
    );
};

export default Statistic;