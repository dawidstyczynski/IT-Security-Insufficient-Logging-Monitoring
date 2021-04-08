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
                        })
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

      private createTables(connection: Connection) {
            databaseConfig.tables.forEach((table) => {
                  this.createTable(connection, table.name, table.primaryKey)
            });
      }

      private createTable(connection: Connection, tableName: string, primaryKey: string) {
            r.db(databaseConfig.databaseName)
            .tableList()
            .contains(tableName)
            .do((containsTable: any) => {
                  return r.branch(containsTable, {created: 0}, r.db(databaseConfig.databaseName)
                  .tableCreate(tableName, { primaryKey: primaryKey }));
            })
            .run(connection);
            console.log("table created");
      }
}


