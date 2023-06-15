import { Image, StyleSheet, Text, View } from "react-native";
import Avatar from "./Avatar";

export default function Post({ post }) {
    return (
        <View style={styles.postContainer}>
            <Avatar userId={post.uid} />
            <Image style={styles.postImage} source={{ uri: post.image }} />
            <Text style={styles.postCaption}>{post.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    postContainer: {
        flex: 1,
        minHeight: 320,
        paddingBottom: 20,
        borderBottomColor: "#acc6c9",
        borderBottomWidth: 0.5
    },
    postCaption: {
        fontSize: 20,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    postImage: {
        aspectRatio: 1,
        flex: 1
    }
});
