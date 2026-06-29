import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './store';
import Main from './main/main';
import List from './list/list';
import Chart from './chart/Chart';
import Testing from './testing/Testing';
import Crud from './crud/crud';
import Book from './book/book';
import './styles/index.css';

const router = createBrowserRouter([
  { path: '/', element: <Main /> },
  { path: '/list', element: <List /> },
  { path: '/chart', element: <Chart /> },
  { path: '/book/:id', element: <Book /> },
  { path: '/testing', element: <Testing /> },
  { path: '/crud', element: <Crud /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
