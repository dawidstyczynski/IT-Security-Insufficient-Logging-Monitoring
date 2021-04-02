import { exception } from 'console';
import { Connection, r } from 'rethinkdb-ts';
import { UserRecord } from '../../smart-home-common/UserRecord';
import { ChangePWRecord } from '../../smart-home-common/ChangePWRecord';

const Host = '127.0.0.1';
const Port = 28015;

export function initializeDB(){
      connect()
      .then((conn) =>{
            console.log('Connected to DB.');
            createDB(conn);
            createTable(conn);
      })
      .catch((error) =>{
            console.log('Could not connect to DB. Error :' + error);
      });
}

function createDB(conn : Connection){
      r.dbList().contains('itsecurity').do((containsDB:any) =>{
            return r.branch(containsDB, {created: 0}, r.dbCreate('itsecurity'));
      }).run(conn);
}

function createTable(conn : Connection){
      r.db('itsecurity').tableList().contains("library").do((containsTable: any) =>{
            return r.branch(containsTable, {created: 0}, r.db('itsecurity').tableCreate('library'));
      }).run(conn);

      r.db('itsecurity').tableList().contains("users").do((containsTable: any) =>{
            return r.branch(containsTable, {created: 0}, r.db('itsecurity').tableCreate('users', {primaryKey: 'name'}));
      }).run(conn);
}

function connect() : Promise<Connection>
{
      return r.connect({
            host: Host,
            port: Port
      });
}

export class UserTableService{

      constructor(){
      }

      public async RegisterUser(entry: UserRecord): Promise<UserRecord> {
            let conn = await this.connect();

            let exists = await r.db('itsecurity').table<UserRecord>('users').filter( {name: entry.name} ).run(conn);

            if (exists.length === 0)
            {
                  let result = await r.db('itsecurity').table('users').insert({
                  name: entry.name,
                  password: entry.password,
                  }).run(conn);

                  if (result.inserted === 0){
                        throw new Error('Can not create user.');
                  }

                  let user = await r.db('itsecurity').table<UserRecord>('users').filter( {name: entry.name} ).run(conn);
                  console.log('User registered.');
                  return user[0];
            }

            throw new Error('Username already exists.');
      }

      public async LoginUser(entry: UserRecord): Promise<UserRecord> {
            let conn = await this.connect();
            let exists = await r.db('itsecurity').table<UserRecord>('users').filter( {name: entry.name, password: entry.password} ).run(conn);

            if (exists.length === 0)
            {
                  throw new Error('User not found.');
            }

            console.log('User exists.');
            return exists[0];
      }

      public async ChangePW(id : string, entry: ChangePWRecord): Promise<UserRecord>{
            let conn = await this.connect();
            let exists = await r.db('itsecurity').table<UserRecord>('users').filter( {name: id, password: entry.oldPW} ).run(conn);

            if (exists.length === 0)
            {
                  throw new Error('');
            }

            let update = await r.db('itsecurity').table<UserRecord>('users').filter( {name: id, password: entry.oldPW} ).update( {password: entry.newPW} ).run(conn);
            let foundUsers = await r.db('itsecurity').table<UserRecord>('users').filter( {name: id} ).run(conn);
            return foundUsers[0];
      }

      public async ChangeEmail(user: UserRecord): Promise<UserRecord>{
            let conn = await this.connect();
            let exists = await r.db('itsecurity').table<UserRecord>('users').filter( {name: user.name, password: user.password} ).run(conn);

            if (exists.length === 0)
            {
                  throw new Error('');
            }

            let update = await r.db('itsecurity').table<UserRecord>('users').filter( {name: user.name} ).update( {
                  name: user.name, 
                  password: user.password, 
                  email: user.email
            }).run(conn);

            let foundUsers = await r.db('itsecurity').table<UserRecord>('users').filter({name: user.name}).run(conn);
            return foundUsers[0];
      }

      private connect() : Promise<Connection>
      {
            return r.connect({
                  host: Host,
                  port: Port
            });
      }
}