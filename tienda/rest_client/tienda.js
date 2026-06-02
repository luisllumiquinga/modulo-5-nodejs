const IP = '192.168.100.59'; // cambia por tu IP
export const API = `http://${IP}:3001`;

//PRODUCTOS
export const getProductos = () => fetch(`${API}/productos`).then(r => r.json());

export const deleteProducto = (id) => fetch(`${API}/productos/${id}`, { method: 'DELETE' }).then(r => r.json());

export const postProducto = (body) => fetch(`${API}/productos`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
}).then(r => r.json());

export const putProducto = (id, body) => fetch(`${API}/productos/${id}`, {
  method: 'PUT', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
}).then(r => r.json());

//CLIENTES
export const getClientes = () => fetch(`${API}/clientes`).then(r => r.json());

export const postCliente = (body) => fetch(`${API}/clientes`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
}).then(r => r.json());

export const putCliente = (id, body) => fetch(`${API}/clientes/${id}`, {
  method: 'PUT', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
}).then(r => r.json());

export const deleteCliente = (id) => fetch(`${API}/clientes/${id}`, { method: 'DELETE' }).then(r => r.json());

export const getVentas = () => fetch(`${API}/ventas`).then(r => r.json());

export const getDetalleVenta = (id) => fetch(`${API}/ventas/${id}`).then(r => r.json());

export const postVenta = (body) => fetch(`${API}/ventas`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
}).then(r => r.json());

export const postDetalle = (body) => fetch(`${API}/detalle`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
}).then(r => r.json());