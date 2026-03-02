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
          <NavLink to="/ai">AI</NavLink>
        </div>

        <div className="footer__socials">
          <a href="#" aria-label="Twitter"><ion-icon name="logo-twitter"></ion-icon></a>
          <a href="#" aria-label="GitHub"><ion-icon name="logo-github"></ion-icon></a>
          <a href="#" aria-label="LinkedIn"><ion-icon name="logo-linkedin"></ion-icon></a>
        </div>
      </div>

    <div className="linia"></div>

      <div className="footer__bottom">
        © {new Date().getFullYear()} Fitnes App. All rights reserved.
      </div>
    </footer>
  );
}
