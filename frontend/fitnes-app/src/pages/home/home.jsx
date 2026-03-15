import { useEffect, useState  } from "react";
import { NavLink } from "react-router-dom";
import "./home.css";
import HomeCarousel from "../../components/HomeCarousel/HomeCarousel";
import BmiCalculator from "../bmi/bmi.jsx";


export default function Home() {
  const [showBmi, setShowBmi] = useState(false);

  useEffect(() => {
    // first sequence hero -> features -> carousel with timed delays
    const seq = ['.hero', '.features', '.carousel-section'];
    seq.forEach((sel, i) => {
      const el = document.querySelector(sel);
      if (el) {
        el.style.animationDelay = `${i * 0.6}s`;
        setTimeout(() => el.classList.add('visible'), i * 600);
      }
    });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    ['.about', '.appai'].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) observer.observe(el);
    });
  }, []);

  return (
    <div className="home-container">


      {/*bmi calculator */}
      {showBmi && (
        <div className="bmi-overlay">
          <BmiCalculator setShowBmi={setShowBmi} showBmi={showBmi} />
        </div>
      )}

      {/* Hero / Welcome */}
      <section className="hero fade-in">
        <div className="hero-circle" />
        <div className="hero-content">
          <h1>Witaj w Fitnes App!</h1>
          <p>Twoja aplikacja do tworzenia planów treningowych, obliczania BMI i zdrowego stylu życia.</p>
          <NavLink to="/generate-plan" className="btn-primary">Rozpocznij teraz</NavLink>
        </div>
      </section>

      {/* Features */}
      <section className="features fade-in">
        <div className="feature">
          <ion-icon name="fitness-outline" className="icon" />
          <h2>Plany treningowe</h2>
          <p>Spersonalizowane ćwiczenia.</p>
          <NavLink to="/generate-plan" className="link-btn">Rozpocznij</NavLink>
        </div>
        <div className="feature">
          <ion-icon name="body-outline" className="icon" />
          <h2>Kalkulator BMI</h2>
          <p>Oblicz swój BMI i śledź postępy.</p>
         <button className="link-btn" onClick={() => setShowBmi(true)}>Rozpocznij</button>
        </div>
        <div className="feature">
          <ion-icon name="restaurant-outline" className="icon" />
          <h2>Porady żywieniowe</h2>
          <p>Zdrowe przepisy i wskazówki.</p>
          <NavLink to="/generate-plan" className="link-btn">Rozpocznij</NavLink>
        </div>
        <div className="feature">
          <ion-icon name="analytics-outline" className="icon" />
          <h2>Śledzenie postępów</h2>
          <p>Bądź zmotywowany każdego dnia.</p>
          <span className="coming-soon">Coming soon</span>
        </div>
      </section>
      {/* Carousel */}
      <section className="carousel-section fade-in">
        <HomeCarousel />
      </section>

      {/* Motivation / About */}
      <section className="about fade-in">
        <div className="about-text">
          <h2>Dlaczego Fitnes App?</h2>
          <p>
            Nasza aplikacja łączy najważniejsze narzędzia, które pomogą Ci osiągnąć
            cele treningowe. Niezależnie od poziomu zaawansowania, znajdziesz tu
            inspirację i wsparcie. Trenerzy i społeczność wspierają każdy krok.
          </p>
          <div className="about-actions">
            <NavLink to="/generate-plan" className="about-button">Zacznij już teraz!</NavLink>
            <NavLink to="/autors" className="about-button" style={{ marginLeft: '10px', backgroundColor: 'transparent', border: '2px solid var(--accent)', color: 'var(--accent)', textDecoration: 'none', display: 'inline-block' }}>
              Poznaj autorów
            </NavLink>
          </div>
        </div>
        <div className="about-image">
          <img src="/trener.png" alt="Trener" />
        </div>

      </section>
    </div>
  );
}