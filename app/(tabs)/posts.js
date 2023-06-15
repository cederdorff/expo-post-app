import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import Post from "../components/Post";

export default function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const response = await fetch("https://post-rest-api-default-rtdb.firebaseio.com/posts.json");
            const dataObj = await response.json();
            const postsArray = Object.keys(dataObj).map(key => ({ id: key, ...dataObj[key] })); // from object to array
            setPosts(postsArray);
        }
        getPosts();
    }, []);

    function renderPosts(item) {
        const post = item.item;
        return <Post post={post} />;
    }

    return (
        <View style={styles.list}>
            <FlatList data={posts} renderItem={renderPosts} keyExtractor={post => post.id} />
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: "RED",
        flex: 1
    }
});
