import { View, Text, Button, StyleSheet, Pressable } from "react-native";
const Separator = () => <View style={styles.separator} />;
export default function ButtonCategory({ category, navigation }) {
  return (
    <>
      <Pressable style={styles.button2}>
        <Text style={styles.buttonText}>{category.name}</Text>
      </Pressable>
      <Separator />
    </>
  );
}
const styles = StyleSheet.create({
  button2: {
    flex: 0,
    flexWrap: "wrap",
    alignItems: "center",
    gap: 10,
  },
  buttonText: {
    fontSize: 14,
    padding: 5,
    borderRadius: 100,
  },

  separator: {
    marginVertical: 5,
    borderLeftColor: "#000000",
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
});
