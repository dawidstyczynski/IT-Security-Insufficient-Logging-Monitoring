import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { RouteName } from 'src/app/constants/route-name.enum';
import { LoggingService } from 'src/app/services/loggerService/logging.service';
import {UserLoginService} from '../../services/login-service/user-login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public title = 'Insufficient logging and monitoring';
  public items : MenuItem[];

  constructor(private loginService: UserLoginService, private router: Router, private logger : LoggingService) { }

  ngOnInit(): void {
    this.items = [
          {label: 'Device overview', icon: 'pi pi-wifi', routerLink: ['/' + RouteName.Devices]},
          {label: 'Configuration', icon: 'pi pi-cog', routerLink: ['/' + RouteName.Config]},
          {label: 'History', icon: 'pi pi-book', routerLink: ['/' + RouteName.Logs]}
    ]
  }

  public HandleUserLogout(){
    this.logger.logInfo(this.loginService.getUserData().name, "has logged out.");
    this.loginService.Logout();
    this.router.navigateByUrl(this.router.createUrlTree([RouteName.Login]));
  }
}
