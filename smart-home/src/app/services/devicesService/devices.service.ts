import { Injectable } from '@angular/core';
import { RestUrl } from '../../constants/rest-urls.enum';
import { IoTDevice } from '../../models/iot-devices.model';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(private apiService: ApiService) { }

  public getDevices(): Promise<IoTDevice[]> {
    return new Promise<IoTDevice[]>((resolve, reject) => {
      this.apiService.GetData<IoTDevice[]>(RestUrl.Devices)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
    });
  }
}
