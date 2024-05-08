import Post from "@/components/Post";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";

export default function MapDetail() {
  const { id, postData } = useLocalSearchParams();
  const post = JSON.parse(postData);
  console.log("id", id);
  console.log("post", post);

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
