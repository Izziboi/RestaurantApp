import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, addToFavorites, removeFromFavorites } from '../store/store.js';
import Buttons from '../components/Buttons.js';
import { CartContext } from '../context/CartContext.js';
import Navigate from '../components/Navigate.js';


/**
 * Diese Funktion führt folgende Aktionen aus:
 * <ul>
 *  <li>Ruft ein Rezept samt Inhalt aus recipes.json ab, wenn auf der Startseite darauf geklickt wird.</li>
 *  <li>Verwaltet das Hinzufügen des Rezepts zur Cart.js-Seite.</li>
 *  <li>Verwaltet das Hinzufügen und Löschen von Lieblingsrezepten zu und von localhost.</li>
 * </ul>
 * @returns Weigt ein ausgewähltes Rezept von der Startseite und mit allen Details an.
 */

const Order = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const plates = useSelector((state) => state.plates[id] || 0); // Get recipes by id through store.js
  const favorites = useSelector((state) => state.favorites); // Get favorites list from Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/recipes');
        const data = await response.json();

        const allRecipes = Object.values(data[0]).flat().slice(1);
        const foundRecipe = allRecipes.find((item) => item.id === id);
        setRecipe(foundRecipe);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    fetchRecipe();
  }, [id]);

  // Check if the recipe is in the favorites list
  const isFavorite = recipe && favorites.includes(recipe.recipe);

  const handleAddToCart = () => {
    const cartItem = { ...recipe, plates };
    addToCart(cartItem);
    navigate('/cart');
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(recipe.recipe)); // Remove by name
    } else {
      dispatch(addToFavorites(recipe.recipe)); // Add only the name
    }
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="order-main-div">
      <Navigate />
      <img src={recipe.src} alt={recipe.alt} />
      <div className="order-div2">
        <button
          onClick={() => dispatch(decrement({ recipeId: id }))}
          className="order-btn1"
        >
          -
        </button>
        <span>{plates}</span>
        <button
          onClick={() => dispatch(increment({ recipeId: id }))}
          className="order-btn2"
        >
          +
        </button>
      </div>
      <h2>{recipe.recipe}</h2>
      <p>
        <strong>Ingredients:</strong> {recipe.ingredients.join(', ')}
      </p>
      <div className="order-btn-div">
        <Buttons type="addToCart" label="Add To Cart" onClick={handleAddToCart} />
        <Buttons
          type={isFavorite ? 'removeFromFavorite' : 'addToFavorite'}
          label={isFavorite ? 'Remove From Favorite' : 'Add To Favorite'}
          onClick={handleToggleFavorite}
        />
      </div>
    </div>
  );
};

export default Order;
