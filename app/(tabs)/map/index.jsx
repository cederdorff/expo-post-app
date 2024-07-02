import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import MapMarker from "../../../components/MapMarker";

export default function MapTab() {
  const [posts, setPosts] = useState([]);
  const [location, setLocation] = useState(null);
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const response = await fetch(`${API_URL}/posts.json`);
    const data = await response.json();
    const arrayOfPosts = Object.keys(data).map(key => {
      return {
        id: key,
        ...data[key]
      };
    });
    setPosts(arrayOfPosts);
  }

  useEffect(() => {
    async function requestLocationPersmissions() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync();
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
      <MapView
        style={styles.map}
        initialRegion={location}
        region={location}
        showsUserLocation={true}>
        {/* <Marker coordinate={location} title="You are here" pinColor={primary} /> */}
        {posts.map(post => (
          <MapMarker post={post} key={post.id} />
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
