import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
export default function User({ user }) {
    return (
        <View style={styles.userContainer}>
            <View style={styles.userImageContainer}>
                <Image style={styles.userImage} source={{ uri: user.image }} />
            </View>
            <View>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userTitle}>{user.title}</Text>
            </View>
            <Ionicons style={styles.chevron} name="chevron-forward-outline" size={28} color="#264c59" />
        </View>
    );
}

const styles = StyleSheet.create({
    userContainer: {
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderBottomColor: "#acc6c9",
        borderBottomWidth: 0.5
    },
    userImageContainer: {
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
    userImage: {
        borderRadius: 42 / 2,
        height: 45,
        width: 45
    },
    userName: {
        fontSize: 17,
        fontWeight: "bold",
        marginRight: 12
    },
    userTitle: {
        fontSize: 13,
        marginRight: 12
    },
    chevron: {
        position: "absolute",
        right: 10
    }
});
