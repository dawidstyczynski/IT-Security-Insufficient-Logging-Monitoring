"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const rethinkdb_ts_1 = require("rethinkdb-ts");
const databaseConfig = __importStar(require("../config/database-config.json"));
class DatabaseService {
    constructor() { }
    /// returns: A promise that returns true if initialization was successful.
    initialize() {
        return new Promise((resolve, reject) => {
            this.connect().then((connection) => {
                rethinkdb_ts_1.r.dbList()
                    .contains(databaseConfig.databaseName)
                    .do((containsDb) => {
                    return rethinkdb_ts_1.r.branch(containsDb, { created: 0 }, rethinkdb_ts_1.r.dbCreate(databaseConfig.databaseName));
                }).run(connection).then(() => {
                    console.log("database initialized");
                    this.createTables(connection);
                    resolve(true);
                }).catch((error) => {
                    console.log("error!!!");
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }
    connect() {
        return new Promise((resolve, reject) => {
            rethinkdb_ts_1.r.connect({
                host: databaseConfig.host,
                port: databaseConfig.port
            })
                .then((connection) => {
                resolve(connection);
                console.log("connected");
            })
                .catch((error) => {
                console.log("connection refused.");
                reject();
            });
        });
    }
    createTables(connection) {
        return new Promise(((resolve) => {
            const tablePromises = new Array();
            databaseConfig.tables.forEach((table) => {
                tablePromises.push(this.createTable(connection, table));
            });
            Promise.all(tablePromises).then(() => {
                resolve(true);
            }).catch((error) => {
                console.log('Error while creating table', error);
                resolve(false);
            });
        }));
    }
    createTable(connection, table) {
        return new Promise(((resolve) => {
            rethinkdb_ts_1.r.db(databaseConfig.databaseName)
                .tableList()
                .contains(table.name)
                .do((containsTable) => {
                return rethinkdb_ts_1.r.branch(containsTable, { created: 0 }, rethinkdb_ts_1.r.db(databaseConfig.databaseName)
                    .tableCreate(table.name, { primaryKey: table.primaryKey }));
            })
                .run(connection)
                .then(() => {
                console.log(`Table ${table.name} created successfully`);
                resolve(true);
            }).catch((error) => {
                console.log(`Error while creating ${table.name} - ${table.name} already exists`, error);
                resolve(false);
            });
        }));
    }
}
exports.DatabaseService = DatabaseService;
