import { useEffect, useState } from "react";

export default function useDebounce<T>(
  value: T,
  page: number,
  delay: number
): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, page, delay]);

  return debouncedValue;
}
