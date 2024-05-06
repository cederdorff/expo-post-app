import { StyleSheet, View } from "react-native";

import Post from "@/components/Post";

export default function Index() {
  const post = {
    id: "-M1Abcdefg123",
    caption: "Beautiful sunset at the beach",
    createdAt: 1687215634430,
    image: "https://images.unsplash.com/photo-1566241832378-917a0f30db2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    uid: "dob",
    location: {
      city: "Aarhus",
      country: "Denmark",
      latitude: 56.1249541422341,
      longitude: 10.218312555111716
    }
  };

  return (
    <View style={styles.container}>
      <Post post={post} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
