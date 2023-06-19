import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Redirect } from "expo-router";

export default function AppRoot() {
    return <Redirect href="/posts" />;
}
