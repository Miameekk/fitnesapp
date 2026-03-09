# 🎉 FitnesApp — aplikacja fitness

Wesoły projekt aplikacji fitness przygotowany na potrzeby Dni Otwartych. 💪🥗

**Autorzy:** Damian Bukowiec, Jakub Pawecki ✨

## 📌 Opis

FitnesApp to prosty serwis do generowania i przeglądania planów posiłków i treningów. Projekt składa się z backendu (Node.js/Express) i frontendu (React + Vite). Został przygotowany na potrzeby prezentacji podczas Dni Otwartych.

## 🧰 Stos technologiczny

- Backend: Node.js, Express 🖥️
- Frontend: React, Vite ⚛️
- Usługi: lokalne pliki oraz integracja z `ollamaService` w backendzie 🤖
- Model AI: llama3 🔎

## ▶️ Szybkie uruchomienie

1) Backend

Przejdź do katalogu backend i zainstaluj zależności oraz uruchom serwer:

```bash
cd backend
npm install express
npm start
```

Domyślnie serwer uruchamia się na porcie określonym w `backend/src/server.js` (można to zmienić przez zmienne środowiskowe).

2) Frontend

Przejdź do katalogu frontendu i uruchom aplikację deweloperską:

```bash
cd frontend/fitnes-app
npm install
npm run dev
```

Frontend dostępny będzie pod adresem podanym przez Vite (domyślnie http://localhost:5173).

## Struktura projektu (wybrane pliki)

- Backend główny plik serwera: [backend/src/server.js](backend/src/server.js#L1)
- Konfiguracja bazy danych: [backend/src/config/database.js](backend/src/config/database.js#L1)
- Kontrolery: [backend/src/controllers/planController.js](backend/src/controllers/planController.js#L1)
- Modele: [backend/src/models/Plan.js](backend/src/models/Plan.js#L1), [backend/src/models/MealPlan.js](backend/src/models/MealPlan.js#L1)
- Trasy: [backend/src/routes/planRoutes.js](backend/src/routes/planRoutes.js#L1)
- Usługa AI/integracja: [backend/src/services/ollamaService.js](backend/src/services/ollamaService.js#L1)

- Frontend wejście: [frontend/fitnes-app/src/main.jsx](frontend/fitnes-app/src/main.jsx#L1)
- Główna aplikacja: [frontend/fitnes-app/src/App.jsx](frontend/fitnes-app/src/App.jsx#L1)
- Publiczny plan demo: [frontend/fitnes-app/public/plan.json](frontend/fitnes-app/public/plan.json#L1)

## Konfiguracja i zmienne środowiskowe

Sprawdź `backend/src/config/database.js` w celu informacji o połączeniu z bazą. Jeśli używasz dodatkowych usług (np. zewnętrzne API), skonfiguruj odpowiednie zmienne środowiskowe przed uruchomieniem serwera.

## Uwagi

- Projekt został przygotowany jako demonstracja na Dni Otwarte — nie jest przeznaczony do produkcyjnego użytku bez dodatkowego hardeningu i testów.
- Jeśli chcesz, mogę dodać plik `LICENSE` lub rozbudować instrukcję uruchomienia o opis zmiennych środowiskowych.

---

Dziękujemy za zainteresowanie projektem — Damian Bukowiec i Jakub Pawecki. 🙌

