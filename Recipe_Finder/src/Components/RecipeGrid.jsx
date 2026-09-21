// RecipeGrid.jsx
import RecipeCard from "./RecipeCard";

function RecipeGrid({ recipes, favorites, onToggleFavorite }) {
  return (
    <div className="grid">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          isFavorite={favorites.some((fav) => fav.idMeal === recipe.idMeal)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
export default RecipeGrid;