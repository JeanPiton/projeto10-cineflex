import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GlobalStyle from './style/GlobalStyle.js'
import ResetStyle from './style/ResetStyle.js'
import axios from 'axios'

axios.defaults.headers.common['Authorization'] = 'KCBzr71vozUKlKdg12TnTEQT';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ResetStyle/>
    <GlobalStyle/>
    <App />
  </React.StrictMode>,
)
