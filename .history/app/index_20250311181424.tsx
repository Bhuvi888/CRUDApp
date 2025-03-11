import { Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState, useContext, useEffect } from "react";
import { SofiaSansCondensed_400Regular, SofiaSansCondensed_500Medium, useFonts } from "@expo-google-fonts/sofia-sans-condensed";
import Animated, { LinearTransition } from "react-native-reanimated";
import { Octicons } from "@expo/vector-icons";
import { ThemeContext } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState<string>("");

  const context = useContext(ThemeContext);
  if (!context) throw new Error("ThemeContext must be used within a ThemeProvider");
  const { colorScheme, setColorScheme, theme } = context;

  const [loaded, error] = useFonts({
    SofiaSansCondensed_400Regular,
    SofiaSansCondensed_500Medium,
  });

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("TodoApp");
        const storagetodos = jsonValue ? JSON.parse(jsonValue) : [];
        setTodos(storagetodos.length ? storagetodos.sort((a, b) => b.id - a.id) : []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      AsyncStorage.setItem("TodoApp", JSON.stringify(todos));
    }
  }, [todos]);

  if (!loaded && error) return null;

  const styles = createStyles(theme, colorScheme);

  const addtodo = () => {
    if (text.trim()) {
      setTodos(prev => [{ id: prev.length ? prev[0].id + 1 : 1, title: text, completed: false }, ...prev]);
      setText("");
    }
  };

  interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handletodos = (id: number): void => {
    router.push(`/todos/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Add a new task"
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
        />
        <Pressable style={styles.addButton} onPress={addtodo}>
          <Text style={styles.addButtonInput}>Add</Text>
        </Pressable>
        <Pressable onPress={() => setColorScheme(prev => (prev === "dark" ? "light" : "dark"))} style={{ marginLeft: 10 }}>
          <Octicons name={colorScheme === "dark" ? "moon" : "sun"} size={36} color="yellow" />
        </Pressable>
      </View>

      {/* ✅ New Button to Navigate to Rules Page */}
      <Pressable onPress={() => router.push("")} style={styles.rulesButton}>
        <Text style={styles.rulesButtonText}>View Rules</Text>
      </Pressable>

      <Animated.FlatList
        data={todos}
        keyExtractor={(item: Todo) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoContainer}>
            <Pressable onPress={() => handletodos(item.id)} onLongPress={() => toggleTodo(item.id)}>
              <Text style={[styles.todotext, item.completed && styles.todoCompleted]}>{item.title}</Text>
            </Pressable>
            <Pressable onPress={() => deleteTodo(item.id)}>
              <MaterialIcons name="delete" size={30} color="yellow" />
            </Pressable>
          </View>
        )}
        contentContainerStyle={{ flexGrow: 1 }}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode="on-drag"
      />
    </SafeAreaView>
  );
}

function createStyles(theme: any, colorScheme: string) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      padding: 10,
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
    },
    textInput: {
      flex: 1,
      borderColor: "yellow",
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      marginRight: 10,
      fontSize: 18,
      color: theme.text,
      fontFamily: "SofiaSansCondensed_500Medium",
    },
    addButton: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: theme.button,
    },
    addButtonInput: {
      fontSize: 18,
      fontFamily: "SofiaSansCondensed_500Medium",
      color: "black",
    },
    rulesButton: {
      backgroundColor: "#f0ad4e",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginBottom: 10,
      maxWidth: 150,
      alignSelf: "center",
    },
    rulesButtonText: {
      fontSize: 16,
      fontFamily: "SofiaSansCondensed_500Medium",
      color: "black",
    },
    todoContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomColor: "rgba(210, 208, 79, 0.71)",
      borderBottomWidth: 1,
      padding: 10,
      width: "100%",
      maxWidth: 1024,
    },
    todotext: {
      flex: 1,
      fontSize: 18,
      color: theme.text,
      fontFamily: "SofiaSansCondensed_500Medium",
      marginLeft: 5,
    },
    todoCompleted: {
      textDecorationLine: "line-through",
      color: "gray",
    },
  });
}
