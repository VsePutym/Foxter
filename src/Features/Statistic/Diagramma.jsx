import React from 'react';
import {Tooltip, Title, ArcElement, Legend, Chart as ChartJs} from "chart.js";
import { Doughnut } from 'react-chartjs-2';

ChartJs.register(
    Tooltip, Title, ArcElement, Legend
)

const Diagramma = ({report}) => {
    const titleCategory = [];
    const limitBCalances = [];



        report.categories.forEach((item) => {
            limitBCalances.push(item.limitBalances);
            titleCategory.push(item.title)
        })


    const data = {
        labels: titleCategory,
        datasets: [{
            label: 'My First Dataset',
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
            hoverOffset: 4
        }]
    };

    return <Doughnut data={data} />
};

export default Diagramma;