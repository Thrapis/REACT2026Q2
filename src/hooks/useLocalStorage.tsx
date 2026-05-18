import { useState } from 'react';

export default function useLocalStorage(key: string, initialValue?: string) {
  let init = initialValue ?? null;
  if (init === null) {
    init = localStorage.getItem(key);
  }

  const [value, setValue] = useState<string | null>(init);

  const setItemValue = (newValue: string) => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  };

  return [value, setItemValue] as const;
}
