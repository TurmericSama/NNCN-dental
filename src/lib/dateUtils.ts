/**
 * Subtracts a specified amount of time from the current date.
 *
 * @param amount - The number of units to subtract from the current date.
 * @param unit - The unit of time to subtract ('years', 'months', or 'days').
 * @returns a date in the format 'yyyy/mm/dd' representing the resulting date.
 * @throws {Error} If an invalid unit is provided.
 *
 * @example
 * // Subtract 120 years from the current date
 * const minDate = subtractFromCurrentDate(120, 'years');
 */
// Utility to subtract n units from the current date
// unit can be 'years', 'months', or 'days'
const subtractFromCurrentDate = (
  amount: number,
  unit: "years" | "months" | "days"
): string => {
  const date = new Date();
  switch (unit) {
    case "years":
      date.setFullYear(date.getFullYear() - amount);
      break;
    case "months":
      date.setMonth(date.getMonth() - amount);
      break;
    case "days":
      date.setDate(date.getDate() - amount);
      break;
    default:
      throw new Error("Invalid unit");
  }
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${yyyy}/${mm}/${dd}`;
};

export default subtractFromCurrentDate;
export type { subtractFromCurrentDate };
