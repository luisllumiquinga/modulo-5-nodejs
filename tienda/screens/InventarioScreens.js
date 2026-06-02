import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { getProductos, putProducto } from '../rest_client/tienda';

export default function InventarioScreen() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(useCallback(() => {
    setLoading(true);
    getProductos().then(setProductos).finally(() => setLoading(false));
  }, []));

  const actualizarStock = (item, delta) => {
    const nuevoStock = item.stock + delta;
    if (nuevoStock < 0) return Alert.alert('Stock mínimo es 0');
    const actualizado = { ...item, stock: nuevoStock };
    setProductos(prev => prev.map(p => p.id_producto === item.id_producto ? actualizado : p));
    putProducto(item.id_producto, actualizado);
  };

  if (loading) return <View style={s.center}><ActivityIndicator color="#1D9E75" size="large" /></View>;

  return (
    <View style={s.container}>
      <FlatList
        data={productos}
        keyExtractor={i => i.id_producto.toString()}
        renderItem={({ item }) => (
          <View style={s.item}>
            <View style={{ flex: 1 }}>
              <Text style={s.nombre}>{item.nombre_producto}</Text>
              <Text style={s.cat}>{item.categoria}</Text>
            </View>
            <View style={s.controls}>
              <TouchableOpacity style={s.btn} onPress={() => actualizarStock(item, -1)}>
                <Text style={s.btnTxt}>−</Text>
              </TouchableOpacity>
              <Text style={[s.stock, item.stock < 5 && { color: '#D85A30' }]}>{item.stock}</Text>
              <TouchableOpacity style={s.btn} onPress={() => actualizarStock(item, 1)}>
                <Text style={s.btnTxt}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 0.5, borderColor: '#ddd' },
  nombre: { fontSize: 14, fontWeight: '500', color: '#222' },
  cat: { fontSize: 12, color: '#888', marginTop: 2 },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  btn: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#E1F5EE', justifyContent: 'center', alignItems: 'center' },
  btnTxt: { fontSize: 18, color: '#085041' },
  stock: { fontSize: 16, fontWeight: '500', color: '#222', minWidth: 28, textAlign: 'center' },
});