import { Component, OnInit } from '@angular/core';
import { IoTDevice } from 'src/app/models/iot-devices.model';
import { UserRecord } from 'src/app/models/userRecord';
import { DevicesService } from 'src/app/services/devicesService/devices.service';
import { LoggingService } from 'src/app/services/loggerService/logging.service';
import { UserLoginService } from 'src/app/services/login-service/user-login.service';

@Component({
  selector: 'app-devices-view',
  templateUrl: './devices-view.component.html',
  styleUrls: ['./devices-view.component.scss']
})
export class DevicesViewComponent implements OnInit {

  public devices: IoTDevice[];
  private user: UserRecord;

  constructor(private devicesService: DevicesService, private logger: LoggingService, private login : UserLoginService) {
    this.user = login.getUserData();
   }

  ngOnInit(): void {
    this.devicesService.getDevices().then(devices => this.devices = devices);
  }

  public HandleChange(device: IoTDevice) {
    this.devicesService.patchDevice(device).then(() =>{
      this.logger.logInfo(this.user.name, "Changed " + device.Name + " to " + device.CurrentValue);
    }).catch((e) =>{
      console.debug(e);
    });;
  }

  public HandleBtnChange(device: IoTDevice) {
    device.CurrentValue = (device.CurrentValue == device.MaxValue) ? device.MinValue : device.MaxValue;
    this.devicesService.patchDevice(device).then(() =>{
      if (device.CurrentValue)
      {
        this.logger.logInfo(this.user.name, "Switched on " + device.Name);
        return;
      }

      this.logger.logInfo(this.user.name, "Switched off " + device.Name);
    }).catch((e) =>{
      console.debug(e);
    });
  }
}
