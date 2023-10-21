import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import HomeScreen from "../screens/HomeScreen";
import TabNavigation from "./TabNavigation";
import Detail from "../screens/Detail";
export default function StackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="Home" component={TabNavigation} />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={({ route }) => ({ title: route.params.foodName })}
      />
    </Stack.Navigator>
  );
}
