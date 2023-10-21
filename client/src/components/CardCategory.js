import { View, Image, Text, Button, StyleSheet } from "react-native";

export default function CardCategory({ category, navigation }) {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>{category.name}</Text>
      <Image
        source={{
          uri: "https://www.hokben.co.id/assets/img/logo_hokben_1.png",
        }}
        style={styles.image}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: 10,
    justifyContent: "center",
    backgroundColor: "yellow",
  },
  box: {
    height: 180,
    width: "45%",
    margin: 5,
    marginLeft: 10,
    textAlign: "center",
    backgroundColor: "white",
    padding: 5,
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
