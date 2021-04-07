import { Connection, r, RDatum } from 'rethinkdb-ts';
import * as databaseConfig from '../config/database-config.json';

export class DatabaseService {
      constructor() {}

      /// returns: A promise that returns true if initialization was successful.
      public initialize(): Promise<boolean> {
            return new Promise<boolean>((resolve, reject) => {
                  this.connect().then((connection: Connection) => {
                        r.dbList()
                        .contains(databaseConfig.databaseName)
                        .do((containsDb: RDatum<boolean>) => {
                              return r.branch(containsDb, { created: 0 }, r.dbCreate(databaseConfig.databaseName));
                        }).run(connection).then(() => {
                              console.log("database initialized");
                              this.createTables(connection);
                              resolve(true);
                        }).catch((error) => {
                              console.log("error!!!")
                        });
                  }).catch((error) => {
                        reject(error);
                  });
            });
      }

      public connect(): Promise<Connection> {
            return new Promise<Connection>((resolve, reject) => {
                  r.connect({
                        host: databaseConfig.host,
                        port: databaseConfig.port
                  })
                  .then((connection: Connection) => {
                        resolve(connection);
                        console.log("connected");
                  })
                  .catch((error) => {
                        console.log("connection refused.");
                        reject();
                  });
            });
      }

      private createTables(connection: Connection): Promise<boolean> {
            return new Promise<boolean>(((resolve) => {
                const tablePromises = new Array<Promise<boolean>>();
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
    
        private createTable(connection: Connection, table: any): Promise<boolean> {
            return new Promise<boolean>(((resolve) => {
                r.db(databaseConfig.databaseName)
                    .tableList()
                    .contains(table.name)
                    .do((containsTable: RDatum<boolean>) => {
                        return r.branch(containsTable,
                            { created: 0 },
                            r.db(databaseConfig.databaseName)
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


