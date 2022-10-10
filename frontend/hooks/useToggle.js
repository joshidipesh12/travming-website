import {useState} from 'react';

export default function useToggle(initialState = false) {
  const [value, setValue] = useState(initialState);
  const toggleValue = customValue =>
    setValue(currentValue =>
      typeof customValue === 'boolean' ? customValue : !currentValue,
    );
  return [value, toggleValue];
}
