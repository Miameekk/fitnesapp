import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from "react-router-dom";
import './plan.css';
/*import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';*/

export default function Plan() {
    const noapi = false;
    const [spiner, setSpiner] = useState(false);
    const [name, setName] = useState('');
    const [sex, setSex] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [goal, setGoal] = useState('');
    const [days, setDays] = useState('');
    const [activity, setActivity] = useState('');
    const [experience, setExperience] = useState('');
    const [notes, setNotes] = useState('');
    const [healt, setHealth] = useState('');
    const [exercises, setExercises] = useState('');
    const [isLocked, setIsLocked] = useState(false);
    //const [pdflock, setPdflock] = useState(true);
    

    const [plan, setPlan] = useState([]);
    const [dietPlan, setDietPlan] = useState([]);
    const [dietTotals, setDietTotals] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });


        useEffect(() => {

            if (spiner || noapi) {
                document.body.classList.add("no-scroll");
                window.scrollTo(0, 0);
            } else {
                document.body.classList.remove("no-scroll");
            }

            return () => document.body.classList.remove("no-scroll");

        }, [spiner, noapi]);


    const rightColRef = useRef();

    /* --- Funkcja generująca PDF ---
        const generatePDF = async () => {
            if (!rightColRef.current) {
                alert("Kolumna nie jest jeszcze wyrenderowana!");
                return;
            }

            rightColRef.current.classList.add("pdf-mode");

            const pdf = new jsPDF("p", "mm", "a4"); 
            const margin = 15;
            const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
            const pxPerMm = 3.78;
            const pdfWidthPx = pdfWidth * pxPerMm;

            try {
                // Najpierw renderujemy cały obszar jako canvas
                const canvas = await html2canvas(rightColRef.current, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: "#ffffff"
                });

                // Skalujemy canvas do dokładnej szerokości strony A4 (z marginesem)
                const scaledCanvas = document.createElement("canvas");
                const scaledWidth = Math.round(pdfWidthPx);
                const scaledHeight = Math.round((canvas.height / canvas.width) * scaledWidth);
                scaledCanvas.width = scaledWidth;
                scaledCanvas.height = scaledHeight;

                const ctx = scaledCanvas.getContext("2d");
                ctx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight);

                const pageHeightMm = pdf.internal.pageSize.getHeight() - 2 * margin;
                const pageHeightPx = Math.round(pageHeightMm * pxPerMm);

                // Dodajemy kolejne strony, jeśli obraz jest wyższy niż jedna strona A4
                for (let y = 0; y < scaledHeight; y += pageHeightPx) {
                    const sliceHeight = Math.min(pageHeightPx, scaledHeight - y);
                    const sliceCanvas = document.createElement("canvas");
                    sliceCanvas.width = scaledWidth;
                    sliceCanvas.height = sliceHeight;

                    const sliceCtx = sliceCanvas.getContext("2d");
                    sliceCtx.drawImage(
                        scaledCanvas,
                        0,
                        y,
                        scaledWidth,
                        sliceHeight,
                        0,
                        0,
                        scaledWidth,
                        sliceHeight
                    );

                    const sliceData = sliceCanvas.toDataURL("image/png");
                    pdf.addImage(sliceData, "PNG", margin, margin, pdfWidth, sliceHeight / pxPerMm);

                    if (y + pageHeightPx < scaledHeight) {
                        pdf.addPage();
                    }
                }

                pdf.save("plan.pdf");
            } finally {
                rightColRef.current.classList.remove("pdf-mode");
            }
        };
*/
const handleSubmit = async (e) => {
    setSpiner(true)
    e.preventDefault();
    setIsLocked(true);
    localStorage.clear();
    localStorage.setItem("Imię", name);

    if (!weight || !age || !goal || !days || !experience) {
        alert("Wypełnij wszystkie wymagane pola!");
        setIsLocked(false);
        setSpiner(false);
        return;
    }

    try {
        // ======================
        // OBLICZENIA TDEE i CEL KALORYCZNY
        // ======================
        let bmr;
        if (sex === "male") {
            bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
        } else {
            bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
        }

        let tdee = bmr;
        if (activity === "low") tdee *= 1.2;
        else if (activity === "medium") tdee *= 1.375;
        else if (activity === "high") tdee *= 1.55;

        let goalCalories = tdee;
        if (goal === "lose-weight") goalCalories -= 500;
        else if (goal === "gain-weight") goalCalories += 500;

        goalCalories = Math.round(goalCalories);
        localStorage.setItem("TDEE", tdee);
        localStorage.setItem("Deficyt kalorii", goalCalories);

        // ======================
        // PLAN DIETY
        // ======================
        const dietResponse = await fetch(
            "http://localhost:3001/api/submit-health-data",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    age: Number(age),
                    weight: Number(weight),
                    height: Number(height),
                    gender: sex,
                    caloricDeficit: goalCalories,
                    goal,
                    healthIssues: healt,
                    additionalNotes: notes || ""
                })
            }
        );

        if (!dietResponse.ok){
            setSpiner(false);
            throw new Error("Błąd planu dietetycznego");
        } 

        const dietData = await dietResponse.json();
        console.log("Raw dietData:", dietData);

        // 🔹 BEZPIECZNE PARSOWANIE mealPlan
        let parsedMealPlan = {};
        if (typeof dietData.mealPlan === "string") {
            const safeString = dietData.mealPlan.replace(/([0-9]+)g/g, "$1");
            parsedMealPlan = JSON.parse(safeString || "{}");
        } else if (typeof dietData.mealPlan === "object" && dietData.mealPlan !== null) {
            parsedMealPlan = dietData.mealPlan;
        }

        const meals = Array.isArray(parsedMealPlan.meals) ? parsedMealPlan.meals : [];

        setDietPlan(meals);
        setDietTotals({
            calories: parsedMealPlan.totalCalories || 0,
            protein: parsedMealPlan.totalProtein || 0,
            carbs: parsedMealPlan.totalCarbs || 0,
            fat: parsedMealPlan.totalFat || 0
        });

        localStorage.setItem("dietPlan", JSON.stringify(meals));
        localStorage.setItem("dietTotals", JSON.stringify({
            calories: parsedMealPlan.totalCalories || 0,
            protein: parsedMealPlan.totalProtein || 0,
            carbs: parsedMealPlan.totalCarbs || 0,
            fat: parsedMealPlan.totalFat || 0
        }));
        

        // 🔹 przerwa 2s między requestami
        await new Promise(resolve => setTimeout(resolve, 2000));

        // ======================
        // PLAN TRENINGOWY
        // ======================
        const trainingResponse = await fetch(
            "http://localhost:3001/api/generate-plan",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    excludedExercises: exercises,
                    days: Number(days),
                })
            }
        );

        if (!trainingResponse.ok) throw new Error("Błąd planu treningowego");

        const trainingData = await trainingResponse.json();
        console.log("Plan treningowy:", trainingData);

        const returnedPlan = Array.isArray(trainingData.plan?.plan)
            ? trainingData.plan.plan
            : trainingData.plan
                ? [trainingData.plan]
                : [];

        setPlan(returnedPlan);

    } catch (err) {
        console.error("Błąd:", err);
        alert("Wystąpił błąd podczas generowania planu.");
        setSpiner(false)
    } finally {
        setIsLocked(false);
        //setPdflock(false);
        setSpiner(false)
    }
};
 
    return (
            <div className="generate-container">
                {noapi && (
                    <div className="no-api-overlay">
                        <div className="no-api-message">
                            <h2>Brak połączenia z API</h2>
                            <p>Nie można połączyć się z serwerem.<br></br><strong>ERROR: 404</strong></p>
                            <NavLink to="/">Wróć do strony głównej</NavLink>
                        </div>
                    </div>
                )}
                {spiner && (
                <div className="plan-loader-wrapper">
                    <div className="spinner"></div>
                </div>
                )}
            <h2 className="title-plan">Wygeneruj plan treningowy i dietetyczny</h2>
            <div className='plan-linia'></div>

            <div className="form-columns">

                {/* ================= FORMULARZ LEWA KOLUMNA ================= */}
                <div className="form-container-left">
                <form className="generate-form" onSubmit={handleSubmit}>
                    <label>Podaj swoje imię</label>
                    <input type="text" placeholder="Twoje imię" value={name} onChange={(e) => setName(e.target.value)} disabled={isLocked} />

                    <label>Podaj swoją płeć</label>
                    <select value={sex} onChange={(e) => setSex(e.target.value)} disabled={isLocked}>
                    <option value="">-- Wybierz --</option>
                    <option value="male">Mężczyzna</option>
                    <option value="female">Kobieta</option>
                    </select>

                    <label>Podaj swoją wagę</label>
                    <input type="number" placeholder="Twoja waga" max='150' value={weight} onChange={(e) => setWeight(e.target.value)} disabled={isLocked} />

                    <label>Podaj swój wzrost</label>
                    <input type="number" placeholder="Twój wzrost" max='250' value={height} onChange={(e) => setHeight(e.target.value)} disabled={isLocked} />

                    <label>Podaj swój wiek</label>
                    <input type="number" placeholder="Twój wiek" max='100' value={age} onChange={(e) => setAge(e.target.value)} disabled={isLocked} />

                    <label>Jakie masz doświadczenie</label>
                    <select value={experience} onChange={(e) => setExperience(e.target.value)} disabled={isLocked}>
                    <option value="">-- Wybierz --</option>
                    <option value="experienced-before">Ćwiczyłem wcześniej</option>
                    <option value="trained-no-results">Ćwiczyłem, ale bez skutków</option>
                    <option value="none">Żadne</option>
                    </select>

                    <label>Podaj swój cel treningowy</label>
                    <select value={goal} onChange={(e) => setGoal(e.target.value)} disabled={isLocked}>
                    <option value="">-- Wybierz --</option>
                    <option value="lose-weight">Odchudzanie</option>
                    <option value="muscle-gain">Masa</option>
                    <option value="maintain-weight">Utrzymanie wagi</option>
                    </select>

                    <label>Ilość dni treningowych</label>
                    <input type="number" placeholder="Ilość dni" max='7' value={days} onChange={(e) => setDays(e.target.value)} disabled={isLocked} />

                    <label>Podaj swój poziom aktywności fizycznej</label>
                    <select value={activity} onChange={(e) => setActivity(e.target.value)} disabled={isLocked}>
                    <option value="">-- Wybierz --</option>
                    <option value="low">Niska</option>
                    <option value="medium">Średnia</option>
                    <option value="high">Wysoka</option>
                    </select>

                    <label>Czy masz jakies problemy zdrowotne?</label>
                    <textarea placeholder='Problemy zdrowotne' value={healt} onChange={(e) => setHealth(e.target.value)} disabled={isLocked}></textarea>

                    <label>Czy chcesz wyłączyc jakieś ćwiczenia z trenigu?</label>
                    <textarea placeholder='Wypisz nazwy ćwiczeń (OGÓLNIE!)' value={exercises} onChange={(e) => setExercises(e.target.value)} disabled={isLocked}></textarea>

                    <label>Dodatkowe Uwagi</label>
                    <textarea placeholder="Dodatkowe Uwagi" value={notes} onChange={(e) => setNotes(e.target.value)} disabled={isLocked}></textarea>

                    <button type="submit" disabled={isLocked}>Wygeneruj plan</button>
                    <NavLink to="/" className="btn-backtohome">Wróć do strony głównej</NavLink>
                    {/*<button type="button" onClick={generatePDF} disabled={pdflock}>
                        Pobierz PDF
                    </button> */}
                </form>
                </div>

                {/* ================= PRAWA KOLUMNA ================= */}
                <div className="form-container-right" ref={rightColRef}>

                {/* PLAN TRENINGOWY */}
                <div className="plan-wrapper">
                <h3>Plan Treningowy</h3>
                <div className="plan-container">
                    {plan.length > 0 ? (
                    plan.map((day, index) => (
                        <div key={index} className="plan-card">
                            <div className="plan-heder">{day?.dzien || "Brak dnia"}</div>
                            <p className="plan-partia">Partia: {day?.partia || "Brak partii"}</p>
                            <div className="plan-body">
                                {day?.cwiczenia?.length > 0 ? (
                                    <ul>
                                        {day.cwiczenia.map((ex, idx) => (
                                            <li key={idx}>
                                                {ex.nazwa} - {ex.serie} serie {ex.powtorzenia ? `× ${ex.powtorzenia}` : ""}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Brak ćwiczeń – dzień odpoczynku</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Wygeneruj plan, aby zobaczyć szczegóły.</p>
                )}
                </div>
                </div>

                {/* PLAN DIETY */}
                <div className="diet-wrapper">
                    <h3>Plan Dietetyczny</h3>
                    {dietPlan.length > 0 ? (
                    <table className="diet-table">
                        <thead>
                        <tr>
                            <th>Posiłek</th>
                            <th>Kcal</th>
                            <th>Białko</th>
                            <th>Węglowodany</th>
                            <th>Tłuszcze</th>
                            <th>Produkty</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dietPlan.map((meal, idx) => (
                            <tr key={idx} >
                            <td>{meal.meal} </td>
                            <td>{meal.calories} kcal</td>
                            <td>{meal.protein} g</td>
                            <td>{meal.carbs} g</td>
                            <td>{meal.fat} g</td>
                            <td>
                                <ul>
                                {meal.foods.map((food, fIdx) => (
                                    <li key={fIdx}>{food}</li>
                                ))}
                                </ul>
                            </td>
                            </tr>
                        ))}
                        <tr className="diet-total">
                            <td>SUMA</td>
                            <td>{dietTotals.calories} kcal</td>
                            <td>{dietTotals.protein} g</td>
                            <td>{dietTotals.carbs} g</td>
                            <td>{dietTotals.fat} g</td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                    ) : (
                    <p>Wygeneruj plan dietetyczny, aby zobaczyć szczegóły.</p>
                    )}
                </div>

                </div>
            </div>
            </div> 
    );
}