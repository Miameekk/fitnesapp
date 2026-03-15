import { NavLink } from "react-router-dom";
import "./style-navbar.css";

export default function Navbar() {
  return (
    <header className="Navbar-container">
      <div className="logo">
        <img src="./logo2.png" alt="logo aplikacji :)" />
        <h1>Fitnes <span>App</span></h1>
      </div>
      <div className="menu">
        <nav>
          <NavLink to="/" className="link" end>
            Strona główna
          </NavLink>
          <NavLink to="/autors" className="link">
            Autorzy
          </NavLink>
          <NavLink to="/generate-plan" className="link-btn">
            Nasze AI
          </NavLink>
        </nav>
      </div>
    </header>
  );
}