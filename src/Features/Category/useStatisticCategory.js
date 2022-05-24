import React from 'react';
import {useSelector} from "react-redux";
import {categorySelector} from "./categorySlice";

const useStatisticCategory = () => {

    const categoriesTotal = useSelector(categorySelector.selectAll);
    const newArr = [];

    categoriesTotal.map((item)=> {
       item.arrSpending.map((spending) => {
            newArr.push(spending.value)
        }  )
    })



    const initialValue = 0;
    const totalFutureBuyPrice = newArr.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);

    return {totalFutureBuyPrice}
};

export default useStatisticCategory;