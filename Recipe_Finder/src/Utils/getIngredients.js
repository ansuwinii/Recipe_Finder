export function getIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (name && name.trim()) {
      ingredients.push({ id: i, name: name.trim(), measure: measure ? measure.trim() : "" });
    }
  }
  return ingredients;
}