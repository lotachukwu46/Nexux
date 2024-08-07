import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <h1>Settings Page</h1>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Change Theme</button>
    </div>
  );
};

export default Settings;
