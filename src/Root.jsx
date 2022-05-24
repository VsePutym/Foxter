
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import { PersistGate } from 'redux-persist/integration/react'
import React from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import {Provider} from "react-redux";

const theme = createTheme({
    palette:{
        primary: {
            main: '#18ffff'
        },
        mode: 'dark'
    }
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