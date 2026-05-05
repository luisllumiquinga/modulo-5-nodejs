import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {ContactsList} from "./screens/ContactsList"

export default function App() {
  const StackContacts = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StackContacts.Navigator screenOptions={{ headerShown: true }}>
        <StackContacts.Screen name="ContactsListNav"
          component={ContactsList}
        />
      </StackContacts.Navigator>
    </NavigationContainer>
  );
}

