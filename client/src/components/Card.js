import { View, Image, Text, Button, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Separator = () => <View style={styles.separator} />;

export default function Card({ food, navigation }) {
  return (
    <>
      <Pressable
        onPress={() => {
          navigation.navigate("Detail", {
            id: food.id,
            foodName: food.name,
          });
        }}
      >
        <View style={styles.container}>
          <Image
            source={{
              uri: food.imgUrl,
            }}
            style={styles.image}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              {food.name}
            </Text>
          </View>

          <View
            style={{
              flex: 0,
              alignItems: "flex-end",
            }}
          >
            <Ionicons name="chevron-forward" size={20} color="gray" />
            <View
              style={{
                flex: 0,
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Ionicons
                style={{ marginTop: 15 }}
                name="heart"
                size={16}
                color="red"
              />
              <Pressable
                style={{
                  borderWidth: 2,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  marginTop: 10,
                  borderColor: "green",
                  borderRadius: 100,
                }}
              >
                <Text style={{ color: "green", fontSize: 12 }}>+ Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
      <Separator />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  image: {
    width: "35%",
    height: 100,
    resizeMode: "contain",
    borderRadius: 15,
    overflow: "hidden",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
