import React from 'react';
import './index.css';
import ReactDOM from "react-dom/client";
import {persistor, store} from "./store";
import Root from "./Root";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Root store={store} persistor={persistor}/>
);
