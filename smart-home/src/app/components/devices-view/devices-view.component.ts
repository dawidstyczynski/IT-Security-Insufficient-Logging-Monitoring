import { Component, OnInit } from '@angular/core';
import { RestUrl } from 'src/app/constants/rest-urls.enum';
import { IoTDevicePurpose } from 'src/app/models/iot-device-purpose.enum';
import { IoTDevice } from 'src/app/models/iot-devices.model';
import { ApiService } from 'src/app/services/apiService/api.service';
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

  constructor(private devicesService: DevicesService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.devicesService.getDevices().then(devices => this.devices = devices);
  }

  public HandleChange(e: IoTDevice) {
    this.apiService.PatchData(RestUrl.Devices, {id: e.Id}, e).then(()=>{
      console.log(e);
    });
  }
}
