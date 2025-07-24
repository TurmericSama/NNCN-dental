import { useState } from "react";
/**
 * Custom hook to toggle a boolean value.
 * @param initialValue - Initial state of the toggle.
 * @returns A tuple containing the current value and a function to toggle it.
 */
type UseToggleReturn = [boolean, () => void];

const useToggle = (initialValue = false): UseToggleReturn => {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue((prev) => !prev);
  return [value, toggle];
};

export default useToggle;
export { useToggle };
export type { UseToggleReturn };
