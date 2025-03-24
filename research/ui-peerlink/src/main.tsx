import { createRoot } from 'react-dom/client'
import { HashRouter } from "react-router-dom";
import './index.css'
import App from './App.tsx'
// import store from './app/store';
// import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  // <Provider store={store}>
  <HashRouter>
        <App />
  </HashRouter>
  // </Provider>
)
