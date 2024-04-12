import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './home';
import Register from './components/register';
import User from './components/user';
import CreateListing from './components/createListing';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "register",
    element: <Register/>,
  },
  {
    path: "user",
    element: <User/>,
  },
  {
    path: "createListing",
    element: <CreateListing/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
reportWebVitals();
