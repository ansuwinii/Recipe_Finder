import { useState, useEffect } from "react";
import SearchBar from "../Components/SearchBar";
import RecipeGrid from "../Components/RecipeGrid";
import StatusMessage from "../Components/StatusMessage";
import { searchByName, searchByIngredient } from "../API/mealdb";

function Home({ favorites, onToggleFavorite }) {
  const [query, setQuery] = useState("chicken");
  const [mode, setMode] = useState("name");
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false; // prevents an old request overwriting a newer one

    async function loadRecipes() {
      setStatus("loading");
      try {
        const data = mode === "name"
          ? await searchByName(query)
          : await searchByIngredient(query);
        if (!ignore) {
          setRecipes(data);
          setStatus("success");
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage(error.message);
          setStatus("error");
        }
      }
    }

    loadRecipes();
    return () => { ignore = true; };
  }, [query, mode]);

  return (
    <section>
      <SearchBar mode={mode} onModeChange={setMode} onSearch={setQuery} />

      {status === "loading" && <StatusMessage type="loading" message="Loading recipes..." />}
      {status === "error" && <StatusMessage type="error" message={errorMessage} />}
      {status === "success" && recipes.length === 0 && (
        <StatusMessage type="empty" message={`No recipes found for "${query}".`} />
      )}
      {status === "success" && recipes.length > 0 && (
        <RecipeGrid recipes={recipes} favorites={favorites} onToggleFavorite={onToggleFavorite} />
      )}
    </section>
  );
}

export default Home;