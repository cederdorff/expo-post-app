import StyledButton from "@/components/StyledButton";
import {
  borderRadius,
  labelFontSize,
  placeholderTextColor,
  primary,
  secondary,
  tintColorLight
} from "@/constants/ThemeVariables";
import { auth } from "@/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { Stack, router } from "expo-router";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Toast from "react-native-root-toast";

export default function Profile() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [mail, setMail] = useState("");
  const [image, setImage] = useState("");
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  // url to fetch (get and put) user data from Firebase Realtime Database
  const url = `${API_URL}/users/${auth.currentUser?.uid}.json`;

  useEffect(() => {
    setMail(auth.currentUser.email); // set mail to the current user email
    getUser(); // fetch user data from Firebase Realtime Database
  }, []);

  async function getUser() {
    const response = await fetch(url);
    const userData = await response.json();

    if (userData) {
      // if userData exists set states with values from userData (data from Firebase Realtime Database)
      setName(userData?.name); // set name to the value of the name property from userData
      setTitle(userData?.title); // set title to the value of the title property from userData
      setImage(userData?.image); // set image to the value of the image property from userData
    }
  }

  // sign out the user and redirect to the sign-in screen
  async function handleSignOut() {
    await signOut(auth);
    router.replace("/sign-in");
  }

  // choose an image from the device gallery
  async function chooseImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      quality: 0.3
    });

    // if the user didn't cancel the image picker, set the image state with the base64 image
    if (!result.canceled) {
      const base64 = "data:image/jpeg;base64," + result.assets[0].base64;
      setImage(base64);
    }
  }

  async function handleSaveUser() {
    const userToUpdate = { name: name, mail: mail, title, image }; // create an object to hold the user to update properties

    // send a PUT request to update user data in Firebase Realtime Database
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(userToUpdate)
    });
    // if the response is ok, log the user data
    if (response.ok) {
      const data = await response.json();
      console.log("User data: ", data);
      Toast.show("Your profile has been updated");
    } else {
      Toast.show("Sorry, something went wrong");
    }
  }

  return (
    <ScrollView
      style={styles.container}
      automaticallyAdjustKeyboardInsets={true}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              title="Sign Out"
              color={Platform.OS === "ios" ? tintColorLight : primary}
              onPress={handleSignOut}
            />
          )
        }}
      />
      <View>
        <TouchableOpacity onPress={chooseImage} style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri:
                image ||
                "https://cederdorff.com/race/images/placeholder-image.webp"
            }}
          />
        </TouchableOpacity>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Type your name"
          placeholderTextColor={placeholderTextColor}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          value={title}
          placeholder="Type your title"
          placeholderTextColor={placeholderTextColor}
          autoCapitalize="none"
        />
        <Text style={styles.label}>Mail</Text>
        <TextInput
          style={styles.input}
          onChangeText={setMail}
          value={mail}
          placeholder="Type your mail"
          placeholderTextColor={placeholderTextColor}
          autoCapitalize="none"
          editable={false}
          backgroundColor="#dddddd"
        />
        <View style={styles.buttonContainer}>
          <StyledButton text="Save" style="primary" onPress={handleSaveUser} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: secondary
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
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: primary,
    borderRadius: 200,
    padding: 2,
    backgroundColor: tintColorLight
  },
  image: {
    aspectRatio: 1,
    borderRadius: 200
  },
  buttonContainer: {
    marginBottom: 50,
    marginTop: 20
  }
});
