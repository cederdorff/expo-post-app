import { secondary, tintColorDark } from "@/constants/ThemeVariables";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import Post from "@/components/Post";

export default function UserDetails() {
  const [posts, setPosts] = useState([]);
  const { id, userData } = useLocalSearchParams();
  const user = JSON.parse(userData);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/cederdorff/race/master/data/expo-posts.json"
    )
      .then(response => response.json())
      .then(data => setPosts(data.sort((a, b) => b.createdAt - a.createdAt)));
  }, []);

  const postsByUser = posts.filter(post => post.user.id === id);

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: user?.name || ""
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.userTitle}>{user?.title}</Text>
        <Text style={styles.userTitle}>{user?.mail}</Text>
      </View>
      <Image style={styles.userImage} source={{ uri: user?.image }} />
      <View style={styles.textContainer}>
        <Text style={styles.postTitle}>Posts by {user.name}</Text>
      </View>
      {postsByUser.map(post => (
        <Post key={post.id} post={post} />
      ))}
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
  textContainer: {
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: secondary
  },
  userTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: tintColorDark,
    paddingVertical: 4
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: tintColorDark,
    backgroundColor: secondary,
    paddingHorizontal: 10,
    paddingTop: 10
  }
});
