import {
  View,
  Text,
  Icon,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Card from "../components/Card";
import { useQuery } from "@apollo/client";
import { GET_ITEMS_AND_CATEGORIES } from "../query";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomeScreen({ navigation }) {
  const { data, loading, error } = useQuery(GET_ITEMS_AND_CATEGORIES);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 16, fontSize: 18 }}>Loading...</Text>
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
  const items = data.getItems;
  const categories = data.getCategories;
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center" }}>
        <Ionicons
          style={{ padding: 10, position: "absolute", right: 10 }}
          name="search-outline"
          size={20}
        />
        <TextInput style={styles.input} placeholder="Search Menu" />
      </View>
      <View style={styles.buttonMenu}>
        <Pressable style={styles.button}>
          <Text>NEW</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text>All Menu</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text>Promos</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text>My Favorite</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text>History</Text>
        </Pressable>
      </View>
      <View style={styles.buttonCategory}>
        <ScrollView horizontal={true}>
          {categories.map((el, idx) => {
            return (
              <Pressable
                style={styles.buttonCategory}
                key={el.id}
                // onPress={() => {
                //   setCategoryId(idx + 1);
                // }}
              >
                <Text style={styles.textButton}>{el.name}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        style={styles.flatlist}
        data={items}
        renderItem={({ item }) => {
          return <Card food={item} navigation={navigation} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  flatlist: {
    flex: 1,
    width: "100%",
    padding: 10,
    gap: 20,
  },
  input: {
    height: 35,
    width: 330,
    borderRadius: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    // backgroundColor: "#E6E6FA",
  },
  buttonMenu: {
    flexDirection: "row",
    gap: 5,
    margin: 10,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#DEB887",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  buttonCategory: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 3,
    marginBottom: 5,
  },
  button2: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 10,
  },
  containerText: {
    padding: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5, // Spacing between labels
  },
  address: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 8,
    borderLeftColor: "#000000",
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
  textButton: {
    borderWidth: 1,
    borderColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 4,
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
});
