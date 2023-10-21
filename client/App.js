import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackScreen from "./src/Navigation/StackScreen";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.ahmadrusdiilham.com/",
  cache: new InMemoryCache(),
});
export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {/* <TabNavigation /> */}
        <StackScreen />
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({});
