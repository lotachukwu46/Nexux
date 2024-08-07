import React, { createContext, useState, useEffect, useContext } from "react";
import detectSystemTheme from "../../utils/DetectSystemTheme";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const storedTheme = localStorage.getItem("theme");
  const initialTheme = storedTheme || detectSystemTheme();

  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
