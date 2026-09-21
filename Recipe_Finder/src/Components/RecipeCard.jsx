// RecipeCard.jsx
import { Link } from "react-router-dom";

function RecipeCard({ recipe, isFavorite, onToggleFavorite }) {
  return (
    <article className="card">
      <Link to={`/recipe/${recipe.idMeal}`}>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} loading="lazy" />
      </Link>
      <div className="card__body">
        <h3>{recipe.strMeal}</h3>
        {recipe.strCategory && (
          <p className="card__meta">{recipe.strCategory} · {recipe.strArea}</p>
        )}
        <button
          className={isFavorite ? "btn btn--active" : "btn"}
          onClick={() => onToggleFavorite(recipe)}
        >
          {isFavorite ? "♥ Saved" : "♡ Save"}
        </button>
      </div>
    </article>
  );
}
export default RecipeCard;