export function validatePlanData(data) {
  const required = ["age", "weight", "goal", "days", "experience"]; // usuniete userId bo generuje sie automatycznie jak nie jest podane pozdro :3

  for (const field of required) {
    if (!data[field]) {
      return `Brak pola: ${field}`;
    }
  }

  if (data.age < 13 || data.age > 80) {
    return "Nieprawidłowy wiek";
  }

  return null;
}