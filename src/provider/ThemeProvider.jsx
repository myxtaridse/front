import React, { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  React.useEffect(() => {
    if (theme === "dark") {
      document.getElementById("root")?.classList.add("dark");

      document.body.style.backgroundColor = "#030303";
    } else {
      document.getElementById("root")?.classList.remove("dark");

      document.body.style.backgroundColor = "#f5fbfe";
    }
  }, [theme]);
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
