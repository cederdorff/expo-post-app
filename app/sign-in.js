import { useState } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Stack, useRouter } from "expo-router";

export default function SignIn() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const auth = getAuth();

    function handleSignIn() {
        signInWithEmailAndPassword(auth, mail, password)
            .then(userCredential => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                router.replace("/posts");
                // ...
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: "Sign In",
                    presentation: "modal",
                    headerTintColor: "#fff",
                    headerStyle: {
                        backgroundColor: "#264c59"
                    }
                }}
            />
            <Text style={styles.label}>Mail</Text>
            <TextInput style={styles.input} onChangeText={setMail} value={mail} placeholder="Type your mail" />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
                placeholder="Type your password"
            />
            <Button title="Sign In" color={Platform.OS === "ios" ? "#fff" : "#264c59"} onPress={handleSignIn} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#acc6c9"
    },
    main: {
        flex: 1
    },
    image: {
        aspectRatio: 1
    },
    label: {
        fontSize: 25,
        color: "#264c59",
        marginTop: 30,
        marginBottom: 5
    },
    input: {
        height: 50,
        padding: 10,
        backgroundColor: "#ffffff",
        borderRadius: 20,
        marginVertical: 20
    }
});
