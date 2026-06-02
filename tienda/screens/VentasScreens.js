import { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getVentas, getClientes } from '../rest_client/tienda';

export default function VentasScreen({ navigation }) {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(useCallback(() => {
    setLoading(true);
    Promise.all([getVentas(), getClientes()])
      .then(([v, c]) => { setVentas(v); setClientes(c); })
      .finally(() => setLoading(false));
  }, []));

  const nombreCliente = (id) => {
    const c = clientes.find(c => c.id_cliente === id);
    return c ? c.nombre : 'Desconocido';
  };

  const iniciales = (nombre) => nombre ? nombre.split(' ').map(n => n[0]).join('').slice(0, 2) : '??';

  if (loading) return <View style={s.center}><ActivityIndicator color="#1D9E75" size="large" /></View>;

  return (
    <View style={s.container}>
      <TouchableOpacity style={s.btnNuevo} onPress={() => navigation.navigate('NuevaVenta')}>
        <Text style={s.btnNuevoTxt}>+ Nueva venta</Text>
      </TouchableOpacity>
      <FlatList
        data={ventas}
        keyExtractor={i => i.id_venta.toString()}
        renderItem={({ item }) => {
          const nombre = nombreCliente(item.id_cliente);
          return (
            <TouchableOpacity style={s.item} onPress={() => navigation.navigate('DetalleVenta', { id_venta: item.id_venta })}>
              <View style={s.avatar}><Text style={s.avatarTxt}>{iniciales(nombre)}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={s.title}>Venta #{item.id_venta}</Text>
                <Text style={s.sub}>{nombre}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={s.fecha}>{item.fecha_compra?.slice(0, 10)}</Text>
                <Text style={s.cant}>x{item.cantidad}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  btnNuevo: { backgroundColor: '#085041', borderRadius: 12, padding: 12, alignItems: 'center', marginBottom: 16 },
  btnNuevoTxt: { color: '#9FE1CB', fontSize: 14, fontWeight: '500' },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 0.5, borderColor: '#ddd', gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E1F5EE', justifyContent: 'center', alignItems: 'center' },
  avatarTxt: { fontSize: 14, fontWeight: '500', color: '#085041' },
  title: { fontSize: 14, fontWeight: '500', color: '#222' },
  sub: { fontSize: 12, color: '#888', marginTop: 2 },
  fecha: { fontSize: 12, color: '#888' },
  cant: { fontSize: 12, color: '#1D9E75', marginTop: 2 },
});