import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {LaptopsList} from "./screens/LaptopsList"

export default function App() {
  const StackContacts = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StackContacts.Navigator screenOptions={{ headerShown: true }}>
        <StackContacts.Screen name="LaptopsListNav"
          component={LaptopsList}
        />
      </StackContacts.Navigator>
    </NavigationContainer>
  );
}

