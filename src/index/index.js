const express = require('express');
const createErorr = require('http-errors');

const { Response } = require('../common/response');

module.exports.IndexAPI = (app) => {
    const router = express.Router();

    router.get("/", (req, res) => {
        const menu = {
            products: `http://${req.headers.host}/api/products/`
        };
        Response.success(res, 200, "API Taller", menu);
    });

    app.use("/", router);
}

module.exports.NotFoundAPI = (app) => {
    const router = express.Router();

    router.all("*", (req, res) => {
        Response.error(res, new createErorr.NotFound());
    });

    app.use("/", router);
}