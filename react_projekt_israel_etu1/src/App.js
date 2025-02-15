import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home.js';
import OrderPage from './pages/Order.js';
import CartPage from './pages/Cart.js'; 

/**
 * <ul>
 *  <li>Dies ist die Hauptkomponente der App. Sie ruft alle Seiten der Website auf und implementiert das Routing-Protokoll von Seite zu Seite.</li>
 * </ul>
 */

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'order/:id', element: <OrderPage /> },
      { path: 'cart', element: <CartPage /> }, 
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
