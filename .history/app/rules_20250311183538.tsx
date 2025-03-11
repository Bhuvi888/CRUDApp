import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const rules = [
  "The moment data is written into the AsyncStorage, it shall exist until deleted.",
  "If a data entry is not updated within 60 seconds, it will remain in its original state.",
  "Once a data entry is deleted, it cannot be retrieved... unless backed up elsewhere.",
  "The developer who controls the CRUD operations holds the power of creation and destruction.",
  "If the same key is written twice, the previous data shall be overwritten.",
  "To remove all traces of stored data, one must invoke the 'Shinigami Purge' (AsyncStorage.clear()).",
  "Those who misuse the CRUD Note for evil shall face infinite debugging errors.",
];

export default function DeathNoteRules() {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 2000 });
  }, []);

  const fadeInStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    
    <View style={styles.container}>
      <SafeAreaView>
      <Text style={styles.title}>📜 Death Note Rules 📜</Text>
      <ScrollView style={styles.scrollContainer}>
        {rules.map((rule, index) => (
          <Animated.Text key={index} style={[styles.ruleText, fadeInStyle]}>
            {index + 1}. {rule}
          </Animated.Text>
        ))}
         <Pressable style={styles.rulesButton} onPress={
                  ()=> router.push("/rules" )
                }>
                  <Text style={styles.rulesButtonText} >
                    Rules
                  </Text>
                </Pressable>
      </ScrollView>
      <StatusBar/>
      </SafeAreaView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: 'SofiaSansCondensed_500Medium'
  },
  scrollContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
  },
  ruleText: {
    color: "white",
    fontSize: 18,
    fontWeight: "300",
    marginVertical: 5,
    fontFamily: 'SofiaSansCondensed_500Medium'
  },
  rulesButton: {
    marginLeft: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#B20000',
  },
  rulesButtonText: {
    fontSize: 18,
    textAlign: 'auto',
    fontFamily: 'SofiaSansCondensed_500Medium',
    color: 'white',
  },
});
