import { Stack, useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Post from "../../components/Post";
import { Ionicons } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";

export default function UserDetails() {
    const { id } = useSearchParams();
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const { showActionSheetWithOptions } = useActionSheet();

    useEffect(() => {
        async function getUser() {
            const response = await fetch(`https://expo-post-app-default-rtdb.firebaseio.com/users/${id}.json`);
            const data = await response.json();
            console.log(data);
            setUser(data);
        }

        async function getPosts() {
            // fetch posts where uid is equal to userId prop
            const response = await fetch(
                `https://expo-post-app-default-rtdb.firebaseio.com/posts.json?orderBy="uid"&equalTo="${id}"`
            );
            const dataObj = await response.json();
            const postsArray = Object.keys(dataObj).map(key => ({ id: key, ...dataObj[key] })); // from object to array
            postsArray.sort((postA, postB) => postB.createdAt - postA.createdAt); // sort by timestamp/ createdBy
            setPosts(postsArray);
        }
        getUser();
        getPosts();
    }, [id]);

    function showEditMenu() {
        const options = ["Update User", "Delete User", "Cancel"];
        const destructiveButtonIndex = 1;
        const cancelButtonIndex = 2;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
                destructiveButtonIndex,
                title: "Change User"
            },
            selectedIndex => {
                console.log(selectedIndex);
                switch (selectedIndex) {
                    case 0:
                        // Update User
                        console.log("Update User");
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
        <ScrollView nestedScrollEnabled={true}>
            <Stack.Screen
                options={{
                    title: user?.name,
                    headerRight: () => (
                        <TouchableOpacity onPress={showEditMenu}>
                            <Ionicons style={styles.dots} name="ellipsis-horizontal" size={28} color="#ffffff" />
                        </TouchableOpacity>
                    )
                }}
            />
            <View style={styles.userNameContainer}>
                <Text style={styles.userTitle}>{user?.title}</Text>
                <Text style={styles.userTitle}>{user?.mail}</Text>
            </View>
            <Image style={styles.userImage} source={{ uri: user?.image }} />
            <Text style={styles.postHeader}>Posts by {user?.name}</Text>
            {posts.map(post => (
                <Post post={post} key={post.id} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    userImage: {
        height: 275
    },
    userNameContainer: {
        paddingVertical: 16,
        alignItems: "center",
        backgroundColor: "#264c59"
    },
    userTitle: {
        fontSize: 16,
        color: "#ffffff",
        paddingVertical: 4
    },
    postHeader: {
        fontSize: 22,
        paddingTop: 45,
        paddingBottom: 15,
        paddingHorizontal: 12,
        backgroundColor: "#acc6c9",
        color: "#264c59",
        fontWeight: "bold"
    }
});
