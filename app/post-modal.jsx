import { StatusBar } from "expo-status-bar";
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Image,
  PlatformColor
} from "react-native";

import { Stack, useRouter } from "expo-router";

import StyledButton from "@/components/StyledButton";
import {
  labelFontSize,
  primary,
  secondary,
  tintColorDark,
  tintColorLight
} from "@/constants/ThemeVariables";

export default function PostModal() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Create Post",
          headerLeft: () => (
            <Button
              title="Cancel"
              onPress={() => router.back()}
              color={Platform.OS === "ios" ? tintColorLight : tintColorDark}
            />
          ),
          headerRight: () => (
            <Button
              title="Save"
              onPress={() => router.back()}
              color={Platform.OS === "ios" ? tintColorLight : tintColorDark}
            />
          )
        }}
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      <Text style={styles.label}>Image</Text>
      <Image
        style={styles.image}
        source={{
          uri: "https://cederdorff.com/race/images/placeholder-image.webp"
        }}
      />
      <Text style={styles.label}>Caption</Text>
      <TextInput style={styles.input} placeholder="Type your caption" />
      <Text style={styles.label}>City</Text>
      <TextInput style={styles.input} placeholder="Type your city" />
      <StyledButton title="Create Post" onPress={() => router.back()} />
    </ScrollView>
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
