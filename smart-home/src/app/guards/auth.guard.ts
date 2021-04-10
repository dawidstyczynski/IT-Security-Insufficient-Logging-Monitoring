import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { TimeoutError } from 'rxjs';
import { RouteName } from '../constants/route-name.enum';
import { UserLoginService } from '../services/login-service/user-login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: UserLoginService, private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree 
  {
    if (this.loginService.getUserData() === null)
    {
      return this.router.createUrlTree([RouteName.Login]);
    }

    return true;
  }
}
