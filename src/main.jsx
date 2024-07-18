
// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './create-trip/index.jsx';  
import Header from './components/custom/Header.jsx';

// This is the default page, home page
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }, 
  {
    path: '/create-trip',
    element: <CreateTrip />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header/> 
    {/*  it will be at all the pages  */}
    <RouterProvider router={router} />
  </React.StrictMode>,
);
