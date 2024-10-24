import { useEffect, useState, useCallback } from "react";
const useInactivity = (timeout: number = 10 * 60 * 1000): boolean => {
  const [isActive, setIsActive] = useState(true);

  const resetTimeout = useCallback(() => {
    setIsActive(true);
    const id = setTimeout(() => {
      setIsActive(false);
    }, timeout);

    return id;
  }, [timeout]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = resetTimeout();

    const handleUserActivity = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = resetTimeout();
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("click", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [resetTimeout]);

  return isActive;
};

export default useInactivity;
