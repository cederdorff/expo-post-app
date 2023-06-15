import { View, Image, StyleSheet, Text } from "react-native";
import Avatar from "./Avatar";

export default function Post({ post }) {
    console.log(post);
    return (
        <View style={styles.postContainer}>
            <Avatar userId={post.uid} />
            <Image style={styles.postImage} source={{ uri: post.image }} />
            <Text style={styles.postCaption}>{post.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    listItem: {},
    listItemHeader: {
        alignItems: "center",
        flexDirection: "row",
        padding: 8
    },
    listItemAuthorAvatarContainer: {
        alignItems: "center",
        borderRadius: 48 / 2,
        borderWidth: 2,
        borderColor: "red",
        display: "flex",
        height: 48,
        justifyContent: "center",
        marginRight: 12,
        width: 48
    },
    listItemAuthorAvatar: {
        borderRadius: 42 / 2,
        height: 38,
        width: 38
    },
    listItemAuthorName: {
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 12
    },
    listItemDot: {
        backgroundColor: "#000",
        borderRadius: 4 / 2,
        height: 4,
        marginRight: 12,
        marginTop: 2,
        width: 4
    },
    listItemFollow: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#3B82F6"
    },
    postContainer: {
        flex: 1,
        minHeight: 320,
        paddingBottom: 20,
        borderBottomColor: "#acc6c9",
        borderBottomWidth: 0.5
    },
    postCaption: {
        fontSize: 20,
        padding: 20
    },
    postImage: {
        aspectRatio: 1,
        flex: 1
    },
    videoElement: {
        flex: 1
    },
    videoOverlay: {
        bottom: 0,
        left: 0,
        position: "absolute",
        backgroundColor: "transparent",
        right: 0,
        top: 0
    },
    listItemFooter: {
        padding: 8,
        paddingLeft: 16,
        flexDirection: "row"
    },
    listItemFooterImage: {
        width: 28,
        height: 28
    },
    gap: {
        marginRight: 12
    },
    gap2: {
        marginRight: 8
    }
});
