import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {setDoc, deleteDoc, updateDoc, collection, doc, getDocs, getFirestore} from "firebase/firestore";
import {loadTodos} from "../Todos/todosSlice";

export const createReport = createAsyncThunk(
    '@@report/create-report',
    async (dataReport) => {
        const db = getFirestore();
        const id = dataReport.id;

        return await setDoc(doc(db, 'Report', `${id}`), dataReport).then(() => {
            return {...dataReport}
        })
    }
)

export const loadReport = createAsyncThunk(
    '@report/report-load',
    async () => {
        const db = getFirestore();
        const colRef = collection(db, 'Report')
        return await getDocs(colRef).then((snapshot) => {
            const report = [];
            snapshot.docs.forEach((doc) => {
                report.push({...doc.data(), id: doc.id})
            })
            return report
        })
    }
)
const reportAdapter = createEntityAdapter({});
export const reportSlice = createSlice({
    name: 'reports',
    initialState: {
        totalFutureBuyPrice: 0,
        // totalBuyPrice : 0
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(createReport.fulfilled, (state, action) => {
                console.log(action.payload)
                reportAdapter.addOne(state, action.payload)
            })
            .addCase(loadTodos.fulfilled, (state, action) => {
                reportAdapter.addMany(state, action.payload)
            })
    }
})

export const reportReducer = reportSlice.reducer;
export const selectorReport = reportAdapter.getSelectors((state) => {
    console.log(state)
})

