import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../../services/devicesService/devices.service';
import { IoTDevice } from '../../models/iot-devices.model';
import { ApiService } from 'src/app/services/apiService/api.service';
import { RestUrl } from 'src/app/constants/rest-urls.enum';

@Component({
  selector: 'app-device-config',
  templateUrl: './device-config.component.html',
  styleUrls: ['./device-config.component.scss']
})
export class DeviceConfigComponent implements OnInit {

  constructor(private deviceService: DevicesService, private apiService: ApiService) {
    this.labelEdit = null;
    this.rows = 25;
   }

  public devices: IoTDevice[];
  public labelEdit: IoTDevice | null;
  public rows : number;

  ngOnInit(): void {
    this.GetDevices();
  }

  public GetDevices(){
    this.deviceService.getDevices().then((array) => {
      this.devices = array;
    }).catch((error) =>{
      console.log(error);
    })
  }

  public HandleLabelEdit(device: IoTDevice){
    this.labelEdit = device;
  }

  public HandleLabelCancel(){
    this.labelEdit = null;
  }

  public HandleLabelSave(){
    if (this.labelEdit == null) 
    {
      return;
    }

    if (this.labelEdit.Name.indexOf(' ') <= 0)
    {
      this.apiService.PatchData<IoTDevice, Boolean>(RestUrl.Devices, {id : this.labelEdit.Id}, this.labelEdit).then((success) => {
        if (!success)
        {
          console.log("Could not update device label.");
        }});
    }

    console.log("Label for device already taken.");
  }
}
