import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem, MessageService} from 'primeng/api';
import { RouteName } from 'src/app/constants/route-name.enum';
import {UserLoginService} from '../../services/user-login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public title = 'Weblink Library';
  public items : MenuItem[];

  constructor(private loginService: UserLoginService, private router: Router, private msg : MessageService) { }

  ngOnInit(): void {
    this.items = [
          {label: 'Device overview', icon: 'pi pi-wifi', routerLink: [RouteName.Devices]},
          {label: 'Configuration', icon: 'pi pi-cog', routerLink: [RouteName.Config]},
          {label: 'History', icon: 'pi pi-book', routerLink: [RouteName.Logs]}
    ]
  }

  public HandleUserLogout(){
    this.loginService.Logout();
    this.router.navigateByUrl(this.router.createUrlTree([RouteName.Login]));
  }
}
