import { createContext, useState, ReactNode } from "react";
import { Appearance } from "react-native";
import { Colors } from "../constants/Colors";

// Define the interface for the context
interface ThemeContextType {
  colorScheme: "light" | "dark";
  setColorScheme: (value: "light" | "dark") => void;
  theme: typeof Colors.light | typeof Colors.dark;
}

// Provide a default value for the context
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Ensure that we always have either 'light' or 'dark'
  const initialColorScheme = Appearance.getColorScheme() || "light";
  const [colorScheme, setColorScheme] = useState<"light" | "dark">(initialColorScheme);

  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        setColorScheme,
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
