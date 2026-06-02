import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { getDetalleVenta } from '../rest_client/tienda';

export default function DetalleVentaScreen({ route }) {
  const { id_venta } = route.params;
  const [detalle, setDetalle] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDetalleVenta(id_venta).then(setDetalle).finally(() => setLoading(false));
  }, []);

  if (loading) return <View style={s.center}><ActivityIndicator color="#1D9E75" size="large" /></View>;
  if (!detalle.length) return <View style={s.center}><Text>Sin datos</Text></View>;

  const info = detalle[0];
  const total = detalle.reduce((acc, d) => acc + parseFloat(d.precio) * d.cantidad, 0);

  return (
    <ScrollView style={s.container}>
      <View style={s.header}>
        <Text style={s.headerIcon}>🧾</Text>
        <Text style={s.headerTitle}>Venta #{id_venta}</Text>
        <Text style={s.headerDate}>{info.fecha_compra?.slice(0, 10)}</Text>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>Cliente</Text>
        <View style={s.row}><Text style={s.label}>Nombre</Text><Text style={s.value}>{info.nombre_cliente}</Text></View>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>Productos</Text>
        {detalle.map((d, i) => (
          <View key={i} style={s.row}>
            <Text style={s.label}>{d.nombre_producto}</Text>
            <Text style={s.value}>x{d.cantidad} · ${d.precio}</Text>
          </View>
        ))}
      </View>

      <View style={s.total}>
        <Text style={s.totalLabel}>Total</Text>
        <Text style={s.totalValue}>${total.toFixed(2)}</Text>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: '#E1F5EE', padding: 20, alignItems: 'center' },
  headerIcon: { fontSize: 40 },
  headerTitle: { fontSize: 20, fontWeight: '500', color: '#085041', marginTop: 4 },
  headerDate: { fontSize: 13, color: '#0F6E56', marginTop: 2 },
  section: { backgroundColor: '#fff', margin: 12, borderRadius: 12, padding: 14, borderWidth: 0.5, borderColor: '#ddd' },
  sectionTitle: { fontSize: 12, color: '#888', marginBottom: 8, fontWeight: '500' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, borderBottomWidth: 0.5, borderColor: '#f0f0f0' },
  label: { fontSize: 13, color: '#555' },
  value: { fontSize: 13, fontWeight: '500', color: '#222' },
  total: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#E1F5EE', margin: 12, borderRadius: 12, padding: 16 },
  totalLabel: { fontSize: 15, fontWeight: '500', color: '#085041' },
  totalValue: { fontSize: 17, fontWeight: '600', color: '#085041' },
});