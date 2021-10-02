import { useState } from "react";

export const useToggle = (initialState) => {
  const [value, setValue] = useState(initialState);
  const toggleValue = (customValue) =>
    setValue((currentValue) =>
      typeof customValue === "boolean" ? customValue : !currentValue
    );
  return [value, toggleValue];
};
