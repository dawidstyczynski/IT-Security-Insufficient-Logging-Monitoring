import * as serverConfig from './config/server-config.json';
import express from "express";
import { loginController } from './api/login.controller';
import { registrationController } from './api/registration.controller';
import { DatabaseService } from './services/database.service';
import cors from 'cors';
import { DatabaseTable } from './config/database-table.enum';
import { devicesController } from './api/devices.controller';
import { IoTDecice } from './models/iot-devices.model';
import { loggingController } from './api/logging.controller';
import { IoTDevicePurpose } from './models/iot-device-purpose.enum';
import {SendLog} from './services/logging.service';
import {LogLevel} from './models/logLevel.enum';

const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());

server.use('/login', loginController);
server.use('/register', registrationController);

server.use('/devices', devicesController);
server.use('/logs', loggingController);

const databaseService = new DatabaseService();

databaseService.initialize().then(() => {
      console.log("Database initialized. ✅")
      
      setDemoDevices();

      server.listen(serverConfig.port, function(){
            console.log("Server is running at http://localhost:" + serverConfig.port + " ✅");

            let text = "Server is running at http://localhost:" + serverConfig.port;
            SendLog({user: "server", loglevel: LogLevel.Info, message: text});
      });
})
.catch((error) => {
      console.log("Database could not be initialized ⚠️");
      console.log("Server stopped 🔥")
});


function setDemoDevices() {
      databaseService.insert(new IoTDecice('2', 'Heizung', IoTDevicePurpose.TemperatureModulator, 5, 30, 21), DatabaseTable.Devices);
      databaseService.insert(new IoTDecice('3', 'Luftfeuchtigkeit', IoTDevicePurpose.AirMostureSensor, 0, 100, 20), DatabaseTable.Devices);
      databaseService.insert(new IoTDecice('4', 'Feinstaub', IoTDevicePurpose.ParticulatesSensor, 0, 5, 1), DatabaseTable.Devices);
      databaseService.insert(new IoTDecice('5', 'Licht Wohnzimmer', IoTDevicePurpose.LED, 0, 100, 0), DatabaseTable.Devices);
      databaseService.insert(new IoTDecice('6', 'Licht Küche', IoTDevicePurpose.LED, 0, 100, 1), DatabaseTable.Devices);
      databaseService.insert(new IoTDecice('7', 'Licht Badezimmer', IoTDevicePurpose.LED, 0, 100, 0), DatabaseTable.Devices);
      databaseService.insert(new IoTDecice('8', 'Alarmanlage', IoTDevicePurpose.AlarmSystem, 0, 1, 0), DatabaseTable.Devices);
}


/*
app.patch('/changePW/:id', function(req, res){
      console.log('Request to changePW');
      let { id } = req.params;
      let changePW : ChangePWRecord = req.body;
      console.log(id);
      console.log(changePW.oldPW);∂∂
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