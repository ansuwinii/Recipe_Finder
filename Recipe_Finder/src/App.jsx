import { BrowserRoutes, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import { useLocalStorage } from "./Hooks/useLocalStorage";

import './App.css'

function App() {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.idMeal === recipe.idMeal);
      if (exists) {
        return prev.filter((item) => item.idMeal !== recipe.idMeal);
      }
      const { idMeal, strMeal, strMealThumb, strCategory, strArea } = recipe;
      return [...prev, { idMeal, strMeal, strMealThumb, strCategory, strArea }];
    });
  };

  return (
   <BrowserRouter>
      <Navbar favoritesCount={favorites.length} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home favorites={favorites} onToggleFavorite={toggleFavorite} />} />
          <Route path="/recipe/:id" element={<RecipeDetails favorites={favorites} onToggleFavorite={toggleFavorite} />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App
