import Post from "@/components/Post";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native";

export default function MapDetail() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState({});
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    getPost();
  }, [id]);

  async function getPost() {
    const response = await fetch(`${API_URL}/posts/${id}.json`);
    const data = await response.json();
    data.id = id;
    setPost(data);
  }

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: post?.caption
        }}
      />
      <Post post={post} />
    </ScrollView>
  );
}
