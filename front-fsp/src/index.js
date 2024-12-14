import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from "./components/UI/NavBar/Navbar";
import AppRouter from "./router/AppRouter";
import {BrowserRouter as Router} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
     <Router>
          <Navbar/>
          <AppRouter/>
      </Router>
  </>
  
);
