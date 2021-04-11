import { Connection, r, RDatum } from 'rethinkdb-ts';
import * as databaseConfig from '../config/database-config.json';
import {UserRecord} from '../models/userRecord';
import {ChangePWRecord} from '../models/pwRecord';


export class UserTableService{

    constructor(){
    }

    public async RegisterUser(entry: UserRecord): Promise<UserRecord> {
          let conn = await this.connect();

          let exists = await r.db(databaseConfig.databaseName).table<UserRecord>('User').filter( {name: entry.name} ).run(conn);

          if (exists.length === 0)
          {
                let result = await r.db(databaseConfig.databaseName).table('User').insert({
                name: entry.name,
                password: entry.password,
                admin: entry.admin
                }).run(conn);

                if (result.inserted === 0){
                      throw new Error('Can not create user.');
                }

                let user = await r.db(databaseConfig.databaseName).table<UserRecord>('User').filter( {name: entry.name} ).run(conn);
                console.log('User registered.');
                return user[0];
          }

          throw new Error('Username already exists.');
    }

    public async LoginUser(entry: UserRecord): Promise<UserRecord> {
          let conn = await this.connect();
          let exists = await r.db(databaseConfig.databaseName).table<UserRecord>('User').filter( {name: entry.name, password: entry.password} ).run(conn);

          if (exists.length === 0)
          {
                throw new Error('User not found.');
          }

          console.log('User exists.');
          return exists[0];
    }

    public async ChangePW(id : string, entry: ChangePWRecord): Promise<UserRecord>{
          let conn = await this.connect();
          let exists = await r.db(databaseConfig.databaseName).table<UserRecord>('User').filter( {name: id, password: entry.oldPW} ).run(conn);

          if (exists.length === 0)
          {
                throw new Error('User does not exist.');
          }

          await r.db(databaseConfig.databaseName).table<UserRecord>('User').filter( {name: id, password: entry.oldPW} ).update( {password: entry.newPW} ).run(conn);
          let founduser = await r.db(databaseConfig.databaseName).table<UserRecord>('User').filter( {name: id} ).run(conn);
          return founduser[0];
    }

    public async ChangeEmail(user: UserRecord): Promise<UserRecord>{
          let conn = await this.connect();
          let exists = await r.db(databaseConfig.databaseName).table<UserRecord>('user').filter( {name: user.name, password: user.password} ).run(conn);

          if (exists.length === 0)
          {
                throw new Error('User does not exist.');
          }

          await r.db(databaseConfig.databaseName).table<UserRecord>('User').filter( {name: user.name} ).update( {
                email: user.email
          }).run(conn);

          let founduser = await r.db(databaseConfig.databaseName).table<UserRecord>('User').filter({name: user.name}).run(conn);
          return founduser[0];
    }

    private connect() : Promise<Connection>
    {
          return r.connect({
                host: databaseConfig.host,
                port: databaseConfig.port
          });
    }
}