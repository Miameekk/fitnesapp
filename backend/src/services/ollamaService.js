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

export async function generateMealPlan(healthData) {
  try {
    const prompt = `
Zwróć WYŁĄCZNIE poprawny JSON.
Stwórz plan posiłków na podstawie danych.

Dane:
- Deficyt kaloryczny: ${healthData.caloricDeficit} kcal/dzień
- Wiek: ${healthData.age}
- Waga: ${healthData.weight} kg
- Wzrost: ${healthData.height} cm
- Płeć: ${healthData.gender}
- Cel: ${healthData.goal}
- Problemy zdrowotne: ${healthData.healthIssues || 'Brak'}
- Dodatkowe uwagi: ${healthData.additionalNotes || 'Brak'}

Format JSON:
{
  "meals": [
    {
      "meal": "Śniadanie",
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fat": 0,
      "foods": ["produkt 1", "produkt 2"]
    },
    {
      "meal": "Obiad",
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fat": 0,
      "foods": ["produkt 1", "produkt 2"]
    },
    {
      "meal": "Kolacja",
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fat": 0,
      "foods": ["produkt 1", "produkt 2"]
    }
  ],
  "totalCalories": 0,
  "totalProtein": 0,
  "totalCarbs": 0,
  "totalFat": 0
}
`;

    console.log("[ollamaService] Meal plan prompt:\n", prompt);

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        prompt,
        stream: false
      })
    });

    console.log("[ollamaService] Fetch response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[ollamaService] Ollama error:", errorText);
      throw new Error(`Ollama API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    console.log("[ollamaService] Meal plan raw response:", data);

    // Wyciągnij czysty JSON z odpowiedzi
    const cleanedJSON = extractJSON(data.response);
    console.log("[ollamaService] Meal plan cleaned JSON:", cleanedJSON);

    return cleanedJSON;
  } catch (error) {
    console.error("[ollamaService] Error in generateMealPlan:", error);
    throw error;
  }
}

export async function generateTrainingPlan(mealPlanData, healthData) {
  const prompt = `
Zwróć WYŁĄCZNIE poprawny JSON.
Stwórz plan treningowy na podstawie planu posiłków i danych zdrowotnych.

Plan posiłków: ${JSON.stringify(mealPlanData)}

Dane użytkownika:
- Wiek: ${healthData.age}
- Waga: ${healthData.weight}
- Wzrost: ${healthData.height}
- Płeć: ${healthData.gender}
- Deficyt kaloryczny: ${healthData.caloricDeficit}
- Cel: ${healthData.goal}
- Problemy zdrowotne: ${healthData.healthIssues || 'Brak'}
- Dodatkowe uwagi: ${healthData.additionalNotes || 'Brak'}
- Ćwiczenia wykluczone: ${healthData.excludedExercises || 'Brak'}

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

  console.log("[ollamaService] Training plan prompt:\n", prompt);

  const data = await response.json();

  console.log("[ollamaService] Training plan raw response:", data);

  // Wyciągnij czysty JSON z odpowiedzi
  const cleanedJSON = extractJSON(data.response);
  console.log("[ollamaService] Training plan cleaned JSON:", cleanedJSON);

  return cleanedJSON;
}