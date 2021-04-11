"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoTDecice = void 0;
class IoTDecice {
    constructor(id, name, purpose, minValue, maxValue, currentValue) {
        this.Id = id;
        this.Name = name;
        this.Purpose = purpose;
        this.MinValue = minValue;
        this.MaxValue = maxValue;
        this.CurrentValue = currentValue;
    }
}
exports.IoTDecice = IoTDecice;
