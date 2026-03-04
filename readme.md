Pewnie 😄
Poniżej masz **gotową treść `README.md`**, którą możesz **wkleić 1:1 do repo** i działać z „czarnuszkiem” bez zgadywania co, gdzie i po co.

---

# 🏋️‍♂️ AI Trening Planner (React + API + Ollama)

Aplikacja webowa generująca **spersonalizowany plan treningowy** na podstawie danych użytkownika.
Frontend (React) komunikuje się z backendem (Node.js), który wysyła zapytanie do **lokalnie uruchomionego AI (Ollama)**.
Wygenerowany plan:

* jest wyświetlany w aplikacji
* może zostać **wysłany na e-mail użytkownika**

---

## 📐 Architektura

```
frontend (React)
   |
   | POST /api/generate-plan
   v
backend (Node.js + Express)
   |
   | POST http://localhost:11434/api/generate
   v
Ollama (LLM – lokalnie)
   |
   v
backend
   ├── zwraca JSON do frontendu
   └── wysyła plan na maila
```

---

## 🧱 Technologie

### Frontend

* React
* JavaScript
* fetch / axios

### Backend

* Node.js
* Express
* nodemailer
* dotenv

### AI

* Ollama (lokalnie)
* Model: `llama3` (lub inny)

---

## ⚙️ Wymagania

* Node.js ≥ 18
* Ollama zainstalowana lokalnie
  👉 [https://ollama.com](https://ollama.com)
* Uruchomiony model, np.:

```bash
ollama pull llama3
ollama run llama3
```

---

## 📁 Struktura projektu

```
project-root
│
├── frontend/
│   └── React app
│
├── backend/
│   ├── index.js
│   ├── mailer.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🖥️ Frontend – jak działa

1. Użytkownik wypełnia formularz:

   * wiek
   * wzrost
   * waga
   * cel treningowy
   * liczba dni treningowych
   * poziom zaawansowania
   * email

2. React wysyła dane do backendu:

```ts
fetch("http://localhost:3001/api/generate-plan", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData)
});
```

3. Odbiera **JSON z planem treningowym** i wyświetla go w UI.

---

## 🧠 Backend – jak działa

### Endpoint

```
POST /api/generate-plan
```

### Flow:

1. Odbiera dane z frontendu
2. Buduje **prompt dla AI**
3. Wysyła request do **Ollama**
4. Odbiera wygenerowany plan (JSON)
5. Opcjonalnie:

   * wysyła plan na maila
6. Zwraca plan do frontendu

---

## ✍️ Prompt do Ollama (przykład)

```
Stwórz plan treningowy siłowy.

Dane użytkownika:
- Wiek: 25
- Waga: 82 kg
- Wzrost: 180 cm
- Cel: Budowa masy
- Dni treningowe: 4
- Poziom: Średniozaawansowany

Zwróć WYŁĄCZNIE poprawny JSON w formacie:

{
  "plan": [
    {
      "dzien": "",
      "partia": "",
      "cwiczenia": [
        {
          "nazwa": "",
          "serie": 0,
          "powtorzenia": "",
          "przerwaSek": 0
        }
      ]
    }
  ]
}
```

⚠️ **Nie dodawaj żadnego tekstu poza JSON-em.**

---

## 📦 Przykładowa odpowiedź AI

AI zwraca **ustrukturyzowany JSON**, który:

* frontend mapuje do komponentów
* backend renderuje do maila

(Przykład w repo jako `example-response.json`)

---

## 📧 Wysyłka maila

Backend używa **nodemailer**.

### Zmienne środowiskowe (`.env`)

```
MAIL_USER=twojmail@gmail.com
MAIL_PASS=haslo_aplikacji
```

### Mail zawiera:

* temat: „Twój plan treningowy”
* treść: wygenerowany plan (text lub HTML)

---

## 🔐 Bezpieczeństwo

* ❌ Frontend **NIE** komunikuje się bezpośrednio z Ollama
* ✅ Cała logika AI tylko w backendzie
* ✅ Walidacja danych wejściowych
* ✅ Brak kluczy API po stronie klienta

---

## 🧪 Testowanie lokalne

1. Uruchom Ollama:

```bash
ollama run llama3
```

2. Backend:

```bash
cd backend
npm install
npm run dev
```

3. Frontend:

```bash
cd frontend
npm install
npm start
```

---

## 🚀 Możliwe rozszerzenia

* streaming odpowiedzi AI (live typing)
* zapis planów do bazy danych
* PDF z planem treningowym
* historia treningów użytkownika
* różne języki
* personalizacja pod kontuzje

---

## 🤝 Współpraca

Projekt robiony **do nauki i zabawy**, bez spiny.
Forkuj, kombinuj, ulepszaj 💪

---

**Miłego klepania kodu i powodzenia z czarnuszkiem 🖤🔥**


komenda
komenda
$body = @{ age=25; weight=75; goal='masa'; days=4; experience='średnio' ; userId = 'user12'} | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:3001/api/generate-plan' -Method Post -ContentType 'application/json' -Body $body