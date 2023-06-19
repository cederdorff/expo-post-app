import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import User from "../components/User";

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getUsers() {
            const response = await fetch("https://expo-post-app-default-rtdb.firebaseio.com/users.json");
            const dataObj = await response.json();
            const usersArray = Object.keys(dataObj).map(key => ({ id: key, ...dataObj[key] })); // from object to array
            usersArray.sort((userA, userB) => userA.name.localeCompare(userB.name)); // sort by name
            setUsers(usersArray);
        }
        getUsers();
    }, []);

    function renderUser(item) {
        const user = item.item;
        return <User user={user} />;
    }

    return (
        <View style={styles.list}>
            <FlatList data={users} renderItem={renderUser} keyExtractor={post => post.id} />
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
});
