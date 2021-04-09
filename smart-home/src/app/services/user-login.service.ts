import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { host, port } from '../constants/backend-config';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  private userData: UserRecord | null;

  constructor(private client: HttpClient) {
      this.userData = null;
   }

  public async Login(user: UserRecord) : Promise<UserRecord>{
    return this.client.post<UserRecord>(host + port + '/login', user).toPromise()
    .then((user) =>{
      this.userData = user;
      console.log(this.userData.name);
      return user;
    })
    .catch((error) =>{
      return error;
    });
  }

  public async Register(user: UserRecord) : Promise<UserRecord>{
    return await this.client.post<UserRecord>(host + port + '/register', user).toPromise();
  }

  public async ChangePassword(changePW: string) : Promise<UserRecord>{
    return this.client.patch<UserRecord>(host + port + '/changePW/' + this.userData.name, {oldPW: this.userData.password, newPW: changePW} ).toPromise()
    .then((user) =>{
      this.userData = user;
      return user;
    })
    .catch((error) =>{
      return error;
    })
  }

  public async ChangeEmail(changeEmail: string) : Promise<UserRecord>{
    let newUser = this.userData;
    newUser.email = changeEmail;
    return this.client.patch<UserRecord>(host + port + '/email', newUser).toPromise()
    .then((user) =>{
      this.userData = user;
      return user;
    })
    .catch((error) =>{
      return error;
    });
  }

  public Logout(){
    this.userData = null;
  }

  public getUserData(){
    return this.userData;
  }
}

interface ChangePWRecord{
  oldPW: string,
  newPW: string,
}

interface UserRecord{
  name: string,
  password: string,

  email: string,
}