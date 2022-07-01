import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {setDoc, collection, doc, getDocs, getFirestore, deleteDoc} from "firebase/firestore";


export const loadReport = createAsyncThunk(
    '@@report/load-report',
    async () => {

        const db = getFirestore();
        const colRef = collection(db, 'report')
        return await getDocs(colRef).then((snapshot) => {
            const reports = [];
            snapshot.docs.forEach((doc) => {
                reports.push({...doc.data(), id: doc.id})
            })
            return {...reports}
        })
    }
)

export const addReport = createAsyncThunk(
    '@@report/add',
    async (data) => {
        const db = getFirestore();

        return await setDoc(doc(db, `report`, `${data.title}`), {...data}).then(() => {
            return {...data}
        })

    }
)

export const deleteReport = createAsyncThunk(
    '@@report/delete-report',
    async (title) => {
        const db = getFirestore();
        const docRef = doc(db, 'report', `${title}`);
        return await deleteDoc(docRef).then(() => {
            return title
        })
    }
)

const reportAdapter = createEntityAdapter({});

export const reportSlice = createSlice({
    name: 'reports',
    initialState: reportAdapter.getInitialState({
        status: 'none',
        error: null
    }),
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadReport.fulfilled, (state, action) => {
                reportAdapter.addMany(state, action.payload)

            })
            .addCase(addReport.fulfilled, (state, action) => {
                reportAdapter.addOne(state, action.payload)
            })
            .addCase(deleteReport.fulfilled, (state, action) => {
                reportAdapter.removeOne(state, action.payload)
        })
    }
})

export const reportReducer = reportSlice.reducer;
export const selectorReport = reportAdapter.getSelectors((state) => state.reports)

