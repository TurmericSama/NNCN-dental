// Utility to calculate age from a birthdate string (YYYY-MM-DD)
export const calculateAgeFromBirthday = (birthday: string): number => {
  if (!birthday) {
    throw new Error("Birthday is required to calculate age.");
    return 0;
  }
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
