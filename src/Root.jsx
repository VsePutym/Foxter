
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import { PersistGate } from 'redux-persist/integration/react'
import React from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import {Provider} from "react-redux";
import { cyan } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#0097a7',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            paper: '#ffffff',
            default: '#e0f7fa',
        },
    },
});

const Root = ({store, persistor}) => {
    return (
        // <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
                </ThemeProvider>
            </PersistGate>
        </Provider>
        // </React.StrictMode>
    )
}

export default Root;