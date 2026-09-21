const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

async function fetchJson(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error("Something went wrong. Please check your connection and try again.");
  }
  return response.json();
}

export async function searchByName(name) {
  const data = await fetchJson(`/search.php?s=${encodeURIComponent(name)}`);
  return data.meals ?? [];
}

export async function searchByIngredient(ingredient) {
  const formatted = ingredient.trim().replace(/\s+/g, "_");
  const data = await fetchJson(`/filter.php?i=${encodeURIComponent(formatted)}`);
  return data.meals ?? [];
}

export async function getMealById(id) {
  const data = await fetchJson(`/lookup.php?i=${id}`);
  return data.meals ? data.meals[0] : null;
}