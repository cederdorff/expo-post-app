import { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text } from "react-native";

export default function Avatar({ userId }) {
    const [user, setUser] = useState([]);

    useEffect(() => {
        async function getUser() {
            const response = await fetch(`https://post-rest-api-default-rtdb.firebaseio.com/users/${userId}.json`);
            const data = await response.json();
            console.log(data);
            setUser(data);
        }
        getUser();
    }, [userId]);

    return (
        <View style={styles.userAvatar}>
            <View style={styles.avatarContainer}>
                <Image style={styles.avatarImage} source={{ uri: user.image }} />
            </View>
            <Text style={styles.avatarName}>{user.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    userAvatar: {
        alignItems: "center",
        flexDirection: "row",
        padding: 8
    },
    avatarContainer: {
        alignItems: "center",
        borderRadius: 55 / 2,
        borderWidth: 3,
        borderColor: "#264c59",
        display: "flex",
        height: 55,
        justifyContent: "center",
        marginRight: 12,
        width: 55
    },
    avatarImage: {
        borderRadius: 42 / 2,
        height: 45,
        width: 45
    },
    avatarName: {
        fontSize: 18,
        fontWeight: "bold",
        marginRight: 12
    }
});
