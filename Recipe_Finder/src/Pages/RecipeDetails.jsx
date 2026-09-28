import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import StatusMessage from "../Components/StatusMessage";
import { getMealById } from "../API/mealdb";
import { getIngredients } from "../utils/getIngredients";

function RecipeDetails({ favorites, onToggleFavorite }) {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let ignore = false;

    async function loadMeal() {
      setStatus("loading");
      try {
        const data = await getMealById(id);
        if (!ignore) {
          setMeal(data);
          setStatus(data ? "success" : "notfound");
        }
      } catch {
        if (!ignore) setStatus("error");
      }
    }

    loadMeal();
    return () => { ignore = true; };
  }, [id]);

  if (status === "loading") return <div className="container"><StatusMessage type="loading" message="Loading recipe..." /></div>;
  if (status === "error") return <div className="container"><StatusMessage type="error" message="Could not load this recipe." /></div>;
  if (status === "notfound") return <div className="container"><StatusMessage type="empty" message="Recipe not found." /></div>;

  const isFavorite = favorites.some((fav) => fav.idMeal === meal.idMeal);
  const steps = meal.strInstructions.split(/\r?\n/).filter((line) => line.trim());

  return (
    <div className="container">
      <article className="details">
        <Link to="/" className="details__back">← Back to search</Link>

        <h1 className="details__title">{meal.strMeal}</h1>
        <p className="details__meta">{meal.strCategory} · {meal.strArea}</p>

        <div className="details__top">
          <div className="details__image">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <button className={isFavorite ? "btn btn--active" : "btn"} onClick={() => onToggleFavorite(meal)}>
              {isFavorite ? "♥ Saved to Favorites" : "♡ Save to Favorites"}
            </button>
          </div>

          <div className="details__ingredients">
            <h2>Ingredients</h2>
            <ul className="ingredient-list">
              {getIngredients(meal).map((item) => (
                <li key={item.id}>
                  <span className="ingredient-name">{item.name}</span>
                  <span className="ingredient-measure">{item.measure}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="details__instructions">
          <h2>Instructions</h2>
          {steps.map((step, index) => (
            <p key={index}>{step}</p>
          ))}

          {meal.strYoutube && (
            <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="details__youtube">
              ▶ Watch on YouTube
            </a>
          )}
        </div>
      </article>
    </div>
  );
}

export default RecipeDetails;