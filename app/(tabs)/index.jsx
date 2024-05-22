import { StyleSheet, FlatList } from "react-native";

import Post from "@/components/Post";
import { useEffect, useState } from "react";

export default function Index() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const response = await fetch(
      "https://expo-post-app-default-rtdb.firebaseio.com/posts.json"
    );
    const data = await response.json();
    console.log(data);
    const arrayOfPosts = Object.keys(data).map(key => {
      return {
        id: key,
        ...data[key]
      };
    });
    arrayOfPosts.sort((postA, postB) => postB.createdAt - postA.createdAt); // sort by timestamp/ createdBy
    console.log(arrayOfPosts);
    setPosts(arrayOfPosts);
  }

  function renderPost({ item }) {
    return <Post post={item}></Post>;
  }

  return (
    <FlatList
      style={styles.container}
      data={posts}
      renderItem={renderPost}
      keyExtractor={post => post.id}></FlatList>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
