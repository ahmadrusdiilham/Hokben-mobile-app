import HomeScreen from "../screens/HomeScreen";
import Category from "../screens/Category";
import Location from "../screens/Location";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Menu") {
              iconName = focused ? "fast-food" : "fast-food-outline";
            } else if (route.name === "Category") {
              iconName = focused ? "list" : "list-circle";
            } else if (route.name === "Location") {
              iconName = focused ? "location" : "location-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        };
      }}
    >
      <Tab.Screen
        name="Menu"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Location"
        component={Location}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
