import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AppLayout() {
    return (
        <>
            <StatusBar style="light" />

            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </>
    );
}
