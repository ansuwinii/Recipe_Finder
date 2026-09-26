# Recipe Finder

A single-page React application that lets users search for recipes by name or ingredient using [TheMealDB API](https://www.themealdb.com/api.php), view full recipe details, and save favorite recipes for later — all without needing an account, since favorites are stored locally in the browser.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [How It Was Built](#how-it-was-built)
- [Setup Instructions](#setup-instructions)
- [Screenshots](#screenshots)
- [Known Limitations](#known-limitations)

---

## Features

- **Search by name or ingredient** — toggle between the two search modes using a dropdown.
- **Responsive recipe grid** — displays results as cards with image, title, category, and area (cuisine).
- **Recipe details page** — full ingredient list with measurements, and step-by-step instructions, plus a YouTube link when available.
- **Favorites system** — save or remove any recipe with one click; favorites persist across page refreshes using `localStorage`.
- **Dedicated Favorites page** — view all saved recipes in one place, accessible via React Router.
- **Loading, error, and empty states** — clear feedback while data is fetching, if a request fails, or if a search returns no results.
- **Fully responsive layout** — works on both desktop and mobile screen widths.

---

## Technologies Used

- **React** (functional components + hooks) — built with [Vite](https://vitejs.dev/) for fast development
- **React Router (`react-router-dom`)** — for client-side navigation between Home, Recipe Details, and Favorites pages
- **TheMealDB API** — free public API used for all recipe data
- **CSS** (custom, with CSS variables) — for styling and responsive layout
- **Browser `localStorage`** — to persist favorite recipes between sessions
- **Git & GitHub** — for version control

---

## Project Structure

```
recipe-finder/
├── public/
├── src/
│   ├── api/
│   │   └── mealdb.js          # All TheMealDB API calls in one place
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── SearchBar.jsx
│   │   ├── RecipeCard.jsx
│   │   ├── RecipeGrid.jsx
│   │   └── StatusMessage.jsx
│   ├── hooks/
│   │   └── useLocalStorage.js # Custom hook to sync state with localStorage
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── RecipeDetails.jsx
│   │   └── Favorites.jsx
│   ├── utils/
│   │   └── getIngredients.js  # Turns strIngredient1..20 fields into a clean list
│   ├── App.jsx                # Routing + favorites state (shared across pages)
│   ├── main.jsx
│   └── index.css
├── screenshots/
├── package.json
└── README.md
```

---

## How It Was Built

This project was built step by step, with each stage committed to Git separately to keep a clear history of progress:

1. **Project initialization** — scaffolded with `npm create vite@latest` using the React template, then removed all unused boilerplate files (default `App.css`, sample logo, counter code) to start from a clean slate.
2. **API layer** — created a single `mealdb.js` file to handle all communication with TheMealDB (`search.php`, `filter.php`, `lookup.php`), so components never call `fetch` directly. Also built a small utility to convert TheMealDB's numbered ingredient fields (`strIngredient1`, `strMeasure1`, etc.) into a clean array.
3. **Routing setup** — installed `react-router-dom` and set up three routes (`/`, `/recipe/:id`, `/favorites`) inside `App.jsx`, along with a `Navbar` for navigation.
4. **Search functionality** — built a controlled `SearchBar` component with a dropdown to switch between searching by name and by ingredient, using `onChange` and `onSubmit`.
5. **Displaying results** — created `RecipeCard` and `RecipeGrid` components to render search results as a responsive grid, using `.map()` with each recipe's unique `idMeal` as the React key.
6. **Data fetching** — used `useState` and `useEffect` in the `Home` page to fetch recipes whenever the search query or mode changes, with proper loading, error, and "no results" states handled through conditional rendering.
7. **Recipe details page** — used React Router's `useParams` to read the recipe ID from the URL and fetch full details, including ingredients and instructions.
8. **Favorites feature** — built a custom `useLocalStorage` hook (using `useEffect` to sync state to the browser's storage) so favorited recipes persist even after refreshing the page. Favorites state lives in `App.jsx` and is passed down to every page via props, with a callback function passed back up to toggle favorites — demonstrating parent-to-child and child-to-parent data flow.
9. **Favorites page** — a simple page that reuses the existing `RecipeGrid` component to display only saved recipes.
10. **Styling** — applied a consistent color scheme using CSS variables, an auto-adjusting CSS grid for the recipe cards, and a media query to keep the layout usable on mobile screens.
11. **Testing and cleanup** — checked the browser console for errors/warnings, removed unused imports and variables, and ran the linter before final submission.
12. **Documentation** — wrote this README and captured screenshots of the working app.

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/recipe-finder.git
   cd recipe-finder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser at the address shown in the terminal (usually `http://localhost:5173`).

No API key or environment variables are required — TheMealDB's free test endpoint is public.

---

## Screenshots

![Home page with search results](./screenshot/home.png)

![Recipe details page](./screenshot/detail.png)
![Recipe details page](./screenshot/details.png)

![Favorites page](./screenshot/favourites.png)

---

## Known Limitations

- Searching by ingredient returns limited data from TheMealDB (no category, cuisine, or instructions in the results list), so those fields only appear once you open a recipe's details page.
- The search query resets to the default term if you navigate back to the Home page, since it is not currently saved between visits.
- No pagination or "load more" functionality — all matching results are shown at once.
- No category/cuisine filter dropdown (stretch goal, not implemented).

