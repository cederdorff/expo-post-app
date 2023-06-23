import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Avatar from "./Avatar";
import { Ionicons } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";

export default function Post({ post }) {
    const { showActionSheetWithOptions } = useActionSheet();

    function formatDate(timestamp) {
        const createdAt = new Date(timestamp);
        let month = createdAt.getMonth();
        let date = createdAt.getDate();

        month = month < 10 ? "0" + month : month;
        date = date < 10 ? "0" + date : date;

        return `${createdAt.getFullYear()}-${month}-${date}`;
    }

    function showEditMenu() {
        const options = ["Update Post", "Delete Post", "Cancel"];
        const destructiveButtonIndex = 1;
        const cancelButtonIndex = 2;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
                destructiveButtonIndex,
                title: "Edit Post"
            },
            selectedIndex => {
                console.log(selectedIndex);
                switch (selectedIndex) {
                    case 0:
                        // Update User
                        console.log("Update Post");
                        break;

                    case destructiveButtonIndex:
                        // Delete
                        break;

                    case cancelButtonIndex:
                    // Canceled
                }
            }
        );
    }

    return (
        <View style={styles.postContainer}>
            <View style={styles.headerContainer}>
                <Avatar userId={post.uid} />
                <TouchableOpacity style={styles.dots} onPress={showEditMenu}>
                    <Ionicons name="ellipsis-horizontal" size={28} color="#264c59" />
                </TouchableOpacity>
            </View>
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
    },
    headerContainer: {
        alignItems: "center",
        flexDirection: "row"
    },
    dots: {
        position: "absolute",
        right: 10
    }
});
