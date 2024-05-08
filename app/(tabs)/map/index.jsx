import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { primary } from "@/constants/ThemeVariables";

export default function MapTab() {
  const [posts, setPosts] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/cederdorff/race/master/data/expo-posts.json"
    )
      .then(response => response.json())
      .then(setPosts);
  }, []);

  useEffect(() => {
    async function requestLocationPersmissions() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync();
      console.log("currentLocation", currentLocation);
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.15,
        longitudeDelta: 0.04
      });
    }
    requestLocationPersmissions();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={location} region={location}>
        <Marker coordinate={location} title="You are here" pinColor={primary} />
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
