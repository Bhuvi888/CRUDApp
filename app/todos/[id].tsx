import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useState, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Octicons } from '@expo/vector-icons'
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from '@/context/ThemeContext'
import { MartianMono_500Medium, useFonts } from "@expo-google-fonts/martian-mono";
import { useRouter } from 'expo-router'

import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'



const todoedit = () => {
   
    interface Todo {
        id: number;
        title: string;
        completed: boolean;
      }

    const { id } = useLocalSearchParams();

    const [todos, setTodos] = useState<Todo>({
      id: 1,
      title: '',
      completed: false,
    });
    
     const context = useContext(ThemeContext);
      if (!context) {
        throw new Error("ThemeContext must be used within a ThemeProvider");
      }
      const { colorScheme, setColorScheme, theme } = context;
    
      const [loaded, error] =  useFonts({
        MartianMono_500Medium,
      })
      const router = useRouter();

      useEffect(() => {
         const fetchData = async () => {
          try{
            const jsonValue: string | null = await AsyncStorage.getItem("TodoApp");
            const StoredTodos: Todo[] | null = jsonValue != null ? JSON.parse(jsonValue) : null;

            if(StoredTodos && StoredTodos.length > 0){
              const mytodo = StoredTodos.find(todo => todo.id.toString() === id)
              if (mytodo) {
                setTodos(mytodo);
              }
            }
          }catch(e){
            console.error(e);
            
          }
         } 
      
        fetchData()
      }, [id])

      if(!loaded && error){
        return null;
      }
    
      const styles = createStyles(theme, colorScheme);


      const handleSave = async () => {
        try {
           
            let savedTodo:any;
            if (todos) {
              savedTodo = { ...todos, title: todos.title }
            }
    
            const jsonValue = await AsyncStorage.getItem("TodoApp")
            const StoredTodos = jsonValue != null ? JSON.parse(jsonValue):null
            if(StoredTodos && StoredTodos.length> 0){
              const otherTodos = StoredTodos.filter((todo:any) => todo.id !== savedTodo.id)
              const allTodos = [ ...otherTodos,savedTodo]
              await AsyncStorage.setItem("TodoApp",JSON.stringify(allTodos))
            }
            else{
              await AsyncStorage.setItem("TodoApp",JSON.stringify(savedTodo))
            }
            router.push('/')
        }catch(e){
          console.error(e);
          
        }
      }
      

  return (
    <SafeAreaView style = {styles.container}>
    <View style={styles.inputContainer}>
      <TextInput
      style={styles.textinput}
      maxLength={30}
      placeholder='Edit Todo'
      placeholderTextColor='gray'
      value={todos?.title || ''}
      onChangeText={(text) => setTodos(prev => prev ? { ...prev, title: text } : prev)}
      />
      <Pressable onPress={() => setColorScheme(colorScheme === "dark" ? "light":"dark")} style={{marginLeft:10}}>
                <Octicons name={colorScheme === "dark" ? "moon" : "sun"} size={36}  color="yellow"  selectable={undefined}/>
      </Pressable>
    </View>
    <View style = {styles.inputContainer}>
      <Pressable onPress={handleSave} style={styles.saveButton}>
      <Text
      style={styles.saveText}
      >Save</Text>
      </Pressable>
      <Pressable 
      onPress={() => router.push('/')}
      style={[styles.saveButton , {backgroundColor:'yellow'} ]}
      >
        <Text style={[styles.saveText , {color:'black'}]}>
          Cancel
        </Text>
      </Pressable>
    </View>
    <StatusBar 
          style={colorScheme === 'dark' ? 'light' : 'dark'}
          />
    </SafeAreaView>
  )
}

export default todoedit

function createStyles(theme:any,colorScheme:string){
    return StyleSheet.create({
     container: {
      flex:1,
      backgroundColor:theme.background
     },
     inputContainer:{
      flexDirection:'row',
      alignItems:'center',
      gap:6,
      width:'100%',
      maxWidth:1024,
      padding:10,
      marginHorizontal:'auto',
      pointerEvents:'auto'
     },
     textinput: {
       flex:1,
       padding:10,
       borderRadius:5,
       borderColor:'yellow',
       borderWidth:1,
       marginRight:10,
       fontSize: 18,
       color: theme.text,
       minWidth: 0,
       fontFamily: 'MartianMono_500Medium',
     },
     saveButton:{
      padding:5,
      borderRadius:15,
      backgroundColor:theme.button,
     },
     saveText:{
      fontSize: 18,
      textAlign: 'auto',
      fontFamily: 'MartianMono_500Medium',
      color: 'black',
     }


    })
}