const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const puerto = 3001;

const { Client } = require("pg")

const client = new Client({
    user: "postgres",
    host: "192.168.1.115",
    database: "contactos",
    password: "4189",
    port: 5432,
});

client.connect();

app.use(bodyParser.json());

app.use('/contactos', (request, response, next) => {
    //console.log('Ingresa a middleware');
    //console.log('headers', request.headers);
    //console.log('body', request.body);
    next();
});

app.get("/contactos", (request, response) => {
    client.query('SELECT * FROM contactos').then(responseQuery => {
        console.log(responseQuery.rows);
        response.send(responseQuery.rows);
    }).catch(err => {
        console.log(err);
        response.status(500).send({ error: 'Error al consultar los contactos' });
    });
});

app.post('/contactos', (req, resp) => {
    const {nombre, apellido, celular} = req.body;
    client.query(`INSERT INTO contactos (nombre, apellido, celular) VALUES ('${nombre}', '${apellido}', '${celular}')`).then(result => {
    console.log(result.rows);
    resp.send(result.rows);
    }).catch(err => {
        console.log(err);
        resp.status(500).send({ error: 'Error al insertar el contacto' });
    });
});

app.put('/contactos/:idParam', (req, resp) => {
    const id = req.params.idParam;
    client.query(`UPDATE contactos SET nombre = '${req.body.nombre}', apellido = '${req.body.apellido}', celular = '${req.body.celular}' WHERE id = ${id}`).then(result => {
        console.log(result.rows);
        resp.send(result.rows);
    }).catch(err => {
        console.log(err);
        resp.status(500).send({ error: 'Error al actualizar el contacto' });
    });
});

app.delete('/contactos/:id', (req, resp) => {
    const id = req.params.id;
    client.query(`DELETE FROM contactos WHERE id = ${id}`).then(result => {
        console.log(result.rows);
        resp.send(result.rows);
    }).catch(err => {
        console.log(err);
        resp.status(500).send({ error: 'Error al eliminar el contacto' });
    });
});

app.listen(puerto, () => {
    console.log("Servidor listo en el puerto " + puerto);
});
