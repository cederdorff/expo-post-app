import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import User from "../../components/User";

export default function UsersTab() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/cederdorff/race/master/data/expo-users.json"
    )
      .then(response => response.json())
      .then(setUsers);
  }, []);

  function renderUser({ item }) {
    return <User user={item} />;
  }

  return (
    <View style={styles.list}>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={user => user.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
