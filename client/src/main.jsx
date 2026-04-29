import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from "./store/store.js"
import { Provider } from "react-redux"

// ✅ Yeh line add ki hai taaki app load hote hi Dark Mode lag jaye
document.documentElement.setAttribute("data-theme", "dark");

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>
)