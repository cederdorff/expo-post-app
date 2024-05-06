import { StyleSheet, ScrollView } from "react-native";

import Post from "@/components/Post";

export default function Index() {
  const posts = [
    {
      id: "-M1Abcdefg123",
      caption: "Beautiful sunset at the beach",
      createdAt: 1687215634430,
      image: "https://images.unsplash.com/photo-1566241832378-917a0f30db2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      uid: "ZfPTVEMQKf9vhNiUh0bj",
      location: {
        city: "Aarhus",
        country: "Denmark",
        latitude: 56.1249541422341,
        longitude: 10.218312555111716
      }
    },
    {
      id: "-M7Vwx789yza",
      caption: "Rainbow reflections of the city of Aarhus",
      createdAt: 1667615134430,
      image: "https://images.unsplash.com/photo-1558443336-dbb3de50b8b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      uid: "fjpRTRTjZHwrq3tTLHri",
      location: {
        city: "Aarhus",
        country: "Denmark",
        latitude: 56.1539352,
        longitude: 10.1995787
      }
    },

    {
      id: "-M6Stu456vwx",
      caption: "A beautiful morning in Aarhus",
      createdAt: 1687611054440,
      image: "https://images.unsplash.com/photo-1573997953524-efed43db70a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      uid: "HlvRHr58C05guOLl64k5",
      location: {
        city: "Aarhus",
        country: "Denmark",
        latitude: 56.1558978,
        longitude: 10.1994809
      }
    },
    {
      id: "-M5Mno123pqr",
      caption: "Serenity of the forest",
      createdAt: 1687165634430,
      image: "https://images.unsplash.com/photo-1661505216710-32316e7b5bb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      uid: "ZfPTVEMQKf9vhNiUh0bj",
      location: {
        city: "Aarhus",
        country: "Denmark",
        latitude: 56.1789538,
        longitude: 10.2294038
      }
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
