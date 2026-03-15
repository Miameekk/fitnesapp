import { NavLink } from "react-router-dom";
import "./style-footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <img
            src="./logo.png"
            alt="Logo"
            className="footer__logo"
          />
          <span className="footer__name">Fitnes App</span>
        </div>

        <div className="footer__links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/generate-plan">Generuj Plan</NavLink>
          <NavLink to="/autors">Autorzy</NavLink>
        </div>

        <div className="footer__socials">
          <a href="https://discord.gg/soonqwe" aria-label="Discord" target="_blank"><ion-icon name="logo-discord"></ion-icon></a>
          <a href="https://github.com/Miameekk/fitnesapp" target="_blank" aria-label="GitHub"><ion-icon name="logo-github"></ion-icon></a>
          <a href="https://instagram.com/wstawic co sie chce" aria-label="Instagram" target="_blank"><ion-icon name="logo-instagram"></ion-icon></a>
        </div>
      </div>

    <div className="linia"></div>

      <div className="footer__bottom">
        © {new Date().getFullYear()} Fitnes App. All rights reserved.
      </div>
    </footer>
  );
}
