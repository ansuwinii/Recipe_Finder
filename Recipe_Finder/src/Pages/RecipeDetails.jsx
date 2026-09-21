import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import StatusMessage from "../Components/StatusMessage";
import { getMealById } from "../API/mealdb";
import { getIngredients } from "../Utils/getIngredients";

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

  if (status === "loading") return <StatusMessage type="loading" message="Loading recipe..." />;
  if (status === "error") return <StatusMessage type="error" message="Could not load this recipe." />;
  if (status === "notfound") return <StatusMessage type="empty" message="Recipe not found." />;

  const isFavorite = favorites.some((fav) => fav.idMeal === meal.idMeal);
  const steps = meal.strInstructions.split(/\r?\n/).filter((line) => line.trim());

  return (
    <article className="details">
      <Link to="/">← Back to search</Link>
      <h1>{meal.strMeal}</h1>
      <p className="card__meta">{meal.strCategory} · {meal.strArea}</p>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <button className={isFavorite ? "btn btn--active" : "btn"} onClick={() => onToggleFavorite(meal)}>
        {isFavorite ? "♥ Saved" : "♡ Save"}
      </button>

      <h2>Ingredients</h2>
      <ul>
        {getIngredients(meal).map((item) => (
          <li key={item.id}>{item.measure} {item.name}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      {steps.map((step, index) => (
        <p key={index}>{step}</p>
      ))}

      {meal.strYoutube && (
        <a href={meal.strYoutube} target="_blank" rel="noreferrer">Watch on YouTube</a>
      )}
    </article>
  );
}

export default RecipeDetails;