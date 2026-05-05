import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {ContactsList} from "./screens/ContactsList"
import {ContactsForm} from "./screens/ContactsForm"

export default function App() {
  const StackContacts = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StackContacts.Navigator initialRouteName="ContactsListNav">
        <StackContacts.Screen name="ContactsListNav"
          component={ContactsList}
        />
        <StackContacts.Screen name="ContactsFormNav"
          component={ContactsForm}
        />
      </StackContacts.Navigator>
    </NavigationContainer>
  );
}

