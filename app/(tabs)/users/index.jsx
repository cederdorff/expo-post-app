import { primary, secondary } from "@/constants/ThemeVariables";
import React, { useEffect, useState } from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";
import User from "../../../components/User";

export default function UsersTab() {
  const [users, setUsers] = useState([]);
  const [sections, setSections] = useState([]);

  console.log(new Date().getTime());

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/cederdorff/race/master/data/expo-users.json"
    )
      .then(response => response.json())
      .then(setUsers);
  }, []);

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
