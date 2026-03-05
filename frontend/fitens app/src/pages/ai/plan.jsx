import React from 'react';
import {useState, useEffect} from 'react';
import { NavLink } from "react-router-dom";
import './plan.css';


export default function Plan() {

    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [goal, setGoal] = useState('');
    const [days, setDays] = useState('');
    const [activity, setActivity] = useState('');
    const [notes, setNotes] = useState('');
    const [isLocked, setIsLocked] = useState(false);
    const [plan, setPlan] = useState([]);

        useEffect(() => {
            fetch("/plan.json") 
            .then((res) => res.json())
            .then((data) => setPlan(data.plan)) 
            .catch((err) => console.error(err));
        }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLocked(true);

    /*   const data = {
            weight,
            height,
            age,
            goal,
            days,
            activity,
            notes
        };

           fetch("https://example.com/api/plan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
                })
                .then((res) => {
                    if (!res.ok) throw new Error("Błąd w API");
                    return res.json();
                })
                .then((responseData) => {
                    console.log("Odpowiedź z API:", responseData);

                })
                .catch((err) => console.error("Błąd:", err));
                setIsLocked(false);
         */
        };


    return (
        <div className="generate-container">
            <h2 className="title-plan">Wygeneruj plan treningowy dla siebie</h2>
            <div className='plan-linia'></div>
            <div className="form-columns">
            <div className="form-container-left">
                <form className="generate-form" onSubmit={handleSubmit}>
                    <label>Podaj swoje imię</label>
                    <input type="text" placeholder="Twoje imię" value={name} onChange={(e) => setName(e.target.value)} disabled={isLocked}/>
                    <label>Podaj swoją wagę</label>
                    <input type="number" placeholder="Twoja waga" max='150' value={weight} onChange={(e) => setWeight(e.target.value)} disabled={isLocked}/>
                    <label>Podaj swoj wzrost</label>
                    <input type="number" placeholder="Twoj wzrost" max='250' value={height} onChange={(e) => setHeight(e.target.value)} disabled={isLocked} />
                    <label>Podaj swoj wiek</label>
                    <input type="number" placeholder="Twoj wiek" max='100' value={age} onChange={(e) => setAge(e.target.value)} disabled={isLocked}/>
                    <label>Podaj swoj cel treningowy</label>
                    <select name="cel" id="cel" value={goal} onChange={(e) => setGoal(e.target.value)} disabled={isLocked}>
                        <option value="odchudzanie">Odchudzanie</option>
                        <option value="masa">Masa</option>
                        <option value="utrzymanie-wagi">Utrzymanie wagi</option>
                    </select>
                    <label>Ilość dni treningowych</label>
                    <input type="number" placeholder="Ilość dni" max='7' value={days} onChange={(e) => setDays(e.target.value)} disabled={isLocked}/>
                    <label>Podaj swoj poziom aktywności fizycznej</label>
                    <select name="aktywnosc" id="aktywnosc" value={activity} onChange={(e) => setActivity(e.target.value)}disabled={isLocked}>
                        <option value="niska">Niska</option>
                        <option value="srednia">Średnia</option>
                        <option value="wysoka">Wysoka</option>
                    </select>   
                    <label >Dodatkowe Uwagi</label>
                    <textarea placeholder="Dodatkowe Uwagi" value={notes} onChange={(e) => setNotes(e.target.value)}disabled={isLocked}></textarea>
                    <button type="submit" disabled={isLocked}>Wygeneruj plan</button>
                    <NavLink to="/" className="btn-backtohome">Wroc do strony glownej</NavLink>
                </form>
            </div>
            <div className="form-container-right plan-container">
                {plan.map((day, index) => (
                        <div key={index} className="plan-card">
                        <div className="plan-heder">{day.dzien}</div>
                        <p className="plan-partia">Partia: {day.partia}</p>

                        <div className="plan-body">
                            {day.cwiczenia.length > 0 ? (
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
                    ))}
                    </div>
            </div>
        </div>
    );
}