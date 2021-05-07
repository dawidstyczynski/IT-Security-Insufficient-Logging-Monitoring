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
import { LogLevel } from './models/logLevel.enum';
import { LogModel } from './models/log.model';
import { logger } from './services/logging.service';

const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());

server.use('/login', loginController);
server.use('/register', registrationController);

server.use('/devices', devicesController);
server.use('/logs', loggingController);

// Add middleware to require ip adress.
const requestIp = require('request-ip');
server.use(requestIp.mw())
server.use(function(req, res) {
    const ip = req.ip;
    res.end(ip);
});

const databaseService = new DatabaseService();

databaseService.initialize().then(() => {
      setDemoDevices();

      server.listen(serverConfig.port, function(){
            logger.info("server", "Server started");
            logger.info("server", "Server is listening at http://localhost:" + serverConfig.port);
      });
})
.catch((error) => {
      logger.error("server", "Server stopped" + error)
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
