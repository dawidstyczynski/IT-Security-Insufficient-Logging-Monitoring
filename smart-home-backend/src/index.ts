import * as serverConfig from './config/server-config.json';
import express from "express";
import { loginController } from './api/login/login.controller';
import { registrationController } from './api/registration/registration.controller';
import { DatabaseService } from './services/database.service';
import cors from 'cors';
import { LogModel } from './api/log/log.model';
import { DatabaseTable } from './config/database-table.enum';
import { devicesController } from './api/devices/devices.controller';
import { IoTDecice } from './api/devices/iot-devices.model';

const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());

server.use('/login', loginController);
server.use('/register', registrationController);

server.use('/devices', devicesController);

const databaseService = new DatabaseService();
databaseService.initialize().then(() => {
      console.log("Database initialized.")

      const device = new IoTDecice("xx", "s", 2, 3, 4);

      databaseService.insert(device, DatabaseTable.Devices);
      
      server.listen(serverConfig.port, function(){
            console.log("Server is running at https://localhost:" + serverConfig.port);
      });
})
.catch((error) => {
      console.log("Database could not be initialized.");
});



/*
app.patch('/changePW/:id', function(req, res){
      console.log('Request to changePW');
      let { id } = req.params;
      let changePW : ChangePWRecord = req.body;
      console.log(id);
      console.log(changePW.oldPW);
      console.log(changePW.newPW);
      userTable.ChangePW(id, changePW)
      .then((user) =>{
            console.log(user);
            res.status(200).send(user);
      })
      .catch((error) =>{
            console.log(error);
            res.status(500).send(error);
      });
})
app.patch('/email', function(req, res){
      console.log('Request to change email.');
      let user : UserRecord = req.body;
      console.log(user);
      userTable.ChangeEmail(user)
      .then((user) =>{
            console.log(user);
            res.status(200).send(user);
      })
      .catch((error) =>{
            console.log(error);
            res.status(500).send(error);
      })
})
export interface ChangePWRecord{
      oldPW: string,
      newPW: string,
}
export interface UserRecord{
      name: string,
      password: string,
      email: string,
}
*/
