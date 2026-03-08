import { useState } from "react";
import "./bmi-styles.css";

function BmiCalculator({ showBmi, setShowBmi }) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));
      setLoading(false);
    }, 1500);
  };

  if (!showBmi) return null;

  return (
    <div className="bmi-container">

      {loading ? (
        <div className="loader-wrapper">
          <div className="spinner"></div>
        </div>
      ) : bmi ? (
            <div className="bmi-result">
            <h1>Twoje BMI</h1>
            <p>{bmi}</p>
            <p className="bmi-alert"
                style={{
                    color:
                    Number(bmi) < 18.5
                        ? "var(--accent)"           
                        : Number(bmi) < 25
                        ? "#23d400"                 
                        : "var(--accent)"           
                }}
                >
                {Number(bmi) < 18.5
                    ? "Niedowaga - rozważ zwiększenie kaloryczności diety"
                    : Number(bmi) < 25
                    ? "Waga prawidłowa w skali BMI"
                    : "Nadwaga - rozważ zmianę diety i aktywności fizycznej"}
                </p>

              <div className="bmi-image">
                    <img
                    src={
                        Number(bmi) < 18.5
                        ? "/nadwaga1.png"
                        : Number(bmi) < 25
                        ? "/jestgot.png"
                        : "/hhee.jpg"
                    }
                    alt="BMI result"
                    />
             </div>

            <div className="bmi-buttons">
                <button
                onClick={() => setBmi(null)}
                className="oblicz-ponownie"
                >
                Oblicz ponownie
                </button>
                <button
                onClick={() => setShowBmi(false)}
                className="close-bmi"
                >
                Zamknij
                </button>
            </div>
            </div>
      ) : (
        <>
          <h1>Kalkulator BMI</h1>
          <p>Oblicz swoje BMI</p>

          <form className="bmi-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Waga (kg):</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                min='1'
                max='150'
                placeholder="np. 70kg"
              />
            </div>

            <div className="form-group">
              <label>Wzrost (cm):</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                min='1'
                max='220'
                placeholder="np. 170cm"
              />
            </div>

            <button type="submit">Oblicz BMI</button>
            <button
              type="button"
              className="bmi-close"
              onClick={() => setShowBmi(false)}
            >
              Zamknij
            </button>
          </form>
        </>
      )}

    </div>
  );
}

export default BmiCalculator;