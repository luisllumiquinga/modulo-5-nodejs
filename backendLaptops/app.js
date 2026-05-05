const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const puerto = 3001;

//contato: id, nombre, apellido, celular

app.use(bodyParser.json());

app.use('/laptops', (request, response, next) => {
    console.log('Ingresa a middleware');
    console.log('headers', request.headers);
    console.log('body', request.body);
    next();
});

//Crear una laptop
app.post('/laptops', (req, resp) => {
    req.body.id = 99;
    resp.send(req.body);
});

//Recuperar todas las laptops
app.get("/laptops", (request, response) => {
    const laptops = [
        { id: 1, marca: "DELL", procesador: 'i7', memoria: '4GB', disco: '256'},
        { id: 2, marca: "HP", procesador: 'i5', memoria: '24GB', disco: '256'},
        { id: 3, marca: "Lenovo", procesador: 'i9', memoria: '32GB', disco: '256'},
        { id: 4, marca: "AlienWare", procesador: 'i7', memoria: '12GB', disco: '256'},
        { id: 5, marca: "Toshiba", procesador: 'i3', memoria: '8GB', disco: '256'}
    ];

    console.log('ingresa a get')

    response.send(laptops);
});

//Actualizar una laptop
app.put('/laptops/:idParam', (req, resp) => {
    const id = req.params.idParam;
    console.log('id: ', id);
    resp.send(req.body);
});

//Eliminar una laptop
app.delete('/laptops/:id', (req, resp) => {
    const id = req.params.id;
    console.log('id: ', id);
    resp.send();
});

app.listen(puerto, () => {
    console.log("Servidor listo en el puerto " + 3001)
});
