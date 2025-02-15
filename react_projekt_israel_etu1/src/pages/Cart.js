import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../store/store.js';
import Buttons from '../components/Buttons.js';
import { CartContext } from '../context/CartContext.js';
import Navigate from '../components/Navigate.js';

/**
 * Diese Funktion führt folgende Aktionen aus:
 * <ul>
 *  <li>Übernimmt das ausgewählte Rezept von der Order.js-Seite über CartContext.js.</li>
 *  <li>Verwaltet das Löschen des Rezepts.</li>
 * </ul>
 * @returns Zeigt das ausgewählte Rezept mit der Möglichkeit, die Anzahl der Plätze zu variieren und das Rezept auch zu löschen.
 */

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const dispatch = useDispatch();
  const plates = useSelector((state) => state.plates);

  const handleDelete = (recipeId) => {
    removeFromCart(recipeId);
  };

  return (
    <div className="cart-main-div">
      <Navigate />
      {cart.length === 0 ? (
        <p><strong>Your cart is empty!</strong></p>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            className="cart-div2">
            <img
              src={item.src}
              alt={item.alt}/>
            <div className="cart-div3">
              <h3>{item.recipe}</h3>
              <div className="cart-div4">
                <button
                  className="cart-btn1"
                  onClick={() => dispatch(decrement({ recipeId: item.id }))}>
                  -
                </button>
                <span className="cart-span">
                  {plates[item.id] || 0}
                </span>
                <button
                  className="cart-btn2"
                  onClick={() => dispatch(increment({ recipeId: item.id }))}>
                  +
                </button>
              </div>
              <div className="cart-buttons-div">
                <Buttons label="Delete" type="delete" onClick={() => handleDelete(item.id)} />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
