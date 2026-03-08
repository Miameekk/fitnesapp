export function validatePlanData(data) {
  const required = ["age", "weight", "goal", "days", "experience"];

  for (const field of required) {
    if (!data[field]) {
      return `Brak pola: ${field}`;
    }
  }

  if (data.age < 13 || data.age > 80) {
    return "Nieprawidłowy wiek";
  }

  if(data.weight < 20 || data.weight > 220 ){
    return "Nieprawidłowa waga";
  }

  return null;
}