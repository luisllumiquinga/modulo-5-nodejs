import { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { getProductos, deleteProducto } from '../rest_client/tienda';

export default function ProductosScreen({ navigation }) {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [categoria, setCategoria] = useState('Todos');
  const [loading, setLoading] = useState(true);

  const categoriasExistentes = ['Todos', ...new Set(productos.map(p => p.categoria))];

  const cargar = () => {
    getProductos().then(setProductos).finally(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', cargar);
    return unsubscribe;
  }, [navigation]);

  const eliminar = (id) => {
    Alert.alert('Eliminar', '¿Seguro?', [
      { text: 'Cancelar' },
      { text: 'Eliminar', style: 'destructive', onPress: () => deleteProducto(id).then(cargar) },
    ]);
  };

  const filtrados = productos.filter(p => {
    const nombre = p.nombre_producto.toLowerCase().includes(filtro.toLowerCase());
    const cat = categoria === 'Todos' || p.categoria === categoria;
    return nombre && cat;
  });

  if (loading) return <View style={s.center}><ActivityIndicator color="#1D9E75" size="large" /></View>;

  return (
    <View style={s.container}>
      <TouchableOpacity style={s.btnNuevo} onPress={() => navigation.navigate('DetalleProducto', { producto: null, categorias: categoriasExistentes.filter(c => c !== 'Todos') })}>
        <Text style={s.btnNuevoTxt}>+ Nuevo producto</Text>
      </TouchableOpacity>
      <View style={s.searchBar}>
        <Text>🔍 </Text>
        <TextInput style={s.input} placeholder="Buscar productos..." value={filtro} onChangeText={setFiltro} />
      </View>
      <View style={s.chips}>
  {categoriasExistentes.map(c => (
    <TouchableOpacity key={c} style={[s.chip, categoria === c && s.chipOn]} onPress={() => setCategoria(c)}>
      <Text style={[s.chipTxt, categoria === c && s.chipTxtOn]}>{c}</Text>
    </TouchableOpacity>
  ))}
</View>
      <FlatList
        data={filtrados}
        keyExtractor={i => i.id_producto.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={s.card} onPress={() => navigation.navigate('DetalleProducto', { producto: item, categorias: categoriasExistentes.filter(c => c !== 'Todos') })}>
            <View style={{ padding: 10 }}>
              <Text style={s.nombre}>{item.nombre_producto}</Text>
              <Text style={s.cat}>{item.categoria}</Text>
              <Text style={s.precio}>${item.precio}</Text>
            </View>
            <TouchableOpacity style={s.btnEliminar} onPress={() => eliminar(item.id_producto)}>
              <Text style={s.btnEliminarTxt}>🗑️ Eliminar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  btnNuevo: { backgroundColor: '#085041', borderRadius: 12, padding: 12, alignItems: 'center', marginBottom: 12 },
  btnNuevoTxt: { color: '#9FE1CB', fontSize: 14, fontWeight: '500' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, borderWidth: 0.5, borderColor: '#ddd', paddingHorizontal: 12, marginBottom: 12 },
  input: { flex: 1, height: 40, fontSize: 14 },
  chips: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 0.5, borderColor: '#ddd', backgroundColor: '#fff' },
  chipOn: { backgroundColor: '#085041', borderColor: '#085041' },
  chipTxt: { fontSize: 12, color: '#888' },
  chipTxtOn: { color: '#9FE1CB' },
  card: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 0.5, borderColor: '#ddd', width: '48%', overflow: 'hidden' },
  nombre: { fontSize: 13, fontWeight: '500', color: '#222' },
  cat: { fontSize: 11, color: '#888', marginVertical: 2 },
  precio: { fontSize: 14, fontWeight: '600', color: '#0F6E56' },
  btnEliminar: { borderTopWidth: 0.5, borderColor: '#f0f0f0', padding: 8, alignItems: 'center' },
  btnEliminarTxt: { fontSize: 12, color: '#c0392b' },
});