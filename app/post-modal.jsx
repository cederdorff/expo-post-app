import StyledButton from "@/components/StyledButton";
import {
  borderRadius,
  labelFontSize,
  placeholderTextColor,
  primary,
  secondary,
  tintColorDark,
  tintColorLight
} from "@/constants/ThemeVariables";
import { auth } from "@/firebaseConfig";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
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
import Toast from "react-native-root-toast";

export default function PostModal() {
  const [location, setLocation] = useState({});
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const { showActionSheetWithOptions } = useActionSheet();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const OPEN_CAGE_API_KEY = process.env.EXPO_PUBLIC_OPEN_CAGE_API_KEY;

  useEffect(() => {
    if (id) {
      getPost();
    }
  }, [id]);

  async function getPost() {
    const response = await fetch(`${API_URL}/posts/${id}.json`);
    const data = await response.json();
    setImage(data.image);
    setCaption(data.caption);
  }

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
      `https://api.opencagedata.com/geocode/v1/json?q=${currentLocation.coords.latitude}+${currentLocation.coords.longitude}&key=${OPEN_CAGE_API_KEY}`
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

  async function handleCreatePost() {
    const createdAt = new Date().getTime(); // Get the current time
    const post = {
      caption: caption, // Get the caption from the input / state
      image: image, // Get the image from the state
      createdAt: createdAt, // Get the current time
      location: location, // Get the location from the state
      uid: auth.currentUser.uid //
    };

    // Send the new post to the Firebase Realtime Database
    const response = await fetch(`${API_URL}/posts.json`, {
      method: "POST",
      body: JSON.stringify(post)
    });

    // If the response is OK, go back to the previous screen
    if (response.ok) {
      Toast.show("Post successfully created");
      router.back();
    } else {
      Toast.show("Sorry, something went wrong. Please try again.");
    }
  }

  async function handleUpdatePost() {
    const post = {
      caption: caption,
      image: image
    };
    const response = await fetch(`${API_URL}/posts/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify(post)
    });
    if (response.ok) {
      Toast.show("Post successfully updated");
      router.back();
    } else {
      Toast.show("Sorry, something went wrong. Please try again.");
    }
  }

  function handleSave() {
    if (id) {
      handleUpdatePost();
    } else {
      handleCreatePost();
    }
  }

  return (
    <ScrollView
      style={styles.container}
      automaticallyAdjustKeyboardInsets={true}>
      <Stack.Screen
        options={{
          title: id ? "Update Post" : "Create Post",
          headerLeft: () => (
            <Button
              title="Cancel"
              onPress={() => router.back()}
              color={Platform.OS === "ios" ? tintColorLight : tintColorDark}
            />
          ),
          headerRight: () => (
            <Button
              title={id ? "Update" : "Create"}
              onPress={handleSave}
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
      <TextInput
        style={styles.input}
        onChangeText={setCaption}
        value={caption}
        placeholder="Type your caption"
        placeholderTextColor={placeholderTextColor}
      />
      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your city"
        value={
          location.city
            ? `${location.city}, ${location.country}`
            : "Loading your current location..."
        }
        editable={false}
        backgroundColor="#dddddd"
      />
      <StyledButton
        text={id ? "Update Post" : "Create Post"}
        onPress={handleSave}
        style="primary"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: secondary
  },
  image: {
    aspectRatio: 1,
    borderRadius: borderRadius,
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
    borderRadius: borderRadius,
    borderColor: primary,
    borderWidth: 2
  }
});
