import { Image, StyleSheet, Text, View } from "react-native";
import Avatar from "./Avatar";

export default function Post({ post }) {
    function formatDate(timestamp) {
        const createdAt = new Date(timestamp);
        let month = createdAt.getMonth();
        let date = createdAt.getDate();

        month = month < 10 ? "0" + month : month;
        date = date < 10 ? "0" + date : date;

        return `${createdAt.getFullYear()}-${month}-${date}`;
    }

    return (
        <View style={styles.postContainer}>
            <Avatar userId={post.uid} />
            <Image style={styles.postImage} source={{ uri: post.image }} />
            <Text style={styles.postCaption}>{post.caption}</Text>
            <Text style={styles.postDate}>{formatDate(post.createdAt)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    postContainer: {
        flex: 1,
        minHeight: 320,
        paddingBottom: 30,
        borderBottomColor: "#acc6c9",
        borderBottomWidth: 0.5
    },
    postCaption: {
        fontSize: 22,
        padding: 15
    },
    postDate: {
        fontSize: 15,
        paddingHorizontal: 15
    },
    postImage: {
        aspectRatio: 1,
        flex: 1
    }
});
