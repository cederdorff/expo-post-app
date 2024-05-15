import StyledButton from "@/components/StyledButton";
import {
  labelFontSize,
  primary,
  secondary,
  tintColorDark,
  tintColorLight
} from "@/constants/ThemeVariables";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";

export default function PostModal() {
  const [location, setLocation] = useState({});
  const [image, setImage] = useState("");

  const { showActionSheetWithOptions } = useActionSheet();
  const router = useRouter();

  useEffect(() => {
    loadLocation();
  }, []);

  async function requestLocationPersmissions() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
  }

  async function requestCameraPermissions() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access camera was denied");
      return;
    }
  }

  async function loadLocation() {
    await requestLocationPersmissions();
    setLocation(await getLocation());
  }

  async function getLocation() {
    const currentLocation = await Location.getCurrentPositionAsync();
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${currentLocation.coords.latitude}+${currentLocation.coords.longitude}&key=34c26ae385c341ec835bbc7f3cd4440e`
    );
    const data = await response.json();
    return {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      city:
        data.results[0].components.city ||
        data.results[0].components.postal_city ||
        data.results[0].components.town,
      country: data.results[0].components.country
    };
  }

  async function chooseImage(type) {
    let result;

    if (type === "camera") {
      await requestCameraPermissions();

      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        base64: true,
        allowsEditing: true,
        quality: 0.3
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        base64: true,
        allowsEditing: true,
        quality: 0.3
      });
    }

    if (!result.canceled) {
      const base64 = "data:image/jpeg;base64," + result.assets[0].base64;
      setImage(base64);
    }
  }

  function chooseCameraOrLibrary() {
    showActionSheetWithOptions(
      {
        options: ["Take a photo", "Choose from library", "Cancel"],
        cancelButtonIndex: 2
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          chooseImage("camera");
        } else if (buttonIndex === 1) {
          chooseImage("library");
        }
      }
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Create Post",
          headerLeft: () => (
            <Button
              title="Cancel"
              onPress={() => router.back()}
              color={Platform.OS === "ios" ? tintColorLight : tintColorDark}
            />
          ),
          headerRight: () => (
            <Button
              title="Save"
              onPress={() => router.back()}
              color={Platform.OS === "ios" ? tintColorLight : tintColorDark}
            />
          )
        }}
      />

      <Text style={styles.label}>Image</Text>
      <TouchableOpacity onPress={chooseCameraOrLibrary}>
        <Image
          style={styles.image}
          source={{
            uri:
              image ||
              "https://cederdorff.com/race/images/placeholder-image.webp"
          }}
        />
      </TouchableOpacity>
      <Text style={styles.label}>Caption</Text>
      <TextInput style={styles.input} placeholder="Type your caption" />
      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your city"
        value={`${location.city}, ${location.country}`}
        editable={false}
      />
      <StyledButton title="Create Post" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: secondary
  },
  main: {
    flex: 1
  },
  image: {
    aspectRatio: 1,
    borderRadius: 7,
    borderColor: primary,
    borderWidth: 2
  },
  label: {
    fontSize: labelFontSize,
    color: primary,
    marginTop: 30,
    marginBottom: 5
  },
  input: {
    height: 50,
    padding: 10,
    backgroundColor: tintColorLight,
    borderRadius: 7,
    borderColor: primary,
    borderWidth: 2
  }
});
