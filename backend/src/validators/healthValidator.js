export function validateHealthData(data) {
  const required = ["age", "weight", "height", "gender", "caloricDeficit", "goal"];

  for (const field of required) {
    if (!data[field]) {
      return `Brak pola: ${field}`;
    }
  }

  if (data.age < 1 || data.age > 80) {
    return "Nieprawidłowy wiek";
  }

  if (data.weight < 20 || data.weight > 220) {
    return "Nieprawidłowa waga";
  }

  if (data.height < 120 || data.height > 220) {
    return "Nieprawidłowy wzrost";
  }

  if (!["male", "female"].includes(data.gender.toLowerCase())) {
    return "Nieprawidłowa płeć (male/female)";
  }

  if (data.caloricDeficit < 1000 || data.caloricDeficit > 5000) {
    return "Nieprawidłowy deficyt kaloryczny (1000-5000 kcal)";
  }

  return null;
}