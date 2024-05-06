import { Image, StyleSheet, Text, View } from "react-native";
import Avatar from "./Avatar";
import { secondary, tintColorLight } from "@/constants/ThemeVariables";

export default function Post({ post }) {
  function formatDate(timestamp) {
    const createdAt = new Date(timestamp);
    return createdAt.toLocaleDateString();
  }

  const user = {
    id: "dob",
    image: "https://www.eaaa.dk/media/bdojel41/dan-okkels-brendstrup.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921559630000&format=webp",
    mail: "dob@eaaa.dk",
    name: "Dan Okkels Brendstrup",
    title: "Lecturer"
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.headerContainer}>
        <Avatar user={user} />
      </View>
      <Image style={styles.image} source={{ uri: post.image }} />
      <Text style={styles.caption}>{post.caption}</Text>
      <Text style={styles.city}>
        {post.location?.city}, {post.location?.country}
      </Text>
      <Text style={styles.date}>{formatDate(post.createdAt)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    minHeight: 320,
    paddingBottom: 30,
    borderBottomColor: secondary,
    borderBottomWidth: 1,
    backgroundColor: tintColorLight
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row"
  },
  caption: {
    fontSize: 22,
    padding: 15
  },
  date: {
    fontSize: 15,
    paddingHorizontal: 15
  },
  city: {
    fontSize: 15,
    paddingHorizontal: 15,
    paddingBottom: 15
  },
  image: {
    aspectRatio: 1,
    flex: 1
  }
});
