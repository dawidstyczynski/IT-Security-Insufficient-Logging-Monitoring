import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserLoginService } from '../services/login-service/user-login.service';

@Injectable({
  providedIn: 'root'
})
export class ReverseAuthGuard implements CanActivate {
  constructor(private loginService: UserLoginService, private router: Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
      
      if (this.loginService.getUserData() === null)
      {
        return true;
      }
      
      return this.router.createUrlTree(['/devices']);
  }
}
