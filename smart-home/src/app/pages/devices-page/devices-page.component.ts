import { Component, OnInit } from '@angular/core';
import { DevicesService } from 'src/app/services/devicesService/devices.service';

@Component({
  templateUrl: './devices-page.component.html',
  styleUrls: ['./devices-page.component.scss'],
})
export class DevicesPageComponent implements OnInit {

  constructor(private service: DevicesService) { }

  ngOnInit(): void {

  }
}
