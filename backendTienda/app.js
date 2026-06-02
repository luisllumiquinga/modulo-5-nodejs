const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const puerto = 3001;

const { Client } = require("pg")

const client = new Client({
    user: "postgres",
    host: "192.168.100.59",
    database: "tienda",
    password: "4189",
    port: 5432,
});

client.connect();

app.use(bodyParser.json());

app.use('/tienda', (request, response, next) => {
    next();
});

//CLIENTES
app.get("/clientes", (request, response) => {
    client.query('SELECT * FROM clientes').then(responseQuery => {
        console.log(responseQuery.rows);
        response.send(responseQuery.rows);
    }).catch(err => {
        console.log(err);
        response.status(500).send({ error: 'Error al consultar los clientes' });
    });
});

app.get("/clientes/:idParam", (request, response) => {
    const id = request.params.idParam;
    client.query(`SELECT * FROM clientes WHERE id_cliente = ${id}`).then(responseQuery => {
        response.send(responseQuery.rows);
    }).catch(err => {
        response.status(500).send({ error: 'Error al consultar el cliente' });
    });
});

app.post('/clientes', (req, resp) => {
    const { nombre, telefono, direccion, email } = req.body;
    client.query(`INSERT INTO clientes (nombre, telefono, direccion, email) VALUES ('${nombre}', '${telefono}', '${direccion}', '${email}') RETURNING *`).then(result => {
        console.log(result.rows);
        resp.send(result.rows);
    }).catch(err => {
        console.log(err);
        resp.status(500).send({ error: 'Error al insertar el cliente' });
    });
});

app.put('/clientes/:idParam', (req, resp) => {
    const id = req.params.idParam;
    client.query(`UPDATE clientes SET nombre = '${req.body.nombre}', telefono = '${req.body.telefono}', direccion = '${req.body.direccion}', email = '${req.body.email}' WHERE id_cliente = ${id}`).then(result => {
        console.log(result.rows);
        resp.send(result.rows);
    }).catch(err => {
        console.log(err);
        resp.status(500).send({ error: 'Error al actualizar el cliente' });
    });
});

app.delete('/clientes/:idParam', (req, resp) => {
    const id = req.params.idParam;
    client.query(`DELETE FROM clientes WHERE id_cliente = ${id}`).then(result => {
        console.log(result.rows);
        resp.send(result.rows);
    }).catch(err => {
        console.log(err);
        resp.status(500).send({ error: 'Error al eliminar el cliente' });
    });
});

//PRODUCTOS
app.get("/productos", (request, response) => {
    client.query('SELECT * FROM productos').then(responseQuery => {
        console.log(responseQuery.rows);
        response.send(responseQuery.rows);
    }).catch(err => {
        console.log(err);
        response.status(500).send({ error: 'Error al consultar los productos' });
    });
});

app.get("/productos/:idParam", (request, response) => {
    const id = request.params.idParam;
    client.query(`SELECT * FROM productos WHERE id_producto = ${id}`).then(responseQuery => {
        response.send(responseQuery.rows);
    }).catch(err => {
        response.status(500).send({ error: 'Error al consultar el producto' });
    });
});

app.post('/productos', (req, resp) => {
    const { id_producto, nombre_producto, categoria, precio, stock } = req.body;
    client.query(`INSERT INTO productos (id_producto, nombre_producto, categoria, precio, stock) VALUES ('${id_producto}', '${nombre_producto}', '${categoria}', ${precio}, ${stock}) RETURNING *`).then(result => {
        console.log(result.rows);
        resp.send(result.rows);
    }).catch(err => {
        console.log(err);
        resp.status(500).send({ error: 'Error al insertar el producto' });
    });
});

app.put('/productos/:idParam', (req, resp) => {
    const id = req.params.idParam;
    client.query(`UPDATE productos SET nombre_producto = '${req.body.nombre_producto}', categoria = '${req.body.categoria}', precio = ${req.body.precio}, stock = ${req.body.stock} WHERE id_producto = ${id} RETURNING *`).then(result => {
        console.log(result.rows);
        resp.send(result.rows);
    }).catch(err => {
        console.log(err);
        resp.status(500).send({ error: 'Error al actualizar el producto' });
    });
});

app.delete('/productos/:idParam', (req, resp) => {
    const id = req.params.idParam;
    client.query(`DELETE FROM productos WHERE id_producto = ${id}`).then(result => {
        console.log(result.rows);
        resp.send(result.rows);
    }).catch(err => {
        console.log(err);
        resp.status(500).send({ error: 'Error al eliminar el producto' });
    });
});

//VENTAS
app.get("/ventas", (request, response) => {
    client.query('SELECT * FROM ventas').then(responseQuery => {
        console.log(responseQuery.rows);
        response.send(responseQuery.rows);
    }).catch(err => {
        console.log(err);
        response.status(500).send({ error: 'Error al consultar las ventas' });
    });
});

app.get("/ventas/:idParam", (request, response) => {
    const id = request.params.idParam;
    client.query(`
        SELECT v.id_venta, v.fecha_compra, c.nombre,
               p.nombre_producto, dv.cantidad, p.precio
        FROM ventas v
        JOIN clientes c ON v.id_cliente = c.id_cliente
        JOIN detalle_ventas dv ON v.id_venta = dv.id_venta
        JOIN productos p ON dv.id_producto = p.id_producto
        WHERE v.id_venta = ${id}
    `).then(responseQuery => {
        response.send(responseQuery.rows);
    }).catch(err => {
        response.status(500).send({ error: 'Error al consultar la venta' });
    });
});

app.post('/ventas', (req, resp) => {
    const { id_venta, cantidad, fecha_compra, id_cliente } = req.body;
    client.query(`INSERT INTO ventas (id_venta, cantidad, fecha_compra, id_cliente) VALUES ('${id_venta}', ${cantidad}, '${fecha_compra}', ${id_cliente}) RETURNING *`).then(result => {
        console.log(result.rows);
        resp.send(result.rows);
    }).catch(err => {
        console.log(err);
        resp.status(500).send({ error: 'Error al insertar la venta' });
    });
});

app.put('/ventas/:idParam', (req, resp) => {
    const id = req.params.idParam;
    client.query(`UPDATE ventas SET cantidad = ${req.body.cantidad}, fecha_compra = '${req.body.fecha_compra}', id_cliente = ${req.body.id_cliente} WHERE id_venta = ${id} RETURNING *`).then(result => {
        console.log(result.rows);
        resp.send(result.rows);
    }).catch(err => {
        console.log(err);
        resp.status(500).send({ error: 'Error al actualizar la venta' });
    });
});

app.delete('/ventas/:idParam', (req, resp) => {
    const id = req.params.idParam;
    client.query(`DELETE FROM ventas WHERE id_venta = ${id}`).then(result => {
        console.log(result.rows);
        resp.send(result.rows);
    }).catch(err => {
        console.log(err);
        resp.status(500).send({ error: 'Error al eliminar la venta' });
    });
});

//DETALLE VENTAS
app.get("/detalle", (request, response) => {
    client.query('SELECT * FROM detalle_ventas').then(responseQuery => {
        console.log(responseQuery.rows);
        response.send(responseQuery.rows);
    }).catch(err => {
        console.log(err);
        response.status(500).send({ error: 'Error al consultar el detalle de la venta' });
    });
});

app.post('/detalle', (req, resp) => {
    const { id_venta, id_producto, cantidad } = req.body;
    client.query(`INSERT INTO detalle_ventas (id_venta, id_producto, cantidad) VALUES ('${id_venta}', ${id_producto}, ${cantidad}) RETURNING *`).then(result => {
        console.log(result.rows);
        resp.send(result.rows);
    }).catch(err => {
        console.log(err);
        resp.status(500).send({ error: 'Error al insertar el detalle de la venta' });
    });
});

app.put('/detalle/:idParam', (req, resp) => {
    const id = req.params.idParam;
    client.query(`UPDATE detalle_ventas SET id_venta = '${req.body.id_venta}', id_producto = ${req.body.id_producto}, cantidad = ${req.body.cantidad} WHERE id_detalle = ${id} RETURNING *`).then(result => {
        console.log(result.rows);
        resp.send(result.rows);
    }).catch(err => {
        console.log(err);
        resp.status(500).send({ error: 'Error al actualizar el detalle de la venta' });
    });
});

app.delete('/detalle/:idParam', (req, resp) => {
    const id = req.params.idParam;
    client.query(`DELETE FROM detalle_ventas WHERE id_detalle = ${id}`).then(result => {
        console.log(result.rows);
        resp.send(result.rows);
    }).catch(err => {
        console.log(err);
        resp.status(500).send({ error: 'Error al eliminar el detalle de la venta' });
    });
});


app.listen(puerto, () => {
    console.log("Servidor listo en el puerto " + puerto);
});
