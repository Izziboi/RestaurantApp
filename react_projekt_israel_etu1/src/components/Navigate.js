import React from 'react';
import { Link } from 'react-router-dom';

/**
 * <ul>
 *  <li>Dies implementiert die Weiterleitung von Seite zu Seite mit den Seitennamen als Links.</li>
 * </ul>
 */

const Navigate = () => {
  return (
    <nav className="navigate-nav">
      <Link to="/" className="nav-home-link">
        Home
      </Link>
      <Link to="/cart" className="nav-cart-link">
        Cart
      </Link>
    </nav>
  );
};

export default Navigate;
