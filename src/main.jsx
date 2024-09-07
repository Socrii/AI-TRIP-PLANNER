import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import Header from './components/custom/Header.jsx'; 
import Bg from './components/custom/Bg.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      
      <Header /> 
      <Bg>
           <App />
      </Bg>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
