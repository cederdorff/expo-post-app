import { StyleSheet, View, Text, Image } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { useEffect, useState } from "react";
import { router } from "expo-router";

export default function MapTab() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/cederdorff/race/master/data/expo-posts.json"
    )
      .then(response => response.json())
      .then(setPosts);
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {posts.map(post => (
          <Marker key={post.id} coordinate={post.location}>
            <Callout
              onPress={() =>
                router.push({
                  pathname: "map/[id]",
                  params: { id: post.id, postData: JSON.stringify(post) }
                })
              }>
              <View style={styles.calloutView}>
                <Text style={styles.caption}>{post.caption}</Text>
                <Image source={{ uri: post.image }} style={styles.image} />
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: "100%",
    height: "100%"
  },
  calloutView: {
    flex: 1
  },
  image: { height: 100 },
  caption: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10
  }
});
