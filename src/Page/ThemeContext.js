import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Theme Context
const ThemeContext = createContext();

// Custom hook to use theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider to wrap the entire app
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // Persist theme

  // Update theme in localStorage and body element
  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save theme in localStorage
    document.body.setAttribute('data-theme', newTheme); // Apply theme globally
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme); // Apply theme on initial render
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
