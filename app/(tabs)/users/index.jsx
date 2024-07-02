import User from "@/components/User";
import { primary, secondary } from "@/constants/ThemeVariables";
import React, { useEffect, useState } from "react";
import { RefreshControl, SectionList, StyleSheet, Text } from "react-native";

export default function UsersTab() {
  const [users, setUsers] = useState([]);
  const [sections, setSections] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const response = await fetch(`${API_URL}/users.json`);
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

  async function handleRefresh() {
    setRefreshing(true);
    await getUsers();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }

  return (
    <SectionList
      sections={sections}
      renderItem={renderUser}
      renderSectionHeader={renderHeader}
      keyExtractor={item => item.id}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={primary}
        />
      }
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
