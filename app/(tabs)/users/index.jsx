import { primary, secondary } from "@/constants/ThemeVariables";
import React, { useEffect, useState } from "react";
import { SectionList, StyleSheet, Text } from "react-native";
import User from "@/components/User";

export default function UsersTab() {
  const [users, setUsers] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const response = await fetch(
      "https://expo-post-app-default-rtdb.firebaseio.com/users.json"
    );
    const data = await response.json();
    const arrayOfUsers = Object.keys(data).map(key => {
      return {
        id: key,
        ...data[key]
      };
    });
    arrayOfUsers.sort((userA, userB) => userB.name - userA.name); // sort by name
    setUsers(arrayOfUsers);
  }

  useEffect(() => {
    const groupUsersByTitle = users.reduce((titles, user) => {
      const title = user.title || "Others";
      if (!titles[title]) {
        titles[title] = { title: title, data: [] };
      }
      titles[title].data.push(user);
      return titles;
    }, {});

    const sectionData = Object.values(groupUsersByTitle);
    sectionData.sort((a, b) => a.title.localeCompare(b.title));

    setSections(sectionData);
  }, [users]);

  function renderUser({ item }) {
    return <User user={item} />;
  }

  function renderHeader({ section }) {
    return <Text style={styles.header}>{section.title}</Text>;
  }

  return (
    <SectionList
      sections={sections}
      renderItem={renderUser}
      renderSectionHeader={renderHeader}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: primary,
    backgroundColor: secondary,
    paddingHorizontal: 10,
    paddingTop: 25,
    paddingBottom: 10
  }
});
