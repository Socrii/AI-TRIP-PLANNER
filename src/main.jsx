import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './create-trip/index.jsx';  
import Header from './components/custom/Header.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view-trip/index.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header /> 
      <App/>
      {/* <RouterProvider router={router} /> */}
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
