import Post from "@/components/Post";
import { secondary, tintColorDark } from "@/constants/ThemeVariables";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function UserDetails() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUser();
    getPosts();
  }, [id]);

  async function getUser() {
    const response = await fetch(
      `https://expo-post-app-default-rtdb.firebaseio.com/users/${id}.json`
    );
    const data = await response.json();
    setUser(data);
  }

  async function getPosts() {
    // fetch posts where uid is equal to userId prop
    const response = await fetch(
      `https://expo-post-app-default-rtdb.firebaseio.com/posts.json?orderBy="uid"&equalTo="${id}"`
    );
    const dataObj = await response.json();
    const postsArray = Object.keys(dataObj).map(key => ({
      id: key,
      ...dataObj[key]
    })); // from object to array
    postsArray.sort((postA, postB) => postB.createdAt - postA.createdAt); // sort by timestamp/ createdBy
    setPosts(postsArray);
  }

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
      {posts.map(post => (
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
