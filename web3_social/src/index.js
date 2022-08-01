import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from 'web3uikit';

const APP_ID = process.env.REACT_APP_APP_ID
const SERVER_URL = process.env.REACT_APP_SERVER_URL

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId="ufv9D7XuK1c6DLci22U5AlZfaNN6bCh5q1c18asE" serverUrl="https://mht8fzkr6ucv.usemoralis.com:2053/server">
      <NotificationProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </NotificationProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
