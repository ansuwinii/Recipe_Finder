import { NavLink } from "react-router-dom";

function Navbar({ favoritesCount }) {
  return (
    <header className="navbar">
      <NavLink to="/" className="navbar__logo">Recipe Finder</NavLink>
      <nav className="navbar__links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/favorites">Favorites ({favoritesCount})</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;