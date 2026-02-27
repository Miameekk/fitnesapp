export async function generateTrainingPlan(userData) {
  const prompt = `
Zwróć WYŁĄCZNIE poprawny JSON.
Stwórz plan treningowy.

Dane:
- Wiek: ${userData.age}
- Waga: ${userData.weight}
- Cel: ${userData.goal}
- Dni treningowe: ${userData.days}
- Doświadczenie: ${userData.experience}

Format JSON:
{
  "plan": [
    {
      "dzien": "",
      "partia": "",
      "cwiczenia": [
        { "nazwa": "", "serie": 0, "powtorzenia": "" }
      ]
    }
  ]
}
`;

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      prompt,
      stream: false
    })
  });

  console.log("[ollamaService] prompt:\n", prompt);

  const data = await response.json();

  console.log("[ollamaService] raw response:", data);

  return data.response;
}