import { StyleSheet, FlatList } from "react-native";

import Post from "@/components/Post";
import { useEffect, useState } from "react";

export default function Index() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/cederdorff/race/master/data/expo-posts.json"
    )
      .then(response => response.json())
      .then(setPosts);
  }, []);

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
