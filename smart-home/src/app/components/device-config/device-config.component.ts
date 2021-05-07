import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../../services/devicesService/devices.service';
import { IoTDevice } from '../../models/iot-devices.model';
import { ApiService } from 'src/app/services/apiService/api.service';
import { RestUrl } from 'src/app/constants/rest-urls.enum';
import { LoggingService } from 'src/app/services/loggerService/logging.service';
import { UserLoginService } from 'src/app/services/login-service/user-login.service';

@Component({
  selector: 'app-device-config',
  templateUrl: './device-config.component.html',
  styleUrls: ['./device-config.component.scss']
})
export class DeviceConfigComponent implements OnInit {

  constructor(
    private deviceService: DevicesService, 
    private apiService: ApiService, 
    private logger: LoggingService,
    private login: UserLoginService) 
    {
    this.labelEdit = null;
    this.currentLabelName = "";
    this.rows = 25;
   }

  public devices: IoTDevice[];
  public labelEdit: IoTDevice | null;
  public rows : number;

  private currentLabelName: string;

  ngOnInit(): void {
    this.GetDevices();
  }

  public GetDevices(){
    this.deviceService.getDevices().then((array) => {
      this.devices = array;
    }).catch((error) =>{
    })
  }

  public HandleLabelEdit(device: IoTDevice){
    this.labelEdit = device;
    this.currentLabelName = device.Name;
  }

  public HandleLabelCancel(){
    this.labelEdit = null;
    this.currentLabelName = "";
  }

  public HandleLabelSave(){
    if (this.labelEdit == null) 
    {
      return;
    }

    if (this.labelEdit.Name.replace(' ', '').length === 0)
    {
      console.debug("Device label is not allowed to be empty.");
        return;
    }

    this.apiService.PatchData<IoTDevice, Boolean>(RestUrl.Devices, {id : this.labelEdit.Id}, this.labelEdit)
      .then((success) => {
        if (!success)
        {
          console.debug("Could not update device label.");
          return;
        }

        this.logger.logInfo(this.login.getUserData.name, "has changed the label of " + this.currentLabelName + " to " + this.labelEdit.Name);
        
      }).catch((e) =>{
        console.debug("Label for device already taken.");
      });
  }
}
