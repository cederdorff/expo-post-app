import { secondary, tintColorDark } from "@/constants/ThemeVariables";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";

export default function UserDetails() {
  const { id, userData } = useLocalSearchParams();
  const user = JSON.parse(userData);
  console.log("Id: ", id);
  console.log("User: ", user);

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: user?.name || ""
        }}
      />
      <Image style={styles.userImage} source={{ uri: user?.image }} />
      <View style={styles.userNameContainer}>
        <Text style={styles.userTitle}>{user?.title}</Text>
        <Text style={styles.userTitle}>{user?.mail}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  userImage: {
    height: 275
  },
  userNameContainer: {
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: secondary
  },
  userTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: tintColorDark,
    paddingVertical: 4
  }
});
