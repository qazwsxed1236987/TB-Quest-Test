import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import Index from './page';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Index />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
