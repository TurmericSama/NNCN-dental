/**
 * Converts a string, boolean, or number to a boolean value.
 *
 * - If the input is a string, returns `true` if the string (case-insensitive) is `"true"`, otherwise returns `false`.
 * - For boolean and number inputs, returns their standard boolean conversion using `Boolean()`.
 *
 * @param str - The value to convert, which can be a string, boolean, or number.
 * @returns A boolean representation of the input.
 */
const stringToBoolean = (str: string | boolean | number) => {
  if (typeof str === "string") {
    return str.toLowerCase() === "true";
  }
  return Boolean(str); // Handles non-string inputs using the standard Boolean() conversion
};

export default stringToBoolean;
