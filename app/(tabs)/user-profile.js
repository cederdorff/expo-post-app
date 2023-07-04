import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Platform, StyleSheet, View, Text } from "react-native";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import * as Location from "expo-location";

export default function UserProfile() {
    const router = useRouter();
    const [mail, setEmail] = useState([]);
    const [location, setLocation] = useState(null);
    const [long, setLong] = useState("");
    const [lat, setLat] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const API_URL = "https://expo-post-app-default-rtdb.firebaseio.com";

    useEffect(() => {
        console.log(auth.currentUser.email);
        setEmail(auth.currentUser.email);
    }, []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setLong(location.coords.longitude);
            setLat(location.coords.latitude);
            console.log(location);
        })();
    }, []);

    async function handleSignOut() {
        await signOut(auth);
        router.replace("/sign-in");
    }

    return (
        <View style={styles.list}>
            <Stack.Screen
                options={{
                    headerRight: () => (
                        <Button
                            title="Sign Out"
                            color={Platform.OS === "ios" ? "#fff" : "#264c59"}
                            onPress={handleSignOut}
                        />
                    )
                }}
            />
            <View>
                <Text>{mail}</Text>
                <Text>Lat: {lat}</Text>
                <Text>Long: {long}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
});
