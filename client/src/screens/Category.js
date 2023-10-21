import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import CardCategory from "../components/CardCategory";
import { GET_CATEGORIES } from "../query";
import { useQuery } from "@apollo/client";
export default function Category({ navigation }) {
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Upss Error</Text>
      </View>
    );
  }
  const categories = data.getCategories;
  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => {
        return <CardCategory category={item} />;
      }}
      keyExtractor={(item) => item.id}
      numColumns={2}
      ListHeaderComponent={<Text style={styles.text}>Categories</Text>}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: 10,
    justifyContent: "center",
    backgroundColor: "yellow",
  },
  text: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
});
