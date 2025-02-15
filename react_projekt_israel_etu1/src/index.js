import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store.js';
import App from './App.js';
import './index.css';
import reportWebVitals from './reportWebVitals.js';
import { CartProvider } from './context/CartContext.js';

/**
 * <ul>
 *  <li>Dies ruft die Haupt-App-Komponente namens App.js auf.</li>
 *  <li>Der „Provider“ stellt den App-Komponenten die Eigenschaften des Redux-Stores über store.js zur Verfügung.</li>
 *  <li>Der „CartProvider“ stellt den App-Komponenten die Eigenschaften von CartContext.js zur Verfügung.</li>
 * </ul>
 */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <CartProvider>
        <App />
      </CartProvider>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
