import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {setDoc, deleteDoc, updateDoc, collection, doc, getDocs, getFirestore} from "firebase/firestore";


export const loadTodos = createAsyncThunk(
    '@@todos/todos-loading',
    async () => {
        const db = getFirestore();
        const colRef = collection(db, 'todos')
        return await getDocs(colRef).then((snapshot) => {
            const todos = [];
            snapshot.docs.forEach((doc) => {
                todos.push({...doc.data(), id: doc.id})
            })
            return todos
        })

    }
)

export const toggleValue = createAsyncThunk(
    '@@todos/todos-toggleValue',
    async ({id, initialValue, value}, {getState}) => {
        const db = getFirestore();
        const todo = getState().todos.entities[id]
        const test = todo.completed === true ?  0 : initialValue
        return await updateDoc(doc(db, 'todos', `${id}`), {
            value: test
        }).then(() => {
            return {id,test}
        }).catch((err) => {
            console.log(err)
        })
    }
)

export const toggleTodo = createAsyncThunk(
    'todos/todo-completed',
    async (id, {getState}) => {
        const todo = getState().todos.entities[id]
        const db = getFirestore();
        return await updateDoc(doc(db, "todos", `${id}`), {
            completed: !todo.completed
        }).then(() => {
            return todo
        })
    }
)

export const createTodo = createAsyncThunk(
    '@@todos/todo-create',
    async (dataTodos) => {
        const db = getFirestore();
        const id = dataTodos.id
        if (dataTodos.value === '') {
            dataTodos.value = 0;
        }
        return await setDoc(doc(db, "todos", `${id}`), dataTodos).then(() => {
            return {...dataTodos}
        })
    }
)

export const deleteTodo = createAsyncThunk(
    '@@todos/todo-deleted',
    async (id) => {
        const db = getFirestore();
        const docRef = doc(db, 'todos', `${id}`);
        return await deleteDoc(docRef).then(() => {
            return id
        })
    }
)


const todosAdapter = createEntityAdapter({})

const todosSLice = createSlice({
    name: '@@todos',
    initialState: todosAdapter.getInitialState({
        status: 'none',
        error: null
    }),
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadTodos.fulfilled, (state, action) => {
                todosAdapter.addMany(state, action.payload)
                state.status = 'idle';
                state.error = null;
            })
            .addCase(loadTodos.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                todosAdapter.addOne(state, action.payload)
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                todosAdapter.removeOne(state, action.payload)
            })
            .addCase(toggleValue.fulfilled, (state, action) => {
                const updateTodo = action.payload
                console.log(updateTodo)
                todosAdapter.updateOne(state, {
                    id: updateTodo.id,
                    changes: {
                        value: updateTodo.test
                    }
                })
            })
            .addCase(toggleTodo.fulfilled, (state, action) => {
                const updateTodo = action.payload;
                todosAdapter.updateOne(state, {
                    id: updateTodo.id,
                    changes: {
                        completed: !updateTodo.completed
                    }
                })
            })
    }
})

//selectors
export const todosReducer = todosSLice.reducer;
export const todosSelector = todosAdapter.getSelectors((state) => state.todos);


