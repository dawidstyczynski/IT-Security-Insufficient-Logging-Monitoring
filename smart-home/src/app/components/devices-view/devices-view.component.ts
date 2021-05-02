import { Component, OnInit } from '@angular/core';
import { Console } from 'node:console';
import { IoTDevicePurpose } from 'src/app/models/iot-device-purpose.enum';
import { IoTDevice } from 'src/app/models/iot-devices.model';
import { DevicesService } from 'src/app/services/devicesService/devices.service';

@Component({
  selector: 'app-devices-view',
  templateUrl: './devices-view.component.html',
  styleUrls: ['./devices-view.component.scss']
})
export class DevicesViewComponent implements OnInit {

  public devices: IoTDevice[];

  public TemperatureModulators: IoTDevice[];

  public AirMostureSensors: IoTDevice[];

  public ParticulatesSensors: IoTDevice[];

  public AlarmSystems: IoTDevice[];

  public Leds: IoTDevice[];

  constructor(private devicesService: DevicesService) { }

  ngOnInit(): void {
    this.devicesService.getDevices().then(devices => this.devices = devices);

    this.devicesService.getDevices().then((devices) => {
      this.TemperatureModulators = devices.filter(device => device.Purpose == IoTDevicePurpose.TemperatureModulator);
      this.AirMostureSensors = devices.filter(device => device.Purpose == IoTDevicePurpose.AirMostureSensor);
      this.ParticulatesSensors = devices.filter(device => device.Purpose == IoTDevicePurpose.ParticulatesSensor);
      this.AlarmSystems = devices.filter(device => device.Purpose == IoTDevicePurpose.AlarmSystem);
      this.Leds = devices.filter(device => device.Purpose == IoTDevicePurpose.LED);
    });
  }

  public HandleChange(e: number) {
    console.log(e);
  }
}
