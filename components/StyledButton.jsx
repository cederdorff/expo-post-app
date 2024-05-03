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
    backgroundColor: "#264c59",
    padding: 10,
    marginTop: 20,
    borderRadius: 7,
    borderColor: "#264c59",
    borderWidth: 2
  },
  text: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center"
  }
});
