import * as Location from "expo-location";
import { Stack, useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import { auth } from "../../firebase-config";
import MapView, { Marker } from "react-native-maps";
import { Alert } from "react-native";

export default function UserProfile() {
    const router = useRouter();
    const [mail, setEmail] = useState([]);
    const [long, setLong] = useState("");
    const [lat, setLat] = useState("");

    useEffect(() => {
        console.log(auth.currentUser.email);
        setEmail(auth.currentUser.email);
    }, []);

    useEffect(() => {
        getLocation();
    }, []);

    async function getLocation() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.log("Permission Error", "Permission to access location was denied");
            return;
        }
        const location = await Location.getCurrentPositionAsync();
        console.log(location);
        setLong(location.coords.longitude);
        setLat(location.coords.latitude);
    }

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
                <MapView style={styles.map}>
                    <Marker coordinate={{ latitude: lat, longitude: long }} title="RACE" description="Here I am" />
                </MapView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    },
    map: {
        width: "100%",
        height: "100%"
    }
});
