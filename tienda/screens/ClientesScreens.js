import { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  ActivityIndicator, Alert, TextInput, Modal, ScrollView
} from 'react-native';
import { getClientes, deleteCliente, postCliente, putCliente } from '../rest_client/tienda';

export default function ClientesScreen() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nombre: '', telefono: '', direccion: '', email: '' });

  const cargar = () => {
    getClientes().then(setClientes).finally(() => setLoading(false));
  };

  useEffect(() => { cargar(); }, []);

  const abrirCrear = () => {
    setEditando(null);
    setForm({ nombre: '', telefono: '', direccion: '', email: '' });
    setModalVisible(true);
  };

  const abrirEditar = (cliente) => {
    setEditando(cliente);
    setForm({
      nombre: cliente.nombre,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      email: cliente.email,
    });
    setModalVisible(true);
  };

  const guardar = () => {
    if (!form.nombre || !form.telefono) {
      return Alert.alert('Error', 'Nombre y teléfono son obligatorios');
    }

    const accion = editando
      ? putCliente(editando.id_cliente, form)
      : postCliente(form);

    accion
      .then(() => { setModalVisible(false); cargar(); })
      .catch(() => Alert.alert('Error', 'No se pudo guardar'));
  };

  const eliminar = (id) => {
    Alert.alert('Eliminar', '¿Seguro?', [
      { text: 'Cancelar' },
      { text: 'Eliminar', style: 'destructive', onPress: () => deleteCliente(id).then(cargar) },
    ]);
  };

  const iniciales = (n) => n ? n.split(' ').map(x => x[0]).join('').slice(0, 2) : '??';

  if (loading) return <View style={s.center}><ActivityIndicator color="#1D9E75" size="large" /></View>;

  return (
    <View style={s.container}>
      <TouchableOpacity style={s.btnNuevo} onPress={abrirCrear}>
        <Text style={s.btnNuevoTxt}>+ Nuevo cliente</Text>
      </TouchableOpacity>

      <FlatList
        data={clientes}
        keyExtractor={i => i.id_cliente.toString()}
        renderItem={({ item }) => (
          <View style={s.item}>
            <View style={s.avatar}>
              <Text style={s.avatarTxt}>{iniciales(item.nombre)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.nombre}>{item.nombre}</Text>
              <Text style={s.sub}>{item.direccion} · {item.telefono}</Text>
            </View>
            <TouchableOpacity onPress={() => abrirEditar(item)} style={s.iconBtn}>
              <Text style={{ fontSize: 18 }}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => eliminar(item.id_cliente)} style={s.iconBtn}>
              <Text style={{ fontSize: 18 }}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal crear/editar */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={s.modalOverlay}>
          <View style={s.modalBox}>
            <Text style={s.modalTitle}>{editando ? 'Editar cliente' : 'Nuevo cliente'}</Text>
            <ScrollView>
              <Text style={s.label}>Nombre</Text>
              <TextInput style={s.input} value={form.nombre}
                onChangeText={v => setForm({ ...form, nombre: v })}
                placeholder="Nombre completo" />

              <Text style={s.label}>Teléfono</Text>
              <TextInput style={s.input} value={form.telefono}
                onChangeText={v => setForm({ ...form, telefono: v })}
                placeholder="0991234567" keyboardType="phone-pad" />

              <Text style={s.label}>Dirección</Text>
              <TextInput style={s.input} value={form.direccion}
                onChangeText={v => setForm({ ...form, direccion: v })}
                placeholder="Ciudad o dirección" />

              <Text style={s.label}>Email</Text>
              <TextInput style={s.input} value={form.email}
                onChangeText={v => setForm({ ...form, email: v })}
                placeholder="correo@mail.com" keyboardType="email-address" />

              <TouchableOpacity style={s.btnGuardar} onPress={guardar}>
                <Text style={s.btnGuardarTxt}>{editando ? 'Guardar cambios' : 'Crear cliente'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.btnCancelar} onPress={() => setModalVisible(false)}>
                <Text style={s.btnCancelarTxt}>Cancelar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  btnNuevo: {
    backgroundColor: '#085041', borderRadius: 12,
    padding: 12, alignItems: 'center', marginBottom: 16,
  },
  btnNuevoTxt: { color: '#9FE1CB', fontSize: 14, fontWeight: '500' },
  item: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 12, padding: 14, marginBottom: 10,
    borderWidth: 0.5, borderColor: '#ddd', gap: 10,
  },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#E1F5EE', justifyContent: 'center', alignItems: 'center',
  },
  avatarTxt: { fontSize: 14, fontWeight: '500', color: '#085041' },
  nombre: { fontSize: 14, fontWeight: '500', color: '#222' },
  sub: { fontSize: 12, color: '#888', marginTop: 2 },
  iconBtn: { padding: 4 },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#fff', borderTopLeftRadius: 20,
    borderTopRightRadius: 20, padding: 24, maxHeight: '85%',
  },
  modalTitle: { fontSize: 18, fontWeight: '500', color: '#085041', marginBottom: 16 },
  label: { fontSize: 12, color: '#888', marginBottom: 4, marginTop: 10 },
  input: {
    backgroundColor: '#f5f5f5', borderRadius: 10,
    borderWidth: 0.5, borderColor: '#ddd',
    padding: 10, fontSize: 14, color: '#222',
  },
  btnGuardar: {
    backgroundColor: '#085041', borderRadius: 12,
    padding: 14, alignItems: 'center', marginTop: 20,
  },
  btnGuardarTxt: { color: '#9FE1CB', fontSize: 15, fontWeight: '500' },
  btnCancelar: {
    borderRadius: 12, padding: 12,
    alignItems: 'center', marginTop: 8,
  },
  btnCancelarTxt: { color: '#888', fontSize: 14 },
});