import { configureStore, createSlice } from '@reduxjs/toolkit';

/**
 * Dies ist der Redux store.
 * <ul>
 *  <li>Er implementiert die Erhöhung und Verringerung der Anzahl der Teller eines Rezepts.</li>
 * <li>Er implementiert das Hinzufügen und Entfernen eines Lieblingsrezepts zum und vom localStorage.</li>
 * <li>Er stellt diese Eigenschaften zentral für alle Komponenten der App bereit.</li>
 * </ul>
 */

// Slice for managing the number of plates
const platesSlice = createSlice({
  name: 'plates',
  initialState: {},
  reducers: {
    increment: (state, action) => {
      const { recipeId } = action.payload;
      state[recipeId] = (state[recipeId] || 0) + 1;
    },
    decrement: (state, action) => {
      const { recipeId } = action.payload;
      if (state[recipeId] > 0) {
        state[recipeId] -= 1;
      }
    },
  },
});

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: JSON.parse(localStorage.getItem('favorites')) || [],
  reducers: {
    addToFavorites: (state, action) => {
      const recipeName = action.payload; // Only the recipe name
      if (!state.includes(recipeName)) {
        state.push(recipeName);
        localStorage.setItem('favorites', JSON.stringify(state));
      }
    },
    removeFromFavorites: (state, action) => {
      const recipeName = action.payload;
      const updatedState = state.filter((name) => name !== recipeName); //Non-matching names should remain in the array while matching ones should not
      localStorage.setItem('favorites', JSON.stringify(updatedState)); // Persist updated list
      return updatedState; // Return the updated state
    },
  },
});


// Export actions
export const { increment, decrement } = platesSlice.actions;
export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

// Configure the Redux store
const store = configureStore({
  reducer: {
    plates: platesSlice.reducer,
    favorites: favoritesSlice.reducer,
  },
});

export default store;
