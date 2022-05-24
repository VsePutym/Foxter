import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {
    collection,
    doc,
    getDocs,
    getFirestore,
    setDoc,
    arrayRemove,
    updateDoc,
    arrayUnion,
    decrement,
    increment,
    deleteDoc
} from "firebase/firestore";
import {arrDecrementChange, arrChanges} from "../../Functions/categories";

export const createCategory = createAsyncThunk(
    '@@createCategory/create',
    async (dataCategory) => {
        const db = getFirestore();
        const title = dataCategory.title;
        let limit = dataCategory.limit

        return await setDoc(doc(db, `category`, `${title}`), dataCategory).then(() => {
            return {...dataCategory}
        })
    }

)

export const loadCategory = createAsyncThunk(
    '@@category/load-category',
    async () => {

        const db = getFirestore();
        const colRef = collection(db, 'category')
        return await getDocs(colRef).then((snapshot) => {
            const category = [];
            snapshot.docs.forEach((doc) => {
                category.push({...doc.data(), id: doc.id})
            })
            return category
        })
    }
)



export const addSpending = createAsyncThunk(
    '@@category/change-arrPlus',
    async(dataCategory, {getState}) => {

        const data = arrChanges(dataCategory);
        const oldArrPlus = getState().category.entities[data.name].arrSpending;
        const limit = getState().category.entities[data.name].limit;
        const valueLimit = Number(dataCategory.limitBalances)
        const newLimitBalances = getState().category.entities[data.name].limitBalances + valueLimit;

        const lineProgress = 100 / (limit / newLimitBalances)


        return await  updateDoc(data.refCategory, {
            arrSpending: arrayUnion(data.arrPlusData),
            limitBalances: increment(valueLimit),
            lineProgress: lineProgress
        }).then(() => {
            return {...dataCategory, oldArrPlus, newLimitBalances , lineProgress}
        })
    }
)

export const deleteSpending = createAsyncThunk(
    '@@category/delete-arrPlus',
    async (dataDeletePlus, {getState}) => {

        const data = arrDecrementChange(dataDeletePlus);
        const name = data.name;

        const limitBalances = getState().category.entities[name].limitBalances
        const limit = getState().category.entities[data.name].limit;
        const valueLimit = Number(dataDeletePlus.limitBalances);
        const newLimit = limitBalances - valueLimit

        const lineProgress = 100 / (limit / newLimit)


        const arr = getState().category.entities[name].arrSpending;

        const newArr = arr.filter((item) => item.id !== data.id);

        return await updateDoc(data.plusRef, {
            arrSpending: newArr,
            limitBalances: newLimit,
            lineProgress: lineProgress
        }).then(() => {
            return {newArr, name, newLimit, lineProgress}
        })
    }
)

export const report = createAsyncThunk(
    '@@category/report',
    async (_,{getState}) => {
        const arr = getState().category.entities;
        const days =[{month: "January", id: 1}, {month: 'February', id: 2}, {month: 'March', id: 3}, {month: 'April', id: 4}, {month: 'May', id: 5}, {month: 'June', id: 6}, {month: 'August', id: 7}, {month: 'September', id: 8}, {month: 'October', id: 9}, {month: 'November', id: 10}, {month: 'December', id: 11}, {month: 'December', id: 12}];
        let arrMonth = [];

        const date = new Date().getMonth() + 1
        for (const key in arr) {
            arrMonth.push(arr[key])
        }
        let newDate;

        days.map((item) => {
            if(item.id === date){
                newDate = item.month
            }
        })

        const db = getFirestore();

        return await setDoc(doc(db, `report`, `${newDate}`), {arrMonth}).then(() => {
            return arrMonth
        })

    }
)

export const deleteCategory = createAsyncThunk(
    '@@todos/category-deleted',
    async (id) => {
        const db = getFirestore();
        const docRef = doc(db, 'category', `${id}`);
        return await deleteDoc(docRef).then(() => {
            return id
        })
    }
)

export const loadReport = createAsyncThunk(
    '@@category/load-report',
    async () => {

        const db = getFirestore();
        const colRef = collection(db, 'report')
        return await getDocs(colRef).then((snapshot) => {
            const category = [];
            snapshot.docs.forEach((doc) => {
                category.push({...doc.data(), id: doc.id})
            })
            return category
        })
    }
)

const adapterCategory = createEntityAdapter({})

export const categorySlice = createSlice({
        name: 'categorySlice',
        initialState: adapterCategory.getInitialState({
            status: 'none',
            error: null,
            reports : []
        }),
        reducers: {

        },
        extraReducers: builder => {
            builder
            .addCase(createCategory.fulfilled, (state, action) => {
                adapterCategory.addOne(state, action.payload)
            })
                .addCase(loadCategory.fulfilled, (state, action) => {
                    adapterCategory.addMany(state, action.payload)
            })
                .addCase(loadReport.fulfilled, (state, action) => {
                    state.reports = action.payload;
                })
                .addCase(addSpending.fulfilled, (state,action) => {
                    const updateCategory = action.payload;
                    const value = Number(updateCategory.value)

                    const newItem = {
                        id: updateCategory.id,
                        value : value
                    }

                    const oldArrPlus = action.payload.oldArrPlus;

                    const newArr = [];
                    oldArrPlus.forEach((item) => {
                        newArr.push(item);
                    })
                    newArr.push(newItem)


                    adapterCategory.updateOne(state, {
                        id: updateCategory.name,
                        changes: {
                            arrSpending: newArr,
                            limitBalances: updateCategory.newLimitBalances,
                            lineProgress: updateCategory.lineProgress
                        }
                    })
                })
                .addCase(deleteSpending.fulfilled, (state, action) => {
                    const updateCategory = action.payload;
                    const newArr = updateCategory.newArr

                    adapterCategory.updateOne(state, {
                        id: updateCategory.name,
                        changes: {
                            arrSpending: newArr,
                            limitBalances: updateCategory.newLimit,
                            lineProgress: updateCategory.lineProgress
                        }
                    })
                })
                .addCase(deleteCategory.fulfilled, (state, action) => {
                    const id = action.payload;

                    adapterCategory.removeOne(state, id)
                })
                .addCase(report.fulfilled, (state, action) => {
                    state.reports = action.payload;
                })
        }
    }
)


export const reducerCategory = categorySlice.reducer
export const categorySelector = adapterCategory.getSelectors((state) => state.category);
export const categorySpending = adapterCategory.getSelectors((state) => state.category);
export const reportSelectors = ((state) => state.category.reports);


