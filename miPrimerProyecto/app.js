const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const puerto = 3001;

//contato: id, nombre, apellido, celular

app.use(bodyParser.json());

app.use('/contactos', (request, response, next) => {
    console.log('Ingresa a middleware');
    console.log('headers', request.headers);
    console.log('body', request.body);
    next();
});

app.get("/contactos", (request, response) => {
    const contactos = [
        { id: 1, nombre: "Santiago", apellido: 'Mosquera', celular: '0921453322' },
        { id: 2, nombre: "Joselyne", apellido: 'Morales', celular: '0982393311' },
        { id: 3, nombre: 'Juan', apellido: 'Perez', celular: '0921453322' }
    ];

    console.log('ingresa a get')

    response.send(contactos);
});

app.post('/contactos', (req, resp) => {
    req.body.id = 99;
    resp.send(req.body);
});

app.put('/contactos/:idParam', (req, resp) => {
    const id = req.params.idParam;
    console.log('id', id);
    resp.send(req.body);
});

app.delete('/contactos/:id', (req, resp) => {
    const id = req.params.id;
    console.log('id: ', id);
    resp.send({ id: id });
});

app.listen(puerto, () => {
    console.log("Servidor listo en el puerto " + 3001)
});
