import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
/*
import "../public/package/css/all.min.css"
import "../public/package/css/fontawesome.min.css"
import "../public/package/bootstrap/css/bootstrap.min.css"
import "../public/package/bootstrap/js/bootstrap.min.js"
*/
import {Provider} from 'react-redux'
import store from './store'



createRoot(document.getElementById('root')).render(
  //<StrictMode>
  <Provider store={store}>
    <App />
  </Provider>

  //</StrictMode>,
)
