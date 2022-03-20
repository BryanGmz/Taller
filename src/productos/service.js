const { ObjectId } = require('mongodb');

const { Database } = require('../database');

const COLLECTION = 'products';

// Metodo de obtener lista de productos
const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

// Metodo para obtener un producto mediante el ID
const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne(
        {
            _id: ObjectId(id)
        }
    );
}

// Metodo crear un producto
const createProduct = async (product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
}

// Metodo de eliminar un producto 
const deleteProduct = async (id) => {
    const collection = await Database(COLLECTION);
    let result = await collection.deleteOne({
        _id: ObjectId(id)
    });
    return result.deletedCount;
}

// Metodo de actualizar
const updateProduct = async (product, id) => {
    const collection = await Database(COLLECTION);
    const filter = {
        _id: ObjectId(id)
    }
    const options = {
        upsert: false
    }
    const updateDoc = {
        $set: {
            ...product
        }
    }
    const result = await collection.updateOne(filter, updateDoc, options); 
    return result.matchedCount;
}

module.exports.ProductsService = {
    getAll,
    getById,
    createProduct,
    updateProduct,
    deleteProduct
}