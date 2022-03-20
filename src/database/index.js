const { MongoClient, Collection } = require("mongodb");
const debug = require("debug")("app:module-database");

const { Config } = require("../config");

var connection = null;

module.exports.Database = (collection) =>
    new Promise(async (resolve, reject) => {
    try {
        if (!connection) {
            const client = new MongoClient(Config.mongoUri);
            connection = await client.connect();
            debug("Nueva conexion creada");
        }
        debug("Reutilzando la conexion existente");
        const db = connection.db(Config.mongoDbname);
        resolve(db.collection(collection));
    } catch (error) {
        reject(error);
    }
});
