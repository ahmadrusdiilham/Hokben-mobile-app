import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_ITEM_BY_ID = gql`
  query Query($getItemId: ID!) {
    getItem(id: $getItemId) {
      id
      name
      imgUrl
      price
      description
      CategoryId
      Category {
        name
        id
      }
      User {
        email
      }
      Ingredients {
        name
        id
        ItemId
      }
    }
  }
`;
export default function HomeScreen({ route }) {
  const { id } = route.params;
  const { loading, error, data } = useQuery(GET_ITEM_BY_ID, {
    variables: {
      getItemId: id,
    },
  });
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  console.log(error);
  const item = data.getItem;
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.imgUrl }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.text}>{item.description}</Text>
      <Text style={styles.text}>Price: Rp. {item.price.toLocaleString()}</Text>
      <Text style={styles.text}>
        Category : {item.Category ? item.Category.name : ""}
      </Text>
      <Text style={styles.text}>Ingredients: </Text>
      {item.Ingredients
        ? item.Ingredients.map((el, idx) => {
            return (
              <Text key={idx} style={styles.text}>
                {el.name}
              </Text>
            );
          })
        : ""}
      <Text style={styles.text}>
        Created By: {item.User ? item.User.email : ""}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    margin: 10,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: "contain",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  text: {
    fontSize: 16,
    margin: 10,
  },
});
