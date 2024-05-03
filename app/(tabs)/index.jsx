import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import Welcome from "@/components/Welcome";
import { useEffect, useState } from "react";

export default function TabOneScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Define URL
    const url = "https://raw.githubusercontent.com/cederdorff/race/master/data/users.json";
    // Fetch data from API
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        console.log("users:", users);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {users.map(user => (
        <Welcome key={user.id} name={user.name} mail={user.mail} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
});
