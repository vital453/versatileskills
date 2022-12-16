import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './style/index.scss';
import 'aos/dist/aos';
import 'aos/dist/aos.css';
import '../node_modules/owl-carousel/owl-carousel/owl.carousel.css';
// import '../node_modules/owl-carousel/owl-carousel/owl.carousel.min.js';
import { ContextProvider } from './contexts/ContextProvider';
import { Provider } from 'react-redux';
import store from './app/store';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* react redux provider */}
     <Provider store={store}>
     <App />
    </Provider>
    {/* react api context provider */}
    {/* <ContextProvider>
     <App />
    </ContextProvider> */}
  </React.StrictMode>
);

