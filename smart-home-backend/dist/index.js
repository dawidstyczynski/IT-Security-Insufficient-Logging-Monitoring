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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverConfig = __importStar(require("./config/server-config.json"));
const express_1 = __importDefault(require("express"));
const login_controller_1 = require("./api/login.controller");
const registration_controller_1 = require("./api/registration.controller");
const database_service_1 = require("./services/database.service");
const cors_1 = __importDefault(require("cors"));
const database_table_enum_1 = require("./config/database-table.enum");
const devices_controller_1 = require("./api/devices.controller");
const iot_devices_model_1 = require("./models/iot-devices.model");
const logging_controller_1 = require("./api/logging.controller");
const iot_device_purpose_enum_1 = require("./models/iot-device-purpose.enum");
const logging_service_1 = require("./services/logging.service");
const logLevel_enum_1 = require("./models/logLevel.enum");
const server = express_1.default();
server.use(express_1.default.urlencoded({ extended: false }));
server.use(express_1.default.json());
server.use(cors_1.default());
server.use('/login', login_controller_1.loginController);
server.use('/register', registration_controller_1.registrationController);
server.use('/devices', devices_controller_1.devicesController);
server.use('/logs', logging_controller_1.loggingController);
const databaseService = new database_service_1.DatabaseService();
const logger = new logging_service_1.LoggingService();
databaseService.initialize().then(() => {
    console.log("Database initialized. ✅");
    setDemoDevices();
    server.listen(serverConfig.port, function () {
        console.log("Server is running at https://localhost:" + serverConfig.port + " ✅");
        let text = "Server is running at https://localhost:" + serverConfig.port;
        logger.SendLog({ user: "server", loglevel: logLevel_enum_1.LogLevel.Info, message: text });
    });
})
    .catch((error) => {
    console.log("Database could not be initialized ⚠️");
    console.log("Server stopped 🔥");
});
function setDemoDevices() {
    databaseService.insert(new iot_devices_model_1.IoTDecice('2', 'Heizung', iot_device_purpose_enum_1.IoTDevicePurpose.TemperatureModulator, 5, 30, 21), database_table_enum_1.DatabaseTable.Devices);
    databaseService.insert(new iot_devices_model_1.IoTDecice('3', 'Luftfeuchtigkeit', iot_device_purpose_enum_1.IoTDevicePurpose.AirMostureSensor, 0, 100, 20), database_table_enum_1.DatabaseTable.Devices);
    databaseService.insert(new iot_devices_model_1.IoTDecice('4', 'Feinstaub', iot_device_purpose_enum_1.IoTDevicePurpose.ParticulatesSensor, 0, 5, 1), database_table_enum_1.DatabaseTable.Devices);
    databaseService.insert(new iot_devices_model_1.IoTDecice('5', 'Licht Wohnzimmer', iot_device_purpose_enum_1.IoTDevicePurpose.LED, 0, 100, 0), database_table_enum_1.DatabaseTable.Devices);
    databaseService.insert(new iot_devices_model_1.IoTDecice('6', 'Licht Küche', iot_device_purpose_enum_1.IoTDevicePurpose.LED, 0, 100, 0), database_table_enum_1.DatabaseTable.Devices);
    databaseService.insert(new iot_devices_model_1.IoTDecice('7', 'Licht Badezimmer', iot_device_purpose_enum_1.IoTDevicePurpose.LED, 0, 100, 0), database_table_enum_1.DatabaseTable.Devices);
    databaseService.insert(new iot_devices_model_1.IoTDecice('8', 'Alarmanlage', iot_device_purpose_enum_1.IoTDevicePurpose.AlarmSystem, 0, 1, 0), database_table_enum_1.DatabaseTable.Devices);
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
