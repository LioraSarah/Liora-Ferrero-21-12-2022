import React from 'react';
import App from './App';
// import "..//index.css";
import { Provider } from 'react-redux';
//import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/store';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";


const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);