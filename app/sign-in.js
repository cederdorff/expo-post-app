import { useState } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";

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
                router.push("/posts");
                // ...
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    return (
        <View>
            <Text>Sign in</Text>
            <TextInput style={styles.input} onChangeText={setMail} value={mail} />
            <TextInput style={styles.input} onChangeText={setPassword} value={password} />
            <Button title="Sign In" onPress={handleSignIn} />
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
        borderRadius: 20
    }
});
