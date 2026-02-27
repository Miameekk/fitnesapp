import { NavLink } from "react-router-dom";
import "./style-navbar.css";

export default function App() {
  return(
    <div className="Navbar-container">
        <div className="logo">
            <img src="./logo.png" alt="logo aplikacji :)" />
            <h1>Fitnes <span>App</span></h1>
        </div>
        <div className="menu">
            <nav>
                <NavLink to="/" className="link">Home</NavLink>
                <NavLink to="/about" className="link">About</NavLink>
                <NavLink to="/blog" className="link">Blog</NavLink>
                <NavLink to="/autors" className="link">Autors</NavLink>
                <NavLink to="/generate-plan" className="link-btn">Nasze AI</NavLink>
            </nav>
        </div>
    </div>
  );
}