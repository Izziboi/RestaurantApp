import React from 'react';
import './Buttons.css';

/**
 * <ul>
 *  <li>Dadurch wird eine Vorlage für Schaltflächen erstellt und diese verschiedenen Komponenten wie „Order.js“ und „Cart.js“ bereitgestellt.</li>
 * </ul>
 */

const Buttons = ({ type, label, onClick }) => {
  let buttonClass = '';

  switch (type) {
    case 'addToCart':
      buttonClass = 'btn-add-to-cart';
      break;
    case 'addToFavorite':
      buttonClass = 'btn-add-to-favorite';
      break;
    case 'removeFromFavorite':
      buttonClass = 'btn-remove-from-favorite';
      break;
    case 'delete':
      buttonClass = 'btn-delete';
      break;
    default:
      buttonClass = 'btn-default';
  }

  return (
    <div className="buttons-div">
      <button className={buttonClass} onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export default Buttons;
