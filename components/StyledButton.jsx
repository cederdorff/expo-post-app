import { borderRadius, borderWidth, primary, tintColorLight } from "@/constants/ThemeVariables";
import { Text, StyleSheet, Pressable } from "react-native";

export default function StyledButton({ title, onPress }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: primary,
    padding: 10,
    marginTop: 20,
    borderRadius: borderRadius,
    borderColor: primary,
    borderWidth: borderWidth
  },
  text: {
    color: tintColorLight,
    fontSize: 18,
    textAlign: "center"
  }
});
