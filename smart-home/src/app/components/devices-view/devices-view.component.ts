import { Component, OnInit } from '@angular/core';
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
  }

  public HandleChange(e: IoTDevice) {
    console.log(e);
  }
}
