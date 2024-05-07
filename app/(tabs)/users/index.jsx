import { primary, secondary } from "@/constants/ThemeVariables";
import React, { useEffect, useState } from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";
import User from "../../../components/User";

export default function UsersTab() {
  const [users, setUsers] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/cederdorff/race/master/data/expo-users.json"
    )
      .then(response => response.json())
      .then(setUsers);
  }, []);

  useEffect(() => {
    const groupUsersByTitle = users.reduce((sections, user) => {
      const title = user.title || "Others";
      if (!sections[title]) {
        sections[title] = { title: title, data: [] };
      }
      sections[title].data.push(user);
      return sections;
    }, {});

    setSections(Object.values(groupUsersByTitle));
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
    paddingVertical: 20
  }
});
