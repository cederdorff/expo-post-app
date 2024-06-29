import { primary } from "@/constants/ThemeVariables";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";

export default function Avatar({ uid }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (uid) {
      getUser();
    }
  }, [uid]);

  async function getUser() {
    const response = await fetch(
      `https://expo-post-app-default-rtdb.firebaseio.com/users/${uid}.json`
    );
    const data = await response.json();
    setUser(data);
  }

  return (
    <TouchableOpacity onPress={() => router.push(`/users/${uid}`)}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarImageContainer}>
          <Image style={styles.avatarImage} source={{ uri: user.image }} />
        </View>
        <View>
          <Text style={styles.avatarName}>{user.name}</Text>
          <Text style={styles.avatarTitle}>{user.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  avatarImageContainer: {
    alignItems: "center",
    borderRadius: 55 / 2,
    borderWidth: 3,
    borderColor: primary,
    display: "flex",
    height: 55,
    justifyContent: "center",
    marginRight: 12,
    width: 55
  },
  avatarImage: {
    borderRadius: 42 / 2,
    height: 45,
    width: 45
  },
  avatarName: {
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 12
  },
  avatarTitle: {
    fontSize: 13,
    marginRight: 12
  }
});
