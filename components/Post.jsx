import { primary, secondary, tintColorLight } from "@/constants/ThemeVariables";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Avatar from "./Avatar";
import { Ionicons } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { router } from "expo-router";
import { auth } from "@/firebaseConfig";

export default function Post({ post, reloadPosts }) {
  const { showActionSheetWithOptions } = useActionSheet();

  function formatDate(timestamp) {
    const createdAt = new Date(timestamp);
    return createdAt.toLocaleDateString();
  }

  function showEditMenu() {
    const options = ["Update Post", "Delete Post", "Cancel"];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex,
        cancelButtonIndex,
        title: "Edit Post",
        message: "Do you want to change this post?"
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          showUpdateModal();
        } else if (buttonIndex === 1) {
          showDeleteDialog();
        }
      }
    );
  }

  function showUpdateModal() {
    router.push({
      pathname: "/post-modal",
      params: { id: post.id }
    });
  }

  function showDeleteDialog() {
    Alert.alert(
      "Delete Post",
      `Do you want to delete post '${post.caption}'?`,
      [
        {
          text: "No",
          style: "destructive"
        },
        { text: "Yes", onPress: deletePost }
      ]
    );
  }

  async function deletePost() {
    const response = await fetch(
      `https://expo-post-app-default-rtdb.firebaseio.com/posts/${post.id}.json`,
      {
        method: "DELETE"
      }
    );
    if (response.ok) {
      reloadPosts();
    }
  }

  return (
    <View style={styles.postContainer}>
      <View style={styles.headerContainer}>
        <Avatar uid={post.uid} />
        {auth.currentUser?.uid === post.uid && (
          <TouchableOpacity style={styles.dots} onPress={showEditMenu}>
            <Ionicons name="ellipsis-horizontal" size={28} color={primary} />
          </TouchableOpacity>
        )}
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
  },
  dots: {
    position: "absolute",
    right: 10
  }
});
