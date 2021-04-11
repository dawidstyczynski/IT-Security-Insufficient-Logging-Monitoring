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
const login_controller_1 = require("./api/login/login.controller");
const registration_controller_1 = require("./api/registration/registration.controller");
const database_service_1 = require("./services/database.service");
const cors_1 = __importDefault(require("cors"));
const database_table_enum_1 = require("./config/database-table.enum");
const devices_controller_1 = require("./api/devices/devices.controller");
const iot_devices_model_1 = require("./models/iot-devices.model");
const loggingController_1 = require("./api/logs/loggingController");
const server = express_1.default();
server.use(express_1.default.urlencoded({ extended: false }));
server.use(express_1.default.json());
server.use(cors_1.default());
server.use('/login', login_controller_1.loginController);
server.use('/register', registration_controller_1.registrationController);
server.use('/devices', devices_controller_1.devicesController);
server.use('/logs', loggingController_1.loggingController);
const databaseService = new database_service_1.DatabaseService();
databaseService.initialize().then(() => {
    console.log("Database initialized.");
    const device = new iot_devices_model_1.IoTDecice("03AC", "xx", "s", 2, 3, 4);
    databaseService.insert(device, database_table_enum_1.DatabaseTable.Devices);
    server.listen(serverConfig.port, function () {
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
