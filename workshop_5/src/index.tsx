import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import  List  from "./list/List";
import  Main  from "./main/Main";
import BuildingPage from "./building/BuildingPage";
import Chart from "./chart/Chart";
import Testing from "./testing/Testing";
import {Provider} from "react-redux";
import store from "./testing/features/store";

const router = createBrowserRouter([
    {
        path: "",
        element: <Main />,
    },
    {
        path: "/list",
        element: <List />,
    },
    {
        path: "/building/:id",
        element: <BuildingPage />,
    },
    {
        path: "/chart",
        element: <Chart/>
    },
    {
        path: "/testing",
        element: <Testing/>,
    }
]);



const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
