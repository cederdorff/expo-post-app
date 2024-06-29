import { StyleSheet, FlatList, RefreshControl } from "react-native";

import Post from "@/components/Post";
import { useCallback, useEffect, useState } from "react";
import { tintColorDark } from "@/constants/ThemeVariables";
import { useFocusEffect } from "expo-router";

export default function Index() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  // Sometimes we want to run side-effects when a screen is focused.
  // A side effect may involve things like adding an event listener,
  // fetching data, updating document title, etc.
  // Read more: https://reactnavigation.org/docs/use-focus-effect/
  useFocusEffect(
    // If you don't wrap your effect in React.useCallback,
    // the effect will run every render if the screen is focused.
    useCallback(() => {
      getPosts();
    }, [])
  );

  async function getPosts() {
    const response = await fetch(
      "https://expo-post-app-default-rtdb.firebaseio.com/posts.json"
    );
    const data = await response.json();
    const arrayOfPosts = Object.keys(data).map(key => {
      return {
        id: key,
        ...data[key]
      };
    });
    arrayOfPosts.sort((postA, postB) => postB.createdAt - postA.createdAt); // sort by timestamp/ createdBy
    setPosts(arrayOfPosts);
  }

  function renderPost({ item }) {
    return <Post post={item} reloadPosts={getPosts} />;
  }

  async function handleRefresh() {
    setRefreshing(true);
    await getPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }

  return (
    <FlatList
      style={styles.container}
      data={posts}
      renderItem={renderPost}
      keyExtractor={post => post.id}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={tintColorDark}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
