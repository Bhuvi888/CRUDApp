import { ThemeProvider } from "@/context/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {

  const context = useContext(ThemeContext);
    if (!context) {
      throw new Error("ThemeContext must be used within a ThemeProvider");
    }
    const { colorScheme, setColorScheme, theme } = context;
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="rules" />
          <Stack.Screen name="index" />
          <Stack.Screen name="todos/[id]" />
        </Stack>
        <StatusBar 
              style={colorScheme === 'dark' ? 'light' : 'dark'}
              />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
