const express = require('express');
const debug = require('debug')('app:server');

const { Config } = require('./src/config');
const { IndexAPI, NotFoundAPI } = require('./src/index');

const { ProdcutsAPI } = require('./src/productos');

const app = express();

app.use(express.json());

// Modulos
IndexAPI(app);
ProdcutsAPI(app);
NotFoundAPI(app);

app.listen(Config.port, () => {
    debug(`Servidor escuchando en el puerto : ${Config.port}`);
});