const debug = require('debug')('app:module-products-controller');
const createErorr = require('http-errors');

const { ProductsService } = require('./service');
const { Response } = require('../common/response');

module.exports.ProductsController = {
    getProducts: async (req, res) => {
        try {
            let products = await ProductsService.getAll();
            Response.success(res, 200, 'Lista de productos', products);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }, // Retornara lista
    getProduct: async (req, res) => {
        try {
            const {
                params: { id }
            } = req;
            let product = await ProductsService.getById(id);
            if (!product) {
                Response.error(res, new createErorr.NotFound());
            } else {
                Response.success(res, 200, `Producto con ID ${id}`, product);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }, // Obtenemos un producto 
    createProduct: async (req, res) => {
        try {
            const { body } = req;
            const insertedId = await ProductsService.createProduct(body);
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createErorr.BadRequest());
            } else {
                Response.success(res, 201, 'Producto Agregado', insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }, // Crearemos un producto
    updateProduct: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createErorr.BadRequest());
            } else {
                const {
                    params: { id }
                } = req;
                debug(body);
                debug(id);
                let updated = await ProductsService.updateProduct(body, id);
                if (updated === 1) {
                    Response.success(res, 200, 'Producto Actualizado', body);
                } else {
                    Response.error(res, new createErorr.NotFound());
                }               
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }, // Actualizar Producto
    deleteProduct: async (req, res) => {
        try {
            const {
                params: { id }
            } = req;
            let deleted = await ProductsService.deleteProduct(id);
            if (deleted === 1){
                Response.success(res, 200, 'Producto Eliminado', id);
            } else {
                Response.error(res, new createErorr.NotFound());
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }, // Eliminar
}