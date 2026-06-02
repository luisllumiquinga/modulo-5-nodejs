import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import ProductosScreen from './screens/ProductosScreens';
import VentasScreen from './screens/VentasScreens';
import DetalleVentaScreen from './screens/DetalleVentasScreens';
import ClientesScreen from './screens/ClientesScreens';
import NuevaVentaScreen from './screens/NuevaVentaScreens';
import InventarioScreen from './screens/InventarioScreens';
import DetalleProductoScreen from './screens/DetalleProductoScreens';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ProductosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#085041' }, headerTintColor: '#9FE1CB' }}>
      <Stack.Screen name="ListaProductos" component={ProductosScreen} options={{ title: 'Productos' }} />
      <Stack.Screen name="DetalleProducto" component={DetalleProductoScreen} options={{ title: 'Detalle Producto' }} />
    </Stack.Navigator>
  );
}

function VentasStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#085041' }, headerTintColor: '#9FE1CB' }}>
      <Stack.Screen name="ListaVentas" component={VentasScreen} options={{ title: 'Ventas' }} />
      <Stack.Screen name="DetalleVenta" component={DetalleVentaScreen} options={{ title: 'Detalle' }} />
      <Stack.Screen name="NuevaVenta" component={NuevaVentaScreen} options={{ title: 'Nueva Venta' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#1D9E75',
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ focused }) => {
          const icons = { Productos: '🛍️', Ventas: '🧾', Clientes: '👥', Inventario: '📦' };
          return <Text style={{ fontSize: focused ? 22 : 18 }}>{icons[route.name]}</Text>;
        }
      })}>
        <Tab.Screen name="Productos" component={ProductosStack} />
        <Tab.Screen name="Ventas" component={VentasStack} />
        <Tab.Screen name="Clientes" component={ClientesScreen}
          options={{ headerShown: true, headerStyle: { backgroundColor: '#085041' }, headerTintColor: '#9FE1CB', title: 'Clientes' }} />
        <Tab.Screen name="Inventario" component={InventarioScreen}
          options={{ headerShown: true, headerStyle: { backgroundColor: '#085041' }, headerTintColor: '#9FE1CB', title: 'Inventario' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}