import { Text } from "react-native";

export default function Welcome({ name, mail }) {
  return (
    <Text>
      Hello, {name} 👋🏻 Your mail is: {mail}
    </Text>
  );
}
