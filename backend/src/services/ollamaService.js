// Wyciąga czysty JSON z odpowiedzi AI (AI zwraca JSON opakowany w markdown code block)
function extractJSON(text) {
  // Spróbuj znaleźć JSON w markdown code block (```)
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch && jsonMatch[1]) {
    return jsonMatch[1].trim();
  }
  // Jeśli nie ma markdown, spróbuj znaleźć JSON bezpośrednio
  const directMatch = text.match(/\{[\s\S]*\}/);
  return directMatch ? directMatch[0] : text;
}

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

  // Wyciągnij czysty JSON z odpowiedzi
  const cleanedJSON = extractJSON(data.response);
  console.log("[ollamaService] cleaned JSON:", cleanedJSON);

  return cleanedJSON;
}