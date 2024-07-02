import { borderRadius, primary } from "@/constants/ThemeVariables";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Loader({ show }) {
  return (
    show && (
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={primary} />
          <Text style={styles.text}>Loading...</Text>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)" // Semi-transparent background
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 40,
    borderRadius: borderRadius,
    alignItems: "center"
  },
  text: {
    fontSize: 20,
    color: primary,
    marginTop: 5
  }
});
