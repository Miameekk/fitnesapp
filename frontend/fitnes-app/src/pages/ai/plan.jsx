import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import './plan.css';

export default function Plan() {
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
    const [isLocked, setIsLocked] = useState(false);
    const [plan, setPlan] = useState([]);

    const handleSubmit = (e) => {
        localStorage.setItem("Imię", name);
        e.preventDefault();
        setIsLocked(true);

        // walidacja pól
        if (!weight || !age || !goal || !days || !experience) {
            alert("Wypełnij wszystkie wymagane pola!");
            setIsLocked(false);
            return;
        }
        
            let bmr;

            if (sex === "male") {
                bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
            } else {
                bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
            }

            let tdee = 0;

            if (activity === "low") {
                tdee = bmr * 1.2;
            } else if (activity === "medium") {
                tdee = bmr * 1.375;
            } else if (activity === "high") {
                tdee = bmr * 1.55;
            } else {
                tdee = bmr;
            }

            let goalCalories = tdee;

            if (goal === "lose-weight") {
                goalCalories -= 500;
            } else if (goal === "gain-weight") {
                goalCalories += 500;
            }

            goalCalories = Math.round(goalCalories);
        
            localStorage.setItem("TDEE", tdee);
            localStorage.setItem("Deficyt kalorii", goalCalories);

        const data = {
            weight: Number(weight),
            age: Number(age),
            goal,
            days: Number(days),
            experience,
        };

        fetch("http://localhost:3001/api/generate-plan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (!res.ok) throw new Error("Błąd w API");
            return res.json();
        })
        .then(responseData => {
            console.log("Backend zwrócił:", responseData);

            const returnedPlan = responseData.plan?.plan || []; // <- TU bezpiecznie wyciągamy tablicę
            setPlan(Array.isArray(returnedPlan) ? returnedPlan : [returnedPlan]);
            localStorage.clear();
        })
        .catch(err => console.error("Błąd:", err) && localStorage.clear() && setIsLocked(false) && alert("Wystąpił błąd podczas generowania planu. Spróbuj ponownie."))
        .finally(() => setIsLocked(false) && localStorage.clear());

    };

    return (
        <div className="generate-container">
            <h2 className="title-plan">Wygeneruj plan treningowy dla siebie</h2>
            <div className='plan-linia'></div>
            <div className="form-columns">

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
                            <option value="weight-loss">Odchudzanie</option>
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

                        <label>Dodatkowe Uwagi</label>
                        <textarea placeholder="Dodatkowe Uwagi" value={notes} onChange={(e) => setNotes(e.target.value)} disabled={isLocked}></textarea>

                        <button type="submit" disabled={isLocked}>Wygeneruj plan</button>
                        <NavLink to="/" className="btn-backtohome">Wróć do strony głównej</NavLink>
                    </form>
                </div>

                <div className="form-container-right plan-container">
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
        </div>
    );
}