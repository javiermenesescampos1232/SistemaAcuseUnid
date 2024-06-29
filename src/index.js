// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import StudentVerificationForm from './StudentVerificationForm'; 



ReactDOM.render(
  <React.StrictMode>
    <div>
      <App />
      <StudentVerificationForm /> 
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
