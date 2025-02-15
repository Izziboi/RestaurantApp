import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigate from '../components/Navigate.js';

const Home = () => {
  const [recipes, setRecipes] = useState([]); // Original recipes data
  const [filteredRecipes, setFilteredRecipes] = useState([]); // Filtered data for display
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/recipes');
        const data = await response.json();
        setRecipes(data);
        setFilteredRecipes(flattenRecipes(data)); // Initially display all recipes
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchRecipes();
  }, []);

  // Function to flatten and filter only recipes (skip category titles)
  const flattenRecipes = (data) => {
    return Object.values(data[0])
      .flat()
      .filter((item) => item.id.startsWith('r')); // Only include items with id starting with 'r'
  };

  const filterRecipes = (category, query) => {
    let filtered = [];
  
    // Apply category filter
    if (category === 'All') {
      filtered = flattenRecipes(recipes); // Show all recipes if "All" is selected
    } else {
      filtered = recipes.map((cat) => {
        if (cat[category.toLowerCase()]) {
          return { [category]: cat[category.toLowerCase()] };
        }
        return null;
      }).filter(Boolean);
      filtered = flattenRecipes(filtered);
    }
  
    // Apply search query filter
    if (query.trim()) {
      const lowerQuery = query.trim().toLowerCase();
      filtered = filtered.filter((recipe) =>
        recipe.recipe.toLowerCase().includes(lowerQuery)
      );
    }
  
    setFilteredRecipes(filtered);
  };
  

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterRecipes(category, searchQuery);
  };

  // Handle real-time search
  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterRecipes(selectedCategory, query);
  };

  return (
    <div className="home-main-div">
      <Navigate />

      {/* Category filter dropdown */}
      <div className="home-category-div">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="All">All</option>
          <option value="African">African</option>
          <option value="Asian">Asian</option>
          <option value="European">European</option>
        </select>
      </div>

      {/* Search bar */}
      <div className="home-search-div">
        <input
          type="text"
          placeholder="Search by recipe name"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </div>

      {/* Display filtered recipes */}
      <div className="home-images-div">
        {filteredRecipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="home-one-img-div">
              <Link to={`/order/${recipe.id}`}>
                <img src={recipe.src} alt={recipe.alt} />
              </Link>
              <p>{recipe.recipe}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;




