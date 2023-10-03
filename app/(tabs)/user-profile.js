import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Platform, StyleSheet, View, Text } from "react-native";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";

export default function UserProfile() {
    const router = useRouter();
    const [mail, setMail] = useState([]);
    const API_URL = "https://expo-post-app-default-rtdb.firebaseio.com";

    useEffect(() => {
        console.log(auth.currentUser.email);
        setMail(auth.currentUser.email);
    }, []);

    async function handleSignOut() {
        await signOut(auth);
        router.replace("/sign-in");
    }

    return (
        <View style={styles.list}>
            <Stack.Screen
                options={{
                    headerRight: () => <Button title="Sign Out" color={Platform.OS === "ios" ? "#fff" : "#264c59"} onPress={handleSignOut} />
                }}
            />
            <View>
                <Text>{mail}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
});
