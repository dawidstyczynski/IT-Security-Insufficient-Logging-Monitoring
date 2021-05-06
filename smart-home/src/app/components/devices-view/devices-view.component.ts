import { Component, OnInit } from '@angular/core';
import { RestUrl } from 'src/app/constants/rest-urls.enum';
import { IoTDevicePurpose } from 'src/app/models/iot-device-purpose.enum';
import { IoTDevice } from 'src/app/models/iot-devices.model';
import {InputSwitchModule} from 'primeng/inputswitch';
import { DevicesService } from 'src/app/services/devicesService/devices.service';

@Component({
  selector: 'app-devices-view',
  templateUrl: './devices-view.component.html',
  styleUrls: ['./devices-view.component.scss']
})
export class DevicesViewComponent implements OnInit {

  public devices: IoTDevice[];

  constructor(private devicesService: DevicesService) { }

  ngOnInit(): void {
    this.devicesService.getDevices().then(devices => this.devices = devices);
  }

  public HandleChange(e: IoTDevice) {
    this.devicesService.patchDevice(e).then();
  }

  public HandleBtnChange(e: IoTDevice) {
    e.CurrentValue = (e.CurrentValue == e.MaxValue) ? e.MinValue : e.MaxValue;
    this.devicesService.patchDevice(e).then();
  }
}
