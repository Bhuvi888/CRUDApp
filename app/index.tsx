import { Appearance, Text, TextInput, View ,StyleSheet, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { data } from "../Datas/todos"
import { useState } from "react";


export default function Index() {

  const [todos, setTodos] = useState(data.sort((a,b)=> b.id - a.id));

  const [text, setText] = useState("");

  const addtodo = () => {
      if(text.trim()){
        const newId = todos.length>0 ? todos[0].id + 1 : 1;
        setTodos([{id:newId, title:text, completed:false}, ...todos])
        setText(" ");
      }
  }

  interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  const deleteTodo = (id: number) => {
      setTodos(todos.filter((todo:Todo) => todo.id !== id))
  }

  const renderItem = ({item}: {item: Todo}) => (
    <View style={styles.todoContainer}>
      <Text
      style={[styles.todotext, item.completed && styles.todoCompleted]}
      onPress={() => toggleTodo(item.id)}
      >
        {item.title}
      </Text>
      <Pressable onPress={() => deleteTodo(item.id)}>
        <MaterialIcons name="delete" size={30} color="yellow" />
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style = {styles.inputContainer}>
        <TextInput
        style = {styles.textInput}
        placeholder="Add a new task"
        placeholderTextColor="gray"
        value={text}
        onChangeText={setText}
        />
        <Pressable style={styles.addButton} onPress={addtodo}>
          <Text style={styles.addButtonInput} >
            Add
          </Text>
        </Pressable>
      </View>
      <FlatList
      data={todos}
      keyExtractor={(item: Todo) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{flexGrow:1}}
      />

      </SafeAreaView>
  );
}

     const styles =  StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:'black',
            
        },
        todoContainer:{
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between',
          borderBottomColor:'rgba(210, 208, 79, 0.71)',
          borderBottomWidth:1,
          padding:10,
          gap:4,
          marginHorizontal:'auto',
          width:'100%',
          maxWidth:1024,
          pointerEvents:'auto',
        },
        inputContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
        padding:10,
        width:'100%',
        maxWidth:1024,
        marginHorizontal:'auto',
        pointerEvents:'auto',
        },
         textInput:{
          flex:1,
          borderColor:'yellow',
          borderWidth:1,
          borderRadius:10,
          padding:10,
          marginRight:10,
          fontSize:18,
          color:'white',
          minWidth:0,
          fontFamily:'monospace',
          fontStyle:'italic',
          
         },
          addButton:{
            padding:15,
            borderRadius:10,
            backgroundColor:'rgb(255, 255, 0)',
          },
         addButtonInput:{
          fontSize:18,
          textAlign:'auto',
          fontFamily:'monospace',
          fontStyle:'italic',
          fontWeight:'bold',
          color:'black',
         },
         todotext:{
          flex:1,
          fontSize:18,
          color:'white',
          fontFamily:'monospace',
          fontStyle:'italic',
          marginLeft:5,
         },
         todoCompleted:{
           textDecorationLine:'line-through',
         }

     } )
 




