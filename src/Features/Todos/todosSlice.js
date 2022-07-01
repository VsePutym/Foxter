import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {setDoc, deleteDoc, updateDoc, collection, doc, getDocs, getFirestore, arrayUnion} from "firebase/firestore";


export const loadTodos = createAsyncThunk(
    '@@todos/todos-loading',
    async () => {
        const db = getFirestore();
        const colRef = collection(db, 'todos')
        return await getDocs(colRef).then((snapshot) => {
            const todos = [];
            snapshot.docs.forEach((doc) => {
                todos.push({...doc.data()})
            })
            return todos
        })

    }
)


export const createTodo = createAsyncThunk(
    '@@todos/todo-create',
    async (dataTodos) => {
        const db = getFirestore();
        const label = dataTodos.label;
        const todoRef = doc(db, "todos", `${label}`)
        return await setDoc(todoRef, dataTodos).then(() => {
            return {...dataTodos}
        })
    }
)

export const deleteMaineTodo = createAsyncThunk(
    '@@todos/deleted-MaineTodo',
    async (data) => {
        const db = getFirestore();
        const docRef = doc(db, 'todos', `${data.label}`);
        return await deleteDoc(docRef).then(() => {
            return data.id
        })
    }
)

export const deleteTodo = createAsyncThunk(
    '@@todos/deleted-todo',
    async (data, {getState}) => {
        const db = getFirestore();
       const newArrTodo =  data.titleTodo.arrTodos.filter((item) => item !== data.todo)
        const id = data.titleTodo.id;
        const docRef = doc(db, 'todos', `${data.titleTodo.label}`);
        return await updateDoc(docRef, {
            arrTodos: newArrTodo
        }).then(() => {
            return {newArrTodo, id}
        })
    }
)

export const addTodoInChapter = createAsyncThunk(
    '@@todos/chapter/newToDo',
    async (data, {getState}) => {
        const selector = data.selectTitle;
        const idForSelector = data.idSelector
        delete data.idSelector
        const db = getFirestore();
        const todoSelectorArr  = getState().todos.entities[idForSelector].arrTodos;
        let newArr = [];
        todoSelectorArr.forEach((item) => {
            newArr.push(item)
        })
        newArr.push(data)

        const docRef = doc(db, 'todos', `${selector}`);
        return await updateDoc(docRef, {
            arrTodos: arrayUnion(data)
        }).then(() => {
            return {newArr, idForSelector}
        })
    }
)


const todosAdapter = createEntityAdapter({})

export const todosSLice = createSlice({
    name: '@@todos',
    initialState: todosAdapter.getInitialState({
        status: 'none',
        error: null
    }),
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadTodos.fulfilled, (state, action) => {
                todosAdapter.addMany(state, action.payload);
                state.status = 'idle';
                state.error = null;
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                todosAdapter.addOne(state, action.payload)
            })
            .addCase(addTodoInChapter.fulfilled, (state, action) => {
                const updateData = action.payload;
                const newArr = updateData.newArr;
                const id  = updateData.idForSelector;


                todosAdapter.updateOne(state, {
                    id: id,
                    changes: {
                        arrTodos: newArr
                    }
                })
            })
            .addCase(deleteMaineTodo.fulfilled, (state, action) => {
                const id = action.payload;
                todosAdapter.removeOne(state, id)
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                const updateData = action.payload;
                const id = updateData.id
                const arr = updateData.newArrTodo

                todosAdapter.updateOne(state, {
                    id: id,
                    changes: {
                        arrTodos: arr
                    }
                })
            })
    }
})

//selectors
export const todosReducer = todosSLice.reducer;
export const todosSelector = todosAdapter.getSelectors((state) => state.todos);


