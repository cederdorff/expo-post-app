import { Stack, useRouter, useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View, Button } from "react-native";

export default function PostModal() {
    const { id } = useSearchParams();
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState("");
    const router = useRouter();

    const API_URL = "https://expo-post-app-default-rtdb.firebaseio.com";

    useEffect(() => {
        async function getPost() {
            const response = await fetch(`${API_URL}/posts/${id}.json`);
            const data = await response.json();
            setImage(data.image);
            setCaption(data.caption);
        }
        if (id) {
            getPost();
        }
    }, [id]);

    function handleSave() {
        if (id) {
            updatePost();
        } else {
            createPost();
        }
    }

    async function updatePost() {
        const post = { caption: caption, image: image };
        const response = await fetch(`${API_URL}/posts/${id}.json`, { method: "PATCH", body: JSON.stringify(post) });
        if (response.ok) {
            router.back();
        }
    }
    async function createPost() {
        const createdAt = new Date().getTime();
        const post = {
            caption: caption,
            image: image,
            createdAt: createdAt,
            uid: "fTs84KRoYw5pRZEWCq2Z"
        };
        const response = await fetch(`${API_URL}/posts.json`, { method: "POST", body: JSON.stringify(post) });
        if (response.ok) {
            router.back();
        }
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: id ? "Update Post" : "Create Post",
                    headerRight: () => <Button title={id ? "Update" : "Create"} color="#fff" onPress={handleSave} />
                }}
            />
            <View style={styles.main}>
                <Image
                    style={styles.image}
                    source={{
                        uri:
                            image ||
                            "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
                    }}
                />
                <Text style={styles.label}>Image Url</Text>
                <TextInput style={styles.input} keyboardType="url" onChangeText={setImage} value={image} />
                <Text style={styles.label}>Caption</Text>
                <TextInput style={styles.input} onChangeText={setCaption} value={caption} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#acc6c9"
    },
    main: {
        flex: 1,
        justifyContent: "center"
    },
    image: {
        aspectRatio: 1
    },
    label: {
        fontSize: 25,
        color: "#264c59",
        marginTop: 30,
        marginBottom: 5
    },
    input: {
        height: 50,
        padding: 10,
        backgroundColor: "#ffffff",
        borderRadius: 20
    }
});
