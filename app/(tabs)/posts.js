import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, RefreshControl, StyleSheet, View } from "react-native";
import Post from "../components/Post";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        getPosts();
    }, []);

    async function getPosts() {
        const response = await fetch("https://expo-post-app-default-rtdb.firebaseio.com/posts.json");
        const dataObj = await response.json();
        const postsArray = Object.keys(dataObj).map(key => ({ id: key, ...dataObj[key] })); // from object to array
        postsArray.sort((postA, postB) => postB.createdAt - postA.createdAt); // sort by timestamp/ createdBy
        setPosts(postsArray);
    }

    function renderPost(item) {
        const post = item.item;
        return <Post post={post} reload={handleRefresh} />;
    }

    async function handleRefresh() {
        setRefreshing(true);
        await getPosts();
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }

    return (
        <View style={styles.list}>
            <Stack.Screen
                options={{
                    headerRight: () => (
                        <Button title="Add New" color="#fff" onPress={() => router.push("/post-modal")} />
                    )
                }}
            />

            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={post => post.id}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#264c59" />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
});
