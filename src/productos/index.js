const express = require('express');

const router = express.Router();

const { ProductsController } = require('./controller');

module.exports.ProdcutsAPI = (app) => {
    router
        .get('/', ProductsController.getProducts) // Lista http://localhost:3000/api/products/
        .get('/:id', ProductsController.getProduct) // Consulta mediante ID http://localhost:3000/api/products/1
        .post('/', ProductsController.createProduct) // http://localhost:3000/api/products/
        .put('/:id', ProductsController.updateProduct) // http://localhost:3000/api/products/5
        .delete('/:id', ProductsController.deleteProduct) // http://localhost:3000/api/products/5
    
    app.use('/api/products', router)
}