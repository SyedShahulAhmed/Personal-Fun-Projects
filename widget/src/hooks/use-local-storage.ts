"use client";

import {
  useEffect,
  useState,
} from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
) {
  const [value, setValue] =
    useState<T>(initialValue);

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    try {
      const item =
        localStorage.getItem(key);

      if (item) {
        setValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(error);
    }

    setMounted(true);
  }, [key]);

  useEffect(() => {
    if (!mounted) return;

    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch (error) {
      console.error(error);
    }
  }, [key, value, mounted]);

  return [value, setValue] as const;
}