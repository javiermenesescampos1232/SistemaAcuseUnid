import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkbox from '@mui/material/Checkbox';  // Importamos Checkbox desde @mui/material
import FormControlLabel from '@mui/material/FormControlLabel';  // Importamos FormControlLabel desde @mui/material
import jsPDF from 'jspdf';
import './App.css';
import LoginForm from './components/LoginForm';
import DocumentForm from './components/DocumentForm';
import PrivateRoute from './components/PrivateRoute';

const App = () => {

  return (

    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DocumentForm/>} />
        </Route>
 
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  )
 

  

  
};

export default App;
