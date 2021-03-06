import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore,FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist";
import {todosReducer} from "./Features/Todos/todosSlice";
import * as api from './Firebase'
import {reducerCategory} from "./Features/Category/categorySlice";
import {reportReducer} from "./Features/Report/reportSlice";



const persistConfig = {
    key: 'root',
    storage,
    blacklist: ["todos", 'category', 'reports']
}

const rootReducer = combineReducers({
    todos: todosReducer,
    category: reducerCategory,
    reports: reportReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            thunk: {
                extraArgument: api
            },
            ignoreActions: [
                FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER
            ]
        }
    })
});

export const persistor = persistStore(store)