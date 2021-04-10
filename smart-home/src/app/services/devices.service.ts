import { Injectable } from '@angular/core';
import { RestUrl } from '../constants/rest-urls.enum';
import { IoTDecice } from '../models/iot-devices.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(private apiService: ApiService) { }

  public getDevices(): Promise<IoTDecice[]> {
    return new Promise<IoTDecice[]>((resolve, reject) => {
      this.apiService.GetData<IoTDecice[]>(RestUrl.Devices)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
    });
  }
}
