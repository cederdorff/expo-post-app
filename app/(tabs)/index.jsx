import { FlatList, RefreshControl, StyleSheet } from "react-native";

import Post from "@/components/Post";
import Loader from "@/components/Loader";
import { tintColorDark } from "@/constants/ThemeVariables";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";

export default function Index() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const response = await fetch(`${API_URL}/posts.json`);
    const data = await response.json();
    const arrayOfPosts = Object.keys(data).map(key => {
      return {
        id: key,
        ...data[key]
      };
    });
    arrayOfPosts.sort((postA, postB) => postB.createdAt - postA.createdAt); // sort by timestamp/ createdBy
    setPosts(arrayOfPosts);
    setLoading(false);
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
    <>
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
      <Loader show={loading} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
