import { useCallback, useState } from "react";
export const useToggle = (defaultChecked: boolean) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const toggle = useCallback((v?: boolean) => {
    setIsChecked((current) => v ?? !current);
  }, []);
  return [isChecked, toggle] as const;
};
