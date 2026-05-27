const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const puerto = 3001;

const { Client } = require("pg")

const client = new Client({
    user: "postgres",
    host: "192.168.1.115",
    database: "tienda",
    password: "4189",
    port: 5432,
});

client.connect();

app.use(bodyParser.json());

app.use('/tienda', (request, response, next) => {
    next();
});

app.get("/clientes", (request, response) => {
    client.query('SELECT * FROM clientes').then(responseQuery => {
        console.log(responseQuery.rows);
        response.send(responseQuery.rows);
    }).catch(err => {
        console.log(err);
        response.status(500).send({ error: 'Error al consultar los clientes' });
    });
});

app.get("/productos", (request, response) => {
    client.query('SELECT * FROM productos').then(responseQuery => {
        console.log(responseQuery.rows);
        response.send(responseQuery.rows);
    }).catch(err => {
        console.log(err);
        response.status(500).send({ error: 'Error al consultar los productos' });
    });
});

app.get("/ventas", (request, response) => {
    client.query('SELECT * FROM ventas').then(responseQuery => {
        console.log(responseQuery.rows);
        response.send(responseQuery.rows);
    }).catch(err => {
        console.log(err);
        response.status(500).send({ error: 'Error al consultar las ventas' });
    });
});

app.get("/detalle", (request, response) => {
    client.query('SELECT * FROM detalle_ventas').then(responseQuery => {
        console.log(responseQuery.rows);
        response.send(responseQuery.rows);
    }).catch(err => {
        console.log(err);
        response.status(500).send({ error: 'Error al consultar el detalle' });
    });
});

app.listen(puerto, () => {
    console.log("Servidor listo en el puerto " + puerto);
});
