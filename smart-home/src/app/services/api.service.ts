import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'rxjs';
import { host, port } from '../constants/backend-config';
import { RestUrl } from '../constants/rest-urls.enum';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly backend = host + port;

  constructor(private client: HttpClient) { }

  public GetData<T>(restUrl: RestUrl): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.client.get(this.backend + restUrl)
      .toPromise()
      .then((result: T) => resolve(result))
      .catch((error) => reject(error))
    });
  }

  public PostData<TSend, TReceive>(restUrl: string, data: TSend): Promise<TReceive> {
    return new Promise<TReceive>((resolve, reject) => {
      this.client.post(this.backend + restUrl, data)
      .toPromise()
      .then((result: TReceive) => resolve(result))
      .catch((error) => reject(error))
    });
  }
}
