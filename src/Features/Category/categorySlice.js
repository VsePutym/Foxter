import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {
    collection,
    doc,
    getDocs,
    getFirestore,
    setDoc,
    updateDoc,
    arrayUnion,
    increment,
    deleteDoc
} from "firebase/firestore";
import {arrDecrementChange, arrChanges} from "../../Functions/categories";


export const createCategory = createAsyncThunk(
    '@@createCategory/create',
    async (dataCategory) => {
        const db = getFirestore();
        const title = dataCategory.title;

        return await setDoc(doc(db, `category`, `${title}`), {...dataCategory}).then(() => {
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
    async (dataCategory, {getState}) => {

        const data = arrChanges(dataCategory);
        const oldArrPlus = getState().category.entities[data.name].arrSpending;
        const limit = getState().category.entities[data.name].limit;
        const valueLimit = Number(dataCategory.limitBalances)
        const newLimitBalances = getState().category.entities[data.name].limitBalances + valueLimit;

        const lineProgress = 100 / (limit / newLimitBalances)

        return await updateDoc(data.refCategory, {
            arrSpending: arrayUnion(data.arrPlusData),
            limitBalances: increment(valueLimit),
            lineProgress: lineProgress
        }).then(() => {
            return {...dataCategory, oldArrPlus, newLimitBalances, lineProgress}
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

export const deleteCategory = createAsyncThunk(
    '@@category/category-deleted',
    async (id) => {
        const db = getFirestore();
        const docRef = doc(db, 'category', `${id}`);
        return await deleteDoc(docRef).then(() => {
            return id
        })
    }
)

export const resetCategory = createAsyncThunk(
    '@@category/category-reset',
    async () => {

        const db = getFirestore();
        const docRef = collection(db, "category");

        return await getDocs(docRef).then((snapshot) => {

            const results = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))

            results.forEach(async (result) => {
                const docRef = doc(db, 'category', `${result.title}`);

                return await updateDoc(docRef, {
                    limitBalances: 0,
                    lineProgress: 0,
                    arrSpending: []
                })
            })
        })
    }
)


export const changeLimitCategory = createAsyncThunk(
    '@@category/changeLimit',
    async (data) => {
        const title = data.title;
        const newLimit = data.newLimit;
        const db = getFirestore();
        const docRef = doc(db, "category", `${title}`);

        return await updateDoc(docRef, {
      limit: newLimit
        }).then(() => {
            return {newLimit, title}
        })
    }
)


const adapterCategory = createEntityAdapter({})

export const categorySlice = createSlice({
        name: 'categorySlice',
        initialState: adapterCategory.getInitialState({
            status: 'none',
            error: null
        }),
        reducers: {},
        extraReducers: builder => {
            builder
                .addCase(createCategory.fulfilled, (state, action) => {
                    adapterCategory.addOne(state, action.payload)
                })
                .addCase(loadCategory.fulfilled, (state, action) => {
                    adapterCategory.addMany(state, action.payload);
                    state.status = 'idle';
                    state.error = null;
                })
                .addCase(addSpending.fulfilled, (state, action) => {
                    const updateCategory = action.payload;
                    const value = Number(updateCategory.value)

                    const newItem = {
                        id: updateCategory.id,
                        value: value
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
                .addCase(resetCategory.fulfilled, (state, action) => {
                    adapterCategory.removeAll(state)
                })
                .addCase(changeLimitCategory.fulfilled, (state, action) => {
                    const updateCategory = action.payload;
                     adapterCategory.updateOne(state, {
                         id: updateCategory.title,
                         changes: {
                             limit: updateCategory.newLimit
                         }
                         }
                     )
                })
        }
    }
)


export const reducerCategory = categorySlice.reducer
export const categorySelector = adapterCategory.getSelectors((state) => state.category);
export const categorySpending = adapterCategory.getSelectors((state) => state.category);



