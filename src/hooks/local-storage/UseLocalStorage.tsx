'use client';

import { useState } from 'react';

export default function useLocalStorage(key: string, initialValue?: string) {
  const [value, setValue] = useState<string | null>(() => {
    if (typeof window === 'undefined') {
      return initialValue ?? null;
    }
    const saved = localStorage.getItem(key);
    return saved !== null ? saved : (initialValue ?? null);
  });

  const setItemValue = (newValue: string) => {
    setValue(newValue);
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, newValue);
    }
  };

  return [value, setItemValue] as const;
}
