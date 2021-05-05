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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetUpLogger = exports.GetLogger = void 0;
const log4js = __importStar(require("log4js"));
const logLevel_enum_1 = require("../models/logLevel.enum");
function GetLogger(callerName) {
    return log4js.getLogger(callerName);
}
exports.GetLogger = GetLogger;
function SetUpLogger() {
    return new Promise((resolve, reject) => {
        try {
            log4js.configure({
                appenders: {
                    console: {
                        type: "stdout",
                        layout: {
                            type: "colored"
                        }
                    },
                    info: {
                        type: "file",
                        filename: "info.log",
                        keepFileExt: true,
                        layout: {
                            type: "basic"
                        }
                    },
                    warn: {
                        type: "file",
                        filename: "warn.log",
                        keepFileExt: true,
                        layout: {
                            type: "colored"
                        }
                    },
                    error: {
                        type: "file",
                        filename: "error.log",
                        layout: {
                            type: "colored"
                        }
                    }
                },
                categories: {
                    default: {
                        appenders: ["info", "console"],
                        level: logLevel_enum_1.LogLevel.Info
                    },
                    problem: {
                        appenders: ["warn"],
                        level: logLevel_enum_1.LogLevel.Warn
                    },
                    risk: {
                        appenders: ["error"],
                        level: logLevel_enum_1.LogLevel.Error
                    }
                }
            });
            resolve();
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.SetUpLogger = SetUpLogger;
;
