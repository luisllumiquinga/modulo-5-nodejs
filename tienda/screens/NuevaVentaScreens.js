import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { getClientes, getProductos, postVenta, postDetalle, getVentas, putProducto } from '../rest_client/tienda';

export default function NuevaVentaScreen({ navigation }) {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [clienteId, setClienteId] = useState(null);
  const [productoId, setProductoId] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    getClientes().then(setClientes);
    getProductos().then(setProductos);
  }, []);

  const registrar = () => {
    if (!clienteId || !productoId) return Alert.alert('Error', 'Selecciona cliente y producto');

    const fecha = new Date().toISOString().slice(0, 10);
    const producto = productos.find(p => p.id_producto === productoId);

    if (producto.stock < cantidad) {
      return Alert.alert('Error', `Stock insuficiente. Disponible: ${producto.stock}`);
    }

    getVentas().then(ventas => {
      const maxId = ventas.length > 0 ? Math.max(...ventas.map(v => v.id_venta)) : 5000;
      const id_venta = maxId + 1;

      postVenta({ id_venta, cantidad, fecha_compra: fecha, id_cliente: clienteId })
        .then(() => postDetalle({ id_venta, id_producto: productoId, cantidad }))
        .then(() => putProducto(productoId, { ...producto, stock: producto.stock - cantidad }))
        .then(() => { Alert.alert('Éxito', 'Venta registrada'); navigation.goBack(); })
        .catch(() => Alert.alert('Error', 'No se pudo registrar la venta'));
    });
  };

  return (
    <ScrollView style={s.container}>
      <Text style={s.label}>Cliente</Text>
      <View style={s.opciones}>
        {clientes.map(c => (
          <TouchableOpacity key={c.id_cliente} style={[s.opcion, clienteId === c.id_cliente && s.opcionOn]}
            onPress={() => setClienteId(c.id_cliente)}>
            <Text style={[s.opcionTxt, clienteId === c.id_cliente && s.opcionTxtOn]}>{c.nombre}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={s.label}>Producto</Text>
      <View style={s.opciones}>
        {productos.map(p => (
          <TouchableOpacity key={p.id_producto} style={[s.opcion, productoId === p.id_producto && s.opcionOn]}
            onPress={() => setProductoId(p.id_producto)}>
            <Text style={[s.opcionTxt, productoId === p.id_producto && s.opcionTxtOn]}>{p.nombre_producto}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={s.label}>Cantidad</Text>
      <View style={s.cantRow}>
        <TouchableOpacity style={s.btn} onPress={() => setCantidad(c => Math.max(1, c - 1))}>
          <Text style={s.btnTxt}>−</Text>
        </TouchableOpacity>
        <Text style={s.cantNum}>{cantidad}</Text>
        <TouchableOpacity style={s.btn} onPress={() => setCantidad(c => c + 1)}>
          <Text style={s.btnTxt}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={s.registrar} onPress={registrar}>
        <Text style={s.registrarTxt}>Registrar venta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  label: { fontSize: 13, color: '#555', marginBottom: 8, marginTop: 16, fontWeight: '500' },
  opciones: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  opcion: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#ddd', backgroundColor: '#fff' },
  opcionOn: { backgroundColor: '#085041', borderColor: '#085041' },
  opcionTxt: { fontSize: 13, color: '#555' },
  opcionTxtOn: { color: '#9FE1CB' },
  cantRow: { flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 4 },
  btn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#ddd', justifyContent: 'center', alignItems: 'center' },
  btnTxt: { fontSize: 20, color: '#222' },
  cantNum: { fontSize: 20, fontWeight: '500', color: '#222', minWidth: 30, textAlign: 'center' },
  registrar: { backgroundColor: '#085041', borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 32 },
  registrarTxt: { color: '#9FE1CB', fontSize: 15, fontWeight: '500' },
});