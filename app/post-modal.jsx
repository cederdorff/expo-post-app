import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet, Text, View, TextInput, Image } from "react-native";

import { Stack, useRouter } from "expo-router";

import StyledButton from "@/components/StyledButton";
import { labelFontSize, primary, secondary, tintColorLight } from "@/constants/ThemeVariables";

export default function PostModal() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Create Post",
          headerLeft: () => <Button title="Cancel" onPress={() => router.back()} color="#fff" />,
          headerRight: () => <Button title="Save" onPress={() => router.back()} color="#fff" />
        }}
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      <Text style={styles.label}>Image</Text>
      <Image
        style={styles.image}
        source={{
          uri: "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
        }}
      />
      <Text style={styles.label}>Caption</Text>
      <TextInput style={styles.input} placeholder="Type your caption" />
      <Text style={styles.label}>City</Text>
      <TextInput style={styles.input} placeholder="Type your city" />
      <StyledButton title="Create Post" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: secondary
  },
  main: {
    flex: 1
  },
  image: {
    aspectRatio: 1,
    borderRadius: 7,
    borderColor: primary,
    borderWidth: 2
  },
  label: {
    fontSize: labelFontSize,
    color: primary,
    marginTop: 30,
    marginBottom: 5
  },
  input: {
    height: 50,
    padding: 10,
    backgroundColor: tintColorLight,
    borderRadius: 7,
    borderColor: primary,
    borderWidth: 2
  }
});
