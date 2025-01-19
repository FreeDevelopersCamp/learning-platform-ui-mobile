import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

// Create the DarkModeContext
const DarkModeContext = createContext();

// DarkModeProvider component
function DarkModeProvider({ children }) {
  // State to manage dark mode preference based on system settings
  const [isDarkMode, setIsDarkMode] = useState(
    Appearance.getColorScheme() === "dark"
  );

  // Effect to handle changes in the system theme
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === "dark");
    });

    // Clean up the subscription on component unmount
    return () => {
      subscription.remove();
    };
  }, []);

  // Function to toggle dark mode manually (for custom user control)
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// Custom hook to use the DarkModeContext
function useDarkMode() {
  const context = useContext(DarkModeContext);

  // Ensure the hook is used within a valid provider
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }

  return context;
}

export { DarkModeProvider, useDarkMode };
