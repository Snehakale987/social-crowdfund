// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Import global styles
import '@fortawesome/fontawesome-free/css/all.min.css';
import AppWrapper from "./components/AppWrapper";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><AppWrapper /></React.StrictMode>);
