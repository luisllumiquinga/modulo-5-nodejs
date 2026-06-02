import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { postProducto, putProducto } from '../rest_client/tienda';

export default function DetalleProductoScreen({ route, navigation }) {
  const { producto, categorias = [] } = route.params;
  const [nuevaCategoria, setNuevaCategoria] = useState(false);

  const [form, setForm] = useState({
    id_producto: producto?.id_producto?.toString() ?? '',
    nombre_producto: producto?.nombre_producto ?? '',
    categoria: producto?.categoria ?? '',
    precio: producto?.precio?.toString() ?? '',
    stock: producto?.stock?.toString() ?? '',
  });

  const guardar = () => {
    if (!form.nombre_producto || !form.precio || !form.stock) {
      return Alert.alert('Error', 'Nombre, precio y stock son obligatorios');
    }

    const body = {
      ...form,
      precio: parseFloat(form.precio),
      stock: parseInt(form.stock),
    };

    const accion = producto
      ? putProducto(producto.id_producto, body)
      : postProducto(body);

    accion
      .then(() => { Alert.alert('Éxito', producto ? 'Producto actualizado' : 'Producto creado'); navigation.goBack(); })
      .catch(() => Alert.alert('Error', 'No se pudo guardar'));
  };

  return (
    <ScrollView style={s.container}>
      <View style={s.header}>
        <Text style={s.headerTxt}>{producto ? 'Editar producto' : 'Nuevo producto'}</Text>
      </View>

      <View style={s.card}>
        {!producto && (
          <>
            <Text style={s.label}>ID Producto</Text>
            <TextInput style={s.input} value={form.id_producto}
              onChangeText={v => setForm({ ...form, id_producto: v })}
              placeholder="Ej: P010" />
          </>
        )}

        <Text style={s.label}>Nombre</Text>
        <TextInput style={s.input} value={form.nombre_producto}
          onChangeText={v => setForm({ ...form, nombre_producto: v })}
          placeholder="Nombre del producto" />

        <Text style={s.label}>Categoría</Text>
        <View style={s.chips}>
          {categorias.map(c => (
            <TouchableOpacity key={c} style={[s.chip, form.categoria === c && s.chipOn]}
              onPress={() => { setForm({ ...form, categoria: c }); setNuevaCategoria(false); }}>
              <Text style={[s.chipTxt, form.categoria === c && s.chipTxtOn]}>{c}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[s.chip, nuevaCategoria && s.chipOn]}
            onPress={() => { setNuevaCategoria(true); setForm({ ...form, categoria: '' }); }}>
            <Text style={[s.chipTxt, nuevaCategoria && s.chipTxtOn]}>+ Nueva</Text>
          </TouchableOpacity>
        </View>
        {nuevaCategoria && (
          <TextInput style={s.input} value={form.categoria}
            onChangeText={v => setForm({ ...form, categoria: v })}
            placeholder="Nombre de nueva categoría" />
        )}

        <Text style={s.label}>Precio</Text>
        <TextInput style={s.input} value={form.precio}
          onChangeText={v => setForm({ ...form, precio: v })}
          placeholder="0.00" keyboardType="decimal-pad" />

        <Text style={s.label}>Stock</Text>
        <TextInput style={s.input} value={form.stock}
          onChangeText={v => setForm({ ...form, stock: v })}
          placeholder="0" keyboardType="number-pad" />

        <TouchableOpacity style={s.btnGuardar} onPress={guardar}>
          <Text style={s.btnGuardarTxt}>{producto ? 'Guardar cambios' : 'Crear producto'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.btnCancelar} onPress={() => navigation.goBack()}>
          <Text style={s.btnCancelarTxt}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#E1F5EE', padding: 30, alignItems: 'center' },
  headerTxt: { fontSize: 18, fontWeight: '500', color: '#085041' },
  card: { backgroundColor: '#fff', margin: 16, borderRadius: 12, padding: 16, borderWidth: 0.5, borderColor: '#ddd' },
  label: { fontSize: 12, color: '#888', marginTop: 12, marginBottom: 4 },
  input: { backgroundColor: '#f5f5f5', borderRadius: 10, borderWidth: 0.5, borderColor: '#ddd', padding: 10, fontSize: 14, color: '#222' },
  chips: { flexDirection: 'row', gap: 8, marginBottom: 4 },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 0.5, borderColor: '#ddd', backgroundColor: '#fff' },
  chipOn: { backgroundColor: '#085041', borderColor: '#085041' },
  chipTxt: { fontSize: 12, color: '#888' },
  chipTxtOn: { color: '#9FE1CB' },
  btnGuardar: { backgroundColor: '#085041', borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 20 },
  btnGuardarTxt: { color: '#9FE1CB', fontSize: 15, fontWeight: '500' },
  btnCancelar: { borderRadius: 12, padding: 12, alignItems: 'center', marginTop: 8 },
  btnCancelarTxt: { color: '#888', fontSize: 14 },
});