import { useCallback, useState } from "react";
export const useToggle = (defaultChecked: boolean) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const toggle = useCallback(() => {
    setIsChecked((current) => !current);
  }, []);
  return [isChecked, toggle] as const;
};
