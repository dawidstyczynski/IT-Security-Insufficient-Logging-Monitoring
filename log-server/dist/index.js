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
const cors_1 = __importDefault(require("cors"));
const logging_service_1 = require("./services/logging.service");
const logLevel_enum_1 = require("./models/logLevel.enum");
const server = express_1.default();
server.use(express_1.default.urlencoded({ extended: false }));
server.use(express_1.default.json());
server.use(cors_1.default());
<<<<<<< Updated upstream
=======
console.log("Started..");
>>>>>>> Stashed changes
server.post("/log", (req, res) => {
    let log = req.body;
    let logger = logging_service_1.GetLogger(log.user);
    switch (log.loglevel) {
        case logLevel_enum_1.LogLevel.Info: {
            logger.info(log.message);
            break;
        }
        case logLevel_enum_1.LogLevel.Warn: {
            logger.warn(log.message);
            break;
        }
        case logLevel_enum_1.LogLevel.Error: {
            logger.error(log.message);
            break;
        }
    }
});
logging_service_1.SetUpLogger()
    .then(() => {
    server.listen(serverConfig.port, function () {
        console.log("Server is running at port " + serverConfig.port + " ✅");
    });
})
    .catch((error) => {
    console.log(error);
});
