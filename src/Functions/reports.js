export const addNewReport = (categories, reports) => {

    const dates = [
        {month: "January", id: 1},
        {month: 'February', id: 2},
        {month: 'March', id: 3},
        {month: 'April', id: 4},
        {month: 'May', id: 5},
        {month: 'June', id: 6},
        {month: 'July', id: 7},
        {month: 'August', id: 8},
        {month: 'September', id: 9},
        {month: 'October', id: 10},
        {month: 'November', id: 11},
        {month: 'December', id: 12}
    ];


    const date = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const id = new Date().toISOString();

    let newDate;
    let month;

    dates.map((item) => {
        if (item.id === date) {
            newDate = item.month + '' + `${year}`;
            month = item.month
        }
    })


    const dataMonth = {categories, title: newDate, month: month, year: year, id: id};

    let countDate;

    const returnDate = (dataMonth) => {
        if (reports.length > 0) {
            reports.forEach((item) => {
                if (item.title) {
                    if (item.title !== newDate) {
                        countDate = 1
                    } else {
                        countDate = 2
                    }
                }
            })
        } else countDate = 1
    }

    returnDate(dataMonth);

    if (countDate === 1) {
        return {...dataMonth}
    } else if (countDate === 2) {
        alert("Отчёт за этот месяц уже существует")
        return null
    }

}