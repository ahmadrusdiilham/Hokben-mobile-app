import { View, Text, Image, StyleSheet } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Location() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Comming Soon</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
