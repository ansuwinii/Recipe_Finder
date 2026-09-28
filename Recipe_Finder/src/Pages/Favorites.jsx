import RecipeGrid from "../Components/RecipeGrid";
import StatusMessage from "../Components/StatusMessage";

function Favorites({ favorites, onToggleFavorite }) {
  return (
    <section className="container">
      <h1 style={{ color: "var(--green)" }}>Your Favorites</h1>
      {favorites.length === 0 ? (
        <StatusMessage type="empty" message="No favorites yet. Save a recipe and it will show up here." />
      ) : (
        <RecipeGrid recipes={favorites} favorites={favorites} onToggleFavorite={onToggleFavorite} />
      )}
    </section>
  );
}

export default Favorites;