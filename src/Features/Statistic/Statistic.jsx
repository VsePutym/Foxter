import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {useReportToDo} from "../Report/useReportToDo";
import {useLoadCategory} from "../Category/useLoadCategory";
import useStatisticCategory from "../Category/useStatisticCategory";
import {useDispatch, useSelector} from "react-redux";
import {categorySelector, report, reportSelectors} from "../Category/categorySlice";
import {useLoadReport} from "../Report/useLoadReport";

const Statistic = () => {

    useLoadCategory();
    useLoadReport()
    const dispatch = useDispatch()
    const categories = useSelector(categorySelector.selectAll);
    console.log(categories)

    const handleReport = () => {
        dispatch(report(categories))
    }
    let newReport= [];
    const reports = useSelector((state) => reportSelectors(state))
    const report = reports.map((item) => {
        if(item.arrMonth){
            newReport.push(item.arrMonth)
        }

    })
    newReport.forEach((item) => {
        console.log(item.limit)
    })

    return (
        <Box>
            {/*<Button onClick={() => handleReport()} variant="contained">Pull Report</Button>*/}
            {/*{newReport.map((month) => (*/}
            {/*    <Box key={month.title}>*/}
            {/*        /!*<Li><Typography>Name category</Typography> {month.title}</Li>*!/*/}
            {/*        <Typography>Потраченно  <span>  {month.limitBalances}</span></Typography>*/}

            {/*        <Typography> {month.limit}</Typography>*/}
            {/*    </Box>*/}
            {/*))}*/}
            Скоро будут отчёты
        </Box>

    );
};

export default Statistic;